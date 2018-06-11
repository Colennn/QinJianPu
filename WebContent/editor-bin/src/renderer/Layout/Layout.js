import layoutOptions from './layoutOptions'
import Defs from '../defs/Defs'
import SvgLayout from './SvgLayout'
import BodyLayout from './BodyLayout'
import HeaderLayout from './HeaderLayout'
import ContentLayout from './ContentLayout'

/**
 * @class
 * @param svg {string}
 * @param options {Object} Layout options
 */
class Layout {
  constructor(svg, options) {
    this.options = options
    this.svg = svg

    this.svg = new SvgLayout(this)
    this.body = new BodyLayout(this)
    this.header = new HeaderLayout(this)
    this.content = new ContentLayout(this)

    this.defs = new Defs(this)
  }

  /**
   * @param  {Score} score
   */
  flow(score) {
    init(this, score)
    this.content.flow(score.measures)
  }
}

Layout.options = layoutOptions

function init(that, score) {
  const { measures } = score
  measures.forEach((measure, m) => {
    measure = measures[m]
    measure.layout = that
    measure.parts.forEach(cell => {
      cell.layout = that
      cell.flow()
    })
  })
}

export default Layout
