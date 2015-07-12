/*!
 * gulp
 * $ npm install gulp-ruby-sass gulp-autoprefixer gulp-minify-css gulp-jshint gulp-concat gulp-uglify gulp-imagemin gulp-notify gulp-rename gulp-livereload gulp-cache del --save-dev
 */

// Load plugins
var gulp = require('gulp'),
	sass = require('gulp-ruby-sass'),
	autoprefixer = require('gulp-autoprefixer'),
	minifycss = require('gulp-minify-css'),
	jshint = require('gulp-jshint'),
	uglify = require('gulp-uglify'),
	imagemin = require('gulp-imagemin'),
	rename = require('gulp-rename'),
	concat = require('gulp-concat'),
	notify = require('gulp-notify'),
	cache = require('gulp-cache'),
	livereload = require('gulp-livereload'),
	del = require('del'),
	server = require('gulp-server-livereload'),
	htmlmin = require('gulp-htmlmin');

// HTML
gulp.task('minify', function() {
	return gulp.src('src/*.html')
		.pipe(htmlmin({
			collapseWhitespace: true
		}))
		.pipe(gulp.dest('dist'))
	pipe(notify({
		message: 'HTML task complete'
	}))
});

// Styles
gulp.task('styles', function() {
	return sass('src/styles/main.scss', {
			style: 'expanded'
		})
		.pipe(autoprefixer('last 2 version'))
		.pipe(gulp.dest('dist/styles'))
		.pipe(rename({
			suffix: '.min'
		}))
		.pipe(minifycss())
		.pipe(gulp.dest('dist/styles'))
		.pipe(notify({
			message: 'Styles task complete'
		}));
});

// Scripts
gulp.task('scripts', function() {
	return gulp.src('src/scripts/**/*.js')
		.pipe(jshint('.jshintrc'))
		.pipe(jshint.reporter('default'))
		.pipe(concat('main.js'))
		.pipe(gulp.dest('dist/scripts'))
		.pipe(rename({
			suffix: '.min'
		}))
		.pipe(uglify())
		.pipe(gulp.dest('dist/scripts'))
		.pipe(notify({
			message: 'Scripts task complete'
		}));
});

// Images
gulp.task('images', function() {
	return gulp.src('src/images/**/*')
		.pipe(cache(imagemin({
			optimizationLevel: 3,
			progressive: true,
			interlaced: true
		})))
		.pipe(gulp.dest('dist/images'))
		.pipe(notify({
			message: 'Images task complete'
		}));
});

// Clean
gulp.task('clean', function(cb) {
	del(['dist/assets/css', 'dist/assets/js', 'dist/assets/img'], cb)
});

// Server
gulp.task('webserver', function() {
	gulp.src('src')
		.pipe(server({
			livereload: true,
			directoryListing: true,
			open: true
		}))
		.pipe(notify({
			message: 'Server start'
		}));
});

// Default task
gulp.task('default', ['clean'], function() {
	gulp.start('minify','styles', 'scripts', 'images', 'webserver');
});

// Watch
gulp.task('watch', function() {

	// Watch .scss files
	gulp.watch('src/styles/**/*.scss', ['styles']);

	// Watch .js files
	gulp.watch('src/scripts/**/*.js', ['scripts']);

	// Watch image files
	gulp.watch('src/images/**/*', ['images']);

	// // Create LiveReload server
	// livereload.listen();

	// Watch any files in dist/, reload on change
	gulp.watch(['dist/**']).on('change', livereload.changed);

});