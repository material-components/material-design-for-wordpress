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
 * Tests for Controls class.
 *
 * @package MaterialDesign
 */

namespace MaterialDesign\Plugin\Customizer;

use MaterialDesign\Plugin\Plugin;
use MaterialDesign\Plugin\Customizer\Icon_Radio_Control;
use MaterialDesign\Plugin\Customizer\Material_Styles_Section;
use MaterialDesign\Plugin\Customizer\Material_Style_Settings_Section;
use MaterialDesign\Plugin\Customizer\Material_Color_Palette_Section;
use MaterialDesign\Plugin\Customizer\Material_Color_Palette_Control;
use function MaterialDesign\Plugin\get_plugin_instance;

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
			->setMethods( [ 'register_control_type', 'register_section_type', 'add_panel', 'add_section', 'add_setting', 'add_control', 'get_setting' ] )
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

				<!-- wp:material/image-list {"gutter":{"desktop":24,"tablet":18,"mobile":12},"align":"wide"} -->
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
		$this->wp_customize->expects( $this->exactly( 3 ) )
		->method( 'register_section_type' )
		->withConsecutive(
			[ $this->equalTo( Material_Styles_Section::class ) ],
			[ $this->equalTo( Material_Style_Settings_Section::class ) ],
			[ $this->equalTo( Material_Color_Palette_Section::class ) ]
		);

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
		$sections = [
			"{$controls->slug}_icons"           => new \WP_Customize_Section( $this->wp_customize, "{$controls->slug}_icons" ),
			"{$controls->slug}_style"           => new Material_Styles_Section( $this->wp_customize, "{$controls->slug}_style" ),
			"{$controls->slug}_style_settings"  => new Material_Style_Settings_Section( $this->wp_customize, "{$controls->slug}_style_settings" ),
			"{$controls->slug}_colors"          => new Material_Color_Palette_Section( $this->wp_customize, "{$controls->slug}_colors" ),
			"{$controls->slug}_learn"           => new \WP_Customize_Section( $this->wp_customize, "{$controls->slug}_learn" ),
			"{$controls->slug}_global_style"    => new \WP_Customize_Section( $this->wp_customize, "{$controls->slug}_global_style" ),
			"{$controls->slug}_dark_colors"     => new Material_Color_Palette_Section( $this->wp_customize, "{$controls->slug}_dark_colors" ),
			"{$controls->slug}_contrast_colors" => new Material_Color_Palette_Section( $this->wp_customize, "{$controls->slug}_contrast_colors" ),
		];

		list(
			$icons_section,
			$styles_section,
			$settings_section,
			$colors_section,
			$learn_section,
			$global_style_section,
			$dark_colors_section,
			$contrast_colors_section
			) = array_values( $sections );

		add_filter(
			$controls->slug . '_customizer_section_args',
			function ( $args, $id ) use (
				$controls, $sections
			) {
				if ( ! empty( $sections[ $id ] ) ) {
					return $sections[ $id ];
				}

				return $args;
			},
			10,
			2
		);

		// Set up the expectation for the add_section() method
		// to be called 10 times, once for each section.
		$this->wp_customize->expects( $this->exactly( 10 ) )
			->method( 'add_section' )
			->withConsecutive(
				[ $this->equalTo( $styles_section ) ],
				[ $this->equalTo( $settings_section ) ],
				[ $this->equalTo( $colors_section ) ],
				[ $this->equalTo( "{$controls->slug}_typography" ) ],
				[ $this->equalTo( "{$controls->slug}_corner_styles" ) ],
				[ $this->equalTo( $icons_section ) ],
				[ $this->equalTo( $dark_colors_section ) ],
				[ $this->equalTo( $contrast_colors_section ) ],
				[ $this->equalTo( $global_style_section ) ],
				[ $this->equalTo( $learn_section ) ]
			);

		$controls->add_sections();
	}

	/**
	 * Test for add_typography_controls() method.
	 *
	 * @see Controls::add_typography_controls()
	 */
	public function test_add_typography_controls() {
		$controls = \MaterialDesign\Plugin\get_plugin_instance()->customizer_controls;

		// Set $wp_customize to the mocked object.
		$controls->wp_customize = $this->wp_customize;

		// Set up the expectation for the add_setting() method
		// to be called.
		$this->wp_customize->expects( $this->exactly( 20 ) )
			->method( 'add_setting' )
			->withConsecutive(
				[ $this->equalTo( "{$controls->slug}[display_font_family]" ) ],
				[ $this->equalTo( "{$controls->slug}[headline_font_family]" ) ],
				[ $this->equalTo( "{$controls->slug}[title_font_family]" ) ],
				[ $this->equalTo( "{$controls->slug}[label_font_family]" ) ],
				[ $this->equalTo( "{$controls->slug}[body_font_family]" ) ],
				[ $this->equalTo( "{$controls->slug}[display_large]" ) ],
				[ $this->equalTo( "{$controls->slug}[display_medium]" ) ],
				[ $this->equalTo( "{$controls->slug}[display_small]" ) ],
				[ $this->equalTo( "{$controls->slug}[headline_large]" ) ],
				[ $this->equalTo( "{$controls->slug}[headline_medium]" ) ],
				[ $this->equalTo( "{$controls->slug}[headline_small]" ) ],
				[ $this->equalTo( "{$controls->slug}[title_large]" ) ],
				[ $this->equalTo( "{$controls->slug}[title_medium]" ) ],
				[ $this->equalTo( "{$controls->slug}[title_small]" ) ],
				[ $this->equalTo( "{$controls->slug}[label_large]" ) ],
				[ $this->equalTo( "{$controls->slug}[label_medium]" ) ],
				[ $this->equalTo( "{$controls->slug}[label_small]" ) ],
				[ $this->equalTo( "{$controls->slug}[body_large]" ) ],
				[ $this->equalTo( "{$controls->slug}[body_medium]" ) ],
				[ $this->equalTo( "{$controls->slug}[body_small]" ) ]
			);

		// Set up the expectation for the add_control() method
		// to be called.
		$this->wp_customize->expects( $this->exactly( 20 ) )
			->method( 'add_control' )
			->withConsecutive(
				[
					$this->isInstanceOf( Google_Fonts_Control::class ),
				],
				[
					$this->isInstanceOf( Google_Fonts_Control::class ),
				],
				[
					$this->isInstanceOf( Google_Fonts_Control::class ),
				],
				[
					$this->isInstanceOf( Google_Fonts_Control::class ),
				],
				[
					$this->isInstanceOf( Google_Fonts_Control::class ),
				],
				[
					$this->isInstanceOf( Google_Fonts_Control::class ),
				],
				[
					$this->isInstanceOf( Google_Fonts_Control::class ),
				],
				[
					$this->isInstanceOf( Google_Fonts_Control::class ),
				],
				[
					$this->isInstanceOf( Google_Fonts_Control::class ),
				],
				[
					$this->isInstanceOf( Google_Fonts_Control::class ),
				],
				[
					$this->isInstanceOf( Google_Fonts_Control::class ),
				],
				[
					$this->isInstanceOf( Google_Fonts_Control::class ),
				],
				[
					$this->isInstanceOf( Google_Fonts_Control::class ),
				],
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
		$controls = \MaterialDesign\Plugin\get_plugin_instance()->customizer_controls;

		// Set $wp_customize to the mocked object.
		$controls->wp_customize = $this->wp_customize;

		$base_setting = [
			'capability'        => 'edit_theme_options',
			'sanitize_callback' => 'sanitize_text_field',
			'transport'         => 'postMessage',
			'type'              => 'option',
		];

		// Set up the expectation for the add_setting() method
		// to be called.
		$this->wp_customize->expects( $this->exactly( 8 ) )
			->method( 'add_setting' )
			->withConsecutive(
				[ $this->equalTo( "{$controls->slug}[global_radius]" ), array_merge( $base_setting, [ 'default' => 4 ] ) ],
				[ $this->equalTo( "{$controls->slug}[button_radius]" ), array_merge( $base_setting, [ 'default' => 4 ] ) ],
				[ $this->equalTo( "{$controls->slug}[card_radius]" ), array_merge( $base_setting, [ 'default' => 4 ] ) ],
				[ $this->equalTo( "{$controls->slug}[chip_radius]" ), array_merge( $base_setting, [ 'default' => 4 ] ) ],
				[ $this->equalTo( "{$controls->slug}[data_table_radius]" ), array_merge( $base_setting, [ 'default' => 4 ] ) ],
				[ $this->equalTo( "{$controls->slug}[image_list_radius]" ), array_merge( $base_setting, [ 'default' => 4 ] ) ],
				[ $this->equalTo( "{$controls->slug}[nav_drawer_radius]" ), array_merge( $base_setting, [ 'default' => 4 ] ) ],
				[ $this->equalTo( "{$controls->slug}[text_field_radius]" ), array_merge( $base_setting, [ 'default' => 4 ] ) ]
			);

		// Set up the expectation for the add_control() method
		// to be called.
		$this->wp_customize->expects( $this->exactly( 1 ) )
			->method( 'add_control' )
			->withConsecutive(
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
		$controls = \MaterialDesign\Plugin\get_plugin_instance()->customizer_controls;

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
					"{$controls->slug}[test_setting]",
				],
				[
					$this->callback(
						function ( $setting ) use ( $controls ) {
							return $setting instanceof \WP_Customize_Setting && "{$controls->slug}[style]" === $setting->id;
						}
					),
				]
			);

		// first arg is an array of args
		// second arg is an instance of WP_Customize_Setting.
		$controls->add_settings(
			[
				'test_setting' => [],
				'style'        => new \WP_Customize_Setting( $controls->wp_customize, "{$controls->slug}[style]" ),
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
					"{$controls->slug}[test_setting]",
				],
				[
					$this->callback(
						function ( $setting ) use ( $controls ) {
							return $setting instanceof \WP_Customize_Control && "{$controls->slug}[style]" === $setting->id;
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

		$this->assertTrue( wp_script_is( 'material-design-plugin-customizer-js', 'enqueued' ) );
		$this->assertTrue( wp_style_is( 'material-design-plugin-customizer-css', 'enqueued' ) );
		$this->assertTrue( wp_style_is( 'material-design-plugin-icons-css', 'enqueued' ) );

		// Assert data is added.
		$localized_data = wp_scripts()->get_data( 'material-design-plugin-customizer-js', 'data' );
		$this->assertNotEmpty( $localized_data );
	}

	/**
	 * Test for get_google_fonts_url() method.
	 *
	 * @see Controls::get_google_fonts_url()
	 */
	public function test_get_google_fonts_url() {
		$controls = \MaterialDesign\Plugin\get_plugin_instance()->customizer_controls;

		// Assert we get Roboto font.
		$this->assertContains( '//fonts.googleapis.com/css?family=Material+Icons', $controls->get_google_fonts_url() );
		$this->assertContains( '|Roboto', $controls->get_google_fonts_url() );

		// Add filters to return `Raleway` for headings and `Open Sans` for body.
		add_filter(
			"{$controls->slug}_get_option_headline_font_family",
			function () {
				return 'Raleway';
			}
		);

		add_filter(
			"{$controls->slug}_get_option_body_font_family",
			function () {
				return 'Open Sans';
			}
		);

		// Assert we get updated fonts.
		$this->assertEquals( '//fonts.googleapis.com/css?family=Material+Icons|Roboto:300,400,500|Raleway:300,400|Open+Sans:400', $controls->get_google_fonts_url() );
	}

	/**
	 * Test for preview_scripts() method.
	 *
	 * @see Controls::preview_scripts()
	 */
	public function test_preview_scripts() {
		get_plugin_instance()->customizer_controls->preview_scripts();

		$this->assertTrue( wp_script_is( 'material-design-plugin-customizer-preview-js', 'enqueued' ) );
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

		$this->assertContains( '--md-sys-typescale-title-large-font: "Roboto", sans-serif;', $css );
		$this->assertContains( '--md-sys-typescale-title-medium-font: "Roboto", sans-serif;', $css );
		$this->assertContains( '--md-sys-typescale-title-small-font: "Roboto", sans-serif;', $css );

		$this->assertContains( '--md-sys-typescale-display-large-font: "Roboto", sans-serif;', $css );
		$this->assertContains( '--md-sys-typescale-display-medium-font: "Roboto", sans-serif;', $css );
		$this->assertContains( '--md-sys-typescale-display-small-font: "Roboto", sans-serif;', $css );

		$this->assertContains( '--md-sys-typescale-label-large-font: "Roboto", sans-serif;', $css );
		$this->assertContains( '--md-sys-typescale-label-medium-font: "Roboto", sans-serif;', $css );
		$this->assertContains( '--md-sys-typescale-label-small-font: "Roboto", sans-serif;', $css );

		$this->assertContains( '--md-sys-typescale-headline-large-font: "Roboto", sans-serif;', $css );
		$this->assertContains( '--md-sys-typescale-headline-medium-font: "Roboto", sans-serif;', $css );
		$this->assertContains( '--md-sys-typescale-headline-small-font: "Roboto", sans-serif;', $css );

		$this->assertContains( '--md-sys-typescale-body-large-font: "Roboto", sans-serif;', $css );
		$this->assertContains( '--md-sys-typescale-body-medium-font: "Roboto", sans-serif;', $css );
		$this->assertContains( '--md-sys-typescale-body-small-font: "Roboto", sans-serif;', $css );

		$this->assertContains( '--mdc-button-radius: 4px;', $css );
		$this->assertContains( '--mdc-card-radius: 4px;', $css );
		$this->assertContains( '--mdc-chip-radius: 4px;', $css );
		$this->assertContains( '--mdc-data-table-radius: 4px;', $css );
		$this->assertContains( '--mdc-image-list-radius: 4px;', $css );
		$this->assertContains( '--mdc-nav-drawer-radius: 4px;', $css );
		$this->assertContains( '--mdc-text-field-radius: 4px;', $css );

		add_filter(
			"{$controls->slug}_get_option_button_radius",
			function( $value ) {
				return -1;
			}
		);

		add_filter(
			"{$controls->slug}_get_option_card_radius",
			function( $value ) {
				return 36;
			}
		);

		$css = $controls->get_frontend_css();

		// Assert radius is limited to min/max for components.
		$this->assertContains( '--mdc-button-radius: 0px', $css );
		$this->assertContains( '--mdc-card-radius: 24px', $css );
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
		$this->assertEquals( $controls->get_default( 'body_font_family' ), $baseline['body_font_family'] );
		$this->assertEquals( $controls->get_default( 'button_radius' ), $baseline['button_radius'] );
		$this->assertEquals( $controls->get_default( 'card_radius' ), $baseline['card_radius'] );
		$this->assertEquals( $controls->get_default( 'data_table_radius' ), $baseline['data_table_radius'] );
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
					'id'            => 'global_radius',
					'label'         => __( 'Global Corner Styles', 'material-design' ),
					'description'   => __( 'Change the global shape size for all components, expand to customize the shape size for individual components.', 'material-design' ),
					'min'           => 0,
					'max'           => 36,
					'initial_value' => 4,
				],
				[
					'id'            => 'button_radius',
					'label'         => __( 'Buttons', 'material-design' ),
					'min'           => 0,
					'max'           => 20,
					'initial_value' => 36,
					'css_var'       => '--mdc-button-radius',
					'blocks'        => [
						'material/button',
					],
				],
				[
					'id'            => 'card_radius',
					'label'         => __( 'Card', 'material-design' ),
					'min'           => 0,
					'max'           => 24,
					'initial_value' => 12,
					'css_var'       => '--mdc-card-radius',
					'blocks'        => [
						'material/card',
						'material/cards-collection',
						'material/image-list',
					],
				],
				[
					'id'            => 'chip_radius',
					'label'         => __( 'Chip', 'material-design' ),
					'min'           => 0,
					'max'           => 16,
					'initial_value' => 8,
					'css_var'       => '--mdc-chip-radius',
				],
				[
					'id'            => 'data_table_radius',
					'label'         => __( 'Data table', 'material-design' ),
					'min'           => 0,
					'max'           => 36,
					'initial_value' => 24,
					'css_var'       => '--mdc-data-table-radius',
					'blocks'        => [
						'material/data-table',
					],
				],
				[
					'id'            => 'image_list_radius',
					'label'         => __( 'Image List', 'material-design' ),
					'min'           => 0,
					'max'           => 24,
					'initial_value' => 12,
					'css_var'       => '--mdc-image-list-radius',
					'blocks'        => [
						'material/image-list',
					],
				],
				[
					'id'            => 'nav_drawer_radius',
					'label'         => __( 'Nav Drawer', 'material-design' ),
					'min'           => 0,
					'max'           => 36,
					'initial_value' => 0,
					'css_var'       => '--mdc-nav-drawer-radius',
				],
				[
					'id'            => 'text_field_radius',
					'label'         => __( 'Text Field', 'material-design' ),
					'min'           => 0,
					'max'           => 20,
					'initial_value' => 4,
					'css_var'       => '--mdc-text-field-radius',
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
		$this->make_ajax_call( 'material_design_notification_dismiss' );
		$this->assertFalse( $this->_last_response_parsed['success'] );
		$this->assertEquals( 'invalid_nonce', $this->_last_response_parsed['data'] );

		// Valid.
		$_POST['nonce'] = wp_create_nonce( 'material_design_notify_nonce' );
		$this->make_ajax_call( 'material_design_notification_dismiss' );
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
