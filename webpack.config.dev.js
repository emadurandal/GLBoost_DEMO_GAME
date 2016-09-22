module.exports = {
  entry: "./src/main.ts",
  output: {
    filename: "./dist/bundle-dev.js"
  },
  // Enable sourcemaps for debugging webpack's output.
  devtool: "source-map",
  resolve: {
    // Add '.ts' and '.tsx' as resolvable extensions.
    extensions: ["", ".ts", ".js"]
  },
  module: {
    loaders: [
      // All files with a '.ts' or '.tsx' extension will be handled by 'ts-loader'.
      { test: /\.ts?$/, loader: "ts-loader" }
    ]
  }
};