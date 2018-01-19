const gulp = require('gulp'),
			php  = require('gulp-connect-php');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const babel = require('gulp-babel');
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync').create();
const reload = browserSync.reload;

gulp.task('php', function() {
		php.server({ base: 'app', port: 8010, keepalive: true});
});

gulp.task('styles', () => {
	return gulp.src('./dev/styles/**/*.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(autoprefixer('last 2 versions', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1'))
		.pipe(concat('style.css'))
		.pipe(gulp.dest('./public/styles/'))
});

gulp.task('watch', () => {
	gulp.watch('./dev/styles/**/*.scss', ['styles']);
	gulp.watch('./dev/scripts/main.js', ['scripts']);
	gulp.watch('*.html', reload);
});

gulp.task('scripts', () => {
	gulp.src('./dev/scripts/main.js')
	.pipe(babel({
		presets: ['es2015']
	}))
	.pipe(gulp.dest('./public/scripts'))
	.pipe(reload({stream: true}));
});

gulp.task('browser-sync', () => {
  browserSync.init({
    server: '.'  
  })
});

gulp.task('default', ['php','browser-sync','styles', 'scripts', 'watch']);
