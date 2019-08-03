/**
  * gulpfile-3.9.1.js:
  * The syntax is compatible with gulp-3.9.1
  *
  *
  * Author: Truong Giang, Huynh
  * Created: 08/02/2019
  * Modified: 08/02/2019
**/


var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var minifycss = require('gulp-minify-css');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
// var uglify = require('gulp-uglify');
var uglify = require('gulp-uglify-es').default;

/**
  * Concate javascript files to create scripts.js, rename to .min and minimize the js file
  * Create scripts.js and scripts.min.js in ./js folder
**/
gulp.task('scripts', function() {
  return gulp.src([
    /* Add your JS files here, they will be combined in this order */
    'node_modules/jquery/dist/jquery.js',
    'node_modules/popper.js/dist/umd/popper.js',
    'node_modules/bootstrap/js/dist/util.js',
    'node_modules/bootstrap/js/dist/alert.js',
    'node_modules/push.js/bin/push.js',
    'node_modules/bootstrap/js/dist/button.js',
    'node_modules/bootstrap/js/dist/dropdown.js',
    'node_modules/bootstrap/js/dist/tab.js',
    'node_modules/bootstrap/js/dist/carousel.js',
    'node_modules/bootstrap/js/dist/collapse.js',
    'node_modules/bootstrap/js/dist/modal.js',
    'node_modules/bootstrap/js/dist/scrollspy.js',
    'node_modules/bootstrap/js/dist/tooltip.js',
    'node_modules/bootstrap/js/dist/popover.js',
    'node_modules/bootstrap/js/dist/toast.js',
    'src/js/main.js',
    'src/js/other.js'

    ])
    .pipe(concat('scripts.js'))
    .pipe(gulp.dest('js'))
    .pipe(rename({suffix: '.min'}))
    .pipe(uglify())
    .pipe(gulp.dest('./js'));
});

/**
  * compile main.scss to css and minimized the css file
  * Create main.css in ./css folder
**/
gulp.task('css', function () {
    gulp.src('src/scss/main.scss')
        .pipe(sass({includePaths: ['scss']}))
        .pipe(gulp.dest('./css'))
        .pipe(minifycss());
});

/**
  *   Start the browser
**/
gulp.task('browser-sync', function() {
    browserSync.init(["css/*.css", "js/*.js"], {
        server: {
            baseDir: "./"
        }
    });
});

/**
  *  Watching changes on sccs files, then compile to css by "css" task and reload browser
  *  Watching changes on html files, then reload browser
  * Watching changes on js files, then concate javascript file and reload browser
**/

gulp.task('default', ['css', 'browser-sync'], function () {
    gulp.watch("src/scss/**/*.scss", ['css']).on("change", reload);
    gulp.watch("./*.html").on("change", reload);
    gulp.watch("src/js/*.js", ['scripts']).on("change", reload);
});
