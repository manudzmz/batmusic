// importamos gulp
var gulp = require('gulp');
var sass = require('gulp-sass');
var notify = require('gulp-notify');

// definimos la tarea por defecto
gulp.task('default', function(){
	gulp.watch('./src/scss/*.scss', ['compile-sass']);
});

// definimos la tarea para compilar Sass
gulp.task('compile-sass', function(){
	gulp.src('./src/scss/style.scss')         // cargamos el archivo
	.pipe(sass().on('error', sass.logError))  // compilamos el archivo sass
	.pipe(gulp.dest('./dist/css'))            // guardamos el archivo en dist/css
	.pipe(notify({
		title: "SASS",
		message: "Compilado"
	}));
});