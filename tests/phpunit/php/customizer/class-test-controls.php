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
		$controls = \MaterialThemeBuilder\get_plugin_instance()->customizer_controls;

		// Create a mock for the WP_Customize_Manager class,
		// mock the add_panel() and add_section() methods.
		$wp_customize = $this->getMockBuilder( 'WP_Customize_Manager' )
			->setMethods( [ 'add_panel', 'add_section' ] )
			->getMock();

		// Set up the expectation for the update() method
		// to be called only once and with the id 'material_theme'.
		$wp_customize->expects( $this->once() )
			->method( 'add_panel' )
			->with( $this->equalTo( 'material_theme' ) );

		// Set up the expectation for the add_section() method
		// to be called 5 times, once for each section.
		$wp_customize->expects( $this->exactly( 5 ) )
			->method( 'add_section' )
			->withConsecutive(
				[ $this->equalTo( 'material_theme_theme' ) ],
				[ $this->equalTo( 'material_theme_typography' ) ],
				[ $this->equalTo( 'material_theme_corner' ) ],
				[ $this->equalTo( 'material_theme_icons' ) ],
				[ $this->equalTo( 'material_theme_colors' ) ]
			);

		$controls->register( $wp_customize );
	}

	/**
	 * Test for scripts() method.
	 *
	 * @see Controls::scripts()
	 */
	public function test_scripts() {
		\MaterialThemeBuilder\get_plugin_instance()->customizer_controls->scripts();

		$this->assertTrue( wp_script_is( 'material-theme-builder-customizer', 'enqueued' ) );
	}
}
