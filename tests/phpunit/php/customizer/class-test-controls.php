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

		$this->getMockBuilder( 'WP_Customize_Control' )->getMock();

		$this->wp_customize = $this->getMockBuilder( 'DummyClass' )
			->setMethods( [ 'add_panel', 'add_section', 'add_setting', 'add_control' ] )
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

		// Set up the expectation for the add_section() method
		// to be called 5 times, once for each section.
		$this->wp_customize->expects( $this->exactly( 5 ) )
			->method( 'add_section' )
			->withConsecutive(
				[ $this->equalTo( 'material_theme_theme' ) ],
				[ $this->equalTo( 'material_theme_typography' ) ],
				[ $this->equalTo( 'material_theme_corners' ) ],
				[ $this->equalTo( 'material_theme_icons' ) ],
				[ $this->equalTo( 'material_theme_colors' ) ]
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

		// Set up the expectation for the add_settings() method
		// to be called exactly once.
		$this->wp_customize->expects( $this->once() )
			->method( 'add_setting' );

		// Set up the expectation for the add_controls() method
		// to be called exactly once.
		$this->wp_customize->expects( $this->once() )
		->method( 'add_control' );

		$controls->add_theme_controls();
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
