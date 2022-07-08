const gulp = require("gulp");
const imagemin = require("gulp-imagemin");
const concat = require("gulp-concat");
const terser = require("gulp-terser");
const sourcemaps = require("gulp-sourcemaps");

const postcss = require("gulp-postcss");
const cssnano = require("cssnano");
const autoprefixer = require("autoprefixer");

const { src, series, parallel, dest, watch } = require("gulp");

//html
function copyHtml() {
  return src("src/*.html").pipe(gulp.dest("dist"));
}

//css
//You can change CSS way
const cssPath = "src/assets/css/**/*.css";
function cssTask() {
  return src(cssPath)
    .pipe(sourcemaps.init())
    .pipe(concat("style.css"))
    .pipe(postcss([autoprefixer(), cssnano()]))
    .pipe(sourcemaps.write(""))
    .pipe(dest("dist/assets/css"));
}

//img
function imgTask() {
  return gulp
    .src("src/images/**/*")
    .pipe(imagemin())
    .pipe(gulp.dest("dist/images"));
}

//js

//You can change JS way
const jsPath = "src/**/*.js";

function jsTask() {
  return src(jsPath)
    .pipe(sourcemaps.init())
    .pipe(concat("all.js"))
    .pipe(terser())
    .pipe(sourcemaps.write("."))
    .pipe(dest("dist/assets/js"));
}

exports.default = parallel(copyHtml, cssTask, imgTask, jsTask);
