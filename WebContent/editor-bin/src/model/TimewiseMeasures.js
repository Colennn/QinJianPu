import TimewiseMeasure from './TimewiseMeasure'

/**
 * Construct timewise score measures.
 * @class
 * @classdesc Timewise score measures.
 * @param score {Score}
 * @augments {Array}
 */
class TimewiseMeasures extends Array {
  constructor(score) {
    super()
    this._score = score
  }

  /**
   * Reference to the parent score.
   * @type {Score}
   * @readonly
   */
  get score() { return this._score }

  /**
   * Make timewise score measures from the partwise parts.
   */
  fromPartwise() {
    this.removeAll()
    this.score.walkCells((cell, m) => {
      if (m === this.length && !this[m]) this.push(new TimewiseMeasure(m, this))
      this[m].parts.push(cell)
    })
  }

  /**
   * Remove all measures.
   */
  removeAll() { this.length = 0 }
}

export default TimewiseMeasures
