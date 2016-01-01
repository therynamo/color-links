'use strict';
const gulp = require('gulp');
const eslint = require('gulp-eslint');

const path = {
  js: ['!node_modules/**', './**/*.js', './**/*.jsx']
};

gulp.task('default', ['lint'], () => {});

gulp.task('lint', () => {
  return gulp.src(path.js)
   .pipe(eslint())
   .pipe(eslint.format())
   .pipe(eslint.failAfterError());
});
