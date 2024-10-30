<?php
function car_demon_calculator_form( $atts ) {
	global $car_demon_options;
	$default_atts = array(
		'title' => __( 'Loan Calculator', 'car-demon' ),
		'price' => __( '25000', 'car-demon' ),
		'apr' => __( '10', 'car-demon' ),
		'term' => __( '60', 'car-demon' ),
		'disclaimer1' => __( 'It is not an offer for credit nor a quote.', 'car-demon' ),
		'disclaimer2' => __( 'This calculator provides an estimated monthly payment. Your actual payment may vary based upon your specific loan and final purchase price.', 'car-demon' )
	 );
	$atts = wp_parse_args( $atts, $default_atts );
	$car_demon_pluginpath = CAR_DEMON_PATH;
	$car_demon_pluginpath = str_replace( 'includes', '', $car_demon_pluginpath );
	if ( empty( $price ) ) {
		if ( isset( $_GET['xP'] ) ) {
			$price = $_GET['xP'];
		} else {
			$price = '25000';
		}
	}
	wp_enqueue_script( 'car-demon-payment-calculator-js', CAR_DEMON_PATH . 'widgets/js/car-demon-calculator-widget.js', array(), CAR_DEMON_VER );
	if ( isset( $car_demon_options['use_form_css'] ) ) {
		if ( $car_demon_options['use_form_css'] != 'No' ) {
			wp_enqueue_style('car-demon-payment-calculator-css', CAR_DEMON_PATH . 'widgets/css/car-demon-calculator-widget.css', array(), CAR_DEMON_VER);
		}
	}
	
	if ( isset( $car_demon_options['currency_symbol'] ) ) {
		$currency_symbol = $car_demon_options['currency_symbol'];
	} else {
		$currency_symbol = "$";
	}
	if ( isset($car_demon_options['currency_symbol_after'] ) ) {
		$currency_symbol_after = $car_demon_options['currency_symbol_after'];
		if ( ! empty( $currency_symbol_after ) ) {
			$currency_symbol = "";
		}
	} else {
		$currency_symbol_after = "";
	}
	$form = '
    <form name="calc" action="" class="car_demon_calc">
        <div align="center">
        	<strong>
                <img src="' . CAR_DEMON_PATH . 'theme-files/images/calculator.gif" class="cd_calculator" width="20" />&nbsp;
                <span class="car_demon_calc_title">
                    ' .  $atts['title'] . '
                </span>
			</strong>
        </div>
        <hr width="100%">
        <div align="center" class="calc_text">
			' . __( 'Please fill out the form and click calculate to estimate your monthly payment.', 'car-demon' ) . '
		</div>
        <table align="center" class="calc_table">
            <tr> 
                <td>' . __( 'Estimated Price', 'car-demon' ) . ':</td>
                <td><?php echo $currency_symbol; ?><input class="calc_box" name="pv" type="text" size="5" maxlength="10" value="' . $atts['price'] . '" />' . $currency_symbol_after . '
                </td>
            </tr>
            <tr> 
                <td>' . __( 'Annual Percentage Rate', 'car-demon' ). ':</td>
                <td><input class="calc_box" name="rate" type="text" size="2" maxlength="6" value="' . $atts['apr'] . '" />%</td>
			</tr>
            <tr> 
                <td>' . __( 'Total Number of Payments', 'car-demon' ) . ':</td>
                <td>
                	<input class="calc_box" type="text" size="2" maxlength="4" name="numPmtYr" value="' . $atts['term'] . '" />
					<input type="hidden" size="2" maxlength="2" name="numYr" value="5" />
	            </td>
            </tr>
        </table>
        <div align="center"></div>
        <p align="center">
            <input type="button" class="calc_btn" value="' . __( 'Calculate', 'car-demon' ) . '" onClick="returnPayment()" />
            <input type="button" class="calc_btn" value="' . __( 'Reset', 'car-demon' ) . '" onClick="this.form.reset()" />
            <br />
            ' . $atts['disclaimer1'] . '
		</p>
        <div align="center"> 
            <b>' . __( '*Estimated Monthly Payment', 'car-demon') . ':</b>
            <br />
            <input type="text" size="7" maxlength="7" name="pmt" id="calc_pmt" />
        </div>
        <div align="center" class="calc_text">
            <hr width="100%">
            ' . $atts['disclaimer2'] . '
        </div>
    </form>';
	return $form;
}
?>