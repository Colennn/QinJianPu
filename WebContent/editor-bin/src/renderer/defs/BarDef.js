/**
 * SVG definition for barline.
 * @class
 * @param {string} id     [description]
 * @param {Bar} bar    [description]
 * @param {Layout} layout [description]
 */
function BarDef(id, bar, layout) {
  const {
    thinBarlineWidth, thickBarlineWidth,
    barlineSep, barlineDotSep, barlineDotRadius
  } = layout.options
  let x = 0
  let lineWidth
  this.el = layout.svg.el.g().attr('id', id).toDefs()

  switch (bar.value) {
    case 'single':
      lineWidth = thinBarlineWidth
      addBarline(this, x, lineWidth)
      x += lineWidth
      break
    case 'double':
      lineWidth = thinBarlineWidth
      addBarline(this, x, lineWidth)
      x += lineWidth + barlineSep
      addBarline(this, x, lineWidth)
      x += lineWidth
      break
    case 'end':
      lineWidth = thinBarlineWidth
      addBarline(this, x, lineWidth)
      x += lineWidth + barlineSep
      lineWidth = thickBarlineWidth
      addBarline(this, x, lineWidth)
      x += lineWidth
      break
    case 'repeat-begin':
      lineWidth = thickBarlineWidth
      addBarline(this, x, lineWidth)
      x += lineWidth + barlineSep
      lineWidth = thinBarlineWidth
      addBarline(this, x, lineWidth)
      x += lineWidth + barlineDotSep + barlineDotRadius
      break
    case 'repeat-end':
      x = barlineDotSep + barlineDotRadius
      lineWidth = thinBarlineWidth
      addBarline(this, x, lineWidth)
      x += lineWidth + barlineSep
      lineWidth = thickBarlineWidth
      addBarline(this, x, lineWidth)
      x += lineWidth
      break
    case 'repeat-both':
      x = barlineDotSep + barlineDotRadius
      lineWidth = thinBarlineWidth
      addBarline(this, x, lineWidth)
      x += lineWidth + barlineSep
      lineWidth = thickBarlineWidth
      addBarline(this, x, lineWidth)
      x += lineWidth + barlineSep
      lineWidth = thinBarlineWidth
      addBarline(this, x, lineWidth)
      x += lineWidth + barlineDotSep + barlineDotRadius
      break
    default:
  }
  this.width = x
}

function addBarline(that, x, width) { that.el.rect(x, 0, width, 1) }

export default BarDef
