const webpack = require("webpack");
const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");
const srcDir = path.join(__dirname, "..", "src");

module.exports = {
	entry: {
		mangacreation: path.join(srcDir, "mangacreation.tsx"),
		background: path.join(srcDir, "background.ts"),
		home: path.join(srcDir, "pages/home.ts"),
		mangalist: path.join(srcDir, "pages/user/mangalist.ts"),
		user: path.join(srcDir, "pages/user/user.ts"),
		404: path.join(srcDir, "pages/404.ts")
	},
	output: {
		path: path.join(__dirname, "../dist/"),
		filename: "[name].js"
	},
	optimization: {
		splitChunks: {
			name: "vendor",
			chunks: "initial"
		}
	},
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				use: "ts-loader",
				exclude: /node_modules/
			}
		]
	},
	resolve: {
		extensions: [".ts", ".tsx", ".js"]
	},
	plugins: [
		new CopyPlugin({
			patterns: [{ from: ".", to: "../dist", context: "public" }],
			options: {}
		})
	]
};
