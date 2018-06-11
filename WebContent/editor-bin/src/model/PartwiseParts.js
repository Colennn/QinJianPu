import PartwisePart from './PartwisePart'

class PartwiseParts extends Array {
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
   * Add parts.
   * @param {Object}
   */
  addParts(parts) { parts.forEach(part => { this.append(part) }) }

  /**
   * Append a partwise part.
   * @param {Object} part - Plain partwise part object.
   * @override
   */
  append(part) {
    const index = this.length
    const musjePart = new PartwisePart(index, this)
    this.push(musjePart)
    musjePart.measures = part.measures
  }

  /**
   * Remove all parts.
   */
  removeAll() { this.length = 0 }
}

export default PartwiseParts
