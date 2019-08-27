'use strict';

var gulp           = require('gulp');
var sass           = require('gulp-sass');
var sassGlob       = require('gulp-sass-glob');
var concat         = require('gulp-concat');
var shell          = require('gulp-shell');
var sourcemaps     = require('gulp-sourcemaps');
var autoprefixer   = require('gulp-autoprefixer');
var postcss        = require('gulp-postcss');
var pseudoelements = require('postcss-pseudoelements');

// Autoprefixer Browserlist
var browserlist = ['last 2 versions', 'ie >= 8'];

// PostCSS Processors
var processors = [
  pseudoelements // Makes pseduoelements IE8 compatabile
];

gulp.task('sass:prod', function () {
  gulp.src('./sass/*.scss')
    .pipe(sassGlob())
    .pipe(sass({
      includePaths: require('node-neat').includePaths
    }).on('error', sass.logError))
    .pipe(autoprefixer({
       browsers: browserlist
    }))
    .pipe(postcss(processors))
    .pipe(gulp.dest('./dist/css'));
});

gulp.task('sass:dev', function () {
  gulp.src('./sass/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sassGlob())
    .pipe(sass({
      includePaths: require('node-neat').includePaths
    }).on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: browserlist
    }))
    .pipe(postcss(processors))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./dist/css'));
});

gulp.task('sass:watch', function () {
  gulp.watch('./sass/**/*.scss', ['sass:dev','styleguide']);
});

gulp.task('js:watch', function () {
  gulp.watch('./js/*.behaviors.js', ['js:concat']);
});

gulp.task('js:concat', function() {
  return gulp.src('./js/*.behaviors.js')
    .pipe(sourcemaps.init())
      .pipe(concat('irsjobs.behaviors.js'))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./dist/js/'));
});

gulp.task('js:copy', function() {
  // Copy addtional, or third-party, scripts dist/
  return gulp.src('./js/infobox_packed.js')
    .pipe(gulp.dest('./dist/js/'));
});

gulp.task('styleguide', shell.task([
    // kss-node [source folder of files to parse] [destination folder] --template [location of template files]
    'kss-node <%= source %> <%= destination %> --css <%= css %> --title <%= title %>'
  ], {
    templateData: {
      source:       './sass',
      destination:  './styleguide',
      css:          '../dist/css/irsjobs.styles.css',
      title:        '"IRS Careers Website Styleguide"',

    }
  }
));

gulp.task('default', [
  'sass:dev',
  'sass:watch',
  'styleguide',
  'js:concat',
  'js:copy',
  'js:watch'
]);
