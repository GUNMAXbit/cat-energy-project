import gulp from "gulp";
import plumber from "gulp-plumber";
import sass from "gulp-dart-sass";
import postcss from "gulp-postcss";
import autoprefixer from "autoprefixer";
import browser from "browser-sync";
import htmlmin from "gulp-htmlmin";
import rename from "gulp-rename";
import terser from "gulp-terser";
import svg from "gulp-svgo";
import svgstore from "gulp-svgstore";

// Styles

export const styles = () => {
  return gulp
    .src("source/sass/style.scss", { sourcemaps: true })
    .pipe(plumber())
    .pipe(sass().on("error", sass.logError))
    .pipe(postcss([autoprefixer()]))
    .pipe(rename("style.min.css"))
    .pipe(gulp.dest("build/css", { sourcemaps: "." }))
    .pipe(browser.stream());
};

// HTML
export const html = () => {
  return gulp
    .src("source/*.html")
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest("build"));
};

// Scripts
export const scripts = () => {
  return gulp.src("source/js/*.js").pipe(terser()).pipe(gulp.dest("build/js"));
};

// Images
export const optimizeimages = () => {
  return gulp
    .src("source/img/**/*.{jpg,png}")
    .pipe(squoosh())
    .pipe(gulp.dest("build/img"));
};

const copyimages = () => {
  return gulp.src("source/img/**/*.{jpg,png}").pipe(gulp.dest("build/img"));
};

// WebP

export const createWebP = () => {
  return gulp
    .src("source/img/**/*.{jpg,png}")
    .pipe(squoosh({ webp: {} }))
    .pipe(gulp.dest("build/img"));
};

// SVG

const svgo = () => {
  return gulp
    .src("source/img/logo/*.svg")
    .pipe(svg())
    .pipe(gulp.dest("build/img"));
};

export const sprite = () => {
  return gulp
    .src("source/img/icons/*.svg")
    .pipe(svg())
    .pipe(
      svgstore({
        inlineSvg: true,
      })
    )
    .pipe(rename("sprite.svg"))
    .pipe(gulp.dest("build/img"));
};

// Server

function server(done) {
  browser.init({
    server: {
      baseDir: "build",
    },
    cors: true,
    notify: false,
    ui: false,
  });
  done();
}

// Watcher

const watcher = () => {
  gulp.watch("source/sass/**/*.scss", gulp.series(styles));
  gulp.watch("source/*.html").on("change", browser.reload);
};

export default gulp.series(html, styles, server, watcher);
