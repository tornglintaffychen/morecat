var gulp = require('gulp');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var plumber = require('gulp-plumber');
var notify = require('gulp-notify');
var runSeq = require('run-sequence');
var livereload = require('gulp-livereload');

gulp.task('reload', function () {
    livereload.reload();
});

gulp.task('content', function () {
    return browserify('./content/index.js') //browserify source
        .bundle()
        .pipe(source('bundle.js')) //browserify destination
        .pipe(gulp.dest('./content')); //destination folder
});

gulp.task('popup', function () {
    return browserify('./popup/app.js') //browserify source
        .bundle()
        .pipe(source('bundle.js')) //browserify destination
        .pipe(gulp.dest('./popup')); //destination folder
});


gulp.task('default', function () {
    gulp.watch('content/content.js', function () {
        runSeq('content', 'reload')
    });

    gulp.watch('popup/controller/*', function () {
        runSeq('popup', 'reload')
    })

    gulp.watch('popup/factory/*', function () {
        runSeq('popup', 'reload')
    })

    gulp.watch('popup/app.js', function () {
        runSeq('popup', 'reload')
    })
})
