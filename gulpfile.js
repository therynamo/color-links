'use strict';
const gulp = require('gulp');
const del = require('del');
const rename = require('gulp-rename');
const eslint = require('gulp-eslint');
const sourcemaps = require('gulp-sourcemaps');
const concat = require('gulp-concat');
const babel = require('gulp-babel');
const webpack = require('webpack');
const gwebpack = require('webpack-stream');

const path = {
  js: ['!node_modules/**', './**/*.js', './**/*.jsx'],
  contentscripts: ['!node_modules/**', './src/content-scripts/**/*.js'],
  images: './public/images/**',
  styles: './public/styles/**',
  html: './public/*.html',
  dist: './dist/',
  public: './public/'
};

gulp.task('default', ['lint']);

gulp.task('lint', () => {
  return gulp.src(path.js)
   .pipe(eslint())
   .pipe(eslint.format())
   .pipe(eslint.failAfterError());
});

gulp.task('clean', () => {
  return del([
    `${path.dist}**`,
    `${path.public}dist/**`
  ]);
});

gulp.task('copy:manifest', () => {
  return gulp.src('./prod.manifest.json')
    .pipe(rename({
      basename: 'manifest',
      extname: '.json'
    }))
    .pipe(gulp.dest(path.dist));
});

gulp.task('copy:images', () => {
  return gulp.src(path.images)
    .pipe(gulp.dest(path.dist + 'images'));
});

gulp.task('copy:styles', () => {
  return gulp.src(path.styles)
    .pipe(gulp.dest(path.dist + 'styles'));
});

gulp.task('copy:html', () => {
  return gulp.src(path.html)
    .pipe(gulp.dest(path.dist));
});

gulp.task('webpack:dev', () => {
  return gulp.src('src/index.js')
    .pipe(gwebpack(require('./webpack.config.js', webpack)))
    .pipe(gulp.dest(path.public));
});

gulp.task('webpack:prod', () => {
  return gulp.src('src/index.js')
    .pipe(gwebpack(require('./webpack.production.config.js', webpack)))
    .pipe(gulp.dest(path.dist + 'src'));
});

gulp.task('build:dev', () => {
  return gulp.src('src/content-scripts/*.js')
    .pipe(sourcemaps.init())
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(concat('contentscript.js'))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(path.public + 'dist'));
});

gulp.task('build:prod', ['lint', 'copy:manifest', 'copy:images', 'copy:styles', 'copy:html'], () => {
  return gulp.src('src/content-scripts/contentscript.js')
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(gulp.dest(path.dist + 'src'));
});

gulp.task('watch', () => {
  gulp.watch(path.js, ['lint', 'build:dev', 'webpack:dev']);
});
