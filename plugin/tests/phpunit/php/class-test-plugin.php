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
 * Tests for Plugin class.
 *
 * @package MaterialDesign
 */

namespace MaterialDesign\Plugin;

use MaterialDesign\Plugin\Rest\Onboarding_REST_Controller;
use MaterialDesign\Plugin\Plugin;
use MaterialDesign\Plugin\Admin;
use MaterialDesign\Plugin\Blocks_Frontend;
use MaterialDesign\Plugin\Customizer\Controls;
use MaterialDesign\Plugin\Importer;

/**
 * Tests for Plugin class.
 */
class Test_Plugin extends \WP_UnitTestCase {

	/**
	 * Created PostID.
	 *
	 * @var int
	 */
	public static $post_id = 0;

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
		self::$post_id = $factory->post->create(
			[
				'post_title'   => 'Lorem ipsum dolor sit amet',
				'post_content' => 'Consectetur adipiscing elit. In dui quam, egestas nec aliquet ac, hendrerit vitae ligula. Morbi malesuada in lectus vel sollicitudin. Proin tellus ligula, tincidunt at sagittis eget, tempor non est. In et suscipit metus. Cras in lectus a ex ullamcorper eleifend. Aenean convallis lacus et porttitor convallis. Proin iaculis a diam et euismod. Proin lectus ex, bibendum vel pretium ut, pellentesque eget nisl.

				<!-- wp:material/contact-form  -->
					<div class="wp-block-material-contact-form" id="block-material-contact-form-1"></div>
				<!-- /wp:material/contact-form -->
				',
			]
		);
	}

	/**
	 * Test constructor.
	 *
	 * @see Plugin::__construct()
	 */
	public function test_construct() {
		$plugin = new Plugin();
		$plugin->init();

		$this->assertEquals( 100, has_action( 'wp_enqueue_scripts', [ $plugin, 'enqueue_front_end_assets' ] ) );
	}

	/**
	 * Test for init() method.
	 *
	 * @see Plugin::init()
	 */
	public function test_init() {
		$plugin = get_plugin_instance();

		add_filter( 'material_design_plugin_config', [ $this, 'filter_config' ], 10, 2 );
		$plugin->init();

		$this->assertInternalType( 'array', $plugin->config );
		$this->assertArrayHasKey( 'foo', $plugin->config );
		$this->assertInstanceOf( Controls::class, $plugin->customizer_controls );
		$this->assertInstanceOf( Block_Types::class, $plugin->block_types );
		$this->assertInstanceOf( Block_Patterns::class, $plugin->block_patterns );
		$this->assertInstanceOf( Blocks_Frontend::class, $plugin->blocks_frontend );
		$this->assertInstanceOf( Onboarding_REST_Controller::class, $plugin->onboarding_rest_controller );
		$this->assertInstanceOf( Importer::class, $plugin->importer );
		$this->assertInstanceOf( Admin::class, $plugin->admin );
		$this->assertSame( 10, has_filter( 'plugin_row_meta', [ $plugin, 'get_plugin_row_meta' ] ) );
	}

	/**
	 * Test for enqueue_block_editor_assets() method.
	 *
	 * @see Plugin::enqueue_google_fonts()
	 */
	public function test_enqueue_google_fonts() {
		$plugin = get_plugin_instance();
		$plugin->enqueue_google_fonts();
		$this->assertTrue( wp_style_is( 'material-google-fonts-cdn', 'enqueued' ) );
	}


	/**
	 * Test for enqueue_front_end_assets() method.
	 *
	 * @see Plugin::enqueue_front_end_assets()
	 */
	public function test_enqueue_front_end_assets() {
		global $post;

		add_filter( 'template', [ $this, 'template' ] );

		$post = get_post( self::$post_id );
		update_option( 'material_design_recaptcha_site_key', 'test-key' );

		$plugin = get_plugin_instance();

		$plugin->enqueue_front_end_assets();
		$this->assertTrue( wp_script_is( 'material-front-end-js', 'enqueued' ) );
		$this->assertTrue( wp_script_is( 'google-recaptcha-v3', 'enqueued' ) );
		$this->assertTrue( wp_style_is( 'material-front-end-css', 'enqueued' ) );
		$this->assertFalse( wp_style_is( 'material-overrides-css', 'enqueued' ) );

		// Assert inline css vars are added.
		$inline_css = wp_styles()->get_data( 'material-front-end-css', 'after' );

		$this->assertNotEmpty( $inline_css );

		$inline_js = wp_scripts()->get_data( 'material-front-end-js', 'data' );

		// Assert inline js vars contains ajax url and the reCAPTCHA site key data.
		$this->assertRegexp( '/ajax_url/', $inline_js );
		$this->assertRegexp( '/recaptcha_site_key/', $inline_js );

		remove_filter( 'template', [ $this, 'template' ] );

		$plugin->enqueue_front_end_assets();
		$this->assertTrue( wp_style_is( 'material-overrides-css', 'enqueued' ) );

		delete_option( 'material_design_recaptcha_site_key' );
	}

	/**
	 * Test the frontend_inline_css() method.
	 *
	 * @see Plugin::frontend_inline_css()
	 */
	public function test_frontend_inline_css() {
		ob_start();
		get_plugin_instance()->frontend_inline_css();
		$output = ob_get_clean();

		$this->assertContains( '<style id="material-css-variables">', $output );
		$this->assertContains( '</style>', $output );
	}

	/**
	 * Test for theme_status() method.
	 *
	 * @see Plugin::theme_status()
	 */
	public function test_theme_status() {
		add_filter( 'template', [ $this, 'template' ] );

		$plugin_mock = $this->getMockBuilder( Plugin::class )
			->setMethods(
				[
					'theme_installed',
				]
			)
			->getMock();

		$plugin_mock->method( 'theme_installed' )
			->will(
				$this->onConsecutiveCalls( false, true )
			);

		$this->assertEquals( 'install', $plugin_mock->theme_status() );
		$this->assertEquals( 'ok', $plugin_mock->theme_status() );
		remove_filter( 'template', [ $this, 'template' ] );
	}

	/**
	 * Filter to test 'material_design_plugin_config'.
	 *
	 * @param array       $config Plugin config.
	 * @param Plugin_Base $plugin Plugin instance.
	 *
	 * @return array
	 * @see Plugin::init()
	 */
	public function filter_config( $config, $plugin ) {
		unset( $config, $plugin ); // Test should actually use these.

		return [ 'foo' => 'bar' ];
	}

	/**
	 * Return the material theme template.
	 *
	 * @return string
	 */
	public function template() {
		return 'material-design-google';
	}

	/**
	 * Test ::get_plugin_row_meta().
	 *
	 * @covers ::get_plugin_row_meta()
	 */
	public function test_get_plugin_row_meta() {

		$initial_meta = [
			'Link 1',
			'Link 2',
		];

		$plugin = get_plugin_instance();
		$this->assertEquals( $initial_meta, $plugin->get_plugin_row_meta( $initial_meta, 'foo.php' ) );

		$expected_meta = array_merge(
			$initial_meta,
			[
				'<a href="' . esc_url( admin_url( 'admin.php?page=material-settings#learn' ) ) . '" target="_blank" rel="noreferrer noopener">' . esc_html__( 'Learn more', 'material-design' ) . '</a>',
				'<a href="https://wordpress.org/support/plugin/material-design/" target="_blank" rel="noreferrer noopener">' . esc_html__( 'Contact support', 'material-design' ) . '</a>',
				'<a href="https://wordpress.org/support/plugin/material-design/reviews/#new-post" target="_blank" rel="noreferrer noopener">' . esc_html__( 'Leave review', 'material-design' ) . '</a>',
			]
		);

		$plugin_file = plugin_basename( realpath( __DIR__ . '/../../../material-design.php' ) );
		$this->assertEquals( $expected_meta, $plugin->get_plugin_row_meta( $initial_meta, $plugin_file ) );
	}
}
