var $ = require("jquery");

$(".add-icon").on('click', function(){
	$('body').toggleClass('form-shown').toggleClass('song-list-shown');
});