var $ = require('jquery');
var songListManager = require("./song-list-manager");

$(".songs-list").on('click', '.delete-button', function() {
	var songId = $(this).parent().data("id");
	console.log("VOY A BORRAR LA CANCION", songId);
	$(this).hide();
	songListManager.delete(songId);
});

