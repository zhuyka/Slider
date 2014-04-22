//$(document).ready(

//$(function(){})  - заменяет $(document).ready(function() {})
//$('ТУТ НУЖНЫЙ ДИВ').НАЗВАНИЕ_ПЛАГИНА({опция1:true,опция2: false});
$(function() {
	$('.secondSlider').unislider({
		circular: true,
		thumbnails: false,
		quantity: 4,
		thumbnailsQuantity: 6
	});
});