<?php
function car_demon_dynamic_load_legacy() {
	$html = '';
	$pluginpath = CAR_DEMON_PATH . '/theme-files/';
	$html = '
		<link rel="stylesheet" type="text/css" media="all" href="' . $pluginpath . 'css/jquery.ias.css" />
		<script language="javascript" type="text/javascript" src="' . $pluginpath . 'js/jquery.ias.min.js"></script>
		<script>
			jQuery.ias({
			  container 	: ".listing",
					// Enter the selector of the element containing
					// your items that you want to paginate.
			 
			  item		: ".random",
					// Enter the selector of the element that each
					// item has. Make sure the elements are inside
					// the container element.
			 
			  pagination	: ".navigation",
					// Enter the selector of the element that contains
					// your regular pagination links, like next,
					// previous and the page numbers. This element
					// will be hidden when IAS loads.
			 
			  next		: ".nextpostslink",
					// Enter the selector of the link element that
					// links to the next page. The href attribute
					// of this element will be used to get the items
					// from the next page.
			 
			  loader	: "<img class="ajax-load-more" src=\'' . $pluginpath . 'images/ajax-loader.gif\' />"
					// Enter the url to the loader image. This image
					// will be displayed when the next page with items
					// is loaded via AJAX.
			});
		</script>
	';
	return $html;
}

function car_demon_dynamic_load() {
	$html = '';
	global $car_demon_options;
	if ( $car_demon_options['dynamic_load'] == 'Yes' ) {
		if ( ! isset( $car_demon_options['cd_cdrf_style'] ) ) {
			$car_demon_options['cd_cdrf_style'] = '';	
		}
		if ( empty( $car_demon_options['cd_cdrf_style'] ) ) {
			$html = car_demon_dynamic_load_legacy();
		} else {
			$dynamic_options = array();
			/*
			Defaults
			$dynamic_options['container'] = '.grid-box.width100';
			$dynamic_options['vehicle_item'] = '.item';
			$dynamic_options['pagination'] = '.pagination';
			$dynamic_options['next'] = '.next';
			
			$dynamic_options['container'] = '#content';
			$dynamic_options['vehicle_item'] = '.article-wrapper';
			$dynamic_options['pagination'] = '.more-content';
			$dynamic_options['next'] = '.next-post a';
			*/
			$dynamic_options['container'] = $car_demon_options['dl_container'];
			$dynamic_options['vehicle_item'] = $car_demon_options['dl_items'];
			$dynamic_options['pagination'] = $car_demon_options['dl_pagination'];
			$dynamic_options['next'] = $car_demon_options['dl_next'];

			$load_more = CAR_DEMON_PATH . 'theme-files/images/ajax-loader.gif';
			$load_more = apply_filters( 'cd_load_more_filter', $load_more );

			wp_enqueue_style( 'car-demon-dynamic-load-css', CAR_DEMON_PATH . 'theme-files/css/jquery.ias.css', array(), CAR_DEMON_VER );
			wp_register_script( 'car-demon-dynamic-load-core-js', CAR_DEMON_PATH . 'theme-files/js/jquery.ias.min.js', array( 'jquery' ), CAR_DEMON_VER );
			wp_register_script( 'car-demon-dynamic-load-js', CAR_DEMON_PATH . 'includes/js/car-demon-dynamic-load.js', array( 'jquery' ), CAR_DEMON_VER );
			wp_localize_script( 'car-demon-dynamic-load-js', 'cdDynamicLoad', array(
				'ajaxurl' => admin_url( 'admin-ajax.php' ),
				'container' => $dynamic_options['container'],
				'vehicle_item' => $dynamic_options['vehicle_item'],
				'pagination' => $dynamic_options['pagination'],
				'next' => $dynamic_options['next'],
				'loader' => '<img class="ajax-load-more" src="' . $load_more .'" />',
			) );
			wp_enqueue_script( 'car-demon-dynamic-load-core-js' );
			wp_enqueue_script( 'car-demon-dynamic-load-js' );
		}
	}
	return $html;
}
?>