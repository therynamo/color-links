'use strict';
const gulp = require('gulp');
const clean = require('gulp-clean');
const eslint = require('gulp-eslint');
const sourcemaps = require('gulp-sourcemaps');
const concat = require('gulp-concat');
const babel = require('gulp-babel');
const webpack = require('webpack');
const gwebpack = require('webpack-stream');

const path = {
  js: ['!node_modules/**', './**/*.js', './**/*.jsx'],
  contentscripts: ['!node_modules/**', './src/content-scripts/**/*.js']
};

gulp.task('default', ['lint']);

gulp.task('lint', () => {
  return gulp.src(path.js)
   .pipe(eslint())
   .pipe(eslint.format())
   .pipe(eslint.failAfterError());
});

gulp.task('clean', () => {
  return gulp.src('public/dist', { read: false })
    .pipe(clean());
});

gulp.task('webpack:dev', () => {
  return gulp.src('src/index.js')
    .pipe(gwebpack(require('./webpack.config.js', webpack)))
    .pipe(gulp.dest('./public/dist'));
});

gulp.task('build:dev', () => {
  return gulp.src('src/content-scripts/*.js')
    .pipe(sourcemaps.init())
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(concat('contentscript.js'))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('public/dist'));
});

gulp.task('build:prod', ['clean', 'lint'], () => {
  return gulp.src('src/content-scripts/contentscript.js')
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(gulp.dest('public/dist'));
});

gulp.task('watch', () => {
  gulp.watch(path.contentscripts, ['lint', 'build:dev', 'webpack:dev']);
});
