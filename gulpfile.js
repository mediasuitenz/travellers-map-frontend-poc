'use strict';

/**
 * Module Dependencies
 */

var map = require('map-stream');
var Duo = require('duo');
var gulp = require('gulp');
var watch = require('gulp-watch');

/**
 * Default
 */

gulp.task('default', ['scripts', 'styles']);

/**
 * Scripts
 */

gulp.task('scripts', function() {
  gulp.src('./index.js')
    .pipe(watch(function(files) {
      return files.pipe(duo())
        .pipe(gulp.dest('./build.js'))
    }))
    
    
})

/**
 * Styles
 */

gulp.task('styles', function() {
  gulp.src('./main.css')
    .pipe(watch(function(files) {
      return files.pipe(duo())
        .pipe(gulp.dest('./build.css'))
    }))
})

/**
 * Duo
 */

function duo(opts) {
  opts = opts || {};

  return map(function(file, fn) {
    Duo(file.base)
      .entry(file.path)
      .run(function(err, src) {
        if (err) return fn(err);
        file.contents = new Buffer(src);
        fn(null, file);
      });
  });
}