var path = require('path');

module.exports = {

  context: __dirname + "/src",

  entry: './javascripts/application.js',

  output: {
    path: __dirname + "/dist",
    filename: "bundle.js"
  },

  resolve: {
    extensions: [
      '',
      '.webpack.js',
      '.web.js',
      '.js',
      '.json'
    ],

    modulesDirectories: [
      'web_modules',
      'node_modules',
      'src/data',
      'src/javascripts'
    ]
  },

  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'jsx-loader?harmony=true'
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      }
    ]
  }

}
