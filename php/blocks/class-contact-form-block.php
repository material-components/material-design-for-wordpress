<?php
/**
 * Contact Form Block class.
 *
 * @package MaterialThemeBuilder
 */

namespace MaterialThemeBuilder\Blocks;

use MaterialThemeBuilder\Module_Base;
use MaterialThemeBuilder\Template;
use WP_Block_Type_Registry;

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
	 * Registers the `material/contact-form` block on server,
	 *
	 * @access public
	 *
	 * @action init
	 */
	public function register_block() {
		register_block_type(
			$this->block_name,
			[
				'attributes'      => [
					'emailTo'             => [
						'type'    => 'string',
						'default' => get_bloginfo( 'admin_email' ),
					],
					'subject'             => [
						'type'    => 'string',
						/* translators: %s: blog name */
						'default' => sprintf( __( 'This e-mail was sent from a contact form on %s', 'material-theme-builder' ), get_option( 'blogname' ) ),
					],
					'confirmationMessage' => [
						'type'    => 'string',
						'default' => __( 'Your request has been successfully submitted', 'material-theme-builder' ),
					],
					'outlined'            => [
						'type'    => 'boolean',
						'default' => true,
					],
					'fullWidth'           => [
						'type'    => 'boolean',
						'default' => true,
					],
				],
				'render_callback' => [ $this, 'render_block' ],
			]
		);
	}

	/**
	 * Submit contact form for authenticated user.
	 *
	 * @access public
	 *
	 * @action wp_ajax_mtb_submit_contact_form
	 */
	public function priv_submit_contact_form() {
		$this->submit_contact_form();
	}

	/**
	 * Submit contact form for unauthenticated user.
	 *
	 * @access public
	 *
	 * @action wp_ajax_nopriv_mtb_submit_contact_form
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
		$email_to = isset( $attributes['emailTo'] ) ? sanitize_email( $attributes['emailTo'] ) : '';
		$subject  = isset( $attributes['subject'] ) ? sanitize_text_field( $attributes['subject'] ) : '';

		if ( ! filter_var( $email_to, FILTER_VALIDATE_EMAIL ) ) {
			return sprintf(
				'<div class="mtb-contact-form">%s</div>',
				__( 'The contact form cannot be displayed because the sender email is incorrect.', 'material-theme-builder' )
			);
		}

		if ( empty( $subject ) ) {
			return sprintf(
				'<div class="mtb-contact-form">%s</div>',
				__( 'The contact form cannot be displayed because the email subject is not provided.', 'material-theme-builder' )
			);
		}

		if ( $this->get_block_count_from_post( $post ) > 1 ) {
			return sprintf(
				'<div class="mtb-contact-form">%s</div>',
				__( 'You cannot have multiple contact form instances in one page.', 'material-theme-builder' )
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
			'<div class="mtb-contact-form">%s</div>',
			$final_content
		);
	}

	/**
	 * Get the block from referer.
	 *
	 * @param string $wp_http_referer HTTP referer.
	 *
	 * @return array|mixed
	 */
	private function get_block_from_referer( $wp_http_referer ) {
		// phpcs:disable WordPressVIPMinimum.Functions.RestrictedFunctions.url_to_postid_url_to_postid
		$post_id = url_to_postid( $wp_http_referer );

		$post = get_post( $post_id );

		$blocks = [];
		if ( $post ) {
			$blocks = parse_blocks( $post->post_content );
		}

		return current(
			array_filter(
				$blocks,
				function ( $block ) {
					return $block['blockName'] === $this->block_name;
				}
			)
		);
	}

	/**
	 * Get block count from post.
	 *
	 * @param object $post Post.
	 *
	 * @return int|void
	 */
	private function get_block_count_from_post( $post ) {
		$blocks = parse_blocks( $post->post_content );

		$found_blocks = array_filter(
			$blocks,
			function ( $block ) {
				return $block['blockName'] === $this->block_name;
			}
		);

		return count( $found_blocks );
	}

	/**
	 * Get the block attributes.
	 *
	 * @param string $wp_http_referer HTTP referer.
	 *
	 * @return array
	 */
	private function get_block_attributes( $wp_http_referer ) {
		$block            = $this->get_block_from_referer( $wp_http_referer );
		$block_attributes = isset( $block['attrs'] ) ? $block['attrs'] : [];

		return [
			'email_to' => isset( $block_attributes['emailTo'] )
				? sanitize_email( $block_attributes['emailTo'] )
				: get_bloginfo( 'admin_email' ),
			'subject'  => isset( $block_attributes['subject'] )
				? sanitize_text_field( $block_attributes['subject'] )
				/* translators: %s: blog name */
				: sprintf( __( 'This e-mail was sent from a contact form on %s', 'material-theme-builder' ), get_option( 'blogname' ) ),
		];
	}

	/**
	 * Submit contact form.
	 */
	private function submit_contact_form() {
		if ( ! check_ajax_referer( 'contact_form_action', 'mtb_contact_form_nonce' ) ) {
			wp_send_json_error(
				[ 'message' => __( 'You are not authorized.', 'material-theme-builder' ) ]
			);
		}

		$wp_http_referer = isset( $_POST['_wp_http_referer'] )
			? sanitize_text_field( $_POST['_wp_http_referer'] )
			: '';
		
		$block_attributes = $this->get_block_attributes( $wp_http_referer );

		if ( empty( $block_attributes['email_to'] ) || empty( $block_attributes['subject'] ) ) {
			wp_send_json_error(
				[ 'message' => __( 'Missing email address for sending or subject.', 'material-theme-builder' ) ]
			);
		}

		$recaptcha_token = isset( $_POST['token'] ) ? sanitize_text_field( $_POST['token'] ) : '';
		$verified        = $this->verify_recaptcha( $recaptcha_token );
		if ( ! $verified ) {
			wp_send_json_error(
				[ 'message' => __( 'The submission could not be verified.', 'material-theme-builder' ) ]
			);
		}

		ob_start();
		Template::get_template(
			'contact-form-email.php',
			[
				'pre_message' => __( 'The following data has been submitted:', 'material-theme-builder' ),
				// phpcs:disable WordPress.Security.ValidatedSanitizedInput.InputNotSanitized
				'fields'      => isset( $_POST['contact_fields'] ) ? json_decode( stripslashes( $_POST['contact_fields'] ), true ) : [],
			]
		);
		$body = ob_get_clean();

		$headers = [ 'Content-Type: text/html; charset=UTF-8' ];

		// phpcs:disable WordPressVIPMinimum.Functions.RestrictedFunctions.wp_mail_wp_mail
		if ( wp_mail( $block_attributes['email_to'], $block_attributes['subject'], $body, $headers ) ) {
			wp_send_json_success();
		} else {
			wp_send_json_error(
				[ 'message' => __( 'An unknown error occurred.', 'material-theme-builder' ) ]
			);
		}
	}

	/**
	 * Manage the reCAPTCHA API credentials.
	 *
	 * @access public
	 *
	 * @action wp_ajax_manage_recaptcha_api_credentials
	 */
	public function manage_recaptcha_api_credentials() {
		// phpcs:disable WordPress.Security.ValidatedSanitizedInput.InputNotSanitized
		if ( ! wp_verify_nonce( isset( $_POST['nonce'] ) ? $_POST['nonce'] : '', 'mtb_recaptcha_ajax_nonce' ) ) {
			wp_send_json_error(
				[ 'message' => __( 'You are not authorized.', 'material-theme-builder' ) ]
			);
		}

		$data = isset( $_POST['data'] ) ? json_decode( stripslashes( $_POST['data'] ), true ) : [];

		if ( ! $data ) {
			wp_send_json_error(
				[ 'message' => __( 'Missing data.', 'material-theme-builder' ) ]
			);
		}

		$action        = isset( $data['action'] ) ? $data['action'] : 'clear';
		$site_key      = isset( $data['site_key'] ) ? $data['site_key'] : '';
		$client_secret = isset( $data['client_secret'] ) ? $data['client_secret'] : '';

		$mtb_recaptcha_site_key_result      = false;
		$mtb_recaptcha_client_secret_result = false;
		if ( 'save' === $action ) {
			if ( ! empty( $site_key ) ) {
				$mtb_recaptcha_site_key_result = update_option( 'mtb_recaptcha_site_key', sanitize_text_field( $site_key ) );
			}
			if ( ! empty( $client_secret ) ) {
				$mtb_recaptcha_client_secret_result = update_option( 'mtb_recaptcha_client_secret', sanitize_text_field( $client_secret ) );
			}
		} elseif ( 'clear' === $action ) {
			$mtb_recaptcha_site_key_result      = true;
			$mtb_recaptcha_client_secret_result = true;
			if ( get_option( 'mtb_recaptcha_site_key', '' ) ) {
				$mtb_recaptcha_site_key_result = delete_option( 'mtb_recaptcha_site_key' );
			}

			if ( get_option( 'mtb_recaptcha_client_secret', '' ) ) {
				$mtb_recaptcha_client_secret_result = delete_option( 'mtb_recaptcha_client_secret' );
			}
		}

		if ( $mtb_recaptcha_site_key_result && $mtb_recaptcha_client_secret_result ) {
			wp_send_json_success();
		}

		wp_send_json_error(
			[ 'message' => __( 'An unknown problem occurred.', 'material-theme-builder' ) ]
		);
	}

	/**
	 * Verify recaptcha to prevent spam
	 *
	 * @param string $recaptcha_token The recaptcha token submitted with the form.
	 *
	 * @return bool True when token is valid, else false
	 */
	private function verify_recaptcha( $recaptcha_token ) {
		if ( empty( $recaptcha_token ) ) {
			return false;
		}

		$mtb_recaptcha_client_secret = get_option( 'mtb_recaptcha_client_secret', '' );

		if ( ! $mtb_recaptcha_client_secret ) {
			return false;
		}

		$verify_token_request = wp_remote_post(
			self::GOOGLE_CAPTCHA_VERIFY_URL,
			[
				'timeout' => 2,
				'body'    => [
					'secret'   => get_option( 'mtb_recaptcha_client_secret' ),
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
	 * @access public
	 *
	 * @return array
	 */
	public function get_form_allowed_tags() {
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

		return $tags;
	}
}
