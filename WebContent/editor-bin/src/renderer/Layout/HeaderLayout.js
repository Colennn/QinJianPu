/**
 * Header layout.
 * @param {Layout} layout
 */
class HeaderLayout {
  constructor(layout) {
    this._layout = layout
    this.el = layout.body.el.g().addClass('mus-header')
    this.width = layout.body.width
  }

  /**
   * Width of the header.
   * @type {number}
   */
  get width() { return this._w }
  set width(w) { this._w = w }

  /**
   * Height of the header.
   * @type {number}
   */
  get height() { return this._h }
  set height(h) {
    this._h = h
    const { content, options } = this._layout
    content.y = h ? h + options.headerSep : 0
  }
}

export default HeaderLayout
