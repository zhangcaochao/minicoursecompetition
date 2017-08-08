var path = require('path');
var webpack = require('webpack');
var HtmlwebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

var ROOT_PATH = path.resolve(__dirname);
var BUILD_PATH = path.resolve(ROOT_PATH, 'build');
var APP_PATH = path.resolve(ROOT_PATH, 'app');
module.exports = {
	entry: {
		app: path.resolve(APP_PATH, 'app.jsx'),
		luru: path.resolve(APP_PATH, 'luru.jsx'),
	},
	output: {
		path: BUILD_PATH,
		filename: '[name]bundle.js'
	},

	//enable dev source map
	devtool: 'eval-source-map',
	//enable dev server
	devServer: {
		historyApiFallback: true,
		hot: true,
		inline: true,
		progress: true,
		port: '8080',
		proxy: {
			'/wx/api.php': {
				target: 'http://www.plaso.cn/wx/api.php',
				changeOrigin: true,
				secure: false
			},
			'*': {
				target: 'http://www.plaso.cn/wkds/api',//正式环境http://www.plaso.cn/wkds/api测试环境：http://devapp.plaso.cn/wkds/
				changeOrigin: true,
				secure: false
			}
		}
	},
	resolve: {
		extensions: ['', '.js', '.jsx'],
		root: APP_PATH
	},
	module: {
		loaders: [
			{
				test: /\.(js|jsx)?$/,
				exclude: 'node_modules',
				loaders: ['babel'],
				include: APP_PATH
			},
			{
				test: /\.(png|jpg|otf)$/,
				loader: 'file-loader?name=images/[name]-[hash:base64:5].[ext]',
			},
			{
				test: /\.(css|less)$/,
				loader: ExtractTextPlugin.extract(
					'style-loader',
					'css-loader?modules&localIdentName=[local]--[hash:base64:5]&sourceMap!less-loader?sourceMap'
				)
			}
		]
	},
	plugins: [
		new HtmlwebpackPlugin({
			title: '伯索杯·微课大赛投票评选',
			filename: 'index.html',
			template: path.resolve(APP_PATH, 'index.ejs'),
			chunks: ['app']
		}),
		new HtmlwebpackPlugin({
			title: '微课大赛录入',
			filename: 'luru.html',
			template: path.resolve(APP_PATH, 'luru.ejs'),
			chunks: ['luru']
		}),
		new ExtractTextPlugin("styles.css")
	]
}
