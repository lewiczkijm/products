// webpack.config.js
const path = require("path");
var HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: process.env.NODE_ENV || "development",
  entry: "./src/index.tsx",
  //   plugins: [
  //     new HtmlWebpackPlugin({
  //       title: "Products",
  //     }),
  //   ],
  module: {
    rules: [
      {
        test: /\.(js|ts)x?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.scss/,
        exclude: /node_modules/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      {
        test: /\.(jpg|jpeg|png|gif|svg|ico)$/,
        type: "asset/resource",
      },
    ],
  },
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "bundle.js",
    chunkFilename: "[name].chunk.js",
    assetModuleFilename: "images/[hash][ext][query]",
  },
  devServer: {
    //historyApiFallback: true,
    // hot: true,
    // liveReload: true,
    static: {
      directory: path.resolve(__dirname, "./dist"),
    },
  },
  resolve: {
    extensions: [".tsx", ".ts", ".jsx", ".js"],
  },
  devtool: "source-map",
};
