import { makeToJSON } from '../util'
import Cell from './Cell'

/**
 * @class
 * @param part {Object}
 * @param index {number} - Index of this part in the parts.
 * @param parts {PartwiseParts}
 */
class PartwisePart {
  constructor(index, parts) {
    this._index = index
    this._parts = parts
  }

  // head: { $ref: '#/objects/PartHead' },

  /**
   * Reference to the parent parts instance.
   * @type {PartwiseParts}
   * @readonly
   */
  get parts() { return this._parts }

  /**
   * Measure in a partwise part is cells.
   * @type {Array.<Cell>}
   */
  get measures() { return this._measures || (this._measures = []) }
  set measures(measures) {
    const p = this._index
    const { score } = this.parts
    const mea = this._measures = []
    measures.forEach((cell, m) => { mea.push(new Cell(cell, m, p, score)) })
  }

  /**
   * Convert a partwise part to sting.
   * @return {string} Musje partwise part source code.
   */
  toString() {
    return this.measures.map(cell => cell).join(' ')
  }

  /**
   * Custom toJSON method.
   * @return {Object}
   */
  toJSON = makeToJSON({
    measures: undefined
  })
}

export default PartwisePart
