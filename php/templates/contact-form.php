<?php
/**
 * Template for outputting the contact form.
 *
 * @package MaterialThemeBuilder
 */

defined( 'ABSPATH' ) || exit;

$attributes        = isset( $attributes ) ? $attributes : [];
$form_allowed_tags = isset( $form_allowed_tags ) ? $form_allowed_tags : wp_kses_allowed_html( 'post' );
$class_name        = isset( $attributes['className'] ) ? $attributes['className'] : '';
?>

<form id="mtbContactForm" action="javascript:void(0);">
	<?php echo wp_kses( $content, $form_allowed_tags ); ?>
	<input type="hidden" name="action" value="mtb_submit_contact_form"/>
	<input type="hidden" name="mtb_token" value="token_here"/>
	<?php wp_nonce_field( 'contact_form_action', 'mtb_contact_form_nonce' ); ?>
</form>
<div id="mtbContactFormMsgContainer" style="display: none
">
	<?php esc_html_e( 'Your request has been successfully submitted', 'material-theme-builder' ); ?>
	<br/>
	<button id="back" class="mdc-button mdc-button--unelevated">
		<span class="mdc-button__ripple"></span> <?php esc_html_e( 'Back', 'material-theme-builder' ); ?>
	</button>

</div>
