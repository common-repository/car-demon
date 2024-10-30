<?php
function cd_page_navi( $query ) {
	$html = '';

    /** Stop execution if there's only 1 page */
    if ( $query->max_num_pages <= 1 ) {
        return;
	}
 
    $paged = get_query_var( 'paged' ) ? absint( get_query_var( 'paged' ) ) : 1;
    $max   = intval( $query->max_num_pages );
 
    /** Add current page to the array */
    if ( $paged >= 1 ) {
        $links[] = $paged;
	}
 
    /** Add the pages around the current page to the array */
    if ( $paged >= 3 ) {
        $links[] = $paged - 1;
        $links[] = $paged - 2;
    }
 
    if ( ( $paged + 2 ) <= $max ) {
        $links[] = $paged + 2;
        $links[] = $paged + 1;
    }
 
    $html .= '<div class="cd-navigation">';
		$html .= '<ul>';
 
		/** Previous Post Link */
		if ( get_previous_posts_link() ) {
			$html .= '<li title="' . __( 'Previous Page', 'car-demon' ) . '">' . get_previous_posts_link( '«' ) . '</li>';
		}
	
		/** Link to first page, plus ellipses if necessary */
		if ( ! in_array( 1, $links ) ) {
			$class = 1 == $paged ? ' class="active"' : '';
	 
			$html .= '<li' . $class . '><a href="' . esc_url( get_pagenum_link( 1 ) ) . '">1</a></li>';
	 
			if ( ! in_array( 2, $links ) ) {
				$html .= '<li>…</li>';
			}
		}
	
		/** Link to current page, plus 2 pages in either direction if necessary */
		sort( $links );
		foreach ( (array) $links as $link ) {
			$class = $paged == $link ? ' class="active"' : '';
			$html .= '<li' . $class . '><a href="' . esc_url( get_pagenum_link( $link ) ) . '">' . $link . '</a></li>';
		}
	 
		/** Link to last page, plus ellipses if necessary */
		if ( ! in_array( $max, $links ) ) {
			if ( ! in_array( $max - 1, $links ) )
				$html .= '<li>…</li>';
	 
			$class = $paged == $max ? ' class="active"' : '';
			$html .= '<li' . $class . '><a href="' . esc_url( get_pagenum_link( $max ) ) . '">' . $max . '</a></li>';
		}

		/** Next Post Link */
		if ( get_next_posts_link( '»', $max ) ) {
			$next_link = get_next_posts_link( '»', $max );
			$html .= '<li title="' . __( 'Next Page', 'car-demon' ) . '">' . $next_link . '</li>';
		}
 
	    $html .= '</ul>';
	$html .= '</div>';
	$html .= '<div class="cd-nav-clear"></div>';
	$html = apply_filters( 'cd_page_navi_filter', $html, $query );
	return $html;
}

add_filter( 'next_posts_link_attributes', 'cd_posts_link_attributes' );
function cd_posts_link_attributes() {
	return 'class="nextpostslink" rel="next"';
}
?>