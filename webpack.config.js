const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  context: __dirname,
  entry: {
    home: path.resolve(__dirname, "src", "assets", "js", "index.js")
  },

  output: {
    path: path.resolve(__dirname, "docs"),
    filename: "js/[name].js",

    chunkFilename: "js/[id].[chunkhash].js",
    publicPath: ""
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: "babel-loader",
        exclude: /node_modules/
      },

      {
        test: /\.css$/,
        use: [
          { loader: MiniCssExtractPlugin.loader },
          "css-loader",
          "sass-loader"
        ]
      },
      {
        test: /\.scss$/,

        use: [
          { loader: MiniCssExtractPlugin.loader },
          "css-loader",
          "sass-loader"
        ]
      },

      {
        test: /\.(gif|png|jpe?g)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[path][name].[ext]",

              publicPath: "../",
              useRelativePaths: true
            }
          }
        ]
      },
      {
        test: /\.(ttf|eot|svg|gif|woff|woff2)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: [
          {
            loader: "url-loader"
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "src/index.html")
    }),
    new MiniCssExtractPlugin({
      filename: "css/[contenthash].css"
    })
  ]
};
