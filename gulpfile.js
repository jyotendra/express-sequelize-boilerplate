var gulp = require("gulp");
var fs = require("fs");
var mkdirp = require("mkdirp");
var clean = require("gulp-rimraf");
var babel = require("gulp-babel");

gulp.task("clean-build", function() {
  mkdirp("/build", function(err) {
    console.log("Folder already exists", err);
  });
  gulp.src("build/*", { read: false }).pipe(clean());
});


gulp.task("clean-build-src", function() {
  gulp.src("build/src/*", { read: false }).pipe(clean());
});


gulp.task("compile-babel", function() {
  gulp.src(["src/**/*"]).pipe(babel()).pipe(gulp.dest("build/src"));
});

gulp.task("set-watch", function() {
  gulp.watch('src/**/*', ['compile-babel']);
});


gulp.task("copy-folders", function() {
  // copy docs to build
  gulp.src(["public/**/*"]).pipe(gulp.dest("build/public"));
  // copy config
  gulp.src(["config/**/*"]).pipe(gulp.dest("build/config"));
  // create logs folder and file
  fs.mkdirSync("./build/logs");
  fs.closeSync(fs.openSync("./build/logs/server.log", "w"));

  gulp.src(["./package.json"]).pipe(gulp.dest("build"));
  gulp.src(["./.sequelizerc"]).pipe(gulp.dest("build"));
  if(process.env.NODE_ENV === "production") {
    gulp.src(["./.env"]).pipe(gulp.dest("build"));
  } else {
    gulp.src(["./.env.dev"]).pipe(gulp.dest("build"));
  }
  
});
