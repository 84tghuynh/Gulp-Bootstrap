/**
  * gulpfile.js:  Copy content of gulpfile-4.0.2 or 3.9.1. It depends the gulp version used
  *
  * Current gulp version: 4.0.2
  * Command check version of gulp:  gulp -v
  *
  * Author: Truong Giang, Huynh
  * Created: 08/02/2019
  * Modified: 08/02/2019
**/

/**
  * gulpfile-4.0.2.js:
  * The syntax is compatible with gulp-4.0.2
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
**/
function scripts() {
  return gulp.src([
    /* Add your JS files here, they will be combined in this order */
    'node_modules/jquery/dist/jquery.js',
    'node_modules/popper.js/dist/umd/popper.js',  //tooltip, check on bootstrap to know which section need it
    'node_modules/bootstrap/js/dist/util.js',
    'node_modules/bootstrap/js/dist/alert.js',
    'node_modules/bootstrap/js/dist/button.js',
    // 'node_modules/push.js/bin/push.js',
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
};

/**
  * compile main.scss to css and minimized the css file
**/
function css() {
    return gulp.src('src/scss/main.scss')
        .pipe(sass({includePaths: ['scss']}))
        .pipe(sass())
        .pipe(gulp.dest('./css'))
        .pipe(minifycss());
};

/**
  * BrowserSync
**/
function browserSync_(done) {
  browserSync.init({
    server: {
      baseDir: "./"
    },
    port: 3000
  });
  done();
}

/**
  *BrowserSync Reload
**/
function browserSyncReload(done) {
  browserSync.reload();
  done();
}

/**
  *  Watching changes on sccs files, then compile to css by "css" task and reload browser
  *  Watching changes on html files, then reload browser
  *  Watching changes on js files, then concate javascript file and reload browser
**/
function watchFiles() {
    gulp.watch("src/scss/**/*.scss",gulp.series(css,browserSyncReload));
    gulp.watch("./*.html", browserSyncReload);
    gulp.watch("src/js/*.js", gulp.series(scripts,browserSyncReload));
};

/**
  *  Init browser and watchfiles
**/
const build = gulp.series(browserSync_, watchFiles);

/**
  * Function to create main.css in ./css folder
**/
exports.css = css;
/**
  * Function to create scripts.css in ./css folder
**/
exports.scripts = scripts;
exports.default = build;
