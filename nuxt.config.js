const environment = process.env.NODE_ENV || "development";
const envSet = require(`./env.${environment}.js`);
const webpack = require("webpack");

export default {
  env: envSet,

  mode: "spa",
  /*
   ** Headers of the page
   */
  head: {
    title: process.env.npm_package_name || "Hello Nuxt.js!!",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content: process.env.npm_package_description || ""
      }
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: "#fff" },
  /*
   ** Global CSS
   */
  css: [],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [],
  /*
   ** Nuxt.js modules
   */
  modules: ["@nuxtjs/dotenv", "@nuxtjs/vuetify"],
  // router: {
  //   middleware: ["authenticated"]
  // },
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {},
    plugins: [
      new webpack.ProvidePlugin({
        _: "lodash"
      })
    ]
  },
  vuetify: {
    // Vuetify の設定はここに書く
    theme: {
      primary: "#3f51b5",
      secondary: "#b0bec5",
      accent: "#8c9eff",
      error: "#b71c1c"
    }
  }
};

module.exports = {};
