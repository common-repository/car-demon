<?php
function car_demon_search_car_load_widgets() {
	register_widget( 'car_demon_search_car_Widget' );
}
add_action( 'widgets_init', 'car_demon_search_car_load_widgets' );

class car_demon_search_car_Widget extends WP_Widget {
	/**
	 * Widget setup.
	 */
	function __construct() {
		/* Widget settings. */
		$widget_ops = array( 'classname' => 'car_demon_search_car', 'description' => __( 'Display Search Cars.', 'car-demon' ) );
		/* Widget control settings. */
		$control_ops = array( 'width' => 300, 'height' => 350, 'id_base' => 'car_demon_search_car-widget' );
		/* Create the widget. */
		parent::__construct( 'car_demon_search_car-widget', __( 'Car Demon search Cars', 'car-demon' ), $widget_ops, $control_ops );
	}
	/**
	 * How to display the widget on the screen.
	 */
	function widget( $args, $instance ) {
		/* Our variables from the widget settings. */
		$title = apply_filters( 'widget_title', $instance['title'] );
		if ( isset( $instance['form_type'] ) ) {
			$form_type = $instance['form_type'];
		} else {
			$form_type = '';
		}
		/* Before widget (defined by themes). */
		echo $args['before_widget'];
		/* Display the widget title if one was input (before and after defined by themes). */
		if ( ! empty( $title ) ) {
			echo $args['before_title'] . $title . $args['after_title'];
		}
        if ( $form_type == 'Full' ) {
            $search_form = car_demon_search_form( $instance );
        } else {
            $search_form = car_demon_simple_search( 'l', $instance );
        }
		echo $search_form;
		/* After widget (defined by themes). */
		echo $args['after_widget'];
		echo '<div class="cd-clear"></div>';
	}
	/**
	 * Update the widget settings.
	 */
	function update( $new_instance, $old_instance ) {
		$instance = $old_instance;
		/* Strip tags for title and name to remove HTML (important for text inputs). */
		$instance['title'] = strip_tags( $new_instance['title'] );
		$instance['form_type'] = strip_tags( $new_instance['form_type'] );
		$instance['result_page'] = strip_tags( $new_instance['result_page'] );
		$instance['button_text'] = strip_tags( $new_instance['button_text'] );
		return $instance;
	}
	/**
	 * Displays the widget settings controls on the widget panel.
	 * Make use of the get_field_id() and get_field_name() function * when creating your form elements. This handles the confusing stuff.
	 */
	function form( $instance ) {
        //= Get default inventory page
        global $car_demon_options;
        if ( ! isset( $car_demon_options['inventory_page'] ) ) {
            $car_demon_options['inventory_page'] = get_bloginfo( 'wpurl' );
        }
        /*
        * TO DO: If page is selected in settings it's option isn't selected (it shows default)
        * Why doesn't url_to_postid() return a valid value for the drop down?
        */
        $default_result_page = url_to_postid( $car_demon_options['inventory_page'] );

		/* Set up some default widget settings. */
		$defaults = array( 
			'title' => __( 'Search Inventory', 'car-demon' ),
			'form_type' => __( 'Full', 'car-demon' ),
            'result_page' => $car_demon_options['inventory_page'],
            'button_text' => __( 'Search', 'car-demon' ),
			 );
		$instance = wp_parse_args( (array) $instance, $defaults ); ?>
		<!-- Widget Title: Text Input -->
		<p>
			<label for="<?php echo $this->get_field_id( 'title' ); ?>"><?php _e('Title:', 'car-demon'); ?></label>
            <br />
			<input id="<?php echo $this->get_field_id( 'title' ); ?>" name="<?php echo $this->get_field_name( 'title' ); ?>" value="<?php echo $instance['title']; ?>" class="car_demon_wide" />
			<br />
            <label for="<?php echo $this->get_field_id( 'form_type' ); ?>"><?php _e('Form Type:', 'car-demon'); ?></label>
			<br />
            <select name="<?php echo $this->get_field_name( 'form_type' ); ?>" id="<?php echo $this->get_field_id( 'form_type' ); ?>">
                <option value="Compact"<?php echo ( __( 'Full', 'car-demon' ) !== $instance['form_type'] ? ' selected' : '' ); ?>><?php _e( 'Compact', 'car-demon' ); ?></option>
                <option value="Full"<?php echo ( __( 'Full', 'car-demon' ) === $instance['form_type'] ? ' selected' : '' ); ?>><?php _e( 'Full', 'car-demon' ); ?></option>
			</select>
			<?php
				if ( function_exists( 'cd_shortcode_init' ) ) {
					$x = '<br />';
					$x .= '<label for="' . $this->get_field_id( 'result_page' ) . '">' . __( 'Search result page:', 'car-demon' ) . '</label>';
					$x .= '<br />';
					$args = array(
						'depth'                 => 0,
						'child_of'              => 0,
						'selected'              => $instance['result_page'],
						'echo'                  => 0,
						'name'                  => $this->get_field_name( 'result_page' ),
						'id'                    => $this->get_field_id( 'result_page' ), // string
						'class'                 => $this->get_field_name( 'result_page' ), // string
						'show_option_none'      => 'Default', // string
						'show_option_no_change' => null, // string
						'option_none_value'     => null, // string
					);
					$x .= wp_dropdown_pages( $args );
					$x .= '<p>' . __( 'Point the search result page to the page with your inventory shortcode [cd_inventory].', 'car-demon' ) . '</p>';
					echo $x;
				}
			?>
            <label for="<?php echo $this->get_field_id( 'button_text' ); ?>"><?php _e('Button Text:', 'car-demon'); ?></label>
            <br />
            <input id="<?php echo $this->get_field_id( 'button_text' ); ?>" name="<?php echo $this->get_field_name( 'button_text' ); ?>" value="<?php echo $instance['button_text']; ?>" class="car_demon_wide" />
		</p>
	<?php
	}
}
?>