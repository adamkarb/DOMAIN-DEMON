var gulp = require('gulp');
var shell = require('gulp-shell');

gulp.task('nw', shell.task([
    '/Users/adamkarbiener/Downloads/nwjs-v0.12.3-osx-x64/nwjs.app/Contents/MacOS/nwjs ~/Development/node/projects/NWwhoIs'
]));