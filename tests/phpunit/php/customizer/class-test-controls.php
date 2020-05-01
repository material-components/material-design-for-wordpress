<?php
/**
 * Tests for Controls class.
 *
 * @package MaterialThemeBuilder
 */

namespace MaterialThemeBuilder\Customizer;

use MaterialThemeBuilder\Plugin;
use MaterialThemeBuilder\Customizer\Icon_Radio_Control;
use MaterialThemeBuilder\Customizer\Material_Color_Palette_Control;
use function MaterialThemeBuilder\get_plugin_instance;

/**
 * Tests for Controls class.
 */
class Test_Controls extends \WP_Ajax_UnitTestCase {

	/**
	 * WP_Customize_Manager object reference.
	 *
	 * @var \WP_Customize_Manager
	 */
	protected $wp_customize;

	/**
	 * Created PostID.
	 *
	 * @var int
	 */
	public static $post_id;

	/**
	 * Set up required includes.
	 *
	 * @see WP_UnitTestCase::setup()
	 */
	public function setUp() {
		parent::setUp();
		require_once ABSPATH . WPINC . '/class-wp-customize-manager.php';
		require_once ABSPATH . WPINC . '/class-wp-customize-control.php';
		require_once ABSPATH . WPINC . '/class-wp-customize-setting.php';
		require_once ABSPATH . WPINC . '/class-wp-customize-section.php';

		$this->wp_customize = $this->getMockBuilder( 'DummyClass' )
			->setMethods( [ 'register_control_type', 'add_panel', 'add_section', 'add_setting', 'add_control', 'get_setting' ] )
			->getMock();
	}

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
	 * Helper method to generate the fixtures.
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

				<!-- wp:material/image-list {"gutter":{"desktop":24,"tablet":18,"mobile":12},"displayLightbox":true,"align":"wide"} -->
					<div class="wp-block-material-image-list alignwide" id="block-material-image-list-1"></div>
				<!-- /wp:material/image-list -->
				',
			]
		);
	}

	/**
	 * Test constructor.
	 *
	 * @see Controls::__construct()
	 */
	public function test_construct() {
		$this->assertInstanceOf( Controls::class, get_plugin_instance()->customizer_controls );
	}

	/**
	 * Test init.
	 *
	 * @see Controls::init()
	 */
	public function test_init() {
		$controls = new Controls( new Plugin() );
		$controls->init();
		$this->assertEquals( 10, has_action( 'customize_register', [ $controls, 'register' ] ) );
		$this->assertEquals( 10, has_action( 'customize_controls_enqueue_scripts', [ $controls, 'scripts' ] ) );
	}

	/**
	 * Test for register() method.
	 *
	 * @see Controls::register()
	 */
	public function test_register() {
		// Set up the expectation for the register_control_type() method
		// to be called only once and with the class `Material_Color_Palette_Control`.
		$this->wp_customize->expects( $this->once() )
			->method( 'register_control_type' )
			->with( $this->equalTo( Material_Color_Palette_Control::class ) );

		$controls = $this->getMockBuilder( Controls::class )
			->disableOriginalConstructor()
			->setMethods( [ 'add_panel', 'add_sections', 'add_theme_controls', 'add_corner_styles_controls' ] )
			->getMock( null );

		$controls->plugin = get_plugin_instance();

		// Set up the expectation for the add_panel() method
		// to be called only once.
		$controls->expects( $this->once() )
			->method( 'add_panel' );

		// Set up the expectation for the add_sections() method
		// to be called only once.
		$controls->expects( $this->once() )
			->method( 'add_sections' );

		// Set up the expectation for the add_theme_controls() method
		// to be called only once.
		$controls->expects( $this->once() )
			->method( 'add_theme_controls' );

		// Set up the expectation for the add_corner_styles_controls() method
		// to be called only once.
		$controls->expects( $this->once() )
			->method( 'add_corner_styles_controls' );

		$controls->register( $this->wp_customize );
	}

	/**
	 * Test for add_panel() method.
	 *
	 * @see Controls::add_panel()
	 */
	public function test_add_panel() {
		$controls = get_plugin_instance()->customizer_controls;

		// Set $wp_customize to the mocked object.
		$controls->wp_customize = $this->wp_customize;

		// Set up the expectation for the update() method
		// to be called only once and with the id $controls->slug.
		$this->wp_customize->expects( $this->once() )
			->method( 'add_panel' )
			->with( $this->equalTo( $controls->slug ) );

		$controls->add_panel();
	}

	/**
	 * Test for add_sections() method.
	 *
	 * @see Controls::add_sections()
	 */
	public function test_add_sections() {
		$controls = get_plugin_instance()->customizer_controls;

		// Set $wp_customize to the mocked object.
		$controls->wp_customize = $this->wp_customize;

		// Replace the icons section with an instance to assert it's registered correctly.
		$icons_section = new \WP_Customize_Section( $this->wp_customize, "{$controls->slug}_icons" );
		add_filter(
			'mtb_customizer_section_args',
			function ( $args, $id ) use ( $controls, $icons_section ) {
				if ( "{$controls->slug}_icons" === $id ) {
					return $icons_section;
				}

				return $args;
			},
			10,
			2
		);

		// Set up the expectation for the add_section() method
		// to be called 5 times, once for each section.
		$this->wp_customize->expects( $this->exactly( 5 ) )
			->method( 'add_section' )
			->withConsecutive(
				[ $this->equalTo( "{$controls->slug}_style" ) ],
				[ $this->equalTo( "{$controls->slug}_colors" ) ],
				[ $this->equalTo( "{$controls->slug}_typography" ) ],
				[ $this->equalTo( "{$controls->slug}_corner_styles" ) ],
				[ $this->equalTo( $icons_section ) ]
			);

		$controls->add_sections();
	}

	/**
	 * Test for add_theme_controls() method.
	 *
	 * @see Controls::add_theme_controls()
	 */
	public function test_add_theme_controls() {
		$controls = get_plugin_instance()->customizer_controls;

		// Set $wp_customize to the mocked object.
		$controls->wp_customize = $this->wp_customize;

		// Set up the expectation for the add_setting() method
		// to be called.
		$this->wp_customize->expects( $this->exactly( 3 ) )
			->method( 'add_setting' )
			->withConsecutive(
				[ $this->equalTo( "{$controls->slug}_style" ) ],
				[ $this->equalTo( "{$controls->slug}_previous_style" ) ],
				[ $this->equalTo( "{$controls->slug}_notify" ) ]
			);

		// Set up the expectation for the add_control() method
		// to be called.
		$this->wp_customize->expects( $this->once() )
			->method( 'add_control' )
			->withConsecutive(
				[
					$this->callback(
						function ( $control ) use ( $controls ) {
							return "{$controls->slug}_style" === $control->id && [ 'baseline', 'crane', 'fortnightly', 'shrine', 'custom' ] === array_keys( $control->choices );
						}
					),
				]
			);

		$controls->add_theme_controls();
	}

	/**
	 * Test for add_typography_controls() method.
	 *
	 * @see Controls::add_typography_controls()
	 */
	public function test_add_typography_controls() {
		$controls = \MaterialThemeBuilder\get_plugin_instance()->customizer_controls;

		// Set $wp_customize to the mocked object.
		$controls->wp_customize = $this->wp_customize;

		// Set up the expectation for the add_setting() method
		// to be called.
		$this->wp_customize->expects( $this->exactly( 2 ) )
			->method( 'add_setting' )
			->withConsecutive(
				[ $this->equalTo( "{$controls->slug}_head_font_family" ) ],
				[ $this->equalTo( "{$controls->slug}_body_font_family" ) ]
			);

		// Set up the expectation for the add_control() method
		// to be called.
		$this->wp_customize->expects( $this->exactly( 2 ) )
			->method( 'add_control' )
			->withConsecutive(
				[
					$this->isInstanceOf( Google_Fonts_Control::class ),
				],
				[
					$this->isInstanceOf( Google_Fonts_Control::class ),
				]
			);

		$controls->add_typography_controls();
	}

	/**
	 * Test for add_corner_styles_controls() method.
	 *
	 * @see Controls::add_corner_styles_controls()
	 */
	public function test_add_corner_styles_controls() {
		$controls = \MaterialThemeBuilder\get_plugin_instance()->customizer_controls;

		// Set $wp_customize to the mocked object.
		$controls->wp_customize = $this->wp_customize;

		$base_setting = [
			'capability'        => 'edit_theme_options',
			'sanitize_callback' => 'sanitize_text_field',
			'transport'         => 'postMessage',
		];

		// Set up the expectation for the add_setting() method
		// to be called.
		$this->wp_customize->expects( $this->exactly( 3 ) )
			->method( 'add_setting' )
			->withConsecutive(
				[ $this->equalTo( "{$controls->slug}_small_component_radius" ), array_merge( $base_setting, [ 'default' => 4 ] ) ],
				[ $this->equalTo( "{$controls->slug}_medium_component_radius" ), array_merge( $base_setting, [ 'default' => 4 ] ) ],
				[ $this->equalTo( "{$controls->slug}_large_component_radius" ), array_merge( $base_setting, [ 'default' => 0 ] ) ]
			);

		// Set up the expectation for the add_control() method
		// to be called.
		$this->wp_customize->expects( $this->exactly( 3 ) )
			->method( 'add_control' )
			->withConsecutive(
				[
					$this->isInstanceOf( Range_Slider_Control::class ),
				],
				[
					$this->isInstanceOf( Range_Slider_Control::class ),
				],
				[
					$this->isInstanceOf( Range_Slider_Control::class ),
				]
			);

		$controls->add_corner_styles_controls();
	}

	/**
	 * Test for add_icon_collection_controls() method.
	 *
	 * @see Controls::add_icon_collection_controls()
	 */
	public function test_add_icon_collection_controls() {
		$controls = \MaterialThemeBuilder\get_plugin_instance()->customizer_controls;

		// Set $wp_customize to the mocked object.
		$controls->wp_customize = $this->wp_customize;

		// Set up the expectation for the add_setting() method
		// to be called.
		$this->wp_customize->expects( $this->exactly( 1 ) )
			->method( 'add_setting' );

		// Set up the expectation for the add_control() method
		// to be called.
		$this->wp_customize->expects( $this->once() )
			->method( 'add_control' )
			->withConsecutive(
				[
					$this->isInstanceOf( Icon_Radio_Control::class ),
				]
			);

		$controls->add_icon_collection_controls();
	}


	/**
	 * Test for add_settings() method.
	 *
	 * @see Controls::add_settings()
	 */
	public function test_add_settings() {
		$controls = get_plugin_instance()->customizer_controls;

		// Set $wp_customize to the mocked object.
		$controls->wp_customize = $this->wp_customize;

		// add_setting() should be called correctly based on settings args.
		$this->wp_customize->expects( $this->exactly( 2 ) )
			->method( 'add_setting' )
			->withConsecutive(
				[
					"{$controls->slug}_test_setting",
				],
				[
					$this->callback(
						function ( $setting ) use ( $controls ) {
							return $setting instanceof \WP_Customize_Setting && "{$controls->slug}_style" === $setting->id;
						}
					),
				]
			);

		// first arg is an array of args
		// second arg is an instance of WP_Customize_Setting.
		$controls->add_settings(
			[
				'test_setting' => [],
				'style'        => new \WP_Customize_Setting( $controls->wp_customize, "{$controls->slug}_style" ),
			]
		);
	}

	/**
	 * Test for add_controls() method.
	 *
	 * @see Controls::add_controls()
	 */
	public function test_add_controls() {
		$controls = get_plugin_instance()->customizer_controls;

		// Set $wp_customize to the mocked object.
		$controls->wp_customize = $this->wp_customize;

		// add_setting() should be called correctly based on settings args.
		$this->wp_customize->expects( $this->exactly( 2 ) )
			->method( 'add_control' )
			->withConsecutive(
				[
					"{$controls->slug}_test_setting",
				],
				[
					$this->callback(
						function ( $setting ) use ( $controls ) {
							return $setting instanceof \WP_Customize_Control && "{$controls->slug}_style" === $setting->id;
						}
					),
				]
			);

		// first arg is an array of args
		// second arg is an instance of WP_Customize_Control.
		$controls->add_controls(
			[
				'test_setting' => [],
				'style'        => new \WP_Customize_Control( $controls->wp_customize, "{$controls->slug}_style" ),
			]
		);
	}

	/**
	 * Test for scripts() method.
	 *
	 * @see Controls::scripts()
	 */
	public function test_scripts() {
		get_plugin_instance()->customizer_controls->scripts();

		$this->assertTrue( wp_script_is( 'material-theme-builder-customizer-js', 'enqueued' ) );
		$this->assertTrue( wp_style_is( 'material-theme-builder-customizer-css', 'enqueued' ) );
		$this->assertTrue( wp_style_is( 'material-theme-builder-icons-css', 'enqueued' ) );

		// Assert data is added.
		$localized_data = wp_scripts()->get_data( 'material-theme-builder-customizer-js', 'data' );
		$this->assertNotEmpty( $localized_data );
	}

	/**
	 * Test for get_google_fonts_url() method.
	 *
	 * @see Controls::get_google_fonts_url()
	 */
	public function test_get_google_fonts_url() {
		$controls = \MaterialThemeBuilder\get_plugin_instance()->customizer_controls;

		// Assert we get Roboto font.
		$this->assertContains( '//fonts.googleapis.com/css?family=Material+Icons', $controls->get_google_fonts_url() );
		$this->assertContains( '|Roboto', $controls->get_google_fonts_url() );

		// Add filters to return `Raleway` for headings and `Open Sans` for body.
		add_filter(
			"theme_mod_{$controls->slug}_head_font_family",
			function () {
				return 'Raleway';
			}
		);

		add_filter(
			"theme_mod_{$controls->slug}_body_font_family",
			function () {
				return 'Open Sans';
			}
		);

		// Assert we get updated fonts.
		$this->assertEquals( $controls->get_google_fonts_url(), '//fonts.googleapis.com/css?family=Material+Icons|Raleway:300,400,500|Open+Sans:300,400,500' );
	}

	/**
	 * Test for preview_scripts() method.
	 *
	 * @see Controls::preview_scripts()
	 */
	public function test_preview_scripts() {
		get_plugin_instance()->customizer_controls->preview_scripts();

		$this->assertTrue( wp_script_is( 'material-theme-builder-customizer-preview-js', 'enqueued' ) );
	}

	/**
	 * Test for templates() method.
	 *
	 * @see Controls::templates()
	 */
	public function test_templates() {
		ob_start();
		get_plugin_instance()->customizer_controls->templates();
		$output = ob_get_clean();

		// Basic assertions to ensure we have the two templates.
		$this->assertContains( sprintf( 'id="tmpl-customize-control-material_color-tabs"' ), $output );
		$this->assertContains( sprintf( 'id="tmpl-customize-control-material_color-accessibility"' ), $output );
	}

	/**
	 * Test for get_frontend_css() method.
	 *
	 * @see Controls::get_frontend_css()
	 */
	public function test_get_frontend_css() {
		$controls = get_plugin_instance()->customizer_controls;
		$css      = $controls->get_frontend_css();

		// Assert we get the default values as CSS vars.
		$this->assertContains( ':root {', $css );
		$this->assertContains( '--mdc-theme-primary: #6200ee;', $css );
		$this->assertContains( '--mdc-theme-secondary: #03dac6;', $css );
		$this->assertContains( '--mdc-theme-on-primary: #ffffff;', $css );
		$this->assertContains( '--mdc-theme-on-secondary: #000000;', $css );
		$this->assertContains( '--mdc-small-component-radius-button: 4px;', $css );
		$this->assertContains( '--mdc-medium-component-radius-card: 4px;', $css );
		$this->assertContains( '--mdc-large-component-radius: 0px;', $css );

		add_filter(
			"theme_mod_{$controls->slug}_small_component_radius",
			function( $value ) {
				return -1;
			}
		);

		add_filter(
			"theme_mod_{$controls->slug}_medium_component_radius",
			function( $value ) {
				return 36;
			}
		);

		$css = $controls->get_frontend_css();

		// Assert radius is limited to min/max for components.
		$this->assertContains( '--mdc-small-component-radius-button: 0px', $css );
		$this->assertContains( '--mdc-medium-component-radius-card: 24px', $css );
	}

	/**
	 * Test for get_default() method.
	 *
	 * @see Controls::get_default()
	 */
	public function test_get_default() {
		$controls = get_plugin_instance()->customizer_controls;
		$baseline = $controls->get_design_styles()['baseline'];

		$this->assertEquals( $controls->get_default( 'primary_color' ), $baseline['primary_color'] );
		$this->assertEquals( $controls->get_default( 'head_font_family' ), $baseline['head_font_family'] );
		$this->assertEquals( $controls->get_default( 'small_component_radius' ), $baseline['small_component_radius'] );
		$this->assertEquals( $controls->get_default( 'medium_component_radius' ), $baseline['medium_component_radius'] );
		$this->assertEquals( $controls->get_default( 'large_component_radius' ), $baseline['large_component_radius'] );
	}

	/**
	 * Test for get_corner_styles_controls() method.
	 *
	 * @see Controls::get_corner_styles_controls()
	 */
	public function test_get_corner_styles_controls() {
		$controls = get_plugin_instance()->customizer_controls;
		$control  = $controls->get_corner_styles_controls();

		$this->assertEquals(
			[
				[
					'id'            => 'small_component_radius',
					'label'         => 'Small Components Radius',
					'description'   => 'Components are grouped into shape categories based on their size. Examples of small components: buttons, chips, text fields.',
					'min'           => 0,
					'max'           => 28,
					'initial_value' => 4,
					'css_var'       => '--mdc-small-component-radius',
					'blocks'        => [
						'material/button' => [
							'limits' => [
								'max' => 20,
								'min' => 0,
							],
						],
					],
					'extra'         => [
						'limits' => [
							'button' => [
								'min' => 0,
								'max' => 20,
							],
						],
					],
				],
				[
					'id'            => 'medium_component_radius',
					'label'         => 'Medium Components Radius',
					'description'   => 'Components are grouped into shape categories based on their size. Examples of medium components: cards, image list items.',
					'min'           => 0,
					'max'           => 36,
					'initial_value' => 4,
					'css_var'       => '--mdc-medium-component-radius',
					'blocks'        => [
						'material/card'             => [
							'limits' => [
								'max' => 20,
								'min' => 0,
							],
						],
						'material/cards-collection' => [
							'limits' => [
								'max' => 20,
								'min' => 0,
							],
						],
						'material/image-list'       => [
							'limits' => [
								'max' => 16,
								'min' => 0,
							],
						],
					],
					'extra'         => [
						'limits' => [
							'card' => [
								'min' => 0,
								'max' => 24,
							],
						],
					],
				],
				[
					'id'            => 'large_component_radius',
					'label'         => 'Large Components Radius',
					'description'   => 'Components are grouped into shape categories based on their size. Examples of large components: Data table, nav drawer.',
					'min'           => 0,
					'max'           => 36,
					'initial_value' => 0,
					'css_var'       => '--mdc-large-component-radius',
					'extra'         => [
						'limits' => [],
					],
				],
			],
			$control
		);
	}

	/**
	 * Test for prepend_slug() method.
	 *
	 * @see Controls::prepend_slug()
	 */
	public function test_prepend_slug() {
		$controls = get_plugin_instance()->customizer_controls;

		$this->assertEquals( $controls->prepend_slug( 'style' ), "{$controls->slug}_style" );
		$this->assertEquals( $controls->prepend_slug( "{$controls->slug}_style" ), "{$controls->slug}_style" );
	}

	/**
	 * Test for show_material_components_notification() method.
	 *
	 * @see Controls::show_material_components_notification()
	 */
	public function test_show_material_components_notification() {
		$controls = get_plugin_instance()->customizer_controls;

		$this->assertEquals( 1, $controls->show_material_components_notification( 1 ) );

		global $post, $wp_query, $wp_customize;

		// Using reflection set $wp_customize->previewing to true.
		$wp_customize = new \WP_Customize_Manager();
		$reflection   = new \ReflectionProperty( get_class( $wp_customize ), 'previewing' );
		$reflection->setAccessible( true );
		$reflection->setValue( $wp_customize, true );

		// Setup the post as a single post.
		$post                     = get_post( self::$post_id );
		$wp_query->queried_object = $post;
		$wp_query->is_singular    = true;

		$this->assertFalse( $controls->show_material_components_notification( 1 ) );
	}

	/**
	 * Test for notification_dismiss() method.
	 *
	 * @see Controls::notification_dismiss()
	 */
	public function test_notification_dismiss() {
		// Bad nonce.
		$_POST['nonce'] = 'bad';
		wp_set_current_user( 1 );
		$this->make_ajax_call( 'mtb_notification_dismiss' );
		$this->assertFalse( $this->_last_response_parsed['success'] );
		$this->assertEquals( 'invalid_nonce', $this->_last_response_parsed['data'] );

		// Valid.
		$_POST['nonce'] = wp_create_nonce( 'mtb_notify_nonce' );
		$this->make_ajax_call( 'mtb_notification_dismiss' );
		$this->assertTrue( $this->_last_response_parsed['success'] );
		$this->assertEquals( [ 'count' => 1 ], $this->_last_response_parsed['data'] );
	}

	/**
	 * Helper to keep it DRY.
	 *
	 * @param string $action Action.
	 */
	protected function make_ajax_call( $action ) {
		$this->_last_response_parsed = null;
		$this->_last_response        = '';
		try {
			$this->_handleAjax( $action );
		} catch ( \WPAjaxDieContinueException $e ) {
			unset( $e );
		}
		if ( $this->_last_response ) {
			$this->_last_response_parsed = json_decode( $this->_last_response, true );
		}
	}
}
