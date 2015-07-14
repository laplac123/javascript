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
	browserSync = require('browser-sync'),
	jade = require('gulp-jade'),
	htmlmin = require('gulp-htmlmin');

// Jade to HTML
gulp.task('jade', function() {
	var YOUR_LOCALS = {};

	gulp.src('src/*.jade')
		.pipe(jade({
			locals: YOUR_LOCALS,
			pretty: true
		}))
		.pipe(gulp.dest('out'));
});

// Styles
gulp.task('styles', function() {
	return sass('src/styles/main.scss', {
			style: 'expanded'
		})
		.pipe(autoprefixer('last 2 version'))
		.pipe(gulp.dest('out/styles'))
		.pipe(rename({
			suffix: '.min'
		}))
		.pipe(minifycss())
		.pipe(gulp.dest('out/styles'))
		.pipe(notify({
			message: 'Styles task complete'
		}));
});

// Scripts
gulp.task('scripts', function() {
	return gulp.src('src/js/**/*.js')
		.pipe(jshint('.jshintrc'))
		.pipe(jshint.reporter('default'))
		.pipe(concat('main.js'))
		.pipe(gulp.dest('out/js'))
		.pipe(rename({
			suffix: '.min'
		}))
		.pipe(uglify())
		.pipe(gulp.dest('out/js'))
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
		.pipe(gulp.dest('out/images'))
		.pipe(notify({
			message: 'Images task complete'
		}));
});

// move vendor
gulp.task('vendor', function() {
	gulp.src('src/vendor/bootstrap-sass/assets/javascripts/*.js')
		.pipe(gulp.dest('out/vendor/bootstrap-sass/assets/javascripts/'));
	gulp.src('src/vendor/jquery/dist/*')
		.pipe(gulp.dest('out/vendor/jquery/dist/'));
	gulp.src('src/vendor/html-inspector/*.js')
		.pipe(gulp.dest('out/vendor/html-inspector/'));
	gulp.src('src/vendor/lodash/*.js')
		.pipe(gulp.dest('out/vendor/lodash/'));
	gulp.src('src/vendor/bootstrap-sass/assets/fonts/**/*')
	.pipe(gulp.dest('out/fonts/'));
});

// Clean
gulp.task('clean', function(cb) {
	del(['out'], cb)
});

//Clear cache
gulp.task('clear', function (done) {
  return cache.clearAll(done);
});

// Server
gulp.task('serve', [], function() {
	browserSync({
		notify: false,
		server: {
			baseDir: 'out',
			index: 'index.html'
		},
		port: 8000
	});

	gulp.watch(['out/*.html'], browserSync.reload);
	gulp.watch(['out/js/*.js'], browserSync.reload);
	gulp.watch(['out/styles/*.css'], browserSync.reload);
});

// Default task
gulp.task('default', ['clean'], function() {
	gulp.start(
		'clear',
		'jade',
		'styles',
		'scripts',
		'images',
		'vendor',
		'serve',
		'watch');
});

// Watch
gulp.task('watch', function() {

	// Watch .scss files
	gulp.watch('src/styles/**/*.scss', ['styles']);

	// Watch .js files
	gulp.watch('src/js/**/*.js', ['scripts']);

	// Watch image files
	gulp.watch('src/images/**/*', ['images']);

	// Watch jade files
	gulp.watch('src/*', ['jade']);
	gulp.watch('src/layouts/*', ['jade']);

	// Create LiveReload server
	livereload.listen();

	// Watch any files in out/, reload on change
	gulp.watch(['out/**']).on('change', livereload.changed);

});