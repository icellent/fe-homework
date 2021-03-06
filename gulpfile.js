var gulp = require('gulp'),
    browserSync =  require('browser-sync').create(),
    minifyCss = require('gulp-cssnano'),
    sourcemaps = require('gulp-sourcemaps'),
    sass = require('gulp-sass'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    handlebars = require('gulp-compile-handlebars'),
    rename = require('gulp-rename'),
    browserify = require('browserify'),
    source = require('vinyl-source-stream'),
    buffer = require('vinyl-buffer'),
    lint = require('gulp-jshint');


gulp.task('templates', function() {
  var data = {

  };
  var options = {
    batch: ['src/templates/partials']
  };
  return gulp.src(['src/templates/**/*.hbs', '!src/templates/partials/**/*.hbs'])
    .pipe(handlebars(data, options))
    .pipe(rename(function(path) {
      path.extname = '.html'
    }))
    .pipe(gulp.dest('./'));
});

gulp.task('styles', function(){
  gulp.src(['src/css/main.scss'])
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(minifyCss())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('dist/css'))
    .pipe(browserSync.stream());
});

gulp.task('images', function(){
  gulp.src(['src/img/**/*'])
    .pipe(imagemin())
    .pipe(gulp.dest('dist/img'))
    .pipe(browserSync.stream());
});

gulp.task('scripts', function(){
  b = browserify({
    entries: 'src/js/main.js',
    debug: true
  });

  b.bundle()
    .pipe(source('main.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(uglify())
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('dist/js/'))
    .pipe(browserSync.stream());
});

gulp.task('lint', function() {
  gulp.src('src/js/**/*.js')
    .pipe(lint())
    .pipe(lint.reporter('default'));
});

gulp.task('default', ['styles', 'images',  'scripts', 'templates'], function() {
  browserSync.init({
    server: './'
  });
  gulp.watch('src/img/**/*', ['images']);
  gulp.watch('src/css/**/*.scss', ['styles']);
  gulp.watch('src/js/**/*js', ['scripts']);
  gulp.watch('src/templates/**/*.hbs', ['templates']);
  gulp.watch('*.html', browserSync.reload);
});
