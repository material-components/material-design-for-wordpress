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
 * Tests for Contact_Form_Block class.
 *
 * @package MaterialDesign
 */

namespace MaterialDesign\Plugin\Blocks;

use MaterialDesign\Plugin\Plugin;

/**
 * Tests for Contact_Form_Block class.
 */
class Test_Ajax_Contact_Form_Block extends \WP_Ajax_UnitTestCase {

	/**
	 *  Contact Form Block.
	 *
	 * @var Contact_Form_Block
	 */
	private $contact_form_block;

	/**
	 * Created valid Post ID.
	 *
	 * @var int
	 */
	public static $valid_post_id = 0;

	/**
	 * Created invalid Post ID.
	 *
	 * @var int
	 */
	public static $invalid_post_id = 0;

	/**
	 * Generate some text fixtures.
	 *
	 * @param WP_UnitTest_Factory $factory WP Factory object.
	 *
	 * @return void
	 */
	public static function wpSetUpBeforeClass( $factory ) {
		self::generate_fixtures( $factory );
	}

	/**
	 * Helper method to generate the fixtures
	 *
	 * @param WP_UnitTest_Factory $factory WP Factory object.
	 *
	 * @return void
	 */
	public static function generate_fixtures( $factory ) {
		self::$valid_post_id = $factory->post->create(
			[
				'post_title'   => 'Lorem ipsum dolor sit amet',
				'post_content' => 'Consectetur adipiscing elit. In dui quam, egestas nec aliquet ac, hendrerit vitae ligula. Morbi malesuada in lectus vel sollicitudin. Proin tellus ligula, tincidunt at sagittis eget, tempor non est. In et suscipit metus. Cras in lectus a ex ullamcorper eleifend. Aenean convallis lacus et porttitor convallis. Proin iaculis a diam et euismod. Proin lectus ex, bibendum vel pretium ut, pellentesque eget nisl.

				<!-- wp:material/contact-form {"emailTo":"test@test.loc","subject":"Test email subject","confirmationMessage":"Test confirmation message!"} -->
					<div class="wp-block-material-contact-form" id="block-material-contact-form-1"></div>
				<!-- /wp:material/contact-form -->
				',
			]
		);

		self::$invalid_post_id = $factory->post->create(
			[
				'post_title'   => 'Lorem ipsum dolor sit amet',
				'post_content' => 'Consectetur adipiscing elit. In dui quam, egestas nec aliquet ac, hendrerit vitae ligula. Morbi malesuada in lectus vel sollicitudin. Proin tellus ligula, tincidunt at sagittis eget, tempor non est. In et suscipit metus. Cras in lectus a ex ullamcorper eleifend. Aenean convallis lacus et porttitor convallis. Proin iaculis a diam et euismod. Proin lectus ex, bibendum vel pretium ut, pellentesque eget nisl.

				<!-- wp:material/contact-form {"emailTo":"","subject":"","confirmationMessage":""} -->
					<div class="wp-block-material-contact-form" id="block-material-contact-form-1"></div>
				<!-- /wp:material/contact-form -->
				',
			]
		);
	}

	/**
	 * Disable Google reCAPTCHA remote check.
	 *
	 * @return array
	 */
	public function disable_google_recaptcha_remote_check() {
		return [ 'body' => json_encode( [ 'success' => true ] ) ]; // phpcs:ignore
	}

	/**
	 * Reset mailer
	 *
	 * @return bool
	 */
	public function reset_mailer() {
		return reset_phpmailer_instance();
	}

	/**
	 * Tests setup.
	 */
	public function setup() {
		parent::setup();
		$this->contact_form_block = new Contact_Form_Block( new Plugin() );
		$this->contact_form_block->init();
		update_option( 'material_design_recaptcha_site_key', 'test-site-key' );
		update_option( 'material_design_recaptcha_client_secret', 'test-client-secret' );
		add_filter( 'pre_http_request', [ $this, 'disable_google_recaptcha_remote_check' ] );
		$this->reset_mailer();
	}

	/**
	 * Tests teardown.
	 */
	public function tearDown() {
		parent::tearDown();

		$this->contact_form_block = null;
		delete_option( 'material_design_recaptcha_site_key' );
		delete_option( 'material_design_recaptcha_client_secret' );
		remove_filter( 'pre_http_request', [ $this, 'disable_google_recaptcha_remote_check' ] );
		$this->reset_mailer();
	}

	/**
	 * Setup post request data and user to do the ajax request.
	 *
	 * @param bool $is_logged_in Whether or not the ajax called should be done as a logged in user.
	 */
	private function setup_ajax( $is_logged_in ) {
		global $post;

		$post = get_post( self::$valid_post_id );

		if ( $is_logged_in ) {
			$this->_setRole( 'administrator' );
		} else {
			$this->logout();
		}

		$_POST['material_design_contact_form_nonce'] = wp_create_nonce( 'contact_form_action' );

		$_POST['token']            = 'test-token';
		$_POST['_wp_http_referer'] = get_permalink( $post->id );
		$_POST['contact_fields']   = json_encode( // phpcs:ignore
			[
				'material-design-name-1'    => [
					'name'  => 'material-design-name-11',
					'label' => 'Name',
					'value' => 'Test name',
				],
				'material-design-email-1'   => [
					'name'  => 'material-design-email-1',
					'label' => 'Email',
					'value' => 'test-sender@test.loc',
				],
				'material-design-website-1' => [
					'name'  => 'material-design-website-1',
					'label' => 'Website',
					'value' => 'http://www.example.com',
				],
				'material-design-message-1' => [
					'name'  => 'material-design-message-1',
					'label' => 'Message',
					'value' => 'Test message',
				],
			]
		);
	}

	/**
	 * Run ajax handler for a specific action.
	 *
	 * @param string $action Ajax action.
	 *
	 * @return mixed
	 */
	private function do_ajax( $action ) {
		try {
			$this->_handleAjax( $action );
		} catch ( \WPAjaxDieContinueException $e ) {
			unset( $e );
		}

		if ( $this->_last_response ) {
			return json_decode( $this->_last_response, true ); // phpcs:ignore
		} else {
			return [];
		}
	}

	/**
	 * Test priv_submit_contact_form with an invalid nonce.
	 *
	 * @see Contact_Form_Block::submit_contact_form()
	 */
	public function test_submit_contact_form_invalid_nonce() {
		$this->setup_ajax( true );
		$_POST['material_design_contact_form_nonce'] = wp_create_nonce( 'invalid_action' );

		$response = $this->do_ajax( 'material_design_submit_contact_form' );
		$this->assertEquals(
			[
				'success' => false,
				'data'    => [
					'message' => 'Invalid nonce.',
				],
			],
			$response
		);
	}

	/**
	 * Test priv_submit_contact_form with missing http_referer.
	 *
	 * @see Contact_Form_Block::submit_contact_form()
	 */
	public function test_submit_contact_form_missing_http_referer() {
		global $post;
		$this->setup_ajax( true );

		$post                      = get_post( - 1 );
		$_POST['_wp_http_referer'] = '';

		$response = $this->do_ajax( 'material_design_submit_contact_form' );
		$this->assertEquals(
			[
				'success' => false,
				'data'    => [
					'message' => 'Missing http referer.',
				],
			],
			$response
		);
	}

	/**
	 * Test priv_submit_contact_form with missing required block attributes.
	 *
	 * @see Contact_Form_Block::submit_contact_form()
	 */
	public function test_submit_contact_form_missing_required_block_attributes() {
		global $post;
		$this->setup_ajax( true );

		$post                      = get_post( self::$invalid_post_id );
		$_POST['_wp_http_referer'] = get_permalink( $post );

		$response = $this->do_ajax( 'material_design_submit_contact_form' );
		$this->assertEquals(
			[
				'success' => false,
				'data'    => [
					'message' => 'Missing email address for sending or subject.',
				],
			],
			$response
		);
	}

	/**
	 * Test priv_submit_contact_form with missing token for the Google reCAPTCHA verification.
	 *
	 * @see Contact_Form_Block::submit_contact_form()
	 */
	public function test_submit_contact_form_missing_recaptcha_token() {
		$this->setup_ajax( true );
		$_POST['token'] = '';

		$response = $this->do_ajax( 'material_design_submit_contact_form' );
		$this->assertEquals(
			[
				'success' => false,
				'data'    => [
					'message' => 'The submission could not be verified.',
				],
			],
			$response
		);
	}

	/**
	 * Test priv_submit_contact_form with missing Google reCAPTCHA site key.
	 *
	 * @see Contact_Form_Block::submit_contact_form()
	 */
	public function test_submit_contact_form_missing_recaptcha_site_key_option() {
		delete_option( 'material_design_recaptcha_site_key' );
		$this->setup_ajax( true );

		$response = $this->do_ajax( 'material_design_submit_contact_form' );
		$this->assertEquals(
			[
				'success' => false,
				'data'    => [
					'message' => 'The submission could not be verified.',
				],
			],
			$response
		);
	}

	/**
	 * Test priv_submit_contact_form with missing Google reCAPTCHA client secret.
	 *
	 * @see Contact_Form_Block::submit_contact_form()
	 */
	public function test_submit_contact_form_missing_recaptcha_client_secret_option() {
		delete_option( 'material_design_recaptcha_client_secret' );
		$this->setup_ajax( true );

		$response = $this->do_ajax( 'material_design_submit_contact_form' );
		$this->assertEquals(
			[
				'success' => false,
				'data'    => [
					'message' => 'The submission could not be verified.',
				],
			],
			$response
		);
	}

	/**
	 * Test priv_submit_contact_form for a successful submission.
	 *
	 * @see Contact_Form_Block::submit_contact_form()
	 */
	public function test_submit_contact_form_success() {
		$this->setup_ajax( true );
		$response = $this->do_ajax( 'material_design_submit_contact_form' );

		$this->assertTrue( $response['success'] );
		$mailer = tests_retrieve_phpmailer_instance();
		$this->assertSame( 'test@test.loc', $mailer->get_recipient( 'to' )->address );
		$this->assertSame( 'Test email subject', $mailer->get_sent()->subject );
		$body = $mailer->get_sent()->body;
		$this->assertRegExp( '/The following data has been submitted/', $body );
		$this->assertRegExp( '/Name\: Test name/', $body );
		$this->assertRegExp( '/Email\: test-sender@test.loc/', $body );
		$this->assertRegExp( '#Website\: http\://www\.example\.com#', $body );
		$this->assertRegExp( '/Message\: Test message/', $body );
	}

	/**
	 * Test priv_submit_contact_form with non structured contact fields.
	 *
	 * @see Contact_Form_Block::submit_contact_form()
	 */
	public function test_submit_contact_form_with_non_structured_contact_fields() {
		$this->setup_ajax( true );
		$_POST['contact_fields'] = '';
		$response                = $this->do_ajax( 'material_design_submit_contact_form' );

		$this->assertEquals(
			[
				'success' => false,
				'data'    => [
					'message' => 'Invalid submission data.',
				],
			],
			$response
		);
	}

	/**
	 * Test priv_submit_contact_form with invalid contact fields data.
	 *
	 * @see Contact_Form_Block::submit_contact_form()
	 */
	public function test_submit_contact_form_with_invalid_contact_fields_Data() {
		$this->setup_ajax( true );
		$_POST['contact_fields'] = wp_json_encode(
			[
				'material-design-name-1' => [
					'name'  => [ 'material-design-name-11' ],
					'label' => [ 'Name' ],
					'value' => [ 'Test name' ],
				],
			]
		);

		$response = $this->do_ajax( 'material_design_submit_contact_form' );

		$this->assertEquals(
			[
				'success' => false,
				'data'    => [
					'message' => 'Invalid submission data.',
				],
			],
			$response
		);
	}

	/**
	 * Test priv_submit_contact_form for a successful submission without reCAPTCHA.
	 *
	 * @see Contact_Form_Block::submit_contact_form()
	 */
	public function test_submit_contact_form_success_without_recaptcha() {
		delete_option( 'material_design_recaptcha_site_key' );
		delete_option( 'material_design_recaptcha_client_secret' );

		$this->setup_ajax( true );
		$response = $this->do_ajax( 'material_design_submit_contact_form' );

		$this->assertTrue( $response['success'] );
		$mailer = tests_retrieve_phpmailer_instance();
		$this->assertSame( 'test@test.loc', $mailer->get_recipient( 'to' )->address );
		$this->assertSame( 'Test email subject', $mailer->get_sent()->subject );
		$body = $mailer->get_sent()->body;
		$this->assertRegExp( '/The following data has been submitted/', $body );
		$this->assertRegExp( '/Name\: Test name/', $body );
		$this->assertRegExp( '/Email\: test-sender@test.loc/', $body );
		$this->assertRegExp( '#Website\: http\://www\.example\.com#', $body );
		$this->assertRegExp( '/Message\: Test message/', $body );
	}

	/**
	 * Test nopriv_submit_contact_form for a non logged in user and for a successful submission.
	 *
	 * @see Contact_Form_Block::submit_contact_form()
	 */
	public function test_submit_contact_form_when_not_logged_in_success() {
		$this->setup_ajax( false );
		$response = $this->do_ajax( 'nopriv_material_design_submit_contact_form' );

		$this->assertTrue( $response['success'] );
		$mailer = tests_retrieve_phpmailer_instance();
		$this->assertSame( 'test@test.loc', $mailer->get_recipient( 'to' )->address );
		$this->assertSame( 'Test email subject', $mailer->get_sent()->subject );
		$body = $mailer->get_sent()->body;
		$this->assertRegExp( '/The following data has been submitted/', $body );
		$this->assertRegExp( '/Name\: Test name/', $body );
		$this->assertRegExp( '/Email\: test-sender@test.loc/', $body );
		$this->assertRegExp( '#Website\: http\://www\.example\.com#', $body );
		$this->assertRegExp( '/Message\: Test message/', $body );
	}

	/**
	 * Test material_design_manage_recaptcha_api_credentials with an invalid nonce.
	 *
	 * @see Contact_Form_Block::material_design_manage_recaptcha_api_credentials()
	 */
	public function test_material_design_manage_recaptcha_api_credentials_invalid_nonce() {
		$this->_setRole( 'administrator' );
		$_POST['nonce'] = wp_create_nonce( 'invalid_action' );

		$response = $this->do_ajax( 'material_design_manage_recaptcha_api_credentials' );
		$this->assertEquals(
			[
				'success' => false,
				'data'    => [
					'message' => 'Invalid nonce.',
				],
			],
			$response
		);
	}

	/**
	 * Test material_design_manage_recaptcha_api_credentials for an editor without the manage options capability.
	 *
	 * @see Contact_Form_Block::material_design_manage_recaptcha_api_credentials()
	 */
	public function test_material_design_manage_recaptcha_api_credentials_editor_without_manage_options() {
		$this->logout();
		$this->_setRole( 'editor' );
		$_POST['nonce'] = wp_create_nonce( 'material_design_recaptcha_ajax_nonce' );

		$response = $this->do_ajax( 'material_design_manage_recaptcha_api_credentials' );
		$this->assertEquals(
			[
				'success' => false,
				'data'    => [
					'message' => 'You are not authorized.',
				],
			],
			$response
		);
	}

	/**
	 * Test material_design_manage_recaptcha_api_credentials for an editor with the manage options capability.
	 *
	 * @see Contact_Form_Block::material_design_manage_recaptcha_api_credentials()
	 */
	public function test_material_design_manage_recaptcha_api_credentials_editor_with_manage_options() {
		$editor_role = get_role( 'editor' );
		$editor_role->add_cap( 'manage_options' );

		$this->logout();
		$this->_setRole( 'editor' );
		update_option( 'material_design_recaptcha_site_key', 'test-key' );
		update_option( 'material_design_recaptcha_client_secret', 'test-secret' );

		$_POST['nonce'] = wp_create_nonce( 'material_design_recaptcha_ajax_nonce' );
		$_POST['data']  = wp_json_encode(
			[
				'action' => 'get',
			]
		);

		$response = $this->do_ajax( 'material_design_manage_recaptcha_api_credentials' );

		$this->assertEquals(
			[
				'success' => true,
				'data'    => [
					'material_design_recaptcha_site_key' => 'test-key',
					'material_design_recaptcha_client_secret' => 'test-secret',
				],
			],
			$response
		);

		delete_option( 'material_design_recaptcha_site_key' );
		delete_option( 'material_design_recaptcha_client_secret' );
		$editor_role->remove_cap( 'manage_options' );
	}

	/**
	 * Test material_design_manage_recaptcha_api_credentials with missing data.
	 *
	 * @see Contact_Form_Block::material_design_manage_recaptcha_api_credentials()
	 */
	public function test_material_design_manage_recaptcha_api_credentials_missing_data() {
		$this->_setRole( 'administrator' );
		$_POST['nonce'] = wp_create_nonce( 'material_design_recaptcha_ajax_nonce' );

		$response = $this->do_ajax( 'material_design_manage_recaptcha_api_credentials' );
		$this->assertEquals(
			[
				'success' => false,
				'data'    => [
					'message' => 'Missing or invalid action.',
				],
			],
			$response
		);
	}

	/**
	 * Test material_design_manage_recaptcha_api_credentials for a successful get action request.
	 *
	 * @see Contact_Form_Block::material_design_manage_recaptcha_api_credentials()
	 */
	public function test_material_design_manage_recaptcha_api_credentials_get_success() {
		$this->_setRole( 'administrator' );
		update_option( 'material_design_recaptcha_site_key', 'test-key' );
		update_option( 'material_design_recaptcha_client_secret', 'test-secret' );

		$_POST['nonce'] = wp_create_nonce( 'material_design_recaptcha_ajax_nonce' );
		$_POST['data']  = json_encode( // phpcs:ignore
			[
				'action' => 'get',
			]
		);

		$response = $this->do_ajax( 'material_design_manage_recaptcha_api_credentials' );
		$this->assertEquals(
			[
				'success' => true,
				'data'    => [
					'material_design_recaptcha_site_key' => 'test-key',
					'material_design_recaptcha_client_secret' => 'test-secret',
				],
			],
			$response
		);

		delete_option( 'material_design_recaptcha_site_key' );
		delete_option( 'material_design_recaptcha_client_secret' );
	}

	/**
	 * Test material_design_manage_recaptcha_api_credentials for a successful save submission.
	 *
	 * @see Contact_Form_Block::material_design_manage_recaptcha_api_credentials()
	 */
	public function test_material_design_manage_recaptcha_api_credentials_save_success() {
		$this->_setRole( 'administrator' );
		$_POST['nonce'] = wp_create_nonce( 'material_design_recaptcha_ajax_nonce' );
		$_POST['data']  = json_encode( // phpcs:ignore
			[
				'action'        => 'save',
				'site_key'      => 'test-key',
				'client_secret' => 'test-secret',
			]
		);

		$response = $this->do_ajax( 'material_design_manage_recaptcha_api_credentials' );
		$this->assertEquals( [ 'success' => true ], $response );

		delete_option( 'material_design_recaptcha_client_secret' );
		delete_option( 'material_design_recaptcha_site_key' );
	}

	/**
	 * Test material_design_manage_recaptcha_api_credentials for a successful clear submission.
	 *
	 * @see Contact_Form_Block::material_design_manage_recaptcha_api_credentials()
	 */
	public function test_material_design_manage_recaptcha_api_credentials_clear_success() {
		$this->_setRole( 'administrator' );
		update_option( 'material_design_recaptcha_site_key', 'test-key' );
		update_option( 'material_design_recaptcha_client_secret', 'test-secret' );

		$_POST['nonce'] = wp_create_nonce( 'material_design_recaptcha_ajax_nonce' );
		$_POST['data']  = json_encode( // phpcs:ignore
			[
				'action'        => 'clear',
				'site_key'      => '',
				'client_secret' => '',
			]
		);

		$response = $this->do_ajax( 'material_design_manage_recaptcha_api_credentials' );
		$this->assertEquals( [ 'success' => true ], $response );
	}

	/**
	 * Test material_design_manage_recaptcha_api_credentials with invalid data.
	 *
	 * @see Contact_Form_Block::material_design_manage_recaptcha_api_credentials()
	 */
	public function test_material_design_manage_recaptcha_api_credentials_with_invalid_data() {
		$this->_setRole( 'administrator' );
		$_POST['nonce'] = wp_create_nonce( 'material_design_recaptcha_ajax_nonce' );
		$_POST['data']  = 'invalid';

		$response = $this->do_ajax( 'material_design_manage_recaptcha_api_credentials' );

		$this->assertEquals(
			[
				'success' => false,
				'data'    => [
					'message' => 'Missing or invalid action.',
				],
			],
			$response
		);
	}

	/**
	 * Test material_design_manage_recaptcha_api_credentials with missing site key on save.
	 *
	 * @see Contact_Form_Block::material_design_manage_recaptcha_api_credentials()
	 */
	public function test_material_design_manage_recaptcha_api_credentials_with_some_missing_site_key_on_save() {
		$this->_setRole( 'administrator' );
		$_POST['nonce'] = wp_create_nonce( 'material_design_recaptcha_ajax_nonce' );
		$_POST['data']  = json_encode( // phpcs:ignore
			[
				'action'        => 'save',
				'client_secret' => 'test',
			]
		);

		$response = $this->do_ajax( 'material_design_manage_recaptcha_api_credentials' );
		$this->assertEquals(
			[
				'success' => false,
				'data'    => [
					'message' => 'Missing site key for saving.',
				],
			],
			$response
		);
	}

	/**
	 * Test material_design_manage_recaptcha_api_credentials with missing client_secret on save.
	 *
	 * @see Contact_Form_Block::material_design_manage_recaptcha_api_credentials()
	 */
	public function test_material_design_manage_recaptcha_api_credentials_with_some_missing_client_secret_on_save() {
		$this->_setRole( 'administrator' );
		$_POST['nonce'] = wp_create_nonce( 'material_design_recaptcha_ajax_nonce' );
		$_POST['data']  = json_encode( // phpcs:ignore
			[
				'action'   => 'save',
				'site_key' => 'test',
			]
		);

		$response = $this->do_ajax( 'material_design_manage_recaptcha_api_credentials' );
		$this->assertEquals(
			[
				'success' => false,
				'data'    => [
					'message' => 'Missing client secret for saving.',
				],
			],
			$response
		);
	}
}
