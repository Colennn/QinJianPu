import { extend, makeToJSON } from '../util'
import MusicData from './MusicData'
import Pitch from './Pitch'
import Duration from './Duration'

/**
 * @class
 * @param {Object} chord
 * @mixes MusicDataMixin
 * @mixes MusicDataLayoutMixin
 */
class Chord extends MusicData {
  constructor(chord) {
    super()
    extend(this, chord);
  }

  /**
   * Type of chord.
   * @constant
   * @default chord
   */
  $type = 'chord'

  /**
   * Pitches in the chord.
   * @type {Array.<Pitch>}
   */
  get pitches() { return this._pitches || (this._pitches = []) }
  set pitches(pitches) { this._pitches = pitches.map(pitch => new Pitch(pitch)) }

  /**
   * Duration of the chord.
   * @type {Duration}
   */
  get duration() { return this._duration || (this._duration = new Duration()) }
  set duration(duration) { this._duration = new Duration(duration) }

  /**
   * Convert chord to the musje source code string.
   * @return {string} Converted musje source code of the chord.
   */
  toString() {
    return '<' + this.pitches.map(pitch => pitch.toString())
                              .join('') + '>' + this.duration
  }

  toJSON = makeToJSON({
    pitches: undefined,
    duration: undefined,
  }, 'chord')
}

export default Chord
