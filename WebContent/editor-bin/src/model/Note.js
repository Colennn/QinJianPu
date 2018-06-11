import { extend, makeToJSON } from '../util'
import MusicData from './MusicData'
import Pitch from'./Pitch'
import Duration from './Duration'
import Tie from './Tie'
import Slur from './Slur'

/**
 * @class
 * @param {Object} note
 * @mixes MusicDataMixin
 * @mixes MusicDataLayoutMixin
 */
class Note extends MusicData {
  constructor(note) {
    super()
    extend(this, note)
  }

  /**
   * Type of note.
   * @constant
   * @default note
   */
  $type = 'note'

  /**
   * Unique def id of the note used in the SVG <defs> element.
   * ```
   * defId := 'n' accidental step octave type dot
   * ```
   * E.g.
   * ```
   * Note     defId
   * ------------------
   * 1        n1040
   * b3-      nb3020
   * #5'_.    ns5181
   * 6,,      n6-2
   * ```
   * @type {string}
   * @readonly
   */
  get defId() {
    const { accidental, step, octave } = this.pitch
    const { type, dot } = this.duration
    return `n${accidental.replace(/#/g, 's')}${step}${octave}${type}${dot}`
  }

  /**
   * Pitch of the note.
   * @type {musje.Pitch}
   */
  get pitch() { return this._pitch || (this._pitch = new Pitch(this)) }
  set pitch(pitch) { this._pitch = new Pitch(this, pitch) }

  /**
   * Duration of the note.
   * @type {musje.Duration}
   */
  get duration() { return this._duration || (this._duration = new Duration()) }
  set duration (duration) { this._duration = new Duration(duration) }

  get beams() { return this._beams || (this._beams = []) }
  set beams(beams) { this._beams = beams }

  /**
   * Tie
   * @type {musje.Tie}
   */
  get tie() { return this._tie || (this._tie = new Tie(this)) }
  set tie(tie) {
    /**
     * Value of the tie.
     * @memberof Tie#
     * @alias value
     * @type {boolean}
     */
    this.tie.value = tie
  }

  /**
   * Slur
   * @type {Slur}
   */
  get slur() { return this._slur || (this._slur = new Slur(this)) }
  set slur(slur) { extend(this.slur, slur) }

  /** @method */
  toString() {
    return this.slur.begin + this.pitch + this.duration +
           this.slur.end + this.tie.value
  }

  toJSON = makeToJSON({
    pitch: undefined,
    duration: undefined,
    tie: undefined,
    slur: undefined
  }, 'note')
}

export default Note
