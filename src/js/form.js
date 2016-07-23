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
	var inputs = $(".new-song-form input");
	for (var i = 0; i < inputs.length; i++) {
		var input = inputs[i];
		if (input.checkValidity() == false){
			alert(input.validationMessage);
			input.focus();
			return false;
		}
	}

	// cancion que quiero crear
	var song = {
		artist: $('#artist').val(),
		title: $('#title').val(),
		audio_url: $('#audio_url').val(),
		cover_url: $('#cover_url').val()
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