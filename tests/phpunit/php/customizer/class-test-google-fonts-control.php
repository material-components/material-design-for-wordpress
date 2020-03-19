<?php
/**
 * Tests for Google_Fonts_Control class.
 *
 * @package MaterialThemeBuilder
 */

namespace MaterialThemeBuilder\Customizer;

/**
 * Tests for Google_Fonts_Control class.
 */
class Test_Google_Fonts_Control extends \WP_UnitTestCase {
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
	 * @see Google_Fonts_Control::render_content()
	 */
	public function test_render_content() {
		$wp_customize = new \WP_Customize_Manager();

		$font_control = new Google_Fonts_Control(
			$wp_customize,
			'head_font_family',
			[
				'label'       => 'Headlines Subtitles',
				'description' => 'Font family for all headlines',
			]
		);

		ob_start();
		$font_control->render_content();
		$output = ob_get_clean();

		// Assert label is rendered.
		$this->assertContains( '<span class="customize-control-title">Headlines Subtitles</span>', $output );

		// Assert description is rendered.
		$this->assertContains( '<span class="description customize-control-description">Font family for all headlines</span>', $output );

		// Assert select is rendered with correct ID.
		$this->assertRegExp( '/<select(.+)? id="head_font_family"/', $output );
	}

	/**
	 * Test to_json.
	 *
	 * @see Google_Fonts_Control::to_json()
	 */
	public function test_to_json() {
		$wp_customize = new \WP_Customize_Manager();

		$wp_customize->add_setting( 'mtb_primary_color' );
		$wp_customize->add_setting( 'mtb_primary_text_color' );

		$primary_control = new Google_Fonts_Control(
			$wp_customize,
			'mtb_primary_color',
			[
				'label'                => 'Headlines',
				'priority'             => 10,
				'related_text_setting' => 'mtb_head_font_family',
				'related_setting'      => false,
				'css_vars'             => [
					'family' => [
						'--mdc-typography-headline1-font-family',
						'--mdc-typography-headline4-font-family',
						'--mdc-typography-subtitle1-font-family',
					],
				],
			]
		);

		$json = $primary_control->json();

		$this->assertEquals( 'google_fonts', $json['type'] );
		$this->assertContains( '--mdc-typography-headline1-font-family', $json['cssVars']['family'] );
		$this->assertContains( '--mdc-typography-headline4-font-family', $json['cssVars']['family'] );
		$this->assertContains( '--mdc-typography-subtitle1-font-family', $json['cssVars']['family'] );
	}
}
