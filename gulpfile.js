var gulp = require('gulp'),
  del = require('del'),
  runSequence = require('run-sequence'),
  packager = require('gulp-atom-shell'),
  sketch = require('gulp-sketch'),
  iconutil = require('gulp-iconutil'),
  gif = require('gulp-if'),
  shell = require('gulp-shell'),
  babel = require('gulp-babel'),
  less = require('gulp-less');

var $ = {
  babel: ['./src/**/*.js'],
  html: ['./src/**/*.html'],
  less: ['./src/less/**/*.less'],
  iconapp: ['./src/app.sketch'],
  icontray: ['./src/tray.sketch'],
  meta: ['./src/package.json'],
  'package': ['./dist/**'],
  dist: './dist/',
  distCSS: './dist/css'
};

gulp.task('default', function(cb) {
  return runSequence('prebuild', 'package', cb);
});

gulp.task('prebuild', function(cb) {
  return runSequence(['babel', 'less', 'html', 'meta'], 'npm', cb);
});

gulp.task('babel', function() {
  return gulp.src($.babel).pipe(babel()).pipe(gulp.dest($.dist));
});

gulp.task('html', function() {
  return gulp.src($.html).pipe(gulp.dest($.dist));
});

gulp.task('less', function() {
  return gulp.src($.less).pipe(less()).pipe(gulp.dest($.distCSS));
});


gulp.task('clean', function(cb) {
  return del($.dist, function() {
    return cb();
  });
});

gulp.task('meta', function() {
  return gulp.src($.meta).pipe(gulp.dest($.dist));
});

gulp.task('npm', shell.task('npm install', {
  cwd: 'dist',
  quiet: true
}));

gulp.task('package', function() {
  return gulp.src($["package"]).pipe(packager({
    version: '0.22.1',
    platform: 'darwin',
    darwinIcon: 'dist/app.icns'
  })).pipe(packager.zfsdest('app.zip'));
});

gulp.task('icon-tray', function() {
  return gulp.src($.icontray).pipe(sketch({
    "export": 'artboards',
    scales: '1.0,2.0',
    formats: 'png'
  })).pipe(gulp.dest($.dist));
});

gulp.task('icon-app', function() {
  return gulp.src($.iconapp).pipe(sketch({
    "export": 'artboards',
    scales: '1.0',
    formats: 'png'
  })).pipe(gulp.dest($.dist)).pipe(iconutil('app.icns')).pipe(gulp.dest($.dist));
});