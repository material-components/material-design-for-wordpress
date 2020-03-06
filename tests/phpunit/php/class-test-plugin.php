<?php
/**
 * Tests for Plugin class.
 *
 * @package MaterialThemeBuilder
 */

namespace MaterialThemeBuilder;

use MaterialThemeBuilder\BazBar\Sample;
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
		$this->assertEquals( 10, has_action( 'enqueue_block_editor_assets', [ $plugin, 'enqueue_block_editor_assets' ] ) );
		$this->assertEquals( 10, has_action( 'wp_enqueue_scripts', [ $plugin, 'enqueue_front_end_assets' ] ) );
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
		$this->assertInstanceOf( Sample::class, $plugin->sample );
		$this->assertInstanceOf( Controls::class, $plugin->customizer_controls );
	}

	/**
	 * Test for enqueue_block_editor_assets() method.
	 *
	 * @see Plugin::enqueue_block_editor_assets()
	 */
	public function test_enqueue_block_editor_assets() {
		$plugin = get_plugin_instance();
		$plugin->enqueue_block_editor_assets();
		$this->assertTrue( wp_script_is( 'material-block-editor-js', 'enqueued' ) );
		$this->assertTrue( wp_style_is( 'material-icons-css', 'enqueued' ) );
		$this->assertTrue( wp_style_is( 'material-block-editor-css', 'enqueued' ) );
	}

	/**
	 * Test for enqueue_front_end_assets() method.
	 *
	 * @see Plugin::enqueue_front_end_assets()
	 */
	public function test_enqueue_front_end_assets() {
		$plugin = get_plugin_instance();
		$plugin->enqueue_front_end_assets();
		$this->assertTrue( wp_script_is( 'material-front-end-js', 'enqueued' ) );
		$this->assertTrue( wp_style_is( 'material-icons-css', 'enqueued' ) );
		$this->assertTrue( wp_style_is( 'material-front-end-css', 'enqueued' ) );

		// Assert inline css vars are added.
		$inline_css = wp_styles()->get_data( 'material-front-end-css', 'after' );
		$this->assertNotEmpty( $inline_css );
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
