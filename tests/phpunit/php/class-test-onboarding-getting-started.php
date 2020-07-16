<?php
/**
 * Tests for Onboarding_Getting_Started class.
 *
 * @package MaterialThemeBuilder
 */

namespace MaterialThemeBuilder;

use WP_UnitTest_Factory;

/**
 * Tests for Onboarding_Wizard class.
 */
class Test_Onboarding_Getting_Started extends \WP_UnitTestCase {
	/**
	 * Getting started instance
	 *
	 * @var getting_started
	 */
	private $getting_started;

	/**
	 * Plugin instance
	 *
	 * @var Plugin
	 */
	private $plugin;

	/**
	 * Setup.
	 *
	 * @inheritdoc
	 */
	public function setUp() {
		parent::setUp();
		$this->plugin          = get_plugin_instance();
		$this->getting_started = new Onboarding_Getting_Started( $this->plugin );
	}

	/**
	 * Test init.
	 *
	 * @see Onboarding_Getting_Started::init()
	 */
	public function test_construct() {
		$this->assertEquals( 10, has_action( 'admin_enqueue_scripts', [ $this->plugin->getting_started, 'enqueue_assets' ] ) );
	}

	/**
	 * Test render page
	 *
	 * @see Onboarding_Getting_Started::render()
	 */
	public function test_render_page() {
		$output = $this->getting_started->render_page();

		$this->assertContains( '<div id="material-gsm" class="material-gsm"></div>', $output );
	}

	/**
	 * Test for enqueue_assets() method.
	 *
	 * @see Onboarding_Getting_Started::enqueue_assets()
	 */
	public function test_enqueue_assets() {
		$screen = get_current_screen();
		$this->getting_started->enqueue_assets();
		$this->assertFalse( wp_style_is( 'material-gsm', 'enqueued' ) );
		$this->assertFalse( wp_script_is( 'material-gsm', 'enqueued' ) );

		$this->plugin->create_demo_importer_page();
		set_current_screen( 'material_page_material_settings' );

		$this->getting_started->enqueue_assets();
		$this->assertTrue( wp_style_is( 'google-fonts', 'enqueued' ) );
		$this->assertTrue( wp_style_is( 'material-gsm', 'enqueued' ) );
		$this->assertTrue( wp_script_is( 'material-gsm', 'enqueued' ) );

		$inline_js = wp_scripts()->get_data( 'material-gsm', 'data' );

		// Assert inline js vars contains theme and content status.
		$this->assertRegexp( '/themeStatus/', $inline_js );
		$this->assertRegexp( '/contentStatus/', $inline_js );

		set_current_screen( $screen );
	}
}
