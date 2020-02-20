<?php
/**
 * Tests for Controls class.
 *
 * @package MaterialThemeBuilder
 */

namespace MaterialThemeBuilder\Customizer;

/**
 * Tests for Image_Radio_Control class.
 */
class Test_Image_Radio_Control extends \WP_UnitTestCase {
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
	 * @see Image_Radio_Control::render_content()
	 */
	public function test_render_content() {
		$wp_customize  = new \WP_Customize_Manager();
		$radio_control = new Image_Radio_Control(
			$wp_customize,
			'material_theme_theme',
			[
				'choices' => [
					'baseline' => [
						'label' => 'Baseline',
						'url'   => 'http://example.com/baseline.svg',
					],
					'crane'    => [
						'label' => 'Crane',
						'url'   => 'http://example.com/crane.svg',
					],
				],
			]
		);

		ob_start();
		$radio_control->render_content();
		$output = ob_get_clean();

		$this->assertContains( sprintf( '<input type="radio" value="%s"', 'baseline' ), $output );
		$this->assertContains( sprintf( '<input type="radio" value="%s"', 'crane' ), $output );

		$this->assertContains( sprintf( '<img src="%s"', 'http://example.com/baseline.svg' ), $output );
		$this->assertContains( sprintf( '<img src="%s"', 'http://example.com/crane.svg' ), $output );
	}
}
