import MusicData from './MusicData'

const BAR_TO_STRING = {
  single: '|', double: '||', end: '|]',
  'repeat-begin': '|:', 'repeat-end': ':|', 'repeat-both': ':|:'
}
const BAR_TO_ID = {
  single: 'bs', double: 'bd', end: 'be',
  'repeat-begin': 'brb', 'repeat-end': 'bre', 'repeat-both': 'brbe'
}

/**
 * @param {string} bar - The bar value, which can be either of
 * - 'single' - `|`
 * - 'double' - `||`
 * - 'end' - `|]`
 * - 'repeat-begin' - `|:`
 * - 'repeat-end' - `:|`
 * - 'repeat-both' - `:|:`
 */
class Bar extends MusicData {
  constructor(bar) {
    super()
    this._value = bar
  }

  /**
   * Type of bar.
   * @constant
   * @readonly
   * @default bar
   */
  $type = 'bar'

  /**
   * Value of the bar, which is the same as the bar parameter in the constructor.
   * @type {string}
   * @default single
   * @readonly
   */
  get value() { return this._value || (this._value = 'single') }

  /**
   * Def id used in the SVG <defs> element.
   * ```
   * defId    Bar value
   * ----------------------
   * 'bs'   - single
   * 'bd'   - double
   * 'be'   - repeat-end
   * 'brb'  - repeat-begin
   * 'bre'  - repeat-end
   * 'brbe' - repeat-both
   * ```
   * @type {string}
   * @readonly
   */
  get defId() { return BAR_TO_ID[this.value] }

  /**
   * Convert bar to string.
   * @return {string} Converted string of the barline in musje source code.
   */
  toString() { return BAR_TO_STRING[this.value] }

  /**
   * [toJSON description]
   * @return {Object} { bar: value }
   */
  toJSON() { return { bar: this.value } }
}

export default Bar
