import { matrix } from 'snapsvg'

/**
 * @class
 * @param {number} index
 * @param {Layout} layout
 */
class SystemLayout {
  constructor(layout, index) {
    this._index = index
    this._layout = layout
    this._el = layout.content.el.g().addClass('mus-system')
  }

  get el() { return this._el }

  /**
   * Measures in a system.
   * @type {Array.<TimewiseMeasure>}
   * @readonly
   */
  get measures() { return this._measures || (this._measures = []) }

  /**
   * Previous system.
   * @type {SystemLayout}
   */
  get prev() { return this._layout.content.systems[this._index - 1] }

  /**
   * Next system.
   * @type {SystemLayout}
   */
  get next() { return this._layout.content.systems[this._index + 1] }

  get y() { return this._y }
  set y(y) {
    this._y = y
    this.el.transform(matrix().translate(0, y))
  }

  get width() { return this._layout.content.width }

  get minWidth() {
    let min = 0
    this.measures.forEach(measure => { min += measure.minWidth })
    return min
  }

  get content() { return this._layout.content }

  get systems() { return this.content.systems }

  flow() {
    let minHeight = 0
    let x = 0

    tuneMeasuresWidths(this)

    this.measures.forEach((measure, m) => {
      measure.system = this
      measure._sIndex = m
      measure.flow()
      measure.x = x
      x += measure.width
      minHeight = Math.max(minHeight, measure.minHeight)
    })

    const { prev } = this
    this.y = prev ? prev.y + prev.height + this._layout.options.systemSep : 0
    this.height = minHeight
  }
}

function tuneMeasuresWidths(that) {
  if (!isTunable(that)) return

  var pairs = getPairs(that.measures)
  var length = pairs.length
  var widthLeft = that.width
  var itemLeft = length
  var i = 0    // i + itemLeft === length
  var width

  while (i < length) {
    if (widthLeft >= pairs[i].width * itemLeft) {
      width = widthLeft / itemLeft
      do {
        pairs[i].measure.width = width
        i++
      } while (i < length)
      break
    } else {
      width = pairs[i].width
      pairs[i].measure.width = width
      widthLeft -= width
      i++
      itemLeft--
    }
  }
}

function isTunable(that) {
  const ctWidth = that.content.width
  const s = that._index
  const ssLen = that.systems.length
  return ssLen > 2 ||
     (ssLen === 1 && that.minWidth > ctWidth * 0.7) ||
     (ssLen === 2 && (s === 0 ||
                     (s === 1 && that.minWidth > ctWidth * 0.4)))
}

const descendingSort = (a, b) => b.width - a.width

const getPairs = measures => measures.map(measure => ({
  width: measure.minWidth,
  measure: measure
})).sort(descendingSort)

export default SystemLayout
