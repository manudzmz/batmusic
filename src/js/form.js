var $ = require('jquery');
var apiClient = require('./api-client');
var songListManager = require('./song-list-manager');

var newSongFormButton = $('.new-song-form button');
var inputs = $(".new-song-form input");

function setLoading() {
	$(inputs).attr("disabled", true);
	newSongFormButton.text("Saving song...").attr("disabled", true);
}

function unsetLoading() {
	$(inputs).attr("disabled", false);
	newSongFormButton.text("Save song").attr("disabled", false);
}

// Al enviar formulario enviamos peticion AJAX para almacenar la cancion
$('.new-song-form').on('submit', function(){

	//	Validacion de inputs
	var inputs = $(".new-song-form").find("input, .drop-zone");
	for (var i = 0; i < inputs.length; i++) {
		var input = inputs[i];
		if (input.checkValidity() == false){
			alert(input.validationMessage);
			input.focus();
			return false;
		}
	}
	
	var audio_file_input = $('#audio_file')[0];
	var audio_file = null;
	if (audio_file_input.file != null) {
		audio_file = audio_file_input.file;
	}

	var cover_file_input = $('#cover_file')[0];
	var cover_file = null;
	if (cover_file_input.file != null) {
		cover_file = cover_file_input.file;
	}

	// cancion que quiero crear
	var song = {
		artist: $('#artist').val(),
		title: $('#title').val(),
		audio_file: audio_file,
		cover_file: cover_file
		// audio_url: $('#audio_url').val(),
		// cover_url: $('#cover_url').val()
	};

	setLoading(); // deshabilito el formulario

	apiClient.save(song, function(response){
		$("form")[0].reset();  // borramos los campos del formulario
		$("#artist").focus();  // pongo el foco en el campo artist
		songListManager.load();
		unsetLoading();
	}, function(){
		console.error('ERROR', response);
		unsetLoading();
	});

	return false;  // e.preventDefault();
});


// detectamos seleccion de archivos
$('input[type="file"]').on('change', function(){
	var reader = new FileReader();
	reader.onload = function (){
		var img = $('<img>');
		img.attr('src', reader.result);
		//$('body').append(img);
	};
	reader.readAsDataURL(this.files[0]);
});


// anulamos el comportamiento por defecto del navegador en el drop
// $('body').on('drop dragover', function(e){
// 	e.preventDefault();
// 	return false;
// });


// manejamos el evento de cuando ponen el archivo encima
$('.drop-zone').on('dragover dragleave', function(e){
	e.preventDefault();
	if (e.type == "dragover"){
		$(this).addClass('drop-here');
	} else {
		$(this).removeClass('drop-here');
	}
	return false;

}).on('drop', function(e){   // manejamos el evento de cuando sueltan el archivo
	var files = e.originalEvent.dataTransfer.files;
	if (files.length > 0){
		var file = files[0];
		$(this).text(file.name);
		this.file = file; 
	}
	e.preventDefault();
	return false; //prevent default

}).each(function(){
	var self = this;

	this.file = null;  // creamos un atributo file en el div.drop-zone con valor null

	this.validationMessage = "Invalid file type";

	this.checkValidity = function (){
		// si el atributo file no es null y el tipo de archivo coincide con el valor de la expresion
		// regular del atributo filetype, entonces es valido
		var regexp = $(self).attr("filetype");
		return self.file != null && self.file.type.match(regexp);
	};
});