// JavaScript Document
jQuery( document ).ready(function($) {

	var update_car = function( post_id, e ) {
		if (document.getElementById("car_demon_compare") !== null) {
			document.getElementById("car_demon_compare").innerHTML = '...processing';
		}
		var add_it = '0';
		if ( $( e ).prop( 'checked' ) ) {
			add_it = '1';
		} else {
			add_it = '0';
			if ( $( '.compare_' + post_id ).length > 0 ) {
				$( '.compare_' + post_id).prop( 'checked', false );
			}
		}
	
		var no_vehicles_msg = $( '#car_demon_compare_widget' ).data( 'no-vehicles-msg' );

		$.ajax({
			type: 'POST',
			data: {'post_id': post_id, action: 'cd_compare_handler', 'add_it': add_it, 'no_vehicles_msg': no_vehicles_msg},
			url: cdCompareParams.ajaxurl,
			timeout: 5000,
			error: function() {},
			dataType: "html",
			success: function( html ) {
				if ( $( '#car_demon_compare' ).length > 0 ) {
					$( '#car_demon_compare' ).html( html );
				}
				html = html.trim();
				if ( html === '<p></p>' ) {
					$( '#car_demon_compare' ).slideUp();
				} else {
					$( '#car_demon_compare' ).slideDown();
				}
			}
		});

		return true;
	};

	$( document ).on( 'click', '.compare_checkbox', function() {
		var post_id = $( this ).data( 'post-id' );
		update_car( post_id, this );
	});
	
});

function get_compare_list() {
	jQuery.ajax({
		type: 'POST',
		data: {action: 'cd_get_compare_list', 'compare_list': '1'},
		url: cdCompareParams.ajaxurl,
		timeout: 5000,
		error: function() {},
		dataType: "html",
		success: function(html){
			document.getElementById("car_demon_compare_box_main").innerHTML = html;
		}
	})
	return false;
}

function open_car_demon_compare() {
	jQuery("#car_demon_compare_div").lightbox_me({
		overlayCSS: {background: 'black', opacity: .6}
	});
	document.getElementById('car_demon_compare_box').style.display = "block";
	get_compare_list();
}

function close_car_demon_compare() {
	jQuery("#car_demon_compare_div").trigger('close');
}

function print_compare() {
	w=window.open();
	if(!w)alert('Please enable pop-ups');
	var new_print = '<title>'+cdCompareParams.msg1+'</title>';
	var new_print = new_print + '<meta http-equiv="X-UA-Compatible" content="IE8"/>';
	var new_print = new_print + '<link rel="stylesheet" type="text\/css" media="all" href="'+cdCompareParams.css_url+'" />';
	var new_print = new_print + document.getElementById('car_demon_compare_box_list_cars').innerHTML;
	w.document.write(new_print);
	if (navigator.appName == "Microsoft Internet Explorer") {
		w.document.close();
	}
	w.focus();
	w.print();
	w.close();
	return false;
}