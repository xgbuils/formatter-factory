var gulp = require('gulp')
var eslint = require('gulp-eslint')
var mocha = require('gulp-mocha')

gulp.task('test', function () {
    gulp.src([
        'test/optionsAdapter_test.js',
        'test/getChunkOfTokens_test.js',
        'test/parser_test.js',
        'test/formatter_test.js'
    ])
    .pipe(mocha())
})

gulp.task('lint', function () {
    return gulp.src(['./**/*.js'])
        .pipe(eslint())
        .pipe(eslint.format())
})