$(document).ready(function(){

	//Materialize components initialization
	$(".button-collapse").sideNav();
	$('.parallax').parallax();
	$(".dropdown-button").dropdown();
	$('#desc-textarea').trigger('autoresize');
	$('.modal').modal();

	//Transform catalog navbar on scroll
	$(window).scroll(function(){
		if($(window).scrollTop() > 0){
			$('#search-nav').removeClass('hide');
			$('#nav').addClass('red darken-2');
			$('#nav').removeClass('transparent z-depth-0');
		}else{
			$('#search-nav').addClass('hide');
			$('#nav').removeClass('red darken-2');
			$('#nav').addClass('transparent z-depth-0');
		}

	});

	//Enable editing on profile when edit button is clicked
	$('#edit-button').click(function(){
		$('#name').prop('disabled', false);
		$('#desc-textarea').prop('disabled', false);
		$('#save').removeClass('hide');
		$('#edit-photo').removeClass('hide');
	});

	//Disable editing on profile when save button is clicked
	$('#save').click(function(){
		$('#name').prop('disabled', true);
		$('#desc-textarea').prop('disabled', true);
		$('#save').addClass('hide');
		$('#edit-photo').addClass('hide');
	})

});