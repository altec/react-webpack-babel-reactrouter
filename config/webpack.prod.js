const webpack = require("webpack");
const merge = require("webpack-merge");
const UglifyJSPlugin = require("uglifyjs-webpack-plugin");
const common = require("./webpack.common.js");
const CompressionPlugin = require("compression-webpack-plugin");

const publicPath = "/";

module.exports = merge(common, {
  output: {
    filename: "static/js/[name].[chunkhash].js",
    publicPath: publicPath
  },
  mode: "production",
  devtool: "source-map",
  plugins: [
    new UglifyJSPlugin({ cache: true, parallel: true, sourceMap: true }),
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify("production")
    }),
    new CompressionPlugin({
      asset: "[path].gz[query]",
      test: /\.js$|\.css$|\.html$/,
      cache: true,
      algorithm: "gzip",
      minRatio: 0.8,
      threshold: 10240
    })
  ],
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendors",
          chunks: "all"
        }
      }
    }
  }
});
