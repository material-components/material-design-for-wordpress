<?php
/**
 * Template for outputting the contact form.
 *
 * @package MaterialThemeBuilder
 */

use MaterialThemeBuilder\Template;

defined( 'ABSPATH' ) || exit;

$attributes = isset( $attributes ) ? $attributes : [];
$class_name = isset( $attributes['className'] ) ? $attributes['className'] : '';
$email_to    = isset( $attributes['emailTo'] ) ? $attributes['emailTo'] : get_bloginfo( 'admin_email' );
$subject    = isset( $attributes['subject'] ) ? $attributes['subject'] : __( "You've received a new contact request", 'material-theme-builder' );
?>

<form id="contactForm">
	<?php echo $content; ?>
	<input type="hidden" name="action" value="submit_contact_form"/>
	<input type="hidden" id="emailTo" name="emailTo" value="<?php echo esc_attr( $email_to ); ?>"/>
	<input type="hidden" id="subject" name="subject" value="<?php echo esc_attr( $subject ); ?>"/>
	<?php wp_nonce_field( 'contact_form_action', 'mtb_contact_form_nonce' ); ?>
</form>
<div id="contactFormMsg" style="display: none
">
	<?php echo __( 'Your request has been successfully submitted', 'material-theme-builder' ); ?>
	<br/>
	<button id="back" class="mdc-button mdc-button--unelevated">
		<span class="mdc-button__ripple"></span> <? echo __( 'Back', 'material-theme-builder' ); ?>
	</button>

</div>
