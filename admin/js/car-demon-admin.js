// JavaScript Document
jQuery( document ).ready(function($) {
	$('.cd_admin_form h1').on('click', function() {
		if ($(this).next('.cd_location').css('display') == 'none') {
			$(this).next('.cd_location').slideDown();
		} else {
			$(this).next('.cd_location').slideUp();
		}
	});
	$('.cd_welcome_tab_title').on('click', function() {
		$('.cd_welcome_tab_title').removeClass('active');
		$('.cd_welcome_tab').removeClass('active');
		$(this).addClass('active');
		var tab = $(this).data('tab');
		$('#'+tab).addClass('active');
	});
	$('.create_inventory_btn').on('click', function() {
		var page_name = $('.create_inventory').val();
		var include_search = $('.create_inventory_search').prop('checked');
		if (include_search == true) {
			include_search = 'yes';
		}
		var nonce = $( '#cd_create_inventory_nonce' ).val();
		$('.cd_setup_inventory').css('background', '#ffa');
		$.ajax({
			type: 'POST',
			data: {'action': 'create_inventory_page', 'page_name': page_name, 'include_search': include_search, 'nonce': nonce},
			url: cdAdminParams.ajaxurl,
			timeout: 5000,
			error: function() {
				$('.cd_setup_inventory').css('background', '#f99');
				setTimeout( function() {
					$('.cd_setup_inventory').css('background', '');
				}, 3000 );
			},
			dataType: "html",
			success: function(html){
				var new_body = html;
				$('.create_inventory_results').html(html);
				$('.cd_setup_inventory').css('background', '#afa');
				setTimeout( function() {
					$('.cd_setup_inventory').css('background', '');
				}, 3000 );
			}
		});
	});
	$('.cd_insert_samples_btn').on('click', function() {
		$('.cd_sample_inventory').css('background', '#bfb');
		$('.cd_sample_inventory').css('font-weight', 'bold');
		$('.cd_insert_samples_btn').prop('disabled', true);
		var nonce = $( '#cd_insert_samples_nonce' ).val();
		var spinner = '<img src="' + cdAdminParams.spinner + '" />';
		var msg = cdAdminParams.sample_msg;
		var qty = $('.sample_qty').val();
		$('.cd_sample_inventory').html(spinner + ' ' + msg);
		$.ajax({
			type: 'POST',
			data: {'action': 'cd_insert_sample_vehicles', 'qty': qty, 'nonce': nonce},
			url: cdAdminParams.ajaxurl,
			timeout: 135000,
			error: function(html) {
				$('.cd_sample_inventory').html( html );
				$('.cd_sample_inventory').css('background', '');
				$('.cd_sample_inventory').css('color', '');
				$('.cd_insert_samples_btn').prop('disabled', false);
			},
			dataType: "html",
			success: function(html){
				$('.cd_sample_inventory').html( html );
				$('.cd_sample_inventory').css('background', '');
				$('.cd_sample_inventory').css('font-weight', '');
				$('.cd_insert_samples_btn').prop('disabled', false);
			}
		})
	});
	$('.itemtitle').on('click', function() {
		if ($(this).nextAll('.itemcontent').css('display') == 'none') {
			$(this).nextAll('.itemcontent').slideDown();
		} else {
			$(this).nextAll('.itemcontent').slideUp();
		}
	});
	$( ".cd_admin_show_all").on('click', function() {
		var text = $(this).data('open-close-text');
		var status = $(this).data('status');
		var html = $(this).html();
		var option_groups = $('.cd_option_group');
		if (status == 0) {
			option_groups.slideDown();
			$(this).data('status', 1);
		} else {
			option_groups.slideUp();
			$(this).data('status', 0);		
		}
		$(this).html(text);
		$(this).data('open-close-text', html);
	});
	$( ".cd_admin_group legend").on('click', function() {
		var option_group = $(this).next('.cd_option_group');
		if (option_group.css('display') == 'none') {
			option_group.slideDown();
		} else {
			option_group.slideUp();		
		}
	});
	$( "#cd_open_description" ).click(function() {
		$("#description_tab").show( 500, function(){});
	});
	$( "#cd_close_description" ).click(function() {
		$("#description_tab").hide( 500, function(){});
	});
	$( "#cd_add_description" ).click(function() {
		$("#frm_add_description").show( 500, function(){});
	});
	$( "#cancel_description" ).click(function() {
		$("#frm_add_description").hide( 500, function(){});
	});
	
	$( ".open_tab" ).click(function() {
		if (typeof($(this).data('status')) != 'undefined') {
			if ($(this).data('status') == 'closed') {
				$(this).next('div').show( 500, function(){});
				$(this).data('status', 'open')
			} else {
				$(this).next('div').hide( 500, function(){});
				$(this).data('status', 'closed');
			}
		} else {
			$(this).next('div').show( 500, function(){});
			$(this).data('status', 'open')
		}
	});
	
	$( "#cd_close_specs" ).click(function() {
		$("#specs_tab").prev(".open_tab").data('status', 'closed');
		$("#specs_tab").hide( 500, function(){});
	});
	$( "#cd_add_specs" ).click(function() {
		$("#frm_add_specs").show( 500, function(){});
	});
	$( "#cancel_specs" ).click(function() {
		$("#frm_add_specs").hide( 500, function(){});
	});
	
	$( "#cd_close_safety" ).click(function() {
		$("#safety_tab").hide( 500, function(){});
		$("#safety_tab").prev(".open_tab").data('status', 'closed');
	});
	$( "#cd_add_safety" ).click(function() {
		$("#frm_add_safety").show( 500, function(){});
	});
	$( "#cancel_safety" ).click(function() {
		$("#frm_add_safety").hide( 500, function(){});
	});
	
	$( "#cd_close_convenience" ).click(function() {
		$("#convenience_tab").hide( 500, function(){});
		$("#convenience_tab").prev(".open_tab").data('status', 'closed');
	});
	$( "#cd_add_convenience" ).click(function() {
		$("#frm_add_convenience").show( 500, function(){});
	});
	$( "#cancel_convenience" ).click(function() {
		$("#frm_add_convenience").hide( 500, function(){});
	});
	
	$( "#cd_close_comfort" ).click(function() {
		$("#comfort_tab").hide( 500, function(){});
		$("#comfort_tab").prev(".open_tab").data('status', 'closed');
	});
	$( "#cd_add_comfort" ).click(function() {
		$("#frm_add_comfort").show( 500, function(){});
	});
	$( "#cancel_comfort" ).click(function() {
		$("#frm_add_comfort").hide( 500, function(){});
	});
	
	$( "#cd_close_entertainment" ).click(function() {
		$("#entertainment_tab").hide( 500, function(){});
		$("#entertainment_tab").prev(".open_tab").data('status', 'closed');
	});
	$( "#cd_add_entertainment" ).click(function() {
		$("#frm_add_entertainment").show( 500, function(){});
	});
	$( "#cancel_entertainment" ).click(function() {
		$("#frm_add_entertainment").hide( 500, function(){});
	});
	
	$( "#cd_close_about_us" ).click(function() {
		$("#about_us_tab").hide( 500, function(){});
		$("#about_us_tab").prev(".open_tab").data('status', 'closed');
	});
	$( "#cd_add_about_us" ).click(function() {
		$("#frm_add_about_us").show( 500, function(){});
	});
	$( "#cancel_about_us" ).click(function() {
		$("#frm_add_about_us").hide( 500, function(){});
	});
	$(".cd_dynamic_load").on('change', function() {
		if ($(this).val() == 'Yes') {
			$('.cd_auto_load').slideDown();
		} else {
			$('.cd_auto_load').slideUp();
		}
	});
	$('.cd_open_caps').on('click', function() {
		var fld_type = $(this).data('type');
		$('.cd_spec_cap_box.' + fld_type).slideToggle();
	});
	$('.reset_car_demon').on( 'click', function() {
		if ( confirm( cdAdminParams.reset_msg ) ) {
			return true;
		} else {
			return false;
		}
	});

	var cd_manage_vehicle_photos = function() {
        var custom_uploader = wp.media({
        	id: 'cd-frame',
            title: cdAdminParams.str_manage_vehicle_photos,
            editing:   true,
            multiple:  true,
            library: {
	            type: 'image'
            },
            button: {
                text: cdAdminParams.str_attach_photos_to_vehicle
            },
        })
        .on('select', function() {
			var selection = custom_uploader.state().get('selection');
            var post_id = document.getElementById('attachment_post_id').value;
     		selection.map( function( attachment ) {
                attachment = attachment.toJSON();
                // Do something with attachment.id and/or attachment.url here
				cd_manage_photos(post_id, attachment.id);
			});
        })
        .open();
    };

	$( document ).on( 'click', '.manage_vehicle_photos', function() {
		cd_manage_vehicle_photos();
	});

	var cd_update_image_order = function( linked, attached ) {
		var nonce = $( '#cd_edit_vehicle_nonce' ).val();
		linked = JSON.stringify( linked );
		attached = JSON.stringify( attached );
		var post_id = $( '#car_photo_links' ).data( 'post-id' );
		$.ajax({
			type: 'POST',
			data: {'action': 'cd_update_image_order', 'post_id': post_id, 'linked': linked, 'attached': attached, 'nonce': nonce},
			url: cdAdminParams.ajaxurl,
			timeout: 15000,
			error: function() {},
			dataType: "html",
			success: function( html ) {
				console.log( html );
			}
		});
	};

	var cd_get_image_order = function() {
		var linked = {};
		var link_list = '';
		var attached = {};
		var cnt = 0;
		var src = '';
		var type = 'linked';
		$( '.car_photo_admin_box' ).each( function( i, e ) {
			++cnt;
			src = $( e ).data( 'src' );
			type = $( e ).data( 'type' );
			if ( 'linked' === type ) {
				linked[ cnt ] = src;
				link_list = link_list + ',' + src;
			} else {
				attached[ cnt ] = src;
			}
			link_list = '##' + link_list;
			link_list = link_list.replace( '##,', '' );
			link_list = link_list.replace( '##', '' );
			$( '.cd_image_links_list' ).val( link_list );
		});
		cd_update_image_order( linked, attached );
	};

	var cd_update_image_links = function( image_links ) {
		$( '.cd_image_links_list' ).css( 'background-color', '#ffc' );
		post_id = $( '#car_photo_links' ).data( 'post-id' );
		var nonce = $( '#cd_update_image_links_nonce' ).val();
		var valid = cd_validate_image_urls( image_links );
		if ( false === valid ) {
			$( '.cd_image_links_list' ).css( 'background-color', '#fdd' );
			console.log( cdAdminParams.bad_image_links );
			console.log( image_links );
			alert( cdAdminParams.bad_image_links );
			setTimeout( function() {
				$( '.cd_image_links_list' ).css( 'background-color', 'transparent' );
			}, 3000 );
			return;
		}

		$.ajax({
			type: 'POST',
			data: {'action': 'cd_update_image_links', 'post_id': post_id, 'nonce': nonce, 'image_links': image_links},
			url: cdAdminParams.ajaxurl,
			timeout: 15000,
			error: function() {},
			dataType: "html",
			success: function( html ) {
				console.log( html );
				$( '.cd_image_links_list_wrap' ).slideUp();
				$( '.cd_edit_image_links' ).data( 'status', 'closed' );
				$( '.cd_image_links_list' ).css( 'background-color', '#dfd' );
				$( '#car_photo_links' ).css( 'background-color', '#dfd' );
				post_id = $( '#car_photo_links' ).data( 'post-id' );
				var image_links = $( '.cd_image_links_list' ).val();
				var image = image_links.split( ',' );
				var photo_box = cdAdminParams.photo_box;
				var cnt = 0;
				var image_html = '';
				var linked_images_html = '';
				$.each( image, function( i, e ) {
					++cnt;
					image_html = photo_box;
					image_html = image_html.replace(/POST_ID/g, post_id);
					image_html = image_html.replace(/CNT/g, cnt);
					image_html = image_html.replace(/THUMBNAIL/g, e);
					image_html = image_html.replace(/SRC_ID/g, e);
					image_html = image_html.replace(/TYPE/g, 'linked');
					linked_images_html += image_html;
				});
				$( '#car_photo_links' ).html( linked_images_html );
				setTimeout( function() {
					$( '.cd_image_links_list' ).css( 'background-color', 'transparent' );
					$( '#car_photo_links' ).css( 'background-color', 'transparent' );
				}, 3000 );
			}
		});
	};

	var cd_validate_image_urls = function( image_links ) {
		var urls = image_links.replace(/\s/g,'').split(",");
		var regex = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/;
		var valid = true;
		for (var i = 0; i < urls.length; i++) {
			 if( urls[i] === "" || ! regex.test(urls[i])){
				 valid = false;
			 }
		}
		return valid;
	};

	$( document ).on( 'click', '.cd_update_image_links_btn', function() {
		var image_links = $( '.cd_image_links_list' ).val();
		cd_update_image_links( image_links );
	});

	var cd_update_main_image = function( attachment_id ) {
		var nonce = $( '#cd_edit_vehicle_nonce' ).val();
		$( '.cd_main_image_wrapper' ).css( 'background-color', '#ffc' );
		post_id = $( '#car_photo_links' ).data( 'post-id' );
		$.ajax({
			type: 'POST',
			data: {'action': 'cd_update_main_image', 'post_id': post_id, 'attachment_id': attachment_id, 'nonce': nonce},
			url: cdAdminParams.ajaxurl,
			timeout: 15000,
			error: function() {},
			dataType: "html",
			success: function( html ) {
				console.log( html );
				$( '.cd_main_image_wrapper' ).css( 'background-color', 'transparent' );
			}
		});
	};
	
	if ( $( '#car_photo_attachments' ).length > 0 ) {
		$( '#car_photo_attachments' ).sortable({
			connectWith: '.connectedSortable',
			stop: function(event, ui) {
				cd_get_image_order();
			}
		}).disableSelection();

		$( '.cd_main_image' ).sortable();
		
		$( '#car_photo_attachments, .cd_main_image').droppable({
			accept: '.item-container',
			drop: function (e, ui) {
				var dropped = ui.draggable;
				var droppedOn = $(this);
				$(this).append(dropped.clone().removeAttr( 'style' ).removeClass( 'item-container' ).addClass( 'item' ));
				dropped.remove();
			}
		});

		//= If one of the attached images is dropped on the main image container then update the main image
		$( '.cd_main_image' ).droppable({
			accept: '.car_photo_admin_box_attached',
			drop: function (e, ui) {
				var dropped = ui.draggable;
				var droppedOn = $( this );
				var src = $( dropped.clone()[0] ).find( '.car_demon_thumbs' ).attr( 'src' );
				var attachment_id = $( dropped.clone()[0] ).data( 'post-id' );
				//= Update our thumbnail
				$( '.cd_main_image img' ).attr( 'src', src );
				//= Update the native WordPress Featured Image
				$( '#set-post-thumbnail img' ).attr( 'src', src );
				//= Remove the srcset so the new image will display
				$( '#set-post-thumbnail img' ).attr( 'srcset' , '' );
				//= Call our ajax function to update the main image
				cd_update_main_image( attachment_id );
			}
		});
	}

	if ( $( '#car_photo_links' ).length > 0 ) {
		$( '#car_photo_links' ).sortable({
			connectWith: '.connectedSortable',
			stop: function(event, ui) {
				cd_get_image_order();
			}
		}).disableSelection();
	}

	var cd_reverse_attached_images = function() {
		var ul = $('#car_photo_links'); // your parent ul element
		ul.children().each(function(i,li){ul.prepend(li)})

		ul = $('#car_photo_attachments'); // your parent ul element
		ul.children().each(function(i,li){ul.prepend(li)})
	}
	
	$( document ).on( 'click', '.cd_reverse_attachments_btn', function() {
		cd_reverse_attached_images();
		cd_get_image_order();
	});
	
	if ( $( '.cd_link_main_image_true' ).length > 0 ) {
		$( '#postimagediv' ).css( 'display', 'none' );
		$( '#postimagediv-hide' ).prop( 'checked', false );
	}
	
	$( document ).on( 'click', '.cd_edit_image_links', function() {
		var status = $( this ).data( 'status' );
		if ( 'closed' === status ) {
			$( '.cd_image_links_list_wrap' ).slideDown();
			$( this ).data( 'status', 'open' );
		} else {
			$( '.cd_image_links_list_wrap' ).slideUp();
			$( this ).data( 'status', 'closed' );
		}
	});

	$( document ).on( 'click', '.cd_close_image_links', function() {
		$( '.cd_image_links_list_wrap' ).slideUp();
		$( '.cd_edit_image_links' ).data( 'status', 'closed' );
	});

	$( document ).on( 'click', '#set-post-thumbnail-btn', function() {
		$( '#set-post-thumbnail' ).trigger( 'click' );
	});

	$( document ).on( 'click', '#remove-post-thumbnail-btn', function() {
		$( '#remove-post-thumbnail' ).trigger( 'click' );
		var no_photo = cdAdminParams.no_photo;
		$( '.cd_main_image img' ).attr( 'src', no_photo );
	});

	var remove_car_image = function( post_id, car_link, cnt, src_id, type ) {
		var nonce = document.getElementById( 'cd_edit_vehicle_nonce' ).value;
		if ( confirm( cdAdminParams.remove_image_msg ) ) {
			$( '#car_photo_' + cnt + '_' + type ).slideUp();
			var data_obj = {};
			if ( 'linked' === type ) {
				data_obj = {'post_id': post_id, 'action': 'cd_ajax_handler', 'car_link': car_link, 'option': 'remove_car_linked_image', 'type': type, 'cnt': cnt, 'nonce': nonce};
			} else {
				data_obj = {'post_id': post_id, 'action': 'cd_ajax_handler', 'attachment_id': src_id, 'option': 'remove_car_attached_image', 'type': type, 'cnt': cnt, 'nonce': nonce};
			}
			jQuery.ajax({
				type: 'POST',
				data: data_obj,
				url: cdAdminParams.ajaxurl,
				timeout: 15000,
				error: function() {
					console.log( 'Error - Image NOT removed' );
				},
				dataType: 'json',
				success: function( json ) {
					$( '#car_photo_' + json.cnt + '_' + json.type ).remove();
					console.log( json );
					console.log( json.msg );
					cd_get_image_order();
				}
			});
		}
	};

	$( document ).on( 'click', '.car_photo_remove', function() {
		var post_id = $( '#car_photo_links' ).data( 'post-id' );
		var car_link = $( this ).data( 'car-link' );
		var cnt = $( this ).data( 'cnt' );
		var src_id = $( this ).data( 'src-id' );
		var type = $( this ).data( 'type' );
		remove_car_image( post_id, car_link, cnt, src_id, type );
	});

	if ( $( '.post-type-cars_for_sale #set-post-thumbnail' ).length > 0 ) {
		//= https://wordpress.stackexchange.com/questions/228279/trigger-js-in-custom-meta-box-if-a-featured-image-is-loaded-exists
		MutationObserver = window.MutationObserver || window.WebKitMutationObserver;
		
		var observer = new MutationObserver(function(mutations, observer) {
			//= Fires every time a mutation occurs...
			//= forEach all mutations
			mutations.forEach(function(mutation) {
				//= Loop through added nodes
				for (var i = 0; i < mutation.addedNodes.length; ++i) {
					//= Any images added?
					if ( mutation.addedNodes[i].getElementsByTagName('img').length > 0) {
						//= Your featured image now exists
						var src = $('#set-post-thumbnail img').attr( 'src' );
						$( '#set-post-thumbnail-btn' ).attr( 'src', src );
					}
				}
			});
		});
		
		//= Define what element should be observed (#postimagediv is the container for the featured image)
		//= and what types of mutations trigger the callback
		var $element = $('#postimagediv');
		var config = { subtree: true, childList: true, characterData: true };
		
		observer.observe( $element[0], config );
	}

});

function update_default_labels(fld) {
	var field = fld.id;
	var label = fld.value;
	var nonce = jQuery( '#update_default_labels_nonce' ).val();
	jQuery.ajax({
		type: 'POST',
		data: {'action': 'car_demon_update_default_labels', 'field': field, 'label': label, 'nonce': nonce},
		url: cdAdminParams.ajaxurl,
		timeout: 5000,
		error: function() {},
		dataType: "html",
		success: function(html){
			var new_body = html;
			document.getElementById(field).style.background = "#99CC99";
			var delay = function() { document.getElementById(field).style.background = "" };
			setTimeout(delay, 1000);
		}
	})
	return false;
}

function show_hide_default_fields(fld) {
	var field = fld.value;
	var checked = fld.checked;
	var nonce = jQuery( '#update_default_labels_nonce' ).val();
	jQuery.ajax({
		type: 'POST',
		data: {'action': 'car_demon_update_default_fields', 'field': field, 'checked': checked, 'nonce': nonce},
		url: cdAdminParams.ajaxurl,
		timeout: 5000,
		error: function() {},
		dataType: "html",
		success: function(html){
			var new_body = html;
			document.getElementById('sh_'+field).style.background = "#99CC99";
			var delay = function() { document.getElementById('sh_'+field).style.background = "" };
			setTimeout(delay, 1000);
		}
	})
	return false;
}

function add_option_group(group) {
	var group_options = document.getElementById('group_options_'+group).value;
	var title = document.getElementById('group_option_title_'+group).value;
	var fail = 0;
	var nonce = jQuery( '#option_group_nonce' ).val();
	if (group_options=='') {
		var fail = 1;	
	}
	if (title=='') {
		var fail = 1;	
	}
	if (fail == 0) {
		jQuery.ajax({
			type: 'POST',
			data: {'action': 'car_demon_add_option_group', 'group': group, 'title': title, 'group_options': group_options, 'nonce': nonce},
			url: cdAdminParams.ajaxurl,
			timeout: 5000,
			error: function() {},
			dataType: "html",
			success: function(html){
				var new_body = html;
				location.reload();
			}
		})
		return false;
	} else {
		alert(cdAdminParams.error1);
	}
}

function remove_option_group(group, group_title) {
	var nonce = jQuery( '#option_group_nonce' ).val();
	jQuery.ajax({
		type: 'POST',
		data: {'action': 'car_demon_remove_option_group', 'group': group, 'group_title': group_title, 'nonce': nonce},
		url: cdAdminParams.ajaxurl,
		timeout: 5000,
		error: function() {},
		dataType: "html",
		success: function( group_title ) {
			var new_body = group_title;
			document.getElementById( 'group_' + group_title ).style.display = 'none';
		}
	})
	return false;
}

function update_option_group(group, group_title) {
	var group_options = document.getElementById('vehicle_option_group_items_'+group_title).value;
	var group_title = document.getElementById('vehicle_option_group_'+group_title).value;
	var nonce = jQuery( '#option_group_nonce' ).val();
	jQuery.ajax({
		type: 'POST',
		data: {'action': 'car_demon_update_option_group', 'group': group, 'group_title': group_title, 'group_options': group_options, 'nonce': nonce},
		url: cdAdminParams.ajaxurl,
		timeout: 5000,
		error: function() {},
		dataType: "html",
		success: function(html){
			var new_body = html;
			alert(cdAdminParams.msg_update);
		}
	})
	return false;
}

function update_car(post_id, this_fld, fld) {
	var new_value = this_fld.value;

	if ( cdAdminParams.non_numeric_price == 'No' ) {
		// clean up price fields
		if ( fld == '_msrp_value' || fld == '_rebates_value' || fld == '_discount_value' || fld == '_price_value' ) {
			// remove commas & US currency symbol
			new_value = new_value.replace(/\$|,/g, "");
			// remove non numeric characters
			new_value = new_value.replace(/\D/g,'');
			// set clean value to the form field
			this_fld.value = new_value;
			// if it still isn't numeric then set it to 0 and alert users
			if ( cd_isNumeric( new_value ) !== true ) {
				this_fld.value = '0';
				new_value = '0';
				setTimeout( function() {
					alert( cdAdminParams.bad_price_msg );
				}, 300 );
			}
		}
	}
	var nonce = jQuery( '#car_demon_admin_update_nonce_' + post_id ).val();

	jQuery.ajax({
		type: 'POST',
		data: {'action': 'car_demon_admin_update', 'post_id': post_id, 'val': new_value, 'fld': fld, 'nonce': nonce},
		url: cdAdminParams.ajaxurl,
		timeout: 5000,
		error: function() {},
		dataType: "html",
		success: function(html){
		var new_body = html;
			this_fld.style.background = "#99CC99";
			var delay = function() { this_fld.style.background = "#FFFFFF" };
			setTimeout(delay, 1000);
			if (document.getElementById("msrp_"+post_id)) {
				var msrp = document.getElementById("msrp_"+post_id).value;
			} else {
				var msrp = 0;	
			}
			if (document.getElementById("rebate_"+post_id)) {
				var rebate = document.getElementById("rebate_"+post_id).value;
			} else {
				var rebate = 0;	
			}
			if (document.getElementById("discount_"+post_id)) {
				var discount = document.getElementById("discount_"+post_id).value;				
			} else {
				var discount = 0;	
			}
			if (document.getElementById("price_"+post_id)) {
				var price = document.getElementById("price_"+post_id).value;
			} else {
				var price = 0;	
			}
			if (msrp == "") { msrp = 0; }
			if (rebate == "") { rebate = 0; }
			if (discount == "") { discount = 0; }
			if (price == "") { price = 0; }
			msrp = parseInt(msrp);
			rebate = parseInt(rebate);
			discount = parseInt(discount);
			price = parseInt(price);
			var calc_price = msrp - rebate - discount;
			document.getElementById("calc_price_"+post_id).innerHTML = calc_price
			document.getElementById("calc_discounts_"+post_id).innerHTML = rebate + discount;
			if (price != calc_price) {
				if (msrp != 0) {
					document.getElementById("price_"+post_id).style.background = "#FFB3B3";
					document.getElementById("calc_error_"+post_id).innerHTML = "Calc Error: " + (calc_price - price) + "<br />";
				}
				else {
					document.getElementById("price_"+post_id).style.background = "#FFFFFF";
					document.getElementById("calc_error_"+post_id).innerHTML = "";
				}
			}
			else {
				document.getElementById("calc_error_"+post_id).innerHTML = "";
				document.getElementById("price_"+post_id).style.background = "#FFFFFF";
			}
		}
	})
	return false;
}
function update_car_sold(post_id, this_fld, fld) {
	var new_value = this_fld.options[this_fld.selectedIndex].value;
	var nonce = jQuery( '#car_demon_admin_update_nonce_' + post_id ).val();
	jQuery.ajax({
		type: 'POST',
		data: {'action': 'car_demon_admin_update', 'post_id': post_id, 'val': new_value, 'fld': fld, 'nonce': nonce},
		url: cdAdminParams.ajaxurl,
		timeout: 5000,
		error: function() {},
		dataType: "html",
		success: function(html){
		var new_body = html;
			this_fld.style.background = "#99CC99";
			var delay = function() { this_fld.style.background = "#FFFFFF" };
			setTimeout(delay, 1000);
		}
	})
	return false;
}
function show_custom_slide(slide_num) {
	document.getElementById("custom_slide_"+slide_num).style.display = "inline";
	document.getElementById("show_slide_"+slide_num).style.display = "none";
	document.getElementById("hide_slide_"+slide_num).style.display = "inline";
}
function hide_custom_slide(slide_num) {
	document.getElementById("custom_slide_"+slide_num).style.display = "none";
	document.getElementById("show_slide_"+slide_num).style.display = "inline";
	document.getElementById("hide_slide_"+slide_num).style.display = "none";
}
function clear_custom_slide(slide_num) {
	document.getElementById("custom_slide"+slide_num+"_title").value = "";
	document.getElementById("custom_slide"+slide_num+"_img").value = "";
	document.getElementById("custom_slide"+slide_num+"_link").value = "";
	document.getElementById("custom_slide"+slide_num+"_text").value = "";
}
function fnMoveItems(lstbxFrom,lstbxTo) {
	var varFromBox = document.all(lstbxFrom);
	var varToBox = document.all(lstbxTo); 
	if ((varFromBox != null) && (varToBox != null)) { 
		if (varFromBox.length < 1) {
			alert('There are no items in the source ListBox');
			return false;
		}
		if (varFromBox.options.selectedIndex == -1) { // when no Item is selected the index will be -1
			alert('Please select an Item to move');
			return false;
		}
		while ( varFromBox.options.selectedIndex >= 0 ) { 
			var newOption = new Option(); // Create a new instance of ListItem 
			newOption.text = varFromBox.options[varFromBox.options.selectedIndex].text; 
			newOption.value = varFromBox.options[varFromBox.options.selectedIndex].value; 
			var OldToDoBox = varToBox.value + ',';
			OldToDoBox = OldToDoBox.trim();
			if (OldToDoBox==',') {
				OldToDoBox = '';
			}
			varToBox.value = OldToDoBox + varFromBox.options[varFromBox.selectedIndex].text;
			varFromBox.remove(varFromBox.options.selectedIndex); //Remove the item from Source Listbox 
		} 
	}
	return false; 
}
function ImgError(source, pic){
	source.src = pic;
	source.onerror = '';
	return true;
}
function cd_isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}