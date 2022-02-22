module.exports = {
  css: {
    loaderOptions: {
      sass: {
        prependData: `
          @import "@/assets/scss/colors.scss";
        `,
      },
    },
  },
  pluginOptions: {
    quasar: {
      importStrategy: "kebab",
      rtlSupport: false,
    },
  },
  publicPath: process.env.NODE_ENV === "production" ? "/thist" : "/",
};
