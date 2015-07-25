// Define variables to the GulpJS and your GulpJS installed plugins
var gulp    = require('gulp'),
minifycss   = require('gulp-minify-css'),
uglify      = require('gulp-uglify'),
imagemin    = require('gulp-imagemin'),
concat      = require('gulp-concat'),
del         = require('del'),
livereload  = require('gulp-livereload');

// Make the tasks using the plugins installed

// Styles tasks
gulp.task('styles', function() {
  gulp.src('Source/assets/css/*.css')
  .pipe(minifycss())
  .pipe(concat('main.css'))
  .pipe(gulp.dest('Production/assets/css/'))
  .pipe(livereload());
});

// Scripts tasks
gulp.task('scripts', function() {
  gulp.src(
    [
      'Source/assets/javascript/jquery.js',
      'Source/assets/javascript/bootstrap.js',
      'Source/assets/javascript/cbpAnimatedHeader.js',
      'Source/assets/javascript/classie.js',
      'Source/assets/javascript/main.js'
    ]
  )
  .pipe(uglify())
  .pipe(concat('main.js'))
  .pipe(gulp.dest('Production/assets/javascript/'))
  .pipe(livereload());
});

// Images tasks
gulp.task('img', function() {
  gulp.src('Source/assets/images/**/*')
  .pipe(imagemin())
  .pipe(gulp.dest('Production/assets/images/'))
  .pipe(livereload());
});

// Fonts tasks
gulp.task('fonts', function () {
  gulp.src('Source/assets/fonts/**/*')
  .pipe(gulp.dest('Production/assets/fonts/'))
  .pipe(livereload());
});

// Clean files
gulp.task('clean', function(cb) {
  del(['Production/assets/css', 'Production/assets/javascript', 'Production/assets/images', 'Production/assets/fonts'], cb)
});

// Watch task
gulp.task('watch', function() {
  var server = livereload();
  gulp.watch('Source/assets/css/*.css', ['styles']);
  gulp.watch('Source/assets/javascript/*.js', ['scripts']);
  gulp.watch('Source/assets/images/*', ['img']);
});

// The task that you've named of 'default' (like the one bellow), will run with the command: gulp

// Default task
gulp.task('default', ['clean', 'styles', 'scripts', 'img', 'fonts', 'watch']);