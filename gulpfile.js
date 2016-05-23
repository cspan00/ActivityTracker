var gulp   = require('gulp'),
    sass   = require('gulp-sass')


gulp.task('build', function() {
  return gulp.src('public/scss/**/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('public/css'))
})

gulp.task('watch', function() {
  gulp.watch('public/scss/**/*.scss', ['build'])
})
