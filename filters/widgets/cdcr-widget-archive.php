<?php
if ( defined( 'CD_NAV_WIDGET' ) && CD_NAV_WIDGET ) {
	add_action( 'widgets_init', 'car_demon_cdcr_archive_load_widgets' );
}
function car_demon_cdcr_archive_load_widgets() {
	register_widget( 'car_demon_cdcr_archive_Widget' );
}
class car_demon_cdcr_archive_Widget extends WP_Widget {
	/**
	 * Widget setup.
	 */
	function __construct() {
		/* Widget settings. */
		$widget_ops = array( 'classname' => 'car_demon_cdcr_archive', 'description' => __( 'Adds pagination, results found and sorting options. This widget will only display on a vehicle list page.', 'car-demon' ) );
		/* Widget control settings. */
		$control_ops = array( 'width' => 300, 'height' => 350, 'id_base' => 'car_demon_cdcr_archive-widget' );
		/* Create the widget. */
		parent::__construct( 'car_demon_cdcr_archive-widget', __( 'Car Demon Vehicle Navigation Widget', 'car-demon' ), $widget_ops, $control_ops );
	}
	/**
	 * How to display the widget on the screen.
	 */
	function widget( $args, $instance ) {
		/* Our variables from the widget settings. */
		$title = apply_filters( 'widget_title', $instance['title'] );
		/* Before widget (defined by themes). */
		if ( is_search() ) {
			
		}
		if (is_post_type_archive('cars_for_sale') || is_tax( 'vehicle_year' ) || is_tax( 'vehicle_make' ) || is_tax( 'vehicle_model' ) || is_tax( 'vehicle_condition' ) || is_tax( 'vehicle_body_style' ) || is_tax( 'vehicle_location' )) {
			echo $args['before_widget'];
			/* Display the widget title if one was input (before and after defined by themes). */
			if ( ! empty( $title ) ) {
				echo $args['before_title'] . $title . $args['after_title'];
			}
			echo car_demon_cdcr_archive_form();
			/* After widget (defined by themes). */
			echo $args['after_widget'];
		}
	}
	/**
	 * Update the widget settings.
	 */
	function update( $new_instance, $old_instance ) {
		$instance = $old_instance;
		/* Strip tags for title and name to remove HTML (important for text inputs). */
		$instance['title'] = strip_tags( $new_instance['title'] );
		return $instance;
	}
	/**
	 * Displays the widget settings controls on the widget panel.
	 * Make use of the get_field_id() and get_field_name() function * when creating your form elements. This handles the confusing stuff.
	 */
	function form( $instance ) {
		/* Set up some default widget settings. */
		$defaults = array( 
						'title' => __( 'Vehicle Results', 'car-demon' ),
					);
		$instance = wp_parse_args( (array) $instance, $defaults ); ?>
		<!-- Widget Title: Text Input -->
		<p>
			<label for="<?php echo $this->get_field_id( 'title' ); ?>"><?php _e( 'Title:', 'car-demon' ); ?></label>
			<input id="<?php echo $this->get_field_id( 'title' ); ?>" name="<?php echo $this->get_field_name( 'title' ); ?>" value="<?php echo $instance['title']; ?>" class="car_demon_wide" />
		</p>
	<?php
	}
}

function car_demon_cdcr_archive_form() {
	$x = '';
	global $wp_query;
	global $car_demon_options;
	$search_url = '';
	if ( isset( $car_demon_options['inventory_page'] ) ) {
		$search_url = $car_demon_options['inventory_page'];
	}
	wp_register_script( 'crf-car-demon-search-js', plugins_url() . '/car-demon/search/js/car-demon-search.js', array('jquery'), CAR_DEMON_VER );
	wp_localize_script( 'crf-car-demon-search-js', 'cdSearchParams', array(
		'ajaxurl' => admin_url( 'admin-ajax.php' ),
		'car_demon_path' => CAR_DEMON_PATH,
		'site_url' => get_bloginfo( 'wpurl' ),
		'search_url' => $search_url,
	));
	wp_enqueue_script( 'crf-car-demon-search-js' );

	//= WE GET THE TOTAL RESULTS FROM THE SEARCH OR ARCHIVE QUERY
	$total_results = $wp_query->found_posts;
	$x .= '<div class="cdcr_archive_widget">';
		$x .= '<div class="cdcr_total_results">';
			$x .= __( 'Results Found ','car-demon' );
			$x .= $total_results;
		$x .= '</div>';
		$x .= car_demon_nav( 'top', $wp_query ) . car_demon_sorting( 'achive' );
		$x .= car_demon_get_searched_by();
	$x .= '</div>';
	return $x;
}
?>