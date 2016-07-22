var $ = require('jquery');
var utils = require('./utils.js');

module.exports = {
	load: function() {
		// peticion AJAX para cargar la lista de canciones al cargar la página
		$.ajax({
			url: "/api/songs/?_order=id",
			success: function(response) {
				$('.songs-list').html('');
				for (var i in response) {
				var song = response[i];

				var coverUrl = song.cover_url || "";
				if (coverUrl == "") {
					coverUrl = "src/img/disc-placeholder.jpg";
				}

				var artist = song.artist || "";
				var title = song.title || "";

				var html = '<article class="song">';
				html += '<img class="cover" src="' + coverUrl + '">';
				html += '<img class="delete-button" src="src/img/icon-trash.png" title="Delete song">';
				html += '<div class="artist">' + utils.escapeHTML(artist) + '</div>';
				html += '<div class="title">' + utils.escapeHTML(title) + '</div>';
				html += '</article>';
				$('.songs-list').append(html);
				}
			},
			error: function(response) {
				console.log('ERROR', response);
			}
		});
	}
}
