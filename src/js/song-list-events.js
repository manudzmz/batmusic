var $ = require('jquery');
var apiClient = require("./api-client");

$(".songs-list").on('click', '.delete-button', function() {
	var self = this;
	var songId = $(this).parent().data("id");
	console.log("VOY A BORRAR LA CANCION", songId);
	$(this).hide();
	apiClient.delete(songId, function(response){
		$(self).parent().remove();
	}, function(response){
		alert("Error while deleting the song");
	});
});

$('.songs-list').on('click', '.song', function(){
	var songId = $(this).data("id");
	localStorage.setItem("lastSong", songId);
	console.log("CANCION SELECCIONADA", songId);
});