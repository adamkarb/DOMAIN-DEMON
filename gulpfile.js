var gulp = require('gulp');
var shell = require('gulp-shell');

gulp.task('echo', shell.task([
    'echo Hello Everybody yo',
    'echo My name is Ted',
    'echo I like to party',
    'echo Green eggs and ham'
]));

gulp.task('delete', shell.task([
    'rm -f crap.js'
]));

gulp.task('npm', shell.task([
    'npm install'
]));