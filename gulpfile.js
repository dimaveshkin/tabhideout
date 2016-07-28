var gulp = require("gulp");
var webpack = require("webpack-stream");
var path = require("path");
var dirs = ["popup", "bg"];

gulp.task("build", function () {
    dirs.forEach(function (dir) {
        gulp.src(path.resolve(__dirname, dir, "index.jsx"))
            .pipe(webpack( require(path.resolve(__dirname, dir, "webpack.config.js"))))
            .pipe(gulp.dest(path.resolve(__dirname, "build")));
    });
});

gulp.task("default", ["build"]);