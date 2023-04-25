const CracoLessPlugin = require('craco-less');
const path = require('path');

module.exports = {
	webpack: {
		configure: (config, { env, paths }) => {
			config.module.rules.push({
				test: /\.svg$/,
				use: ['@svgr/webpack'],
			});
			console.log(config.resolve);
			config.resolve.fallback = {
				stream: require.resolve('stream-browserify'),
			};
			// config.alias[] =
			const { alias } = config.resolve;
			config.resolve.alias = {
				...alias,
				'graphql/language': path.resolve(
					__dirname,
					'node_modules/graphql/language/index.mjs'
				),
			};
			return config;
		},
	},
	plugins: [{ plugin: CracoLessPlugin }],
	// devServer: {
	//   proxy: {
	//     "/api": {
	//       target: "",
	//       changeOrigin: true,
	//       pathRewrite: {
	//         "^/api": "/api",
	//       },
	//     },
	//   },
	// },
};
