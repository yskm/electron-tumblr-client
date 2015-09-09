var gulp = require('gulp');
var babel = require('gulp-babel');

gulp.task('build', [
  'build-copy',
  'build-js'
]);

gulp.task('build-copy', function() {
  return gulp.src('src/**/*')
    .pipe(gulp.dest('dist'))
});

gulp.task('build-js', ['build-copy'], function() {
  return gulp.src('src/**/*.js')
    .pipe(babel())
    .pipe(gulp.dest('dist'))
});
