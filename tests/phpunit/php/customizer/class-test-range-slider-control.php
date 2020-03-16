<?php
/**
 * Tests for Range_Slider_Control class.
 *
 * @package MaterialThemeBuilder
 */

namespace MaterialThemeBuilder\Customizer;

/**
 * Tests for Range_Slider_Control class.
 */
class Test_Range_Slider_Control extends \WP_UnitTestCase {
	/**
	 * Set up required includes.
	 *
	 * @see WP_UnitTestCase::setup()
	 */
	public function setUp() {
		parent::setUp();
		require_once ABSPATH . WPINC . '/class-wp-customize-manager.php';
		require_once ABSPATH . WPINC . '/class-wp-customize-control.php';
	}

	/**
	 * Test render_content.
	 *
	 * @see Range_Slider_Control::render_content()
	 */
	public function test_render_content() {
		$wp_customize = new \WP_Customize_Manager();

		$font_control = new Range_Slider_Control(
			$wp_customize,
			'small_component_radius',
			[
				'label' => 'Small Components Radius',
			]
		);

		ob_start();
		$font_control->render_content();
		$output = ob_get_clean();

		// Assert the Range Slider container is rendered
		$this->assertContains( '<div class="mtb-range_slider" id="small_component_radius"></div>', $output );
	}

	/**
	 * Test to_json.
	 *
	 * @see Range_Slider_Control::to_json()
	 */
	public function test_to_json() {
		$wp_customize = new \WP_Customize_Manager();

		$wp_customize->add_setting( 'small_component_radius' );

		$primary_control = new Range_Slider_Control(
			$wp_customize,
			'small_component_radius',
			[
				'id'            => 'small_component_radius',
				'label'         => 'Small Components Radius',
				'description'   => 'This is the description for the small components radius. It will need more details',
				'min'           => 0,
				'max'           => 28,
				'initial_value' => 4,
				'css_var'       => '--mdc-small-component-radius',
			]
		);

		$json = $primary_control->json();

		$this->assertEquals( 'range_slider', $json['type'] );
		$this->assertEquals( 0, $json['min'] );
		$this->assertEquals( 28, $json['max'] );
		$this->assertEquals( 4, $json['initialValue'] );
		$this->assertContains( '--mdc-small-component-radius', $json['cssVar'] );
	}
}
