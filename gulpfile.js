var path = require('path');
var gulp = require('gulp');
var eslint = require('gulp-eslint');
var excludeGitignore = require('gulp-exclude-gitignore');
var mocha = require('gulp-mocha');
var nsp = require('gulp-nsp');
var plumber = require('gulp-plumber');
var babel = require('gulp-babel');
var del = require('del');
var browserify = require('browserify');
var babelify = require('babelify');
var buffer = require("vinyl-buffer");
var source = require('vinyl-source-stream');
var derequire = require('gulp-derequire');
var header = require('gulp-header');

var pkg = require('./package.json');
var banner = [
  '// <%= pkg.name %> - <%= pkg.description %>',
  '// Copyright 2016 <%= pkg.author %>',
  '// @version v<%= pkg.version %>',
  '// @license <%= pkg.license %>',
  '// https://github.com/raphaelfaria/dom-fn',
  '',
].join('\n');

// Initialize the babel transpiler so ES2015 files gets compiled
// when they're loaded
require('babel-core/register');

gulp.task('static', function () {
  return gulp.src('**/*.js')
    .pipe(excludeGitignore())
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

gulp.task('lint', function () {
  return gulp.src('src/**/*.js')
    .pipe(excludeGitignore())
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

gulp.task('nsp', function (cb) {
  nsp({ package: path.resolve('package.json') }, cb);
});

gulp.task('test', function (cb) {
  var mochaErr;

  gulp.src('test/**/*.js')
    .pipe(plumber())
    .pipe(mocha({
      reporter: 'spec',
      globals: ['*'],
    }))
    .on('error', function (err) {
      cb(err);
      mochaErr = err;
    })
    .on('end', function () {
      cb(mochaErr);
    });
});

gulp.task('build', ['clean-build'], function () {
  return browserify(['./src/dom-fn.js'], { standalone: 'domFn' })
    .transform(babelify)
    .bundle()
    .pipe(source('dom-fn.js'))
    .pipe(derequire())
    .pipe(buffer())
    .pipe(header(banner, { pkg: pkg }))
    .pipe(gulp.dest('build'));
});

gulp.task('babel', ['clean'], function () {
  return gulp.src('src/**/*.js')
    .pipe(babel())
    .pipe(gulp.dest('dist'));
});

gulp.task('clean', function () {
  return del('dist');
});

gulp.task('clean-build', function () {
  return del('build');
});

gulp.task('prepublish', ['nsp', 'babel']);
gulp.task('default', ['static', 'test']);
