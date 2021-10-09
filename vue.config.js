const path = require("path");
module.exports = {
  runtimeCompiler: true,
  css: {
    modules: true
  },
  configureWebpack: {
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
        "@components": path.resolve(__dirname, "./src/components"),
        "@services": path.resolve(__dirname, "./src/services"),
      },
      extensions: ['.js', '.vue', '.json']
    },
    plugins: [
      require('unplugin-element-plus/webpack')({
        // options
      }),
    ],
  },

};