import Snap from 'snapsvg'
import svgPaths from '../svgPaths'

/**
 * SVG definition for accidental.
 * @class
 * @param {string} id         [description]
 * @param {string} accidental [description]
 * @param {Layout} layout     [description]
 */
function AccidentalDef(id, accidental, layout) {
  const { accidentalShift, accidentalFontSize } = layout.options
  const el = this.el = layout.svg.el.g().attr('id', id)
  const accKey = accidental.replace(/bb/, 'b') // double flat to be synthesized
  const pathData = svgPaths[accKey]
  const ratio = svgPaths.ACCIDENTAL_RATIOS[accKey]
  const shift = svgPaths.ACCIDENTAL_SHIFTS[accKey]
  const path = el.path(pathData)
  let bb = el.getBBox()

  path.transform(Snap.matrix()
    .translate(0.1 * accidentalShift, -accidentalShift)
    .scale(ratio * accidentalFontSize)
    .translate(-bb.x, shift - bb.y2)
  )

  // Combine two flat to be double flat.
  if (accidental === 'bb') {
    el.use(path).attr('x', accidentalFontSize * 0.24)
    el.transform('scale(0.9,1)')
  }

  bb = el.getBBox()
  this.width = bb.width * 1.2

  el.toDefs()
}

export default AccidentalDef
