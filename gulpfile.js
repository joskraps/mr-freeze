const gulp = require('gulp');
const tsc = require('gulp-typescript');
const sourcemaps = require('gulp-sourcemaps');
const jasmine = require('gulp-jasmine');
const path = require('path');
const merge = require('merge2');
const del = require('del');



gulp.task('test', [], function () {
	return gulp.src('./spec/**/*[sS]pec.js')
        .pipe(jasmine());
});
gulp.task('default', ['test']);
