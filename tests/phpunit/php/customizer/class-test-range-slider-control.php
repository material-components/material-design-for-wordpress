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
 * Tests for Range_Slider_Control class.
 *
 * @package MaterialDesign
 */

namespace MaterialDesign\Plugin\Customizer;

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
			'button_radius',
			[
				'label' => 'Button Radius',
			]
		);

		ob_start();
		$font_control->render_content();
		$output = ob_get_clean();

		// Assert the Range Slider container is rendered.
		$this->assertContains( '<div class="material-design-range_slider" id="button_radius"></div>', $output );
	}

	/**
	 * Test to_json.
	 *
	 * @see Range_Slider_Control::to_json()
	 */
	public function test_to_json() {
		$wp_customize = new \WP_Customize_Manager();

		$wp_customize->add_setting( 'card_radius' );

		$primary_control = new Range_Slider_Control(
			$wp_customize,
			'card_radius',
			[
				'id'            => 'card_radius',
				'label'         => 'Card Radius',
				'description'   => 'This is the description for the card radius. It will need more details',
				'min'           => 0,
				'max'           => 28,
				'initial_value' => 4,
				'css_var'       => '--mdc-card-radius',
			]
		);

		$json = $primary_control->json();

		$this->assertEquals( 'range_slider', $json['type'] );
		$this->assertEquals( 0, $json['min'] );
		$this->assertEquals( 28, $json['max'] );
		$this->assertEquals( 4, $json['initialValue'] );
		$this->assertContains( '--mdc-card-radius', $json['cssVar'] );
	}
}
