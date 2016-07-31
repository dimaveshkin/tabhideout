const webpack = require("webpack");
const path = require("path");

function getDefaultConfig(options) {
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
        plugins: [
            new webpack.DefinePlugin({
                'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
            }),
            new webpack.optimize.UglifyJsPlugin()
        ]
    };
}


module.exports = function (options) {
    var resultConfig;

    if(process.env.NODE_ENV === "production") {
        resultConfig = getDefaultConfig(options);
    } else {
        resultConfig = Object.assign({}, getDefaultConfig(options), {
            devtool: "source-map"
        });
    }

    return resultConfig;
};
