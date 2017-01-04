const tslint = require('gulp-tslint');

const gulp = require('gulp');
const tsc = require('gulp-typescript');
const sourcemaps = require('gulp-sourcemaps');
const jasmine = require('gulp-jasmine');
const merge = require('merge2');
const del = require('del');
const path = require('path');

const tsProject = tsc.createProject('tsconfig.json');

gulp.task('clean-ts', (callback) => {
  const typeScriptGenFiles = ['./dist/**/*.*'];
  return del(typeScriptGenFiles, callback);
});

gulp.task('compile-ts', ['clean-ts'], () => {
  const tsResult = tsProject.src()
    .pipe(sourcemaps.init())
    .pipe(tsProject());

  return merge([
    tsResult.dts.pipe(gulp.dest('dist')),
    tsResult.js.pipe(sourcemaps.write('.', {
      includeContent: false,
      sourceRoot(file) {
        const sourceFile = path.join(file.cwd, file.sourceMap.file);
        return `../${path.relative(path.dirname(sourceFile), __dirname)}`;
      },
    })).pipe(gulp.dest('dist')),
  ]);
});

gulp.task('lint', ['compile-ts'], () => gulp.src(['./src/**/*.ts', '!./src/**/*d.ts'])
  .pipe(tslint({
    formatter: 'prose',
  })).pipe(tslint.report({
    summarizeFailureOutput: true,
  })));

gulp.task('test', ['compile-ts'], () => gulp.src(['./dist/specs/**/*[sS]pec.js', './dist/specs/**/*.[sS]pec.js'])
  .pipe(jasmine()));

gulp.task('default', ['clean-ts', 'compile-ts', 'lint', 'test']);
