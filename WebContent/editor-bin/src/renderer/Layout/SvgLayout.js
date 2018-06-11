import Snap from 'snapsvg'

/**
 * @class
 * @param layout {Layout}
 */
class SvgLayout {
  constructor(layout) {
    this._layout = layout
    const { fontFamily, width } = layout.options
    this._el = Snap(layout.svg)
      .attr({ fontFamily })
      .addClass('musje')
    this.el.clear()
    this.width = width
  }

  get el() { return this._el }

  /**
   * Width of the svg.
   * @type {number}
   */
  get width() { return this._w }
  set width(w) {
    this._w = w
    this.el.attr('width', w)
    const { body } = this._layout
    if (body) body.width = w
  }

  /**
   * Height of the svg.
   * @type {number}
   */
  get height() { return this._h }
  set height(h) {
    this._h = h
    this.el.attr('height', h)
  }
}

export default SvgLayout
