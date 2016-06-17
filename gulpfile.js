var gulp = require('gulp');
var browserify = require('browserify');
var source = require('vinyl-source-stream');

gulp.task('browserify', function () {
    return browserify('./content/index.js') //browserify source
        .bundle()
        .pipe(source('bundle.js')) //browserify destination
        .pipe(gulp.dest('./content')); //destination folder
});

gulp.task('browserify', function () {
    return browserify('./popup/app.js') //browserify source
        .bundle()
        .pipe(source('bundle.js')) //browserify destination
        .pipe(gulp.dest('./popup')); //destination folder
});

gulp.task('default', function () {
    gulp.watch('content/*', ['browserify']) //when anything in 'content' folder changes, call browserify task
})
