<?php
/**
 * Template for outputting the contact form.
 *
 * @package MaterialThemeBuilder
 */

defined( 'ABSPATH' ) || exit;

$attributes = isset( $attributes ) ? $attributes : [];
$class_name = isset( $attributes['className'] ) ? $attributes['className'] : '';
?>

<form id="contactForm">
	<?php echo $content; ?>
	<input type="hidden" name="action" value="submit_contact_form"/>
	<input type="hidden" name="mtb_token" value="token_here"/>
	<?php wp_nonce_field( 'contact_form_action', 'mtb_contact_form_nonce' ); ?>
</form>
<div id="contactFormMsg" style="display: none
">
	<?php esc_html_e( 'Your request has been successfully submitted', 'material-theme-builder' ); ?>
	<br/>
	<button id="back" class="mdc-button mdc-button--unelevated">
		<span class="mdc-button__ripple"></span> <?php esc_html_e( 'Back', 'material-theme-builder' ); ?>
	</button>

</div>
