const gulp = require('gulp');
const minify = require('gulp-clean-css');
var uglify = require('gulp-uglify');

gulp.task('compressCSS', function() {
  return gulp.src('src/publicCSS/*.css')
    .pipe(minify())
    .pipe(gulp.dest('./public/css/'))
});

gulp.task('uglify', function() {
    return gulp.src('src/publicJS/*.js')
      .pipe(uglify())
      .pipe(gulp.dest('./public/js/'))
});


gulp.task('serviceworker', function() {
    return gulp.src('src/publicSW/serviceworker.js')
      .pipe(uglify())
      .pipe(gulp.dest('./public/'))
  });
  
gulp.task('default', gulp.series(['compressCSS', 'uglify', 'serviceworker']))