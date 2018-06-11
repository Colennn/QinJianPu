import { matrix } from 'snapsvg'

function renderDots(el, x, radius, measureHeight) {
  const cy = measureHeight / 2
  const dy = measureHeight * 0.15

  el.circle(x, cy - dy, radius)
  el.circle(x, cy + dy, radius)
}

function render(bar, measure, lo) {
  const { barlineDotRadius } = lo
  const { height } = measure
  const el = measure.el.g().addClass('mus-barline')
  el.use(bar.def.el).transform(matrix().scale(1, height))

  switch (bar.value) {
    case 'repeat-begin':
      renderDots(el, bar.width - barlineDotRadius, barlineDotRadius, height)
      break
    case 'repeat-end':
      renderDots(el, barlineDotRadius, barlineDotRadius, height)
      break
    case 'repeat-both':
      renderDots(el, bar.width - barlineDotRadius, barlineDotRadius, height)
      renderDots(el, barlineDotRadius, barlineDotRadius, height)
      break
    default:
  }

  return el
}

const translate = (el, x) => { el.transform(matrix().translate(x, 0)) }

// @param m {number} Measure index in measures.
// @param len {number} Length of measures.
export default function renderBar(measure, lo) {
  let bar = measure.barRightInSystem
  let el

  if (bar.def) {
    el = render(bar, measure, lo)

    // Align end in system end.
    if (measure.inSystemEnd) translate(el, measure.width - bar.width)
    // Others align middle.
    else translate(el, measure.width - bar.width / 2)
  }

  // Render right bar and align begin in system begin.
  if (measure.inSystemBegin) {
    bar = measure.barLeftInSystem
    if (bar.def) render(bar, measure, lo)
  }
}
