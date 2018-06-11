import { matrix } from 'snapsvg'

import time from './Time'
import bar  from './Bar'
import note from './Note'
import rest from './Rest'
import chord from './Chord'
import voice from './Voice'
import Beam from './Beam'

import { extend, near, makeToJSON } from '../util'
const Classes = { time, bar, note, rest, chord, voice }
const Bar = bar

/**
 * Cell is either a measure in a partwise part, or
 * a part in a timewise measure.
 * @param cell {Object}
 * @param mIndex {number} - Measure index of this cell.
 * @param pIndex {number} - Part index of this cell.
 */
class Cell {
  constructor(cell, mIndex, pIndex, score) {
    this._mIndex = mIndex
    this._pIndex = pIndex
    this._score = score
    extend(this, cell)
    makeBeams(this, 1)
  }

  /**
   * Reference to the root score instance.
   * @type {Score}
   * @readonly
   */
  get score() { return this._score }

  /**
   * Music data
   * @type {Array.<MusicDataMixin>}
   */
  get data() { return this._data || (this._data = []) }
  set data(data) {
    this.length = 0
    data.forEach((datum) => { this.append(datum) })
  }

  /**
   * Reference to the parent measures.
   * @type {TimewiseMeasures}
   * @readonly
   */
  get measures() { return this.score.measures }

  /**
   * Reference to the parent measure.
   * @type {TimewiseMeasure}
   * @readonly
   */
  get measure() { return this.measures[this._mIndex] }

  /**
   * Reference to the parent parts.
   * @type {PartwiseParts}
   * @readonly
   */
  get parts() { return this.score.parts }

  /**
   * Reference to the parent part.
   * @type {PartwisePart}
   * @readonly
   */
  get part() { return this.parts[this._pIndex] }

  /**
   * Previous cell in the part.
   * @type {Cell|undefined}
   * @readonly
   */
  get prev() { return this.part.measures[this._mIndex - 1] }

  /**
   * Next cell in the part.
   * @type {Cell|undefined}
   * @readonly
   */
  get next() { return this.part.measures[this._mIndex + 1] }

  /**
   * The first music data in the cell.
   * @type {MusicDataMixin|undefined}
   * @readonly
   */
  get firstData() { return this.data[0] }

  /**
   * The last music data in the cell.
   * @type {MusicDataMixin|undefined}
   * @readonly
   */
  get lastData() { return this.data[this.data.length - 1] }

  /**
   * The left bar of this cell.
   * @type {Bar|undefined}
   * @readonly
   */
  get barLeft() {
    const { firstData } = this
    if (firstData && firstData.$type === 'bar') return firstData

    // Take from the previous measure.
    const prevCell = this.prev
    if (prevCell) return prevCell.barRight
  }

  /**
   * The right bar of this cell.
   * @type {Bar|undefined}
   * @readonly
   */
  get barRight() {
    const { lastData } = this
    if (lastData && lastData.$type === 'bar') return lastData
  }

  /**
   * Append a music data to the cell.
   * @param  {Object} musicData - Music data
   */
  append(musicData) {
    const type = Object.keys(musicData)[0] // musicData has only one key
    const instance = new Classes[type](musicData[type])
    instance._cell = this
    instance._index = this.data.length
    this.data.push(instance)
  }


  /**
   * Width
   * - (Getter) Get the cell width.
   * - (Setter) Set the cell width, and this will cause the cell to reflow.
   * @type {number}
   */
  get width() { return this._w }
  set width(w) {
    this._w = w
    reflow(this)
  }

  get height() { return this.layout.options.partHeight }

  /**
   * The x position of the cell in parent timewise measure.
   * - Set the x value will cause the cell element translate.
   * @type {number}
   */
  get x() { return this._x }
  set x(x) {
    this._x = x
    this.el.transform(matrix().translate(x, this.y2))
  }

  /**
   * The y2 position of the cell in parent timewise measure.
   * - Set the y2 value will cause the cell element translate.
   * @type {number}
   */
  get y2() {
    const { partHeight, partSep } = this.layout.options
    const p = this._pIndex

    return p ? (p + 1) * partHeight + p * partSep : partHeight
  }

  /**
   * The left bar of this cell.
   * - barLeft at first measure of a system:
   * ```
   * |]  -> |
   * :|  -> |
   * :|: -> |:
   * ```
   * @type {Bar}
   * @readonly
   */
  get barLeftInSystem() {
    let bar = this.barLeft
    if (!bar) return { width: 0, height: 0 }

    // First measure in the system.
    if (this.measure.inSystemBegin) {
      if (bar.value === 'end' || bar.value === 'repeat-end') {
        bar = new Bar('single')
      } else if (bar.value === 'repeat-both') {
        bar = new Bar('repeat-begin')
      }
    }
    bar.def = this.layout.defs.get(bar)
    return bar
  }

  /**
   * The right bar of this cell.
   * - barRight at last measure of a system:
   * ```
   *  |: ->  |
   * :|: -> :|
   * ```
   * @type {musje.Bar}
   * @readonly
   */
  get barRightInSystem() {
    const { system } = this.measure
    let bar = this.barRight

    if (!bar) return { width: 0, height: 0 }

    // Last measure in the system.
    if (system && this.measure.inSystemEnd) {
      if (bar.value === 'repeat-begin') {
        bar = new Bar('single')
      } else if (bar.value === 'repeat-both') {
        bar = new Bar('repeat-end')
      }
    }
    bar.def = this.layout.defs.get(bar)
    return bar
  }

  /**
   * Flow the cell.
   */
  flow() {
    const { defs, options } = this.layout
    const { musicDataSep } = options
    let x = 0
    let minHeight

    this.data.forEach(data => {
      const def = data.def = defs.get(data)
      data.x = x
      data.y = 0
      x += def.width + musicDataSep
      minHeight = Math.min(minHeight, def.height)
    })

    this.minWidth = x
    this.minHeight = minHeight
  }

  /**
   * Draw box of the cell.
   * @return {Element} The box SVG rect element.
   */
  drawBox() {
    this._boxEl = this.el.rect(0, -this.height, this.width, this.height)
                         .addClass('bbox')
    return this._boxEl
  }

  /**
   * Clear the box SVG element.
   */
  clearBox() {
    this._boxEl.remove()
    this._boxEl = undefined
  }


  /**
   * Convert cell to string.
   * @return {string} Converted cell in musje source code.
   */
  toString() {
    return this.data.map(musicData => musicData.toString()).join(' ')
  }

  toJSON = makeToJSON({
    data: undefined
  })
}

// Reflow the cell.
function reflow(that) {
  that.data.forEach(data => { data.x *= that.width / that.minWidth })
}


/**
 * Make beams automatically in group by the groupDur.
 * @param {number} groupDur - Duration of a beam group in quarter.
 */
function makeBeams(that, groupDur) {

  getBeamGroups(that, groupDur).forEach(group => {
    const beamLevel = {}   // it starts from 0, while underbar starts from 1

    const nextHasSameBeamlevel = (index, level) => {
      const next = group[index + 1]
      return next && next.duration.underbar > level
    }

    group.forEach((data, i) => {
      const { underbar } = data.duration

      for (let level = 0; level < underbar; level++) {
        if (nextHasSameBeamlevel(i, level)) {

          /**
           * Beams of the note.
           * - Produced by the {@link Cell#makeBeams} method.
           * - The above method is call in {@link Score#prepareCells}.
           * @memberof Note#
           * @alias beams
           * @type {Array.<Beam>}
           */
          data.beams = data.beams || []

          if (beamLevel[level]) {
            data.beams[level] = new Beam('continue', level, data)
          } else {
            beamLevel[level] = true;
            data.beams[level] = new Beam('begin', level, data)
          }
        } else {
          if (beamLevel[level]) {
            data.beams = data.beams || [];
            data.beams[level] = new Beam('end', level, data)
            delete beamLevel[level];
          }
        }
      }
    })
  })
}

function getBeamGroups(that, groupDur) {
  const groups = []
  let group = []
  let counter = 0

  const inGroup = () => counter < groupDur && !near(counter, groupDur)
  const putGroup = () => {
    if (group.length > 1) groups.push(group)
    group = []
  }

  that.data.forEach(musicData => {
    if (musicData.$type !== 'note' && musicData.$type !== 'rest') return

    const { duration } = musicData
    const dur = duration.quarter

    counter += dur

    if (inGroup()) {
      if (duration.underbar) group.push(musicData)
    } else if (near(counter, groupDur)) {
      group.push(musicData)
      putGroup()
      counter = 0
    } else {
      putGroup()
      counter %= groupDur
    }
  })

  putGroup()

  return groups
}

export default Cell
