// JavaScript Document
function remove_decode(post_id) {
	var nonce = document.getElementById( 'cd_edit_vehicle_nonce' ).value;
	jQuery.ajax({
		type: 'POST',
		data: {'post_id': post_id, 'action': 'cd_ajax_handler', 'option': 'decode_remove', 'nonce': nonce},
		url: cdVinQueryParams.ajaxurl,
		timeout: 5000,
		error: function() {},
		dataType: "html",
		success: function(html){
			window.location.reload();
		}
	})
}

function update_vehicle_data(fld, post_id) {
	var fld_name = fld.id;
	var val = fld.value;
	var nonce = document.getElementById( 'cd_edit_vehicle_nonce' ).value;
	jQuery.ajax({
		type: 'POST',
		data: {'post_id': post_id, 'action': 'cd_ajax_handler', 'fld': fld_name, 'val': val, 'option': 'update_data', 'nonce': nonce},
		url: cdVinQueryParams.ajaxurl,
		timeout: 5000,
		error: function() {},
		dataType: "html",
		success: function(html){
			document.getElementById(fld_name).style.background = "#00FF00";
			var delay = function() {
				document.getElementById(fld_name).style.background = "#FFFFFF";
				};
			setTimeout(delay, 2500);
		}
	})
}

function update_admin_decode(fld, post_id) {
	var fld_name = fld.id;
	var val = fld.value;

	if ( cdAdminParams.non_numeric_price == 'No' ) {
		// clean up price fields
		if ( fld_name == 'msrp' || fld_name == 'rebates' || fld_name == 'discount' || fld_name == 'price' || fld_name == 'mileage' ) {
			// remove commas & US currency symbol
			val = val.replace(/\$|,/g, "");
			// remove non numeric characters
			val = val.replace(/\D/g,'');
			// set clean value to the form field
			fld.value = val;
			// if it still isn't numeric then set it to 0 and alert users
			if ( cd_isNumeric( val ) !== true ) {
				fld.value = '0';
				val = '0';
				setTimeout( function() {
					alert( cdAdminParams.bad_price_msg );
				}, 300 );
			}
		}
	}
	
	var loading = cdVinQueryParams.car_demon_path+"images/wpspin_light.gif";
	document.getElementById(fld_name).style.backgroundPosition = "right center";
	document.getElementById(fld_name).style.backgroundRepeat = "no-repeat";
	document.getElementById(fld_name).style.backgroundImage = "url("+loading+")";
	var nonce = document.getElementById( 'cd_edit_vehicle_nonce' ).value;
	jQuery.ajax({
		type: 'POST',
		data: {'post_id': post_id, 'action': 'cd_ajax_handler', 'fld': fld_name, 'val': val, 'option': 'update_data', 'nonce': nonce},
		url: cdVinQueryParams.ajaxurl,
		timeout: 5000,
		error: function() {},
		dataType: "html",
		success: function(html){
			document.getElementById(fld_name).style.background = "#00FF00";
			var delay = function() {
				document.getElementById(fld_name).style.background = "#FFFFFF";
				};
			setTimeout(delay, 2500);
		}
	})
}

function update_decode_option(fld, post_id) {
	var fld_name = fld.id;
	var val = fld.value;
	if (val == "") {
		var img = cdVinQueryParams.car_demon_path+"theme-files/images/spacer.gif";
	}
	else if (val == "Std.") {
		var img = cdVinQueryParams.car_demon_path+"theme-files/images/opt_standard.gif";
	}
	else if (val == "Opt.") {
		var img = cdVinQueryParams.car_demon_path+"theme-files/images/opt_optional.gif";
	}
	else if (val == "N/A") {
		var img = cdVinQueryParams.car_demon_path+"theme-files/images/opt_na.gif";
	}
	var nonce = document.getElementById( 'cd_edit_vehicle_nonce' ).value;
	jQuery.ajax({
		type: 'POST',
		data: {'post_id': post_id, 'action': 'cd_ajax_handler', 'fld': fld_name, 'val': val, 'option': 'update_data', 'nonce': nonce},
		url: cdVinQueryParams.ajaxurl,
		timeout: 5000,
		error: function() {},
		dataType: "html",
		success: function(html){
			document.getElementById("img_"+fld_name).src = img;
			document.getElementById("img_"+fld_name).style.width = "22px";
			document.getElementById("img_"+fld_name).style.height = "24px";
			document.getElementById(fld_name).style.background = "#00FF00";
			var delay = function() {
				document.getElementById(fld_name).style.background = "#FFFFFF";
				};
			setTimeout(delay, 2500);
		}
	})
}

function car_demon_switch_tabs(active, number, tab_prefix, content_prefix) {
	for (var i=1; i < number+1; i++) {  
	  document.getElementById(content_prefix+i).style.display = 'none';  
	  document.getElementById(tab_prefix+i).className = '';  
	}
	document.getElementById(content_prefix+active).style.display = 'block';
	document.getElementById(tab_prefix+active).className = 'active'; 
}

function edit_decode_vin(post_id) {
	jQuery("#car_demon_light_box").lightbox_me({
		overlayCSS: {background: 'black', opacity: .6}
	});
	document.getElementById("vin_decode_options_"+post_id).style.display = "inline";
}

function close_car_demon_lightbox() {
	jQuery("#car_demon_light_box").trigger('close');
}

function activate_vehicle() {
	var go = 1;
	if (document.getElementById("title").value == "") {var go = 0; var msg = "Title"}
	if (document.getElementById("stock_num").value == "") {var go = 0; var msg = "Stock Number"}
	if (document.getElementById("vin").value == "") {var go = 0; var msg = "VIN"}
	if (document.getElementById("selling_price").value == "") {var go = 0; var msg = "Selling Price"}
	if (document.getElementById("year").value == "") {var go = 0; var msg = "Year"}
	if (document.getElementById("make").value == "") {var go = 0; var msg = "Make"}
	if (document.getElementById("model").value == "") {var go = 0; var msg = "Model"}
	if (document.getElementById("mileage").value == "") {var go = 0; var msg = "Mileage"}
	if (go == 0) {
		document.getElementById("status_yes").checked = false;
		document.getElementById("status_no").checked = true;
		alert("You must fill out the "+ msg +" field before you can mark this vehicle as ready for Sale.");
	} else {
		alert("All Good");
	}
}

function dashboard_decode_vin(post_id) {
	var vin = document.getElementById("cd_vin").value;
	var title = document.getElementById("cd_title").value;
	var stock = document.getElementById("cd_stock").value
	var vin_status = validate_vin(vin);
	var nogo = 0;
	if (stock == "") { nogo = 1; }
	if (title == "") { nogo = 1; }
	if (nogo == 0) {
		if (vin_status == 1) {
			var loading = "<span class='decode_loading'><img src='"+cdVinQueryParams.car_demon_path+"images/wpspin_light.gif'>&nbsp;Loading...</span>";
			document.getElementById("decode_results").style.display = 'block';
			document.getElementById("decode_results").innerHTML = loading;
			var nonce = document.getElementById( 'cd_edit_vehicle_nonce' ).value;
			jQuery.ajax({
				type: 'POST',
				data: {'post_id': post_id, 'action': 'cd_ajax_handler', 'vin': vin, 'title': title, 'stock': stock, 'option': 'dashboard', 'nonce': nonce},
				url: cdVinQueryParams.ajaxurl,
				timeout: 5000,
				error: function() {},
				dataType: "html",
				success: function(html){
				var new_body = html;
					window.location = html;
				}
			})
		}
	} else {
		dashboard_send_alert();
	}
	return false;
}

function dashboard_send_alert() {
	document.getElementById("alert_msg").style.display = "block"; 
	document.getElementById("alert_msg").innerHTML = "You must fill out all fields.";
	document.getElementById("cd_title").style.background = "#FF0000";
	document.getElementById("cd_stock").style.background = "#FF0000";
	var delay = function() { 
		document.getElementById("cd_title").style.background = "#FFFFFF";
		document.getElementById("cd_stock").style.background = "#FFFFFF";
		document.getElementById("alert_msg").style.display = "none"; 
		};
	setTimeout(delay, 2500);
}

function decode_vin(post_id) {
	var loading = "<span class='decode_loading'><img src='"+cdVinQueryParams.car_demon_path+"images/wpspin_light.gif'>&nbsp;Loading...</span>";
	if (document.getElementById("decode_results")) {
		document.getElementById("decode_results").style.display = 'block';
		document.getElementById("decode_results").innerHTML = loading;
	}
	var vin = document.getElementById("vin").value
	var nonce = document.getElementById( 'cd_edit_vehicle_nonce' ).value;
	jQuery.ajax({
		type: 'POST',
		data: {'post_id': post_id, 'action': 'cd_ajax_handler', 'vin': vin, 'option': 'post', 'nonce': nonce},
		url: cdVinQueryParams.ajaxurl,
		timeout: 5000,
		error: function() {},
		dataType: "html",
		success: function(html){
		var new_body = html;
			window.location.reload();
		}
	})
	return false;
}

function validate_vin(vin) {
	vin_len=vin.length;
	var go = 1
	if (vin_len < 17) {
			document.getElementById("cd_vin").style.background = "#FF0000";
			var delay = function() { document.getElementById("cd_vin").style.background = "#FFFFFF" };
			setTimeout(delay, 1000);
			document.getElementById("alert_msg").style.display = "block"; 
			document.getElementById("alert_msg").innerHTML = "Your VIN must be exactly 17 characters. You currently have "+ vin_len + " characters.";
			document.getElementById("cd_vin").style.background = "#FF0000";
			var delay = function() { 
				document.getElementById("cd_vin").style.background = "#FFFFFF";
				document.getElementById("alert_msg").style.display = "none"; 
				};
			setTimeout(delay, 2500);
			var go = 0;
	}
	if (vin_len > 17) {
			document.getElementById("cd_vin").style.background = "#FF0000";
			var delay = function() { document.getElementById("cd_vin").style.background = "#FFFFFF" };
			setTimeout(delay, 1000);
			document.getElementById("alert_msg").style.display = "block"; 
			document.getElementById("alert_msg").innerHTML = "Your VIN must be exactly 17 characters. You currently have "+ vin_len + " characters.";
			document.getElementById("cd_vin").style.background = "#FF0000";
			var delay = function() { 
				document.getElementById("cd_vin").style.background = "#FFFFFF";
				document.getElementById("alert_msg").style.display = "none"; 
				};
			setTimeout(delay, 2500);
			var go = 0;
	}
	if (go == 1) {
		document.getElementById("cd_vin").style.background = "#99CC99";
		var delay = function() { document.getElementById("cd_vin").style.background = "#FFFFFF" };
		setTimeout(delay, 1000);
	}
	return go;
}

function update_ribbon(ribbon) {
	if (ribbon == 'custom_ribbon') {
		document.getElementById('custom_ribbon_div').style.display = 'block';
		var custom_ribbon = document.getElementById('_custom_ribbon').value;
		if (custom_ribbon != '') {
			var ribbon_url = custom_ribbon;
		} else {
			ribbon = ribbon.replace('_','-');
			var ribbon_url = cdVinQueryParams.car_demon_path+'theme-files/images/ribbon-'+ribbon+'.png';		
		}
	} else {
		ribbon = ribbon.replace('_','-');
		document.getElementById('custom_ribbon_div').style.display = 'none';
		var ribbon_url = cdVinQueryParams.car_demon_path+'theme-files/images/ribbon-'+ribbon+'.png';
	}
	document.getElementById('vehicle_ribbon').src = ribbon_url;
}

function cd_manage_photos(post_id, attachment) {
	var nonce = document.getElementById( 'cd_edit_vehicle_nonce' ).value;
    jQuery.ajax({
        type: 'POST',
		data: {'post_id': post_id, 'action': 'cd_ajax_handler', 'attachment_id': attachment, 'option': 'add_car_images', 'nonce': nonce},
		url: cdVinQueryParams.ajaxurl,
        timeout: 5000,
        error: function() {},
        dataType: "html",
        success: function(html){
	        var new_body = html;
            var image_div = document.getElementById("car_photo_attachments").innerHTML;
            document.getElementById("car_photo_attachments").innerHTML = image_div + html;
        }
    })
	return false;
}

jQuery(document).ready(function($) {
	var sendto = '';

	$('#custom_ribbon_btn').click(function() {
		formfield = $('#_custom_ribbon').attr('name');
		tb_show('', 'media-upload.php?type=image&amp;TB_iframe=true');
		sendto = '_custom_ribbon';
        var original_send_to_editor = window.send_to_editor;
        window.send_to_editor = function(html) {
            imgurl = $(html).attr('src');
            $('#'+sendto).val(imgurl);
            document.getElementById('vehicle_ribbon').src = imgurl;
            var post_id = document.getElementById('this_car_id').value;
            fld = document.getElementById('_custom_ribbon');
            update_vehicle_data(fld, post_id)
            tb_remove();
            window.send_to_editor = window.original_send_to_editor;
        }
		return false;
	});

	$('#_custom_ribbon').click(function() {
		formfield = jQuery('#_custom_ribbon').attr('name');
		tb_show('', 'media-upload.php?type=image&amp;TB_iframe=true');
		sendto = '_custom_ribbon';
        var original_send_to_editor = window.send_to_editor;
        window.send_to_editor = function(html) {
            imgurl = $(html).attr('src');
            $('#'+sendto).val(imgurl);
            document.getElementById('vehicle_ribbon').src = imgurl;
            var post_id = document.getElementById('this_car_id').value;
            fld = document.getElementById('_custom_ribbon');
            update_vehicle_data(fld, post_id)
            tb_remove();
            window.send_to_editor = window.original_send_to_editor;
        }
		return false;
	});

});