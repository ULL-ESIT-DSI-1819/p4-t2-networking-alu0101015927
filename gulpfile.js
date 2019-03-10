var gulp = require('gulp');
var shell = require('gulp-shell');

gulp.task('default', function () {
    console.log('gulp!');
});

gulp.task("pre-install", shell.task([
    "npm i -g gulp static-server",
    "npm install -g nodemon",
    "npm install -g gulp-shell"
]));

gulp.task("serve", shell.task("nodemon lib/test-json-service.js target.txt"));
gulp.task("ser", shell.task("node lib/test-json-service.js target.txt"));
gulp.task("client", shell.task("node lib/net-watcher-ldj-client.js"));

gulp.task("doc", shell.task("documentation build *.js **/*.js// -f html -o docs"));

gulp.task("test", shell.task("npm test"));
