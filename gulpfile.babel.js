import gulp from "gulp";
import sass from "gulp-sass";
import csso from "gulp-csso";
import autoprefixer from "gulp-autoprefixer";
import del from "del";
import broserify from "gulp-browserify";
import babelify from "babelify";

sass.compiler = require("node-sass");

const paths = {
  styles: {
    src: "assets/scss/styles.scss",
    dest: "src/static/styles",
    watch: "assets/scss/**/*.scss",
  },
  js: {
    src: "assets/js/main.js",
    dest: "src/static/js",
    watch: "assets/js/**/*.js",
  },
};

function styles() {
  return gulp
    .src(paths.styles.src)
    .pipe(sass())
    .pipe(
      autoprefixer({
        Browserslist: ["last 2 versions"],
        cascade: false,
      })
    )
    .pipe(csso())
    .pipe(gulp.dest(paths.styles.dest));
}

function js() {
  return gulp
    .src(paths.js.src)
    .pipe(
      broserify({
        transform: [
          babelify.configure({
            presets: ["@babel/preset-env"],
          }),
        ],
      })
    )
    .pipe(gulp.dest(paths.js.dest));
}

const clear = () => del("/src/static");

const watchFiles = () => {
  gulp.watch(paths.styles.watch, styles);
  gulp.watch(paths.js.watch, js);
};

const dev = gulp.series([clear, styles, js, watchFiles]);

export default dev;
