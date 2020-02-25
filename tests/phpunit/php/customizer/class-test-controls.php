<?php
/**
 * Tests for Controls class.
 *
 * @package MaterialThemeBuilder
 */

namespace MaterialThemeBuilder\Customizer;

use MaterialThemeBuilder\Plugin;

/**
 * Tests for Controls class.
 */
class Test_Controls extends \WP_UnitTestCase {

	/**
	 * WP_Customize_Manager object reference.
	 *
	 * @var \WP_Customize_Manager
	 */
	protected $wp_customize;

	/**
	 * Set up required includes.
	 *
	 * @see WP_UnitTestCase::setup()
	 */
	public function setUp() {
		parent::setUp();
		require_once ABSPATH . WPINC . '/class-wp-customize-control.php';
		require_once ABSPATH . WPINC . '/class-wp-customize-setting.php';
		require_once ABSPATH . WPINC . '/class-wp-customize-section.php';

		$this->wp_customize = $this->getMockBuilder( 'DummyClass' )
			->setMethods( [ 'add_panel', 'add_section', 'add_setting', 'add_control', 'get_setting' ] )
			->getMock();
	}

	/**
	 * Test constructor.
	 *
	 * @see Controls::__construct()
	 */
	public function test_construct() {
		$this->assertInstanceOf( Controls::class, \MaterialThemeBuilder\get_plugin_instance()->customizer_controls );
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
		$controls = $this->getMockBuilder( Controls::class )
			->disableOriginalConstructor()
			->setMethods( [ 'add_panel', 'add_sections', 'add_theme_controls' ] )
			->getMock( null );

		$controls->plugin = \MaterialThemeBuilder\get_plugin_instance();

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

		$controls->register( $this->wp_customize );
	}

	/**
	 * Test for add_panel() method.
	 *
	 * @see Controls::add_panel()
	 */
	public function test_add_panel() {
		$controls = \MaterialThemeBuilder\get_plugin_instance()->customizer_controls;

		// Set $wp_customize to the mocked object.
		$controls->wp_customize = $this->wp_customize;

		// Set up the expectation for the update() method
		// to be called only once and with the id 'material_theme'.
		$this->wp_customize->expects( $this->once() )
			->method( 'add_panel' )
			->with( $this->equalTo( 'material_theme' ) );

		$controls->add_panel();
	}

	/**
	 * Test for add_sections() method.
	 *
	 * @see Controls::add_sections()
	 */
	public function test_add_sections() {
		$controls = \MaterialThemeBuilder\get_plugin_instance()->customizer_controls;

		// Set $wp_customize to the mocked object.
		$controls->wp_customize = $this->wp_customize;

		// Replace the icons section with an instance to assert it's registered correctly.
		$icons_section = new \WP_Customize_Section( $this->wp_customize, 'material_theme_icons' );
		add_filter(
			'mtb_customizer_section_args',
			function( $args, $id ) use ( $icons_section ) {
				if ( 'material_theme_icons' === $id ) {
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
				[ $this->equalTo( 'material_theme_style' ) ],
				[ $this->equalTo( 'material_theme_colors' ) ],
				[ $this->equalTo( 'material_theme_typography' ) ],
				[ $this->equalTo( 'material_theme_corners' ) ],
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
		$controls = \MaterialThemeBuilder\get_plugin_instance()->customizer_controls;

		// Set $wp_customize to the mocked object.
		$controls->wp_customize = $this->wp_customize;

		// Set up the expectation for the add_setting() method
		// to be called.
		$this->wp_customize->expects( $this->any() )
			->method( 'add_setting' )
			->withConsecutive(
				[ $this->equalTo( 'example_id' ) ]
			);

		// Set up the expectation for the add_control() method
		// to be called.
		$this->wp_customize->expects( $this->any() )
			->method( 'add_control' )
			->withConsecutive(
				[ $this->equalTo( 'example_id' ) ]
			);

		$controls->add_theme_controls();
	}

	/**
	 * Test for add_settings() method.
	 *
	 * @see Controls::add_settings()
	 */
	public function test_add_settings() {
		$controls = \MaterialThemeBuilder\get_plugin_instance()->customizer_controls;

		// Set $wp_customize to the mocked object.
		$controls->wp_customize = $this->wp_customize;

		// add_setting() should be called correctly based on settings args.
		$this->wp_customize->expects( $this->exactly( 2 ) )
			->method( 'add_setting' )
			->withConsecutive(
				[
					'test_setting',
				],
				$this->callback(
					function( $setting ) {
						return $setting instanceof \WP_Customize_Setting && 'material_theme_style' === $setting->id;
					}
				)
			);

		// first arg is an array of args
		// second arg is an instance of WP_Customize_Setting.
		$controls->add_settings(
			[
				'test_setting'         => [],
				'material_theme_style' => new \WP_Customize_Setting( $controls->wp_customize, 'material_theme_style' ),
			]
		);
	}

	/**
	 * Test for add_controls() method.
	 *
	 * @see Controls::add_controls()
	 */
	public function test_add_controls() {
		$controls = \MaterialThemeBuilder\get_plugin_instance()->customizer_controls;

		// Set $wp_customize to the mocked object.
		$controls->wp_customize = $this->wp_customize;

		// add_setting() should be called correctly based on settings args.
		$this->wp_customize->expects( $this->exactly( 2 ) )
			->method( 'add_control' )
			->withConsecutive(
				[
					'test_setting',
				],
				$this->callback(
					function( $setting ) {
						return $setting instanceof \WP_Customize_Control && 'material_theme_style' === $setting->id;
					}
				)
			);

		// first arg is an array of args
		// second arg is an instance of WP_Customize_Control.
		$controls->add_controls(
			[
				'test_setting'         => [],
				'material_theme_style' => new \WP_Customize_Control( $controls->wp_customize, 'material_theme_style' ),
			]
		);
	}

	/**
	 * Test for scripts() method.
	 *
	 * @see Controls::scripts()
	 */
	public function test_scripts() {
		\MaterialThemeBuilder\get_plugin_instance()->customizer_controls->scripts();

		$this->assertTrue( wp_script_is( 'material-theme-builder-customizer-js', 'enqueued' ) );
		$this->assertTrue( wp_style_is( 'material-theme-builder-customizer-css', 'enqueued' ) );
	}
}
