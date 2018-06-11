'use strict';

var path = require('path');

module.exports = {
  entry: './src/addon/codemirror/musje-codemirror.js',
  output: {
    path: path.join(__dirname, '../../../lib/addon/codemirror'),
    filename: 'musje-codemirror.js',
    libraryTarget: 'umd'
  },
  externals: [
    {
      codemirror: {
        root: 'CodeMirror',
        commonjs2: 'codemirror',
        commonjs: 'codemirror',
        amd: 'codemirror'
      }
    }
  ]
};
