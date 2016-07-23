var $ = require('jquery');
var apiClient = require('./api-client');
var utils = require('./utils.js');

module.exports = {
	load: function() {

		apiClient.list(function(response){
			$('.songs-list').html('');
			for (var i in response) {
				var song = response[i];

				var coverUrl = song.cover_url || "";
				if (coverUrl == "") {
					coverUrl = "src/img/disc-placeholder.jpg";
				}

				var id = song.id || "";
				var artist = song.artist || "";
				var title = song.title || "";

				var html = '<article class="song" data-id="' + id + '">';
				html += '<img class="cover" src="' + coverUrl + '">';
				html += '<span class="sprite icon-trash delete-button" title="Delete song"></span>';
				html += '<div class="artist">' + utils.escapeHTML(artist) + '</div>';
				html += '<div class="title">' + utils.escapeHTML(title) + '</div>';
				html += '</article>';
				$('.songs-list').append(html);
			}
		}, function(response){
			console.log('ERROR', response);
		})

	},
}
