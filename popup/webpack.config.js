const webpack = require("webpack");
const path = require("path");

module.exports = {
    context: __dirname,
    output: {
        path: path.resolve(__dirname, "../build"),
        filename: "popup.js"
    },
    module: {
        loaders: [
            {
                test: /\.jsx$/,
                loader: "babel-loader"
            }
        ]
    },
    resolve: {
        extensions: ["", ".js", ".jsx"]
    },
    devtool: 'source-map'
};