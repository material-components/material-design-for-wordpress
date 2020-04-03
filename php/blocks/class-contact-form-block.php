<?php
/**
 * Contact Form Block class.
 *
 * @package MaterialThemeBuilder
 */

namespace MaterialThemeBuilder\Blocks;

use MaterialThemeBuilder\Module_Base;
use MaterialThemeBuilder\Template;

/**
 * Contact_Form_Block class.
 */
class Contact_Form_Block extends Module_Base {

	/**
	 * Name of the block.
	 *
	 * @var string
	 */
	public $block_name = 'material/contact-form';

	/**
	 * Submit contact form for authenticated user,
	 *
	 * @access public
	 *
	 * @action wp_ajax_submit_contact_form
	 */
	public function submit_priv_contact_form() {
		$this->submit_contact_form();
	}

	/**
	 * Submit contact form for unauthenticated user,
	 *
	 * @access public
	 *
	 * @action wp_ajax_nopriv_submit_contact_form
	 */
	public function submit_nopriv_contact_form() {
		$this->submit_contact_form();
	}

	private function submit_contact_form() {
		if ( ! check_ajax_referer( 'contact_form_action', 'mtb_contact_form_nonce' ) ) {
			echo  wp_json_encode(['status' => 'fail']);
			wp_die();
		}

		$to = $_POST['emailTo'];
		$subject = $_POST['subject'];

		$body  = '<br/>';
		foreach ( $_POST['contactFields'] as $contact_field ) {
			$body .= $contact_field['label'] . ': ' . $contact_field['value'] . '<br/>';
		}

		$headers = array('Content-Type: text/html; charset=UTF-8');

		if (wp_mail( $to, $subject, $body, $headers ) ) {
			echo  wp_json_encode(['status' => 'success']);
		} else {
			echo  wp_json_encode(['status' => 'fail']);
		}

		wp_die();
	}

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
				'render_callback' => [ $this, 'render_block' ],
			]
		);
	}

	/**
	 * Renders the `material/contact-form` block on server.
	 *
	 * @access public
	 *
	 * @param array $attributes The block attributes.
	 * @param string $content The block content.
	 *
	 * @return string Returns contact form markup.
	 */
	public function render_block( $attributes, $content ) {
		ob_start();
		Template::get_template(
			"contact-form.php",
			[
				'content'  => $content,
				'attributes'  => $attributes,
			]
		);

		$final_content = ob_get_clean();
		return sprintf(
			'<div class="mtb-contact-form">%s</div>',
			$final_content
		);
	}
}
