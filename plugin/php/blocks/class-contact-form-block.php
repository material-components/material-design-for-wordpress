<?php
/**
 * Copyright 2020 Google LLC
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
 *
 * @package MaterialDesign
 */

/**
 * Contact Form Block class.
 *
 * @package MaterialDesign
 */

namespace MaterialDesign\Plugin\Blocks;

use MaterialDesign\Plugin\Module_Base;
use MaterialDesign\Plugin\Template;
use MaterialDesign\Plugin\Helpers;

/**
 * Contact_Form_Block class.
 */
class Contact_Form_Block extends Module_Base {

	const GOOGLE_CAPTCHA_VERIFY_URL = 'https://www.google.com/recaptcha/api/siteverify';

	/**
	 * Name of the block.
	 *
	 * @var string
	 */
	public $block_name = 'material/contact-form';

	/**
	 * Initiate the class and hooks.
	 */
	public function init() {
		add_action( 'wp_ajax_material_design_submit_contact_form', [ $this, 'priv_submit_contact_form' ] );
		add_action( 'wp_ajax_nopriv_material_design_submit_contact_form', [ $this, 'nopriv_submit_contact_form' ] );
		add_action( 'wp_ajax_material_design_manage_recaptcha_api_credentials', [ $this, 'manage_recaptcha_api_credentials' ] );
	}

	/**
	 * Submit contact form for authenticated user.
	 *
	 * @access public
	 */
	public function priv_submit_contact_form() {
		$this->submit_contact_form();
	}

	/**
	 * Submit contact form for unauthenticated user.
	 *
	 * @access public
	 */
	public function nopriv_submit_contact_form() {
		$this->submit_contact_form();
	}

	/**
	 * Renders the `material/contact-form` block on server.
	 *
	 * @access public
	 *
	 * @param array  $attributes The block attributes.
	 * @param string $content    The block content.
	 *
	 * @return string Returns contact form markup.
	 */
	public function render_block( $attributes, $content ) {
		global $post;

		$class    = 'wp-block-material-contact-form';
		$email_to = isset( $attributes['emailTo'] ) ? sanitize_email( $attributes['emailTo'] ) : '';
		$subject  = isset( $attributes['subject'] ) ? sanitize_text_field( $attributes['subject'] ) : '';

		if ( ! filter_var( $email_to, FILTER_VALIDATE_EMAIL ) ) {
			return sprintf(
				'<div class="%s">%s</div>',
				esc_attr( $class ),
				__( 'The contact form cannot be displayed because the sender email is incorrect.', 'material-design' )
			);
		}

		if ( empty( $subject ) ) {
			return sprintf(
				'<div class="%s">%s</div>',
				esc_attr( $class ),
				__( 'The contact form cannot be displayed because the email subject is not provided.', 'material-design' )
			);
		}

		if ( Helpers::get_block_count_from_post( $post, $this->block_name ) > 1 ) {
			return sprintf(
				'<div class="%s">%s</div>',
				esc_attr( $class ),
				__( 'You cannot have multiple contact form instances in one page.', 'material-design' )
			);
		}

		ob_start();
		Template::get_template(
			'contact-form.php',
			[
				'content'           => $content,
				'attributes'        => $attributes,
				'form_allowed_tags' => $this->get_form_allowed_tags(),
			]
		);

		$final_content = ob_get_clean();

		return sprintf(
			'<div class="%s">%s</div>',
			esc_attr( $class ),
			$final_content
		);
	}

	/**
	 * Get the block attributes.
	 *
	 * @param string $wp_http_referer HTTP referer.
	 *
	 * @return array
	 */
	private function get_block_attributes( $wp_http_referer ) {
		$block            = Helpers::get_block_from_referer( $wp_http_referer, $this->block_name );
		$block_attributes = isset( $block['attrs'] ) ? $block['attrs'] : [];

		return [
			'email_to' => isset( $block_attributes['emailTo'] )
				? sanitize_email( $block_attributes['emailTo'] )
				: get_bloginfo( 'admin_email' ),
			'subject'  => isset( $block_attributes['subject'] )
				? sanitize_text_field( $block_attributes['subject'] )
				/* translators: %s: blog name */
				: sprintf( __( 'This e-mail was sent from a contact form on %s', 'material-design' ), get_option( 'blogname' ) ),
		];
	}

	/**
	 * Submit contact form.
	 */
	private function submit_contact_form() {
		if ( ! check_ajax_referer( 'contact_form_action', 'material_design_contact_form_nonce', false ) ) {
			wp_send_json_error(
				[ 'message' => __( 'Invalid nonce.', 'material-design' ) ]
			);
		}

		$wp_http_referer = isset( $_POST['_wp_http_referer'] )
			? filter_var( $_POST['_wp_http_referer'], FILTER_SANITIZE_STRING )
			: '';

		if ( empty( $wp_http_referer ) ) {
			wp_send_json_error(
				[ 'message' => __( 'Missing http referer.', 'material-design' ) ]
			);
		}

		$block_attributes = $this->get_block_attributes( $wp_http_referer );

		if ( empty( $block_attributes['email_to'] ) || empty( $block_attributes['subject'] ) ) {
			wp_send_json_error(
				[ 'message' => __( 'Missing email address for sending or subject.', 'material-design' ) ]
			);
		}

		$recaptcha_token = isset( $_POST['token'] ) ? sanitize_text_field( $_POST['token'] ) : '';
		$verified        = $this->verify_recaptcha( $recaptcha_token );
		if ( ! $verified ) {
			wp_send_json_error(
				[ 'message' => __( 'The submission could not be verified.', 'material-design' ) ]
			);
		}

		$sanitized_contact_fields = [];

		// phpcs:disable WordPress.Security.ValidatedSanitizedInput.InputNotSanitized
		$contact_fields = isset( $_POST['contact_fields'] ) ? json_decode( stripslashes( $_POST['contact_fields'] ), true ) : [];

		if ( ! $contact_fields ) {
			wp_send_json_error(
				[ 'message' => __( 'Invalid submission data.', 'material-design' ) ]
			);
		}

		$is_contact_fields_valid = true;
		foreach ( $contact_fields as $field ) {
			$sanitized_field = [
				'label' => trim( filter_var( $field['label'], FILTER_SANITIZE_STRING ) ),
				'value' => trim( filter_var( $field['value'], FILTER_SANITIZE_STRING ) ),
			];

			if ( empty( $sanitized_field['label'] ) && empty( $sanitized_field['value'] ) ) {
				$is_contact_fields_valid = false;
				break;
			}

			$sanitized_contact_fields[] = $sanitized_field;
		}

		if ( ! $is_contact_fields_valid ) {
			wp_send_json_error(
				[ 'message' => __( 'Invalid submission data.', 'material-design' ) ]
			);
		}

		ob_start();
		Template::get_template(
			'contact-form-email.php',
			[
				'pre_message' => __( 'The following data has been submitted:', 'material-design' ),
				'fields'      => $sanitized_contact_fields,
			]
		);
		$body = ob_get_clean();

		$headers = [ 'Content-Type: text/html; charset=UTF-8' ];

		// phpcs:disable WordPressVIPMinimum.Functions.RestrictedFunctions.wp_mail_wp_mail
		if ( wp_mail( $block_attributes['email_to'], $block_attributes['subject'], $body, $headers ) ) {
			wp_send_json_success();
		} else {
			wp_send_json_error(
				[ 'message' => __( 'An unknown error occurred.', 'material-design' ) ]
			);
		}
	}

	/**
	 * Manage the reCAPTCHA API credentials.
	 *
	 * @access public
	 */
	public function manage_recaptcha_api_credentials() {
		$nonce = isset( $_POST['nonce'] ) ? filter_var( $_POST['nonce'], FILTER_SANITIZE_STRING ) : '';
		if ( ! wp_verify_nonce( $nonce, 'material_design_recaptcha_ajax_nonce' ) ) {
			wp_send_json_error(
				[ 'message' => __( 'Invalid nonce.', 'material-design' ) ]
			);
		}

		if ( ! Helpers::is_current_user_admin_or_editor_with_manage_options() ) {
			wp_send_json_error(
				[ 'message' => __( 'You are not authorized.', 'material-design' ) ]
			);
		}

		$data = filter_var_array(
			json_decode(
				stripslashes( isset( $_POST['data'] ) ? $_POST['data'] : '' ),
				true
			),
			[
				'action'        => FILTER_SANITIZE_STRING,
				'site_key'      => FILTER_SANITIZE_STRING,
				'client_secret' => FILTER_SANITIZE_STRING,
			]
		);

		if ( ! isset( $data['action'] ) || empty( $data['action'] ) ) {
			wp_send_json_error(
				[ 'message' => __( 'Missing or invalid action.', 'material-design' ) ]
			);
		}

		if ( 'save' === $data['action'] ) {
			if ( ! isset( $data['site_key'] ) || empty( $data['site_key'] ) ) {
				wp_send_json_error(
					[ 'message' => __( 'Missing site key for saving.', 'material-design' ) ]
				);
			}

			if ( ! isset( $data['client_secret'] ) || empty( $data['client_secret'] ) ) {
				wp_send_json_error(
					[ 'message' => __( 'Missing client secret for saving.', 'material-design' ) ]
				);
			}
		}

		if ( 'get' === $data['action'] ) {
			wp_send_json_success(
				[
					'material_design_recaptcha_site_key' => trim( esc_attr( get_option( 'material_design_recaptcha_site_key', '' ) ) ),
					'material_design_recaptcha_client_secret' => trim( esc_attr( get_option( 'material_design_recaptcha_client_secret', '' ) ) ),
				]
			);
		}

		if ( 'save' === $data['action'] ) {
			$material_design_recaptcha_site_key_result      = update_option( 'material_design_recaptcha_site_key', $data['site_key'] );
			$material_design_recaptcha_client_secret_result = update_option( 'material_design_recaptcha_client_secret', $data['client_secret'] );

			if ( $material_design_recaptcha_site_key_result && $material_design_recaptcha_client_secret_result ) {
				wp_send_json_success();
			}
		}

		if ( 'clear' === $data['action'] ) {
			$material_design_recaptcha_site_key_result      = true;
			$material_design_recaptcha_client_secret_result = true;
			if ( get_option( 'material_design_recaptcha_site_key', false ) ) {
				$material_design_recaptcha_site_key_result = delete_option( 'material_design_recaptcha_site_key' );
			}

			if ( get_option( 'material_design_recaptcha_client_secret', false ) ) {
				$material_design_recaptcha_client_secret_result = delete_option( 'material_design_recaptcha_client_secret' );
			}

			if ( $material_design_recaptcha_site_key_result && $material_design_recaptcha_client_secret_result ) {
				wp_send_json_success();
			}
		}
	}

	/**
	 * Verify recaptcha to prevent spam
	 *
	 * @access private
	 *
	 * @param string $recaptcha_token The recaptcha token submitted with the form.
	 *
	 * @return bool True when token is valid, else false
	 */
	private function verify_recaptcha( $recaptcha_token ) {
		if ( empty( $recaptcha_token ) ) {
			return false;
		}

		$material_design_recaptcha_site_key      = get_option( 'material_design_recaptcha_site_key', '' );
		$material_design_recaptcha_client_secret = get_option( 'material_design_recaptcha_client_secret', '' );

		// if both empty then it means that reCAPTCHA is not used.
		if ( empty( $material_design_recaptcha_site_key ) && empty( $material_design_recaptcha_client_secret ) ) {
			return true;
		}

		if ( empty( $material_design_recaptcha_site_key ) || empty( $material_design_recaptcha_client_secret ) ) {
			return false;
		}

		$verify_token_request = wp_remote_post(
			self::GOOGLE_CAPTCHA_VERIFY_URL,
			[
				'timeout' => 2,
				'body'    => [
					'secret'   => $material_design_recaptcha_client_secret,
					'response' => $recaptcha_token,
				],
			]
		);

		if ( is_wp_error( $verify_token_request ) ) {
			return false;
		}

		$response = wp_remote_retrieve_body( $verify_token_request );

		if ( is_wp_error( $response ) ) {
			return false;
		}

		$response = json_decode( $response, true );

		if ( ! isset( $response['success'] ) ) {
			return false;
		}

		return $response['success'];
	}

	/**
	 * Get the allowed to output the form HTML from the block inner blocks content.
	 *
	 * @access private
	 *
	 * @return array
	 */
	private function get_form_allowed_tags() {
		$tags = wp_kses_allowed_html( 'post' );

		$tags['input'] = [
			'accept'          => true,
			'autocomplete'    => true,
			'autofocus'       => true,
			'checked'         => true,
			'class'           => true,
			'disabled'        => true,
			'id'              => true,
			'height'          => true,
			'min'             => true,
			'max'             => true,
			'minlength'       => true,
			'maxlength'       => true,
			'name'            => true,
			'pattern'         => true,
			'placeholder'     => true,
			'readonly'        => true,
			'required'        => true,
			'size'            => true,
			'src'             => true,
			'step'            => true,
			'type'            => true,
			'value'           => true,
			'width'           => true,
			'aria-labelledby' => true,
			'data-form'       => true,
			'data-meta'       => true,
			'data-label'      => true,
		];

		if ( isset( $tags['textarea'] ) ) {
			$tags['textarea']['required'] = true;
		}

		return $tags;
	}
}
