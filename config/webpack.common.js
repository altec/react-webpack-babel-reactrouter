const CleanWebpackPlugin = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const WorkboxPlugin = require("workbox-webpack-plugin");
const path = require("path");

module.exports = {
  entry: {
    app: path.resolve(__dirname, "../app/index.js")
  },
  plugins: [
    // Always delete dist folder before build
    new CleanWebpackPlugin(["dist"], { root: path.resolve(__dirname, "../") }),
    // Creat index.html from template
    new HtmlWebpackPlugin({
      title: "Vanila React",
      template: "./app/index.html",
      inject: "body"
    }),
    // Create service worker
    new WorkboxPlugin.GenerateSW({
      // these options encourage the ServiceWorkers to get in there fast
      // and not allow any straggling "old" SWs to hang around
      clientsClaim: true,
      skipWaiting: true
    })
  ],
  module: {
    rules: [
      {
        // lint the code before babel!
        enforce: "pre",
        test: /\.js$/,
        exclude: /(node_modules|dist)/,
        loader: "eslint-loader",
        options: {
          failOnWarning: true,
          cache: true
        }
      },
      {
        test: /\.js$/,
        exclude: /(node_modules|dist)/,
        use: {
          loader: "babel-loader?cacheDirectory"
        }
      },
      {
        test: /\.css$/,
        exclude: /(node_modules|dist)/,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        exclude: /(node_modules|dist)/,
        use: ["file-loader"]
      },
      {
        test: /\.(scss|sass)/,
        use: [
          {
            loader: "style-loader" // creates style nodes from JS strings
          },
          {
            loader: "css-loader" // translates CSS into CommonJS
          },
          {
            loader: "sass-loader" // compiles Sass to CSS
          }
        ]
      }
    ]
  }
};
