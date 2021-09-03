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
 * Tests for Image_Radio_Control class.
 *
 * @package MaterialDesign
 */

namespace MaterialDesign\Plugin\Customizer;

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
			'material_design_theme',
			[]
		);

		ob_start();
		$radio_control->render_content();
		$output = ob_get_clean();

		// Assert the control does not render if choices are not passed on or empty.
		$this->assertEmpty( $output );

		$radio_control = new Image_Radio_Control(
			$wp_customize,
			'material_design_theme',
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

		$this->assertContains( sprintf( '<img class="customize-control-image-radio-control-preview" src="%s"', 'http://example.com/baseline.svg' ), $output );
		$this->assertContains( sprintf( '<img class="customize-control-image-radio-control-preview" src="%s"', 'http://example.com/crane.svg' ), $output );
	}
}
