import gulp from "gulp";
import sass from "gulp-sass";
import csso from "gulp-csso";
import autoprefixer from "gulp-autoprefixer";
import del from "del";

sass.compiler = require("node-sass");

const paths = {
  styles: {
    src: "assets/scss/styles.scss",
    dest: "src/static/styles",
    watch: "assets/scss/**/*.scss",
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

// const clear = () => del("/src/static");

function watchFiles() {
  gulp.watch(paths.styles.watch, styles);
}

const dev = gulp.series([styles, watchFiles]);

export default dev;
