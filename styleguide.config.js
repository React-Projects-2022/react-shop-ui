const path = require("path");

module.exports = {
  webpackConfig: {
    module: {
      rules: [
        // Babel loader will use your project’s babel.config.js
        {
          test: /\.js?$/,
          exclude: /node_modules/,
          loader: "babel-loader",
        },
        // Other loaders that are needed for your components
        {
          test: /\.css$/,
          use: ["style-loader", "css-loader"],
        },
      ],
    },
  },
  styleguideDir: "docs",
  skipComponentsWithoutExample: true,
  theme: {
    maxWidth: 1400,
  },
  title: "React Shop UI",
  sections: [
    {
      name: "Button",
      components: "src/lib/components/button/index.js",
    },
  ],
};
