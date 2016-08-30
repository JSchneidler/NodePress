// Include gulp
var gulp = require('gulp');

// Include Our Plugins
var jshint = require('gulp-jshint');
var sass = require('gulp-sass');
var usemin = require('gulp-usemin');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var clean = require('gulp-clean');
var minifyHtml = require('gulp-minify-html');

gulp.task('clean', function() {
    return gulp.src(['../build'], { read: false })
        .pipe(clean({ force: true }));
});

// Lint Client Task
gulp.task('lint_client', function() {
    return gulp.src(['../client/angular/**/*.js', '../client/js/**/*.js'])
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

// Lint Server Task
gulp.task('lint_server', function() {
    return gulp.src(['./**/*.js', '!node_modules/**/*'])
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

// Compile Our Sass
gulp.task('sass', ['clean'], function() {
    return gulp.src('../client/scss/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(concat('style.css'))
        .pipe(gulp.dest('../build/css'));
});

gulp.task('usemin', ['clean'], function() {
    return gulp.src('../client/index.html')
        .pipe(usemin({
            js_components: [ uglify() ],
            js_app: [ uglify() ],
            js_all: [ uglify() ],
            html: [ minifyHtml({ empty: true })]
        }))
        .pipe(gulp.dest('../build/'));
});

gulp.task('copy', ['clean'], function() {
    return gulp.src('../client/angular/views/**/*.html', { base: '../client' })
        .pipe(gulp.dest('../build'));
});

// Watch Files For Changes
gulp.task('watch', function() {
    gulp.watch('../client/**/*.js', ['clean', 'lint_client', 'usemin']);
    gulp.watch('**/*.js', ['lint_server']);
    gulp.watch('../client/scss/**/*.scss', ['clean', 'sass']);
});

// Default Task
gulp.task('default', ['clean', 'lint_client', 'lint_server', 'copy', 'sass', 'usemin']);

// Lint task
gulp.task('lint', ['lint_client', 'lint_server']);