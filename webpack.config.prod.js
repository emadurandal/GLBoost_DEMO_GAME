const webpack = require("webpack");

module.exports = {
  entry: "./src/main.ts",
  output: {
    filename: "./dist/bundle-prod.js"
  },
  resolve: {
    // Add '.ts' and '.tsx' as resolvable extensions.
    extensions: ["", ".ts", ".js"]
  },
  // Minify
  plugins: [
    new webpack.optimize.UglifyJsPlugin()
  ],
  module: {
    loaders: [
      // All files with a '.ts' or '.tsx' extension will be handled by 'ts-loader'.
      { test: /\.ts?$/, loader: "ts-loader" }
    ]
  }
};