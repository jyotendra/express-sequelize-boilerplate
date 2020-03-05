var gulp = require("gulp");
var fs = require("fs");
var mkdirp = require("mkdirp");
var clean = require("gulp-rimraf");
var babel = require("gulp-babel");
var sourcemaps = require('gulp-sourcemaps');
var path = require("path")


const srcPath = path.join(__dirname, "src")
console.log(srcPath);

gulp.task("clean-build", function () {
  mkdirp("./build", function (err) {
    console.log("Folder already exists", err);
  });
  return gulp.src("build/*", { read: false }).pipe(clean());
});


gulp.task("clean-build-src", function () {
  return gulp.src("build/src/*", { read: false }).pipe(clean());
});


gulp.task("compile-babel", function () {
  return gulp.src(["src/**/*.js"],  { base: 'src' })
  .pipe(sourcemaps.init())
  .pipe(babel({
    presets: ['@babel/preset-env']
  }))
  .pipe(sourcemaps.mapSources(function(sourcePath, file) {
    // source paths are prefixed with '../src/'
    const srcPath = path.join(__dirname, "src", sourcePath)
    return srcPath;
  }))
  .pipe(sourcemaps.write('.'))
  .pipe(gulp.dest("build/src"));
});

gulp.task("set-watch", function () {
  gulp.watch('src/**/*', gulp.series('compile-babel'));
});


gulp.task("copy-folders", function (done) {
  // copy docs to build
  gulp.src(["public/**/*"]).pipe(gulp.dest("build/public"));
  // copy config
  gulp.src(["config/**/*"]).pipe(gulp.dest("build/config"));
  // create logs folder and file
  fs.mkdirSync("./build/logs");
  fs.closeSync(fs.openSync("./build/logs/server.log", "w"));

  gulp.src(["./package.json"]).pipe(gulp.dest("build"));
  gulp.src(["./.sequelizerc"]).pipe(gulp.dest("build"));
  if (process.env.NODE_ENV === "production") {
    gulp.src(["./.env"]).pipe(gulp.dest("build"));
  } else {
    gulp.src(["./.env.dev"]).pipe(gulp.dest("build"));
  }
  done();
});
