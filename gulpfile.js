var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var minifycss = require('gulp-minify-css');
var rename = require('gulp-rename');
var browserSync = require('browser-sync').create();

var sass_scss_path = 'src/css/*.scss';
var sass_css_path = 'build/css/';
var sassOptions = {
  errLogToConsole: true,
  outputStyle: 'expanded'
};

gulp.task('default', ['css', 'watch'], function() {

});

gulp.task('watch', function() {
  gulp.watch(sass_scss_path, ['css'])
  .on('change', function(event) {
    console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
  });
});

gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
});

gulp.task('css', function() {
  return gulp
    .src(sass_scss_path)
    .pipe(sass().on('error', sass.logError))
    .pipe(rename({ suffix: '.min' }))
    .pipe(minifycss())
    .pipe(gulp.dest(sass_css_path));
    .watch("app/*.html").on('change', browserSync.reload);
});
