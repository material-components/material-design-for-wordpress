<?php
/**
 * Tests for Plugin class.
 *
 * @package MaterialThemeBuilder
 */

namespace MaterialThemeBuilder;

use MaterialThemeBuilder\Customizer\Controls;

/**
 * Tests for Plugin class.
 */
class Test_Plugin extends \WP_UnitTestCase {

	/**
	 * Test constructor.
	 *
	 * @see Plugin::__construct()
	 */
	public function test_construct() {
		$plugin = new Plugin();
		$this->assertEquals( 9, has_action( 'after_setup_theme', [ $plugin, 'init' ] ) );
		$this->assertEquals( 10, has_action( 'enqueue_block_editor_assets', [ $plugin, 'enqueue_editor_assets' ] ) );
		$this->assertEquals( 10, has_action( 'wp_enqueue_scripts', [ $plugin, 'enqueue_frontend_assets' ] ) );
		$this->assertEquals( 11, has_action( 'wp_default_scripts', [ $plugin, 'register_scripts' ] ) );
		$this->assertEquals( 11, has_action( 'wp_default_styles', [ $plugin, 'register_styles' ] ) );
		$this->assertEquals( 10, has_filter( 'block_categories', [ $plugin, 'block_category' ] ) );
	}

	/**
	 * Test for init() method.
	 *
	 * @see Plugin::init()
	 */
	public function test_init() {
		$plugin = get_plugin_instance();

		add_filter( 'material_theme_builder_plugin_config', [ $this, 'filter_config' ], 10, 2 );
		$plugin->init();

		$this->assertInternalType( 'array', $plugin->config );
		$this->assertArrayHasKey( 'foo', $plugin->config );
		$this->assertInstanceOf( Controls::class, $plugin->customizer_controls );
	}

	/**
	 * Test for enqueue_editor_assets() method.
	 *
	 * @see Plugin::enqueue_editor_assets()
	 */
	public function test_enqueue_editor_assets() {
		$plugin = get_plugin_instance();
		$plugin->enqueue_editor_assets();
		$this->assertTrue( wp_script_is( 'material-theme-builder-wp-js', 'enqueued' ) );
		$this->assertTrue( wp_style_is( 'material-theme-builder-wp-fonts-css', 'enqueued' ) );
		$this->assertTrue( wp_style_is( 'material-theme-builder-wp-css', 'enqueued' ) );
	}

	/**
	 * Test for enqueue_frontend_assets() method.
	 *
	 * @see Plugin::enqueue_frontend_assets()
	 */
	public function test_enqueue_frontend_assets() {
		$plugin = get_plugin_instance();
		$plugin->enqueue_frontend_assets();
		$this->assertTrue( wp_script_is( 'material-theme-builder-wp-frontend-js', 'enqueued' ) );
		$this->assertTrue( wp_style_is( 'material-theme-builder-wp-fonts-css', 'enqueued' ) );
		$this->assertTrue( wp_style_is( 'material-theme-builder-wp-frontend-css', 'enqueued' ) );
	}

	/**
	 * Test for block_category() method.
	 *
	 * @see Plugin::block_category()
	 */
	public function test_block_category() {
		$plugin     = get_plugin_instance();
		$categories = $plugin->block_category( [], null );
		$this->assertContains( 'material', wp_list_pluck( $categories, 'slug' ) );
	}

	/**
	 * Filter to test 'material_theme_builder_plugin_config'.
	 *
	 * @see Plugin::init()
	 * @param array       $config Plugin config.
	 * @param Plugin_Base $plugin Plugin instance.
	 * @return array
	 */
	public function filter_config( $config, $plugin ) {
		unset( $config, $plugin ); // Test should actually use these.
		return [ 'foo' => 'bar' ];
	}

	/* Put other test functions here... */
}
