// importamos gulp
var gulp = require('gulp');
var sass = require('gulp-sass');
var notify = require('gulp-notify');
var browserSync = require('browser-sync').create();
var browserify = require('browserify');
var tap = require('gulp-tap');
var buffer = require('gulp-buffer');

// variables de patrones de archivos
var jsFiles = ["src/js/*.js", "src/js/**/*.js"];

// definimos la tarea por defecto
gulp.task('default', ["concat-js", "compile-sass"], function(){

	// iniciar BrowserSync
	browserSync.init({
		// server: "./"  // levanta un servidor web en la carpeta actual
		proxy: "127.0.0.1:8000"  // actua como proxy enviando peticiones a sparRest
	});

	// observa cambios en archivos sass y compila automaticamente
	gulp.watch('src/scss/*.scss', ['compile-sass']);

	// observa cambios en archivos html y recarga el navegador
	gulp.watch('*.html').on("change", browserSync.reload);

	// observa cambios en los archivos js para concatenar
	gulp.watch(jsFiles, ['concat-js']);
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

// definimos la tarea para concatenar js
gulp.task("concat-js", function(){
	gulp.src("src/js/app.js")
	.pipe(tap(function(file){  // tap ejecuta un codigo por cada fichero seleccionado en el paso anterior
		file.contents = browserify(file.path).bundle();  // pasamos el archivo por browserify para importar los require
	}))  
	.pipe(buffer())  // convierte cada archivo en un stream
	.pipe(gulp.dest("dist/js"))
	.pipe(notify({
		title: "JS",
		message: "Concatenado"
	}))
	.pipe(browserSync.stream());
});