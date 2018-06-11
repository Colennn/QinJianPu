import { extend, makeToJSON } from '../util'
import MusicData from './MusicData'
import Duration from './Duration'

/**
 * @class
 * @param {rest} rest
 * @mixes MusicDataMixin
 * @mixes MusicDataLayoutMixin
 */
class Rest extends MusicData {
  constructor(rest) {
    super()
    extend(this, rest)
  }

  /**
   * Type of rest.
   * @constant
   * @default rest
   */
  $type = 'rest'

  /**
   * Unique def id of the rest used in the SVG <defs> element.
   * ```
   * defId := 'r' type dot
   * ```
   * E.g.
   * ```
   * Rest     defId
   * ----------------
   * 0        r40
   * 0 -      r20
   * 0=.      r161
   * ```
   * @type {string}
   * @readonly
   */
  get defId() {
    const { type, dot } = this.duration
    return `r${type}${dot}`
  }

  /**
   * Duration of the rest.
   * @type {Duration}
   */
  get duration() { return this._duration || (this._duration = new Duration()) }
  set duration(duration) { this._duration = new Duration(duration) }

  get beams() { return this._beams || (this._beams = []) }
  set beams(beams) { this._beams = beams }

  /**
   * Convert the rest to musje source code string.
   * @return {string} Converted musje source code.
   */
  toString() { return `0${this.duration}` }

  toJSON = makeToJSON({
    duration: undefined,
  }, 'rest')
}

export default Rest
