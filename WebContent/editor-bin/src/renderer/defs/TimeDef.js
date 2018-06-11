import Snap from 'snapsvg'

/**
 * SVG definition for time signature.
 * @class
 * @param {string} id     [description]
 * @param {Time} time   [description]
 * @param {Layout} layout [description]
 */
function TimeDef(id, time, layout) {
  const { timeFontSize: fontSize, timeFontWeight: fontWeight } = layout.options
  const lineExtend = fontSize * 0.1
  const el = this.el = layout.svg.el.g().attr({
    id,
    fontSize,
    fontWeight,
    textAnchor: 'middle'
  })
  const lineY = -0.85 * fontSize
  let bb

  el.text(0, -1 * fontSize, time.beats)
  el.text(0, 0, time.beatType)   // baseline y = 0
  bb = el.getBBox()
  el.line(bb.x - lineExtend, lineY, bb.x2 + lineExtend, lineY)
  el.transform(Snap.matrix().scale(1, 0.8).translate(lineExtend - bb.x, 0))

  bb = el.getBBox()
  el.toDefs()

  this.width = bb.width
  this.height = -bb.y
}

export default TimeDef
