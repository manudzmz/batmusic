var $ = require('jquery');
var songListManager = require("./song-list-manager");

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
	song = {
		artist: $('#artist').val(),
		title: $('#title').val(),
		audio_url: $('#audio_url').val(),
		cover_url: $('#cover_url').val()
	}

	// peticion AJAX para guardar la informacion en el backend
	$.ajax({
		url: '/api/songs',
		method: 'post',
		data: song,
		beforeSend: function() {
			$(inputs).attr("disabled", true);
			$('.new-song-form button').text("Saving song...").attr("disabled", true);

		},
		success: function(response) {
			console.log('SUCCESS', response);
			$("form")[0].reset();  // borramos los campos del formulario
			$("#artist").focus();  // pongo el foco en el campo artist
			songListManager.load();
		},
		error: function() {
			console.log('ERROR', response);
		},
		complete: function() {
			$(inputs).attr("disabled", false);
			$('.new-song-form button').text("Save song").attr("disabled", false);
		}
	});

	return false;  // e.preventDefault();
});