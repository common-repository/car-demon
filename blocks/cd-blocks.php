<?php
function cd_block_init() {
	if ( ! function_exists( 'register_block_type' ) ) {
		return;
	}
	
	//= Load our front end styles into the admin area so Gutenberg can load them
	global $car_demon_options;
	if ( isset( $car_demon_options['use_vehicle_css'] ) ) {
		if ( $car_demon_options['use_vehicle_css'] != 'No' ) {
			wp_enqueue_style( 'car-demon-style-css', CAR_DEMON_PATH . 'theme-files/css/car-demon-style.css', array(), CAR_DEMON_VER );
			wp_enqueue_style( 'cr-style-css', plugins_url() . '/car-demon/filters/theme-files/content-replacement/cr-style.css', array(), CAR_DEMON_VER );
		}
	} else {
		wp_enqueue_style( 'car-demon-style-css', CAR_DEMON_PATH . 'theme-files/css/car-demon-style.css', array(), CAR_DEMON_VER );
		wp_enqueue_style( 'cr-style-css', plugins_url() . '/car-demon/filters/theme-files/content-replacement/cr-style.css', array(), CAR_DEMON_VER );
	}
	if ( isset( $car_demon_options['use_form_css'] ) ) {
		if ( $car_demon_options['use_form_css'] != 'No' ) {
			wp_enqueue_style( 'car-demon-search-css', plugins_url() . '/car-demon/search/css/car-demon-search.css', array(), CAR_DEMON_VER );
			wp_enqueue_style('car-demon-payment-calculator-css', CAR_DEMON_PATH . 'widgets/css/car-demon-calculator-widget.css', array(), CAR_DEMON_VER);
		}
	} else {
		wp_enqueue_style( 'car-demon-search-css', plugins_url() . '/car-demon/search/css/car-demon-search.css', array(), CAR_DEMON_VER );
		wp_enqueue_style('car-demon-payment-calculator-css', CAR_DEMON_PATH . 'widgets/css/car-demon-calculator-widget.css', array(), CAR_DEMON_VER);
	}
	wp_enqueue_script( 'car-demon-payment-calculator-js', CAR_DEMON_PATH . 'widgets/js/car-demon-calculator-widget.js', array(), CAR_DEMON_VER );
	
	$dir = dirname( __FILE__ );
	$js = '/js/cd-blocks.js';
	wp_register_script(
		'cd-blocks',
		plugins_url( $js, __FILE__ ),
		array( 'wp-blocks', 'wp-element', 'wp-components', 'wp-editor' ),
		CAR_DEMON_VER
	);

	$template_builder_installed = false;
	if ( defined( 'CDTB_VERSION' ) ) {
		$template_builder_installed = true;
	}

	$js_strings = array();
	
	$js_strings_inventory = array(
		'block_title_inventory' => __( 'Vehicle Inventory', 'car-demon' ),
		'title' => __( 'Title', 'car-demon' ),
		'query' => __( 'Query', 'car-demon' ),
		'stock' => __( 'Stock Number', 'car-demon' ),
		'condition' => __( 'Condition', 'car-demon' ),
		'year' => __( 'Year', 'car-demon' ),
		'make' =>__( 'Make', 'car-demon' ),
		'model' => __( 'Model', 'car-demon' ),
		'location' => __( 'Location', 'car-demon' ),
		'body_style' => __( 'Body Style', 'car-demon' ),
		'mileage' => __( 'Mileage', 'car-demon' ),
		'min_price' => __( 'Min Price', 'car-demon' ),
		'max_price' => __( 'Max Price', 'car-demon' ),
		'transmission' => __( 'Transmission', 'car-demon' ),
		'vehicle_tag' => __( 'Vehicle Tag', 'car-demon' ),
		'show_sold' => __( 'Show sold', 'car-demon' ),
		'show_only_sold' => __( 'Show only sold', 'car-demon' ),
		'criteria' => __( 'Criteria', 'car-demon' ),
		'hide_sort' => __( 'Hide Sort', 'car-demon' ),
		'hide_nav' => __( 'Hide Navigation', 'car-demon' ),
		'hide_results_found' => __( 'Hide results found', 'car-demon' ),
		'cars_per_page' => __( 'Vehicles per page', 'car-demon' ),
		'yes' => __( 'Yes', 'car-demon' ),
		'no' => __( 'No', 'car-demon' ), /* end inventory strings */
		'template_builder_label' => __( 'Template ID', 'car-demon' ),
		'pro_sort_label' => __( 'Add Pro Sort Icon', 'car-demon' ),
		'switch_styles_label' => __( 'Add Switch Styles Icon', 'car-demon' ), /* end template builder integration */
	);
	$js_strings = array_merge( $js_strings, $js_strings_inventory );

	$js_strings_search = array(
		'block_title_vehicle_search' => __( 'Vehicle Search Form', 'car-demon' ),
		'search_title' => __( 'Form Type', 'car-demon' ),
		'search_size' => __( 'Form Size', 'car-demon' ),
		'search_type_small' => __( 'Small', 'car-demon' ),
		'search_type_large' => __( 'Large', 'car-demon' ),
		'search_result_page' => __( 'Result Page', 'car-demon' ),
		'search_button' => __( 'Search Button', 'car-demon'),
	);	
	$js_strings = array_merge( $js_strings, $js_strings_search );

	$js_strings_calculator = array(
		'block_title_finance_calculator' => __( 'Vehicle Finance Calculator', 'car-demon' ),
		'finance_title' => __( 'Calculator Title', 'car-demon' ),
		'finance_price' => __( 'Price', 'car-demon' ),
		'finance_apr' => __( 'APR', 'car-demon' ),
		'finance_term' => __( 'Term', 'car-demon' ),
		'finance_disclaimer_1' => __( 'Disclaimer #1', 'car-demon' ),
		'finance_disclaimer_2' => __( 'Disclaimer #2', 'car-demon' ),
	);
	$js_strings = array_merge( $js_strings, $js_strings_calculator );

	wp_localize_script( 'cd-blocks', 'cdBlocksParams', array(
		'strings' => $js_strings,
		'template_builder_installed' => $template_builder_installed,
	) );
	
	wp_enqueue_script( 'cd-blocks' );

	register_block_type( 'car-demon/cd-inventory', array(
		'editor_script' => 'cd-blocks',
		'attributes' => array(
			'stock' => array(
				'type' => 'string',
			),
			'condition' => array(
				'type' => 'string',
			),
			'year' => array(
				'type' => 'string',
			),
			'make' => array(
				'type' => 'string',
			),
			'model' => array(
				'type' => 'string',
			),
			'location' => array(
				'type' => 'string',
			),
			'body_style' => array(
				'type' => 'string',
			),
			'mileage' => array(
				'type' => 'string',
			),
			'min_price' => array(
				'type' => 'string',
			),
			'max_price' => array(
				'type' => 'string',
			),
			'transmission' => array(
				'type' => 'string',
			),
			'vehicle_tag' => array(
				'type' => 'string',
			),
			'show_sold' => array(
				'type' => 'string',
			),
			'show_only_sold' => array(
				'type' => 'string',
			),
			'criteria' => array(
				'type' => 'string',
			),
			'hide_sort' => array(
				'type' => 'string',
			),
			'hide_nav' => array(
				'type' => 'string',
			),
			'hide_results_found' => array(
				'type' => 'string',
			),
			'cars_per_page' => array(
				'type' => 'string',
			),
			'template_id' => array(
				'type' => 'string',
			),
			'switch_style' => array(
				'type' => 'string',
			),
			'pro_sort' => array(
				'type' => 'string',
			),
		),
		'render_callback' => 'cd_inventory_shortcode_func'
	) );

	register_block_type( 'car-demon/cd-search', array(
		'editor_script' => 'cd-blocks',
		'attributes' => array(
			'title' => array(
				'type' => 'string',
			),
			'size' => array(
				'type' => 'string',
			),
			'result_page' => array(
				'type' => 'string',
			),
			'button_text' => array(
				'type' => 'string',
			),
		),
		'render_callback' => 'search_shortcode_func'
	) );

	register_block_type( 'car-demon/cd-calculator', array(
		'editor_script' => 'cd-blocks',
		'attributes' => array(
			'title' => array(
				'type' => 'string',
				'default' => __( 'Loan Calculator', 'car-demon' ),
			),
			'price' => array(
				'type' => 'string',
				'default' => '25000',
			),
			'apr' => array(
				'type' => 'string',
				'default' => '10',
			),
			'term' => array(
				'type' => 'string',
				'default' => '60',
			),
			'disclaimer1' => array(
				'type' => 'string',
				'default' => __( 'It is not an offer for credit nor a quote.', 'car-demon' ),
			),
			'disclaimer2' => array(
				'type' => 'string',
				'default' => __( 'This calculator provides an estimated monthly payment. Your actual payment may vary based upon your specific loan and final purchase price.', 'car-demon' ),
			),
		),
		'render_callback' => 'car_demon_calculator_form'
	) );

}
add_action( 'init', 'cd_block_init' );
?>