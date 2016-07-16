// importamos gulp
var gulp = require('gulp');
var sass = require('gulp-sass');
var notify = require('gulp-notify');
var browserSync = require('browser-sync').create();

// definimos la tarea por defecto
gulp.task('default', ["compile-sass"], function(){

	// iniciar BrowserSync
	browserSync.init({
		server: "./"  // levanta un servidor web en la carpeta actual
	});

	// observa cambios en archivos sass y compila automaticamente
	gulp.watch('src/scss/*.scss', ['compile-sass']);

	// observa cambios en archivos html y recarga el navegador
	gulp.watch('*.html').on("change", browserSync.reload);
});

// definimos la tarea para compilar Sass
gulp.task('compile-sass', function(){
	gulp.src('./src/scss/style.scss')         // cargamos el archivo
	.pipe(sass().on('error', sass.logError))  // compilamos el archivo sass
	.pipe(gulp.dest('./dist/css'))            // guardamos el archivo en dist/css
	.pipe(notify({
		title: "SASS",
		message: "Compilado"
	}))
	.pipe(browserSync.stream());
});