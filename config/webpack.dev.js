const merge = require("webpack-merge");
const common = require("./webpack.common.js");
const webpack = require("webpack");

// Webpack uses `publicPath` to determine where the app is being served from.
// In development, we always serve from the root. This makes config easier.
const publicPath = "/";

module.exports = merge(common, {
  output: {
    // Add /* filename */ comments to generated require()s in the output.
    pathinfo: true,
    // This does not produce a real file. It's just the virtual path that is
    // served by WebpackDevServer in development. This is the JS bundle
    // containing code from all our entry points, and the Webpack runtime.
    filename: "static/js/bundle.js",
    // There are also additional JS chunk files if you use code splitting.
    chunkFilename: "static/js/[name].chunk.js",
    // This is the URL that app is served from. We use "/" in development.
    publicPath: publicPath
  },
  mode: "development",
  devtool: "inline-source-map",
  devServer: {
    contentBase: "/dist",
    hot: true,
    historyApiFallback: true // this is needed for react router
  },
  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ]
});
