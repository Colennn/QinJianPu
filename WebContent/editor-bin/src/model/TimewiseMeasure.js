import { matrix } from 'snapsvg'

/**
 * @class
 * @param measure {Object}
 * @mixes TimewiseMeasureLayoutMixin
 */
class TimewiseMeasure {
  constructor(index, measures) {
    // this._index = index
    this._measures = measures
  }

  /**
   * Reference to the parent measures instance.
   * @member {TimewiseMeasures}
   */
  get measures() { return this._measures }

  /**
   * Parts in timewise measure.
   * @type {Array.<Cell>}
   */
  get parts() { return this._parts || (this._parts = []) }
  set parts(parts) { this._parts = parts }

  /**
   * Left bar of the measure.
   * @type {Bar}
   * @readonly
   */
  get barLeft() { return this.parts[0].barLeft }

  /**
   * Right bar of the measure.
   * @type {Bar}
   * @readonly
   */
  get barRight() { return this.parts[0].barRight }


  /**
   * Measure SVG group element.
   * @type {Snap.Element}
   * @readonly
   */
  get el() { return this._el }

  /**
   * Minimun width of the measure.
   * @type {number}
   */
  get minWidth() {
    var minWidth = 0
    this.parts.forEach(function (cell) {
      minWidth = Math.max(minWidth, cell.minWidth)
    })
    return minWidth + this.padding
  }

  /**
   * Reference to the parent system of this measure.
   * - (Getter)
   * - (Setter) The measure el will be created, and the height of the measure will be set.
   * @type {SystemLayout}
   */
  get system() { return this._s }
  set system(system) {
    this._s = system
    this._el = system.el.g().addClass('mus-measure')
  }

  get padding() {
    const lo = this.layout.options
    return lo.measurePaddingRight + lo.measurePaddingLeft
  }

  get outerWidth() { return this.outerWidthLeft + this.outerWidthRight }

  get outerWidthLeft() {
    return this.layout.options.measurePaddingLeft +
            this.barLeftInSystem.width / 2
  }

  get outerWidthRight() {
    return this.layout.options.measurePaddingRight +
            this.barRightInSystem.width / 2
  }

  /**
   * Width of the measure.
   * @type {number}
   */
  get width() { return this._w || (this._w = this.minWidth) }
  set width(w) {
    this._w = w
    this.parts.forEach(cell => { cell.width = w - this.outerWidth })
  }

  get height() { return this.system.height }

  get minHeight() {
    const { partSep } = this.layout.options
    let minHeight = 0

    this.parts.forEach(cell => { minHeight += cell.height + partSep })
    return minHeight ? minHeight - partSep : 0
  }

  /**
   * The x position of the measure in the system.
   * - (Getter)
   * - (Setter) Set x cause the measure element to translate.
   * @type {number}
   */
  get x() { return this._x }
  set x(x) {
    this._x = x
    this.el.transform(Snap.matrix().translate(x, 0))
  }

  /**
   * If the measure in the beginning of the system.
   * @type {boolean}
   * @readonly
   */
  get inSystemBegin() { return this._sIndex === 0 }

  /**
   * If the measure in the end of the system.
   * @type {boolean}
   * @readonly
   */
  get inSystemEnd() { return this._sIndex === this.system.measures.length - 1 }

  /**
   * Left bar of the measure in system.
   * @type {musje.Bar}
   * @readonly
   */
  get barLeftInSystem() { return this.parts[0].barLeftInSystem }

  /**
   * Right bar of the measure in system.
   * @type {Bar}
   * @readonly
   */
  get barRightInSystem() { return this.parts[0].barRightInSystem }

  /**
   * Flow the measure.
   */
  flow() {
    this.parts.forEach(cell => {

      /**
       * Cell SVG group element.
       * @memberof CellLayout#
       * @alias el
       * @type {Snap.Element}
       * @readonly
       */
      cell.el = this.el.g().addClass('mus-cell')

      cell.x = this.outerWidthLeft

      // cell.drawBox()
    })
  }

  /**
   * Draw box of the cell.
   * @return {Snap.Element} The box SVG rect element.
   */
  drawBox() {
    this._boxEl = this.el.rect(0, 0, this.width, this.height)
                            .attr({ stroke: 'green', fill: 'none' })
  }

  /**
   * Clear the box SVG element.
   */
  clearBox() {
    this._boxEl.remove()
    this._boxEl = undefined
  }
}

export default TimewiseMeasure
