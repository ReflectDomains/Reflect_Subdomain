const CracoLessPlugin = require('craco-less');
const webpack = require('webpack')

module.exports = {
	webpack: {
		configure: (config, { env, paths }) => {
			config.module.rules.push({
				test: /\.svg$/,
				use: ['@svgr/webpack'],
			});
			config.resolve.fallback = {
				...config.resolve.fallback,
				stream: require.resolve('stream-browserify'),
				buffer: require.resolve("buffer/")
			};
			config.resolve.extensions = [...config.resolve.extensions, ".ts", ".js"]

			config.module.rules.push({
				test: /\.m?js/,
				resolve: {
						fullySpecified: false
				}
			})
			console.log()
			
			config.plugins.push(
				new webpack.ProvidePlugin({
					process: 'process/browser'
				})
			)

			config.plugins.push(
				new webpack.ProvidePlugin({
					Buffer: [ 'buffer', 'Buffer' ],
				})
			)
			return config;
		},
	},
	plugins: [
		{ plugin: CracoLessPlugin },
	],
	devServer: {
		proxy: {
			'/api': {
				target: 'http://107.148.33.51:8080',
				changeOrigin: true,
				pathRewrite: {
					'^/api': '/',
				},
			},
		},
	},
};
