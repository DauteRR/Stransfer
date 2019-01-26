module.exports = {
  staticFileGlobs: [
    "build/static/css/**.css",
    "build/static/js/**.js",
    "build/static/media/**",
    "build/favicon.ico",
    "build/index.html"
  ],
  swFilePath: "./build/service-worker.js",
  stripPrefix: "build/",
  runtimeCaching: [
    {
      urlPattern: /[/]models/,
      handler: "cacheFirst"
    },
    {
      urlPattern: /[/]img[/]styles/,
      handler: "cacheFirst"
    }
  ]
};
