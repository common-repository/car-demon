<?php
function car_demon_compare_load_widgets() {
	register_widget( 'car_demon_compare_Widget' );
}
add_action( 'widgets_init', 'car_demon_compare_load_widgets' );

class car_demon_compare_Widget extends WP_Widget {
	/**
	 * Widget setup.
	 */
	function __construct() {
		/* Widget settings. */
		$widget_ops = array( 'classname' => 'car_demon_compare', 'description' => __( 'Compare Vehicles', 'car-demon' ) );
		/* Widget control settings. */
		$control_ops = array( 'width' => 300, 'height' => 350, 'id_base' => 'car_demon_compare-widget' );
		/* Create the widget. */
		parent::__construct( 'car_demon_compare-widget', __( 'Car Demon Compare Vehicles', 'car-demon' ), $widget_ops, $control_ops );
	}
	/**
	 * How to display the widget on the screen.
	 */
	function widget( $args, $instance ) {
		global $car_demon_options;
		/* Our variables from the widget settings. */
		$title = apply_filters( 'widget_title', $instance['title'] );
		$no_vehicles_msg = $instance['no_vehicles_msg'];
		$car_demon_options['no_vehicles_msg'] = $no_vehicles_msg;
		/* Before widget (defined by themes). */
		echo $args['before_widget'];
		/* Display the widget title if one was input (before and after defined by themes). */
		if ( ! empty( $title ) ) {
			if ( ! empty( $no_vehicles_msg ) ) {
				echo $args['before_title'] . $title . $args['after_title'];
			}
		}
		if ( $car_demon_options['use_compare'] == 'Yes' ) {
			$no_vehicles_msg_encoded = base64_encode( $no_vehicles_msg );
			echo '<div class="car_demon_compare_widget" id="car_demon_compare_widget" data-no-vehicles-msg="' . $no_vehicles_msg_encoded . '">';
				echo '
				<div class="car_demon_compare_div" id="car_demon_compare_div">
					<div class="car_demon_compare_box" id="car_demon_compare_box"">
						<div class="car_demon_compare_print" onclick="print_compare();">'. __( 'Print', 'car-demon' ) .'</div>
						<div class="close_car_demon_compare" onclick="close_car_demon_compare();">(close) X</div>
						<div class="car_demon_compare_box_main" id="car_demon_compare_box_main">
						</div>
					</div>
				</div>
				<span id="car_demon_compare" class="car-demon-widget widget_text">';
					$compare_these = '';
					if ( isset( $_COOKIE['car_demon_compare'] ) ) {
						$compare_these = $_COOKIE['car_demon_compare'];
					}
					echo show_compare_vehicles( $compare_these, $no_vehicles_msg );
				echo '</span>';
			echo '</div>';
		}
		/* After widget (defined by themes). */
		echo $args['after_widget'];
	}
	/**
	 * Update the widget settings.
	 */
	function update( $new_instance, $old_instance ) {
		$instance = $old_instance;
		/* Strip tags for title and name to remove HTML (important for text inputs). */
		$instance['title'] = strip_tags( $new_instance['title'] );
		$instance['no_vehicles_msg'] = strip_tags( $new_instance['no_vehicles_msg'] );
		return $instance;
	}
	/**
	 * Displays the widget settings controls on the widget panel.
	 * Make use of the get_field_id() and get_field_name() function * when creating your form elements. This handles the confusing stuff.
	 */
	function form( $instance ) {
		/* Set up some default widget settings. */
		$defaults = array( 
			'title' => __( 'Compare Vehicles', 'car-demon' ),
			'no_vehicles_msg' => __( 'Select the compare checkbox next to the vehicles you\'d like to compare.', 'car-demon' )
			 );
		$instance = wp_parse_args( (array) $instance, $defaults ); ?>
		<!-- Widget Title: Text Input -->
		<p>
			<label for="<?php echo $this->get_field_id( 'title' ); ?>"><?php _e( 'Title:', 'car-demon' ); ?></label>
			<input id="<?php echo $this->get_field_id( 'title' ); ?>" name="<?php echo $this->get_field_name( 'title' ); ?>" value="<?php echo $instance['title']; ?>" class="car_demon_wide" />
			<br />
			<label for="<?php echo $this->get_field_id( 'no_vehicles_msg' ); ?>"><?php _e( 'No Vehicles Msg:', 'car-demon' ); ?></label>
			<input id="<?php echo $this->get_field_id( 'no_vehicles_msg' ); ?>" name="<?php echo $this->get_field_name( 'no_vehicles_msg' ); ?>" value="<?php echo $instance['no_vehicles_msg']; ?>" class="car_demon_wide" />
		</p>
	<?php
	}
}
?>