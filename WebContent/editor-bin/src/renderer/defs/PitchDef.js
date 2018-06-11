import Snap from 'snapsvg'
import { extend, near } from '../../util'

/**
 * SVG definition for pitch.
 * The `PitchDef` is defined by properties: a s o u
 * accidental step octave underbar
 * @class
 * @param id {string}     [description]
 * @param pitch {Pitch}   [description]
 * @param layout {Layout} [description]
 */
function PitchDef(id, pitch, underbar, defs) {
  const layout = this._layout = defs._layout
  const { accidental, octave } = pitch
  const scale = getScale(accidental, octave, underbar)
  const el = this.el = layout.svg.el.g().attr({
    id,
    stroke: 'black',
    strokeWidth: 2 - (scale.x + scale.y)
  })
  let matrix, sbbox, pbbox

  this._defs = defs
  addAccidental(this, accidental)
  addStep(this, pitch.step)
  addOctave(this, octave)

  matrix = getMatrix(this, scale, octave, underbar)
  el.transform(matrix)

  sbbox = this._sbbox
  sbbox = getBBoxAfterTransform(this.el, sbbox, matrix)

  pbbox = el.getBBox()
  el.toDefs()

  extend(this, {
    scale,
    matrix,
    width: pbbox.width,
    height: -pbbox.y,
    stepCx: sbbox.cx,
    stepY: sbbox.y,
    stepCy: sbbox.cy,
    stepY2: sbbox.y2,
    stepTop: octave > 0 ? pbbox.y : sbbox.y + layout.options.fontSize * 0.2
  })
}

function addAccidental(that, accidental) {
  if (!accidental) {
    that._accidentalX2 = 0
    return
  }
  const accDef = that._defs.getAccidental(accidental)
  that.el.use(accDef.el).attr('y', -that._layout.options.accidentalShift)
  that._accidentalX2 = accDef.width
}

function addStep(that, step) {
  that._sbbox = that.el
    .text(that._accidentalX2, 0, '' + step)
    .attr('font-size', that._layout.options.fontSize)
    .getBBox()
}

function addOctave(that, octave) {
  if (!octave) return

  const { octaveRadius, octaveOffset, octaveSep } = that._layout.options
  const octaveEl = that.el.g()

  if (octave > 0) {
    for (let i = 0; i < octave; i++) {
      octaveEl.circle(
        that._sbbox.cx,
        that._sbbox.y + octaveOffset - octaveSep * i,
        octaveRadius
      )
    }
  } else {
    for (let i = 0; i > octave; i--) {
      octaveEl.circle(
        that._sbbox.cx,
        that._sbbox.y2 - octaveOffset - octaveSep * i,
        octaveRadius
      )
    }
  }
  that.el.add(octaveEl)
}

// Transform the pitch to be in a good baseline position and
// scale it to be more square.
function getMatrix(that, scale, octave, underbar) {
  const { stepBaselineShift, underbarSep } = that._layout.options
  const pbbox = that.el.getBBox()
  const dy = (octave >= 0 && underbar === 0 ? -stepBaselineShift : 0) -
                          underbar * underbarSep
  return Snap.matrix()
    .translate(-pbbox.x, dy)
    .scale(scale.x, scale.y)
    .translate(0, near(pbbox.y2, that._sbbox.y2) ? 0 : -pbbox.y2)
}

function getBBoxAfterTransform(container, bbox, matrix) {
  const rect = container.rect(bbox.x, bbox.y, bbox.width, bbox.height)
  const g = container.g(rect)
  rect.transform(matrix)
  bbox = g.getBBox()
  g.remove()
  return bbox
}

function getScale(hasAccidental, octave, underbar) {
  const absOctave = Math.abs(octave)
  return {
    x: Math.pow(0.97, absOctave + underbar + (hasAccidental ? 2 : 0)),
    y: Math.pow(0.95, absOctave + underbar + (hasAccidental ? 1 : 0))
  }
}

export default PitchDef
