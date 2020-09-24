<?php
/**
 * Copyright 2020 Material Design
 * 
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * 
 *     http://www.apache.org/licenses/LICENSE-2.0
 * 
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * Template for outputting the contact form.
 *
 * @package MaterialThemeBuilder
 */

defined( 'ABSPATH' ) || exit;

$attributes           = isset( $attributes ) ? $attributes : [];
$form_allowed_tags    = isset( $form_allowed_tags ) ? $form_allowed_tags : wp_kses_allowed_html( 'post' );
$class_name           = isset( $attributes['className'] ) ? $attributes['className'] : '';
$confirmation_message = isset( $attributes['confirmationMessage'] ) ? $attributes['confirmationMessage'] : __( 'Your request has been successfully submitted', 'material-theme-builder' );
?>
<div class="mtb-contact-form <?php echo esc_attr( $class_name ); ?>">
	<form id="mtbContactForm" action="javascript:void(0);">
		<?php echo wp_kses( $content, $form_allowed_tags ); ?>
		<input type="hidden" name="action" value="mtb_submit_contact_form"/>
		<input type="hidden" name="mtb_token" value="token_here"/>
		<?php wp_nonce_field( 'contact_form_action', 'mtb_contact_form_nonce' ); ?>
	</form>
	<div id="mtbContactFormSuccessMsgContainer" style="display: none">
		<?php echo esc_html( $confirmation_message ); ?>
	</div>
	<div id="mtbContactFormErrorMsgContainer" style="display: none">
		<?php esc_html_e( 'An error has occurred. Please try again later.', 'material-theme-builder' ); ?>
	</div>
</div>
