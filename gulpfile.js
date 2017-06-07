const gulp = require('gulp');
const webpack = require('webpack-stream');
const path = require('path');
const del = require('del');
const srcDirNames = {
    popup: 'popup',
    bg: 'bg',
    content: 'content'    
};

gulp.task('dev', ['dev:content', 'dev:bg', 'dev:popup']);

gulp.task('prod', ['prod:content', 'prod:bg', 'prod:popup']);

gulp.task('dev:set-node-env', () => {
    process.env.NODE_ENV = 'development';
});

gulp.task('prod:set-node-env', () => {
    process.env.NODE_ENV = 'production';
});

gulp.task('dev:content', ['dev:set-node-env'], () => {
    return execBuild(srcDirNames.content, 'index.js');
});

gulp.task('dev:bg', ['dev:set-node-env'], () => {
    return execBuild(srcDirNames.bg, 'index.js');
});

gulp.task('dev:popup', ['dev:set-node-env'], () => {
    return execBuild(srcDirNames.popup, 'index.jsx');
});

gulp.task('prod:content', ['prod:set-node-env'], () => {
    return execBuild(srcDirNames.content, 'index.js', true);
});

gulp.task('prod:bg', ['prod:set-node-env'], () => {
    return execBuild(srcDirNames.bg, 'index.js', true);
});

gulp.task('prod:popup', ['prod:set-node-env'], () => {
    return execBuild(srcDirNames.popup, 'index.jsx', true);
});

gulp.task('watch', ['dev'], () => {
    gulp.watch(srcDirNames.popup + '/**/*.*', ['dev:popup']);
    gulp.watch(srcDirNames.bg + '/**/*.*', ['dev:bg']);
    gulp.watch(srcDirNames.content + '/**/*.*', ['dev:content']);
});

gulp.task('default', ['prod']);

function execBuild(dir, entry, isProd) {
    if (isProd) {
        del(['./build/*.js.map']);
    }
    
    return gulp.src(path.resolve(__dirname, dir, entry))
        .pipe(webpack( require(path.resolve(__dirname, dir, 'webpack.config.js'))))
        .pipe(gulp.dest(path.resolve(__dirname, 'build')));
}