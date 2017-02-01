module.exports = {
  entry: {
    "main.bundle.js": "./src/index.js",
    "test.bundle.js": "mocha!./test/index.js"
  },
  output: {
    path: 'dist',
    filename: "[name]"
  },
  module: {
    loaders: [
      { test: /\.js$/, exclude: '/node_modules/', loader: 'babel' },
      { test: /\.css$/, loader: "style!css" }
    ]
  },
  resolve: {
    extensions: ['', '.js', '.json', '.css']
  }
}
