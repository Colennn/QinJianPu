import { format } from 'snapsvg'

function getCurvePath(x1, y1, x2, y2) {
  const dx = x2 - x1
  const dy = y2 - y1
  const c1x = 0 //-0.1 * dx
  const c1y = 0 //-0.1 * dy
  const c2x = dx //1.1 * dx
  const c2y = dy //1.1 * dy

  return format('M{x1},{y1}c{c1x},{c1y} {c2x},{c2y} {dx},{dy}c{c3x},{c3y} {c4x},{c4y} {negDx},{negDy}', {
    x1,
    y1,
    c1x,
    c1y: c1y - 8,
    c2x,
    c2y: c2y - 8,
    dx,
    dy,
    c3x: -c1x,
    c3y: -c1y - 10,
    c4x: -c2x,
    c4y: -c2y - 10,
    negDx: -dx,
    negDy: -dy
  })
}

function renderEndCurve(note, error) {
  const { stepCx: x1, stepTop: y1 } = note.def.pitchDef
  const x2 = - note.systemX - 3
  const el = note.el.path(getCurvePath(x1, y1, x2, y1 - 3))

  if (error) el.addClass('mus-error')
  return el
}

function renderBeginCurve(note, error) {
  const { stepCx: x1, stepTop: y1 } = note.def.pitchDef
  const x2 = note.system.width - note.systemX + 3
  const el = note.el.path(getCurvePath(x1, y1, x2, y1 - 3))

  if (error) el.addClass('mus-error')
  return el
}

function renderCompleteCurve(note1, note2, error) {
  const { stepCx: x1, stepTop: y1 } = note1.def.pitchDef
  const { stepCx: x2, stepTop: y2 } = note2.def.pitchDef
  const noteDx = note2.systemX - note1.systemX
  const el = note1.el.path(getCurvePath(x1, y1, noteDx + x2, y2))

  if (error) el.addClass('mus-error')
  return el
}

export default function renderCurve(type, note) {
  if (note[type].end) {
    const prev = note[type].prevParent
    const { prevHasError } = note[type]

    if (!prev || prev.system !== note.system) renderEndCurve(note, prevHasError)
    else if (prevHasError) renderCompleteCurve(note, prev, prevHasError)
  }

  if (note[type].begin) {
    const next = note[type].nextParent
    const { nextHasError } = note[type]

    if (!next || next.system !== note.system) renderBeginCurve(note, nextHasError)
    else renderCompleteCurve(note, next, nextHasError)
  }
}
