<?php
/**
 * Turn off Gutenberg support for Car Demon for the time being
 */
add_filter( 'gutenberg_can_edit_post_type', 'cd_gutenberg_can_edit_post_types', 10, 2 );
function cd_gutenberg_can_edit_post_types( $is_enabled, $post_type ) {
    if ( in_array( $post_type, array( 'cars_for_sale' ) ) ) {
        return false;
    }

    return $is_enabled;
}
?>