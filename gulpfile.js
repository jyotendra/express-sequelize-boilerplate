var gulp = require("gulp");
var fs = require("fs");
var mkdirp = require("mkdirp");
var clean = require("gulp-rimraf");

gulp.task("clean-build", function() {
  mkdirp("/build", function(err) {
    console.log("Folder already exists", err);
  });
  gulp.src("build/*", { read: false }).pipe(clean());
});

gulp.task("copy-folders", function() {
  // copy docs to build
  gulp.src(["public/**/*"]).pipe(gulp.dest("build/public"));
  // copy config
  gulp.src(["config/**/*"]).pipe(gulp.dest("build/config"));
  // create logs folder and file
  fs.mkdirSync("./build/logs");
  fs.closeSync(fs.openSync("./build/logs/server.log", "w"));
});
