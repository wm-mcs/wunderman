const path = require("path");

module.exports = {
  mode: "development",
  context: __dirname,
  entry: {
    home: path.resolve(__dirname, "src", "assets", "js", "index.js")
  },

  output: {
    path: path.resolve(__dirname, "docs"),
    filename: "js/[name].js"
  }
};
