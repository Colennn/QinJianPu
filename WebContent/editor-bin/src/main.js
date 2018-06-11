import parser from './parser/parser.jison'
import Score from './model/Score'
import Renderer from './renderer/Renderer/Renderer'
import { defineProperties } from './util'
import PlayerMixin from './player/PlayerMixin'

/**
 * Render the score in jianpu (numbered musical notation).
 * @member
 * @function
 * @param {string} svg
 * @param {Object} lo - Layout options.
 */
Score.prototype.render = function (svg, lo) {
  new Renderer(svg, lo).render(this)
}

defineProperties(Score.prototype, PlayerMixin)

/**
 * Parse source musje string to be a Score instance.
 * @param {string} input - Input of the musje source code.
 * @return {Score} - A `Score` instance.
 */
export const parse = (input) => {
  return parser.parse(input)
  // var plainScore = parser.parse(input);
  // return new Score(plainScore);
}

export { Score }
