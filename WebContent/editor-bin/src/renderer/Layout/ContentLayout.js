import { matrix } from 'snapsvg'
import SystemLayout from './SystemLayout'

/**
 * @class
 * @param {Object} layout - Reference to the parent layout instance.
 */
class ContentLayout {
  constructor(layout) {
    this.layout = layout
    this.el = layout.body.el.g().addClass('mus-content')
    this.width = layout.body.width
  }

  get y() { return this._y }
  set y(y) {
    this._y = y
    this.el.transform(matrix().translate(0, y))
    resizeBody(this)
  }

  get width() { return this._w }
  set width(w) { this._w = w }

  get height() {
    const last = this.systems[this.systems.length - 1]
    return last ? last.y + last.height : 0
  }

  /**
   * @param scoreMeasure {musje.TimewiseMeasures} The timewise score measure.
   */
  flow(scoreMeasures) {
    makeSystems(this, scoreMeasures)
    balanceSystems(this)
    this.systems.forEach(system => { system.flow() })
  }
}

function resizeBody(that) {
  const layout = that.layout
  const hHeight = layout.header.height

  layout.body.height = that.height +
        (hHeight ? hHeight + layout.options.headerSep : 0)
}

/**
 * Divide measures in timewise score into the systems.
 * @param scoreMeasure {musje.TimewiseMeasures} The timewise score measure.
 */
function makeSystems(that, scoreMeasures) {
  const { layout } = that
  const { measurePaddingRight, measurePaddingLeft } = layout.options
  const measurePadding = measurePaddingLeft + measurePaddingRight
  const systems = that.systems = []
  let system = new SystemLayout(layout, 0)
  systems.push(system)

  scoreMeasures.forEach(measure => {
    const minWidth = measure.minWidth + measurePadding +
                  (measure.barLeftInSystem.width +
                   measure.barRightInSystem.width) / 2

    // Continue put this measure in the system.
    if (system.minWidth + minWidth < that.width) {
      system.measures.push(measure)

    // New system
    } else {
      system = new SystemLayout(layout, systems.length)
      systems.push(system)
      system.measures.push(measure)
    }
  })
}

function getMaxLengthSystem(that) {
  let maxLength = 0
  let system

  that.systems.forEach(system => {
    maxLength = Math.max(maxLength, system.measures.length)
  })

  // Find the first max length system backward.
  for(let i = that.systems.length - 1; i >= 0; i--) {
    system = that.systems[i]
    if (system.measures.length === maxLength) return system
  }
}

function isNotBalancable(that) {
  const { systems, width } = that
  const { length } = systems
  return length === 1 ||       // only 1 system
    (length === 2 && systems[1].minWidth < width * 0.4) // 1 2/5 systems
}

function balanceSystems(that) {
  if (isNotBalancable(that)) return

  const { systems } = that
  const last = systems[systems.length - 1]
  let system = getMaxLengthSystem(that)
  let next, prev

  // Move measures down to balance the last system.
  while (last.measures.length < system.measures.length - 1) {

    // Move a measure tail-to-head downward to the last measure.
    while (true) {
      next = system.next
      if (!next) break
      next.measures.unshift(system.measures.pop())
      system = next
    }
    system = getMaxLengthSystem(that)
  }

  // Move back measures if the system exceeds the content width.
  system = last
  while (system) {
    prev = system.prev
    while (system.minWidth > that.width) {
      prev.measures.push(system.measures.shift())
    }
    system = prev
  }
}

export default ContentLayout
