const path = require('path')

module.exports = {
  entry: './src/main.js',
  output: {
    path: path.join(__dirname, 'lib'),
    filename: 'musje.js',
    libraryTarget: 'umd',
    library: 'musje'
  },
  externals: [
    'MIDI',
    {
      snapsvg: {
        root: 'Snap',
        commonjs2: 'snapsvg',
        commonjs: 'snapsvg',
        amd: 'snapsvg'
      }
    }
  ],
  module: {
    loaders: [
      { test: /\.js$/, loader: 'babel' },
      { test: /\.jison$/, loader: './parser/jison-loader' }
    ]
  },
  plugins: []
}
