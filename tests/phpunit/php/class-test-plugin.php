<?php
/**
 * Tests for Plugin class.
 *
 * @package MaterialThemeBuilder
 */

namespace MaterialThemeBuilder;

use MaterialThemeBuilder\Plugin;
use MaterialThemeBuilder\Customizer\Controls;

/**
 * Stub get_transient().
 *
 * @param string $key Some key.
 *
 * @return bool
 */
function get_transient( $key ) {
	return true;
}

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
		$this->assertEquals( 9, has_action( 'after_setup_theme', [ $plugin, 'init' ] ) );
		$this->assertEquals( 10, has_action( 'enqueue_block_editor_assets', [ $plugin, 'enqueue_block_editor_assets' ] ) );
		$this->assertEquals( 100, has_action( 'wp_enqueue_scripts', [ $plugin, 'enqueue_front_end_assets' ] ) );
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
	 * Test for enqueue_block_editor_assets() method.
	 *
	 * @see Plugin::enqueue_block_editor_assets()
	 */
	public function test_enqueue_block_editor_assets() {
		$user_id = self::factory()->user->create( [ 'role' => 'editor' ] );
		wp_set_current_user( $user_id );

		$plugin = get_plugin_instance();
		$plugin->enqueue_block_editor_assets();
		$this->assertTrue( wp_script_is( 'material-block-editor-js', 'enqueued' ) );
		$this->assertTrue( wp_style_is( 'material-styles-css', 'enqueued' ) );
		$this->assertTrue( wp_style_is( 'material-block-editor-css', 'enqueued' ) );

		// Assert inline css vars are added.
		$inline_css = wp_styles()->get_data( 'material-block-editor-css', 'after' );
		$this->assertNotEmpty( $inline_css );

		$inline_js = wp_scripts()->get_data( 'material-block-editor-js', 'data' );

		// Assert inline js vars contains ajax url data.
		$this->assertRegexp( '/ajax_url/', $inline_js );
	}

	/**
	 * Test for enqueue_block_editor_assets() method for editor user with the manage options capability.
	 *
	 * @see Plugin::enqueue_block_editor_assets()
	 */
	public function test_enqueue_block_editor_assets_for_editor_role_with_manage_options_cap() {
		$editor_role = get_role( 'editor' );
		$editor_role->add_cap( 'manage_options' );
		$user_id = self::factory()->user->create( [ 'role' => 'editor' ] );
		wp_set_current_user( $user_id );

		$plugin = get_plugin_instance();
		$plugin->enqueue_block_editor_assets();
		$this->assertTrue( wp_script_is( 'material-block-editor-js', 'enqueued' ) );
		$this->assertTrue( wp_style_is( 'material-styles-css', 'enqueued' ) );
		$this->assertTrue( wp_style_is( 'material-block-editor-css', 'enqueued' ) );

		// Assert inline css vars are added.
		$inline_css = wp_styles()->get_data( 'material-block-editor-css', 'after' );
		$this->assertNotEmpty( $inline_css );

		$inline_js = wp_scripts()->get_data( 'material-block-editor-js', 'data' );

		// Assert inline js vars contains `allow_contact_form_block`.
		$this->assertRegexp( '/allow_contact_form_block/', $inline_js );
		$editor_role->remove_cap( 'manage_options' );
	}

	/**
	 * Test for enqueue_block_editor_assets() method for editor user with the manage options capability.
	 *
	 * @see Plugin::enqueue_block_editor_assets()
	 */
	public function test_enqueue_block_editor_assets_for_administrator() {
		$user_id = self::factory()->user->create( [ 'role' => 'administrator' ] );
		wp_set_current_user( $user_id );

		$plugin = get_plugin_instance();
		$plugin->enqueue_block_editor_assets();
		$this->assertTrue( wp_script_is( 'material-block-editor-js', 'enqueued' ) );
		$this->assertTrue( wp_style_is( 'material-styles-css', 'enqueued' ) );
		$this->assertTrue( wp_style_is( 'material-block-editor-css', 'enqueued' ) );

		// Assert inline css vars are added.
		$inline_css = wp_styles()->get_data( 'material-block-editor-css', 'after' );
		$this->assertNotEmpty( $inline_css );

		$inline_js = wp_scripts()->get_data( 'material-block-editor-js', 'data' );

		// Assert inline css js contains `allow_contact_form_block`.
		$this->assertRegexp( '/allow_contact_form_block/', $inline_js );
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
		update_option( 'mtb_recaptcha_site_key', 'test-key' );

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

		delete_option( 'mtb_recaptcha_site_key' );
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
	 * Test for get_block_defaults() method.
	 *
	 * @see Plugin::get_block_defaults()
	 */
	public function test_get_block_defaults() {
		$plugin   = get_plugin_instance();
		$controls = get_plugin_instance()->customizer_controls;
		$defaults = $plugin->get_block_defaults();

		$this->assertEquals(
			[
				'cornerRadius' => 4,
			],
			$defaults['material/button']
		);

		// Add filter to return 12, 48 and -1 sequantially as the cornerRadius for button.
		add_filter(
			"theme_mod_{$controls->slug}_small_component_radius",
			function () {
				static $index = 0;
				$values       = [ 12, 48, -1 ];
				return $values[ $index++ ];
			}
		);

		$defaults = $plugin->get_block_defaults();
		$this->assertEquals(
			[
				'cornerRadius' => 12,
			],
			$defaults['material/button']
		);

		$defaults = $plugin->get_block_defaults();
		$this->assertEquals(
			[
				'cornerRadius' => 20,
			],
			$defaults['material/button']
		);

		$defaults = $plugin->get_block_defaults();
		$this->assertEquals(
			[
				'cornerRadius' => 0,
			],
			$defaults['material/button']
		);
	}

	/**
	 * Test for material_notice() method.
	 *
	 * @see Plugin::material_notice()
	 */
	public function test_material_notice() {
		$plugin = get_plugin_instance();
		ob_start();
		$notice = $plugin->material_notice( 'Foo', 'Bar <p>Paragraph</p> <a href="#">Link</a>' );

		$this->assertContains( 'Bar Paragraph <a href="#">Link</a>', ob_get_clean() );
	}

	/**
	 * Test for material_theme_status() method.
	 *
	 * @see Plugin::material_theme_status()
	 */
	public function test_material_theme_status() {
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

		$this->assertEquals( 'install', $plugin_mock->material_theme_status() );
		$this->assertEquals( 'ok', $plugin_mock->material_theme_status() );
		remove_filter( 'template', [ $this, 'template' ] );
	}

	/**
	 * Test for theme_not_installed_notice() method.
	 *
	 * @see Plugin::theme_not_installed_notice()
	 */
	public function test_theme_not_installed_notice() {
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

		ob_start();
		$plugin_mock->theme_not_installed_notice();
		$output = ob_get_clean();

		$this->assertContains( '<div class="notice notice-info is-dismissible material-notice-container">', $output );

		ob_start();
		$plugin_mock->theme_not_installed_notice();
		$output = ob_get_clean();

		$this->assertEmpty( $output );
		$this->assertEquals( 10, has_action( 'admin_notices', [ get_plugin_instance(), 'theme_not_installed_notice' ] ) );
		remove_filter( 'template', [ $this, 'template' ] );
	}

	/**
	 * Test for plugin_activated_notice() method.
	 *
	 * @see Plugin::plugin_activated_notice()
	 */
	public function test_plugin_activated_notice() {
		add_filter( 'template', [ $this, 'template' ] );
		$plugin = get_plugin_instance();

		ob_start();
		$plugin->plugin_activated_notice();
		$output = ob_get_clean();

		$this->assertContains( '<div class="notice notice-info is-dismissible material-notice-container">', $output );
		$this->assertEquals( 9, has_action( 'admin_notices', [ $plugin, 'plugin_activated_notice' ] ) );
		remove_filter( 'template', [ $this, 'template' ] );
	}

	/**
	 * Filter to test 'material_theme_builder_plugin_config'.
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
		return 'material-theme';
	}
}
