const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
	mode: "development",
	context: __dirname,
	entry: {
		home: path.resolve(__dirname, "src", "assets", "js", "index.js")
	},

	output: {
		path: path.resolve(__dirname, "docs"),
		filename: "js/[name].js"
	},
	module: {
		rules: [
			{
				test: /\.css$/,
				use: [{ loader: MiniCssExtractPlugin.loader }, "css-loader"]
			}
		]
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: path.resolve(__dirname, "src/index.html")
		}),
		new MiniCssExtractPlugin({
			filename: "css/[name].css"
		})
	]
};
