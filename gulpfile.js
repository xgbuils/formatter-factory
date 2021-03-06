var gulp = require('gulp')
var eslint = require('gulp-eslint')
var mocha = require('gulp-mocha')

gulp.task('test', function () {
    gulp.src([
        'test/optionsAdapter_test.js',
        'test/getChunkOfTokens_test.js',
        'test/parser_test.js',
        'test/formatterFactory_test.js'
    ])
    .pipe(mocha())
})

gulp.task('lint', function () {
    return gulp.src(['./**/*.js'])
        .pipe(eslint({
            fix: true
        }))
        .pipe(eslint.format())
        .pipe(gulp.dest('./'))
})
