import { makeToJSON, extend } from '../util'

const TYPE_TO_STRING = {
  1: ' - - - ', 2: ' - ', 4: '', 8: '_', 16: '=', 32: '=_',
  64: '==', 128: '==_', 256: '===', 512: '===_', 1024: '===='
}
const TYPE_TO_UNDERBAR = {
   1: 0,   2: 0,   4: 0,   8: 1,   16: 2, 32: 3,
  64: 4, 128: 5, 256: 6, 512: 7, 1024: 8
}
const DOT_TO_STRING = ['', '.', '..']


  // /**
  //  * Beat type
  //  * @type {number}
  //  * @default
  //  */
  // type = 4

  // *
  //  * Dot with value of 0, 1, or 2.
  //  * @type {number}
  //  * @default

  // dot = 0

class Duration{
  constructor({ type = 4, dot = 0 } = {}) {
    extend(this, { type, dot })
  }

  /**
   * Type of duration.
   * @constant
   * @default duration
   */
  $type = 'duration'

  /**
   * Def id used in the SVG <defs> element.
   * ```
   * defId := 'd' type dot
   * ```
   * *E.g.*
   * ```
   * Note     defId
   * ----------------
   * 1.       d41
   * 1_       d80
   * 1=       d160
   * 1-..     d22
   * ```
   * @type {string}
   * @readonly
   */
  get defId() { return `d${this.type}${this.dot}` }

  /**
   * `(Getter)` Duration measured in quarter note.
   * @type {number}
   */
  get quarter() {
    const d = 4 / this.type
    return this.dot === 0 ? d :
           this.dot === 1 ? d * 1.5 : d * 1.75
  }

  /**
   * `(Getter)` Duration in second
   * Affected by the tempo.
   * @type {number}
   * @readonly
   */
  get second() {
    return this.quarter * 60 / 80  // / TEMPO;
  }

  /**
   * `(Getter)` Number of underbars in the beam.
   * @type {number}
   * @readonly
   */
  get underbar() { return TYPE_TO_UNDERBAR[this.type] || 0 }

  /**
   * @return {string}
   */
  toString() { return TYPE_TO_STRING[this.type] + DOT_TO_STRING[this.dot] }

  /**
   * [toJSON description]
   * @return {Object}
   */
  toJSON = makeToJSON({
    type: 4,
    dot: 0
  })
}

export default Duration
