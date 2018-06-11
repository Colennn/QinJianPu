import { matrix } from 'snapsvg'

/**
 * Body
 * @class
 * @param {Layout} layout
 */
class BodyLayout {
  constructor(layout) {
    this._layout = layout
    const { svg, options } = layout
    const { marginTop, marginRight, marginLeft, width } = options
    this._el = svg.el.g()
        .transform(matrix().translate(marginLeft, marginTop))
        .addClass('mus-body')
    this.width = width - marginLeft - marginRight
  }

  get el() { return this._el }

  /**
   * Width of the body.
   * - (Getter) Get the body width.
   * - (Setter) Set the body width and this also induces setting the
   * header and content width if one exists.
   * @type {number}
   */
  get width() { return this._w }
  set width(w) {
    this._w = w
    const layout = this._layout
    if (layout.header) layout.header.width = w
    if (layout.content) layout.content.width = w
  }

  /**
   * Height of the body.
   * - (Getter) Get the body height.
   * - (Setter) Set the body height and this will also cause the height of svg to vary.
   * @type {number}
   */
  get height() { return this._h }
  set height(h) {
    const layout = this._layout
    const { marginTop, marginBottom } = layout.options
    layout.svg.height = h + marginTop + marginBottom
    this._h = h
  }
}

export default BodyLayout
