const webpack = require("webpack");
const path = require("path");

module.exports = function (options) {
    return {
        context: __dirname,
        output: {
            path: path.resolve(__dirname, "../build"),
            filename: options.output.filename
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
        // devtool: 'source-map',
        plugins: [
            new webpack.optimize.UglifyJsPlugin()
        ]
    };
};