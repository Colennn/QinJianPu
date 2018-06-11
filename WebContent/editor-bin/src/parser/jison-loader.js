/* Webpack loader for jison parser generator */

const jisonCli = require('jison/lib/cli')

module.exports = function(input) {
  this.cacheable()

  const grammar = jisonCli.processGrammars(input)
  const options = { 'module-type': 'js' }
  const parserString = jisonCli.generateParserString(options, grammar)

  return parserString + '\nmodule.exports = parser'
}
