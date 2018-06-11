import { makeToJSON, extend } from '../util'

/**
 * Construct head of the score.
 * @class
 * @param {Object} head
 */
class ScoreHead {
  constructor(head) {
    extend(this, head)
  }

  /**
   * Title of the score.
   * @type {string}
   * @default ''
   */
  title = ''

  /**
   * Subtitle of the score.
   * @type {string}
   * @default ''
   */
  subtitle = ''

  /**
   * Subsubtitle of the score.
   * @type {string}
   * @default ''
   */
  subsubtitle = ''

  /**
   * Composer of the score.
   * @type {string}
   */
  composer = undefined

  /**
   * Arranger of the score.
   * @type {string}
   */
  arranger = undefined

  /**
   * Lyricist of the score.
   * @type {string}
   */
  lyricist = undefined

  /**
   * Check if the score head is empty.
   * @type {boolean}
   * @readonly
   */
  get isEmpty() {
    return !this.title && !this.subtitle && !this.subsubtitle &&
           !this.composer && !this.arranger && !this.lyricist
  }

  /**
   * Convert score head to string.
   * @return {string} The converted musje head source code.
   */
  toString() {
    const title = this.title ? `<<${this.title}>>` : ''
    return `${title} ${this.composer || ''}\n`
  }

  toJSON = makeToJSON({
    title: undefined,
    subtitle: undefined,
    subsubtitle: undefined,
    composer: undefined,
    lyricist: undefined
  })
}

export default ScoreHead
