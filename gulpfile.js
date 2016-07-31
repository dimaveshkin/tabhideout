var gulp = require("gulp");
var webpack = require("webpack-stream");
var path = require("path");
var del = require("del");
var dirs = ["popup", "bg", "content"];

gulp.task("dev", function () {
    process.env.NODE_ENV = 'development';
    execBuild();
});

gulp.task("prod", function () {
    process.env.NODE_ENV = 'production';
    execBuild(true);
});

gulp.task("default", ["prod"]);

function execBuild(isProd) {
    dirs.forEach(function (dir) {
        gulp.src(path.resolve(__dirname, dir, "index.jsx"))
            .pipe(webpack( require(path.resolve(__dirname, dir, "webpack.config.js"))))
            .pipe(gulp.dest(path.resolve(__dirname, "build")));
    });
    
    if (isProd) {
        del(["./build/*.js.map"]);
    }
}