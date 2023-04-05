const CracoLessPlugin = require("craco-less");

module.exports = {
  webpack: {
    configure: (config, { env, paths }) => {
      config.module.rules.push({
        test: /\.svg$/,
        use: ["@svgr/webpack"],
      });
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
