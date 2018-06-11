import { extend, makeToJSON } from '../util'
import MusicData from './MusicData'

/**
 * Time signature.
 * @class
 * @param time {Object}
 * @mixes MusicDataMixin
 * @mixes MusicDataLayoutMixin
 */
class Time extends MusicData {
  constructor(time) {
    super()
    extend(this, time)
  }

  /**
   * Type of time.
   * @constant
   * @default time
   */
  $type = 'time'

  /**
   * How many beats per measure.
   * @type {number}
   * @default
   */
  beats = 4

  /**
   * Beat type
   * @type {number}
   * @default
   */
  beatType = 4

  /**
   * Def id used in the SVG <defs> element.
   * ```
   * id := 't' beats '-' beatType
   * ```
   * E.g. `t3-4`
   * @type {string}
   * @readonly
   */
  get defId() { return `t${this.beats}-${this.beatType}` }

  /**
   * Convert to musje source code.
   * @return {string} Musje source code.
   */
  toString() { return `${this.beats}/${this.beatType}` }

  toJSON = makeToJSON({
    beats: 4,
    beatType: 4
  }, 'time')
}

export default Time
