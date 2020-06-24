<?php
/**
 * Tests for Onboarding_Wizard class.
 *
 * @package MaterialThemeBuilder
 */

namespace MaterialThemeBuilder;

use WP_UnitTest_Factory;

/**
 * Tests for Onboarding_Wizard class.
 */
class Test_Onboarding_Wizard extends \WP_UnitTestCase {
	/**
	 * Wizard instance
	 *
	 * @var wizard
	 */
	private $wizard;

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
		$this->plugin = get_plugin_instance();
		$this->wizard = new Onboarding_Wizard( $this->plugin );
	}

	/**
	 * Test init.
	 *
	 * @see Onboarding_Wizard::init()
	 */
	public function test_construct() {
		$this->assertEquals( 10, has_action( 'admin_enqueue_scripts', [ $this->plugin->wizard, 'enqueue_assets' ] ) );
		$this->assertEquals( 10, has_action( 'switch_theme', [ $this->plugin->wizard, 'switch_theme_material' ] ) );
	}

	/**
	 * Test render
	 *
	 * @see Onboarding_Wizard::render()
	 */
	public function test_render() {
		ob_start();
		$this->wizard->render();

		$output = ob_get_clean();

		$this->assertContains( '<section id="material-onboarding-wizard" class="mdc-typography">', $output );
	}

	/**
	 * Test for enqueue_assets() method.
	 *
	 * @see Onboarding_Wizard::enqueue_assets()
	 */
	public function test_enqueue_assets() {
		$screen = get_current_screen();
		$this->wizard->enqueue_assets();
		$this->assertFalse( wp_style_is( 'google-fonts', 'enqueued' ) );
		$this->assertFalse( wp_style_is( 'material-wizard', 'enqueued' ) );
		$this->assertFalse( wp_script_is( 'material-wizard', 'enqueued' ) );

		$this->plugin->create_onboarding_wizard();
		set_current_screen( 'toplevel_page_material-theme-builder' );

		$this->wizard->enqueue_assets();
		$this->assertTrue( wp_style_is( 'google-fonts', 'enqueued' ) );
		$this->assertTrue( wp_style_is( 'material-wizard', 'enqueued' ) );
		$this->assertTrue( wp_script_is( 'material-wizard', 'enqueued' ) );

		$inline_js = wp_scripts()->get_data( 'material-wizard', 'data' );

		// Assert inline js vars contains restUrl and nonce.
		$this->assertRegexp( '/restUrl/', $inline_js );
		$this->assertRegexp( '/nonce/', $inline_js );

		set_current_screen( $screen );
	}
}
