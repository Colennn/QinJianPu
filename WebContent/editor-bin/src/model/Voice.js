import { extend } from '../util'
import MusicData from './MusicData'

/**
 * @class
 * @param {Object} voice
 */
class Voice extends MusicData {
  constructor(voice) {
    super()
    extend(this, voice)
  }

  /**
   * Type of voice.
   * @constant
   * @default voice
   */
  $type = 'voice'

  /**
   * Convert the voice to musje source code string.
   * @return {string} Converted musje source code string.
   */
  toString() {

  }
}

export default Voice
