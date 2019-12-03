$(document).ready(() => {

	// Materialize components initialization
	$(".button-collapse").sideNav();
	$('.parallax').parallax();
	$(".dropdown-button").dropdown();
	$('#desc-textarea').trigger('autoresize');
	$('.modal').modal();

	// Transform catalog navbar on scroll
	$(window).scroll(() => {
		if($(window).scrollTop() > 0){
			$('#search-nav').removeClass('hide');
			$('#nav').addClass('grey darken-2');
			$('#nav').removeClass('transparent z-depth-0');
		}else{
			$('#search-nav').addClass('hide');
			$('#nav').removeClass('grey darken-2');
			$('#nav').addClass('transparent z-depth-0');
		}

	});

	// Enable editing on profile when edit button is clicked
	$('#edit-button').click(() => {
		$('#profile-name').prop('disabled', false);
		$('#profile-email').prop('disabled', false);
		$('#desc-textarea').prop('disabled', false);
		$('#save').removeClass('hide');
		$('#edit-photo').removeClass('hide');
	});

	// Disable editing on profile when save button is clicked
	$('#save').click(() => {
		$('#profile-name').prop('disabled', true);
		$('#profile-email').prop('disabled', true);
		$('#desc-textarea').prop('disabled', true);
		$('#save').addClass('hide');
		$('#edit-photo').addClass('hide');
	})

	$('.upvotes').click(function(){
		if($(this).next().attr('class') === 'downvotes black-text'){
			$(this).next().removeClass('black-text');
		}
		if($(this).attr('class') === 'upvotes'){
			$(this).addClass('green-text');
		}else{
			$(this).removeClass('green-text');
		}
	});

	$('.downvotes').click(function(){
		if($(this).prev().attr('class') === 'upvotes green-text'){
			$(this).prev().removeClass('green-text');
		}
		if($(this).attr('class') === 'downvotes'){
			$(this).addClass('black-text');
		}else{
			$(this).removeClass('black-text');
		}
	});

	$('.favourite').click(function(){
		if($(this).attr('class') === 'favourite'){
			$(this).addClass('red-text');
		}else{
			$(this).removeClass('red-text');
		}
	});

	$('#details-thumb-up').click(function(){
		if($('#details-thumb-down').attr('class') === 'thumb-down black-text'){
			$('#details-thumb-down').removeClass('black-text');
			$('#downvotes').text('0');
		}
		if($(this).attr('class') === 'thumb-up'){
			$(this).addClass('green-text');
			$(this).next().text('1');
		}else{
			$(this).removeClass('green-text');
			$(this).next().text('0');
		}
	});

	$('#details-thumb-down').click(function(){
		if($('#details-thumb-up').attr('class') === 'thumb-up green-text'){
			$('#details-thumb-up').removeClass('green-text');
			$('#upvotes').text('0');
		}
		if($(this).attr('class') === 'thumb-down'){
			$(this).addClass('black-text');
			$(this).next().text('1');
		}else{
			$(this).removeClass('black-text');
			$(this).next().text('0');
		}
	});

	$('#details-favourite').click(function(){
		if($(this).attr('class') === 'details-favourite'){
			$(this).addClass('red-text');
			$(this).next().text('1');
		}else{
			$(this).removeClass('red-text');
			$(this).next().text('0');
		}
	});

});