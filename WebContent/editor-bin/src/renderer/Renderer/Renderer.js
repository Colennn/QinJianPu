import { matrix } from 'snapsvg'
import { extend } from '../../util'
import Layout from '../Layout/Layout'
import renderBar from './renderBar'
import renderDuration from './renderDuration'
import renderCurve from './renderCurve'

class Renderer {
  constructor(svg, lo) {
    this._lo = extend(Layout.options, lo)
    this.layout = new Layout(svg, this._lo)
  }

  render(score) {
    this._score = score
    this.layout.flow(score)
    this.renderHeader()
    this.renderContent()
  }

  renderHeader() {
    const lo = this._lo
    const { header } = this.layout
    const { el, width } = header

    el.text(width / 2, lo.titleFontSize, this._score.head.title).attr({
      fontSize: lo.titleFontSize,
      fontWeight: lo.titleFontWeight,
      textAnchor: 'middle'
    })

    el.text(width, lo.titleFontSize * 1.5, this._score.head.composer).attr({
      fontSize: lo.composerFontSize,
      fontWeight: lo.composerFontWeight,
      textAnchor: 'end'
    })

    header.height = el.getBBox().height
  }

  renderContent() {
    const lo = this._lo

    this.layout.content.systems.forEach(system => {
      const { measures } = system
      measures.forEach(measure => {
        renderBar(measure, lo)
        measure.parts.forEach(cell => { renderCell(cell, lo) })
      })
    })
  }
}

function renderNote(note, cell, lo) {
  note.el = cell.el.g().transform(matrix().translate(note.x, note.y))
  note.el.use(note.def.pitchDef.el)
  renderDuration(note, lo)
}

function renderCell(cell, lo) {
  cell.data.forEach(data => {
    switch (data.$type) {
      case 'rest':
        renderNote(data, cell, lo)
        break
      case 'note':
        renderNote(data, cell, lo)
        renderCurve('tie', data)
        renderCurve('slur', data)
        break
      case 'time':
        data.el = cell.el.use(data.def.el).attr({ x: data.x, y: data.y })
        break
      default:
    }
  })
}

export default Renderer
