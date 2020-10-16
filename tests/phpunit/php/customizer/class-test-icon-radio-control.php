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
 * Tests for Icon_Radio_Control class.
 *
 * @package MaterialDesign
 */

namespace MaterialDesign\Plugin\Customizer;

/**
 * Tests for Icon_Radio_Control class.
 */
class Test_Icon_Radio_Control extends \WP_UnitTestCase {
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
	 * @see Icon_Radio_Control::render_content()
	 */
	public function test_render_content() {
		$wp_customize  = new \WP_Customize_Manager();
		$radio_control = new Icon_Radio_Control(
			$wp_customize,
			'material_design_theme',
			[]
		);

		ob_start();
		$radio_control->render_content();
		$output = ob_get_clean();

		// Assert the control does not render if choices are not passed on or empty.
		$this->assertEmpty( $output );

		$radio_control = new Icon_Radio_Control(
			$wp_customize,
			'material_design_theme',
			[
				'choices' => [
					'foo' => [
						'label' => 'Foo',
						'icon'  => 'http://example.com/foo.svg',
					],
					'bar' => [
						'label' => 'Bar',
						'icon'  => 'http://example.com/bar.svg',
					],
				],
			]
		);

		ob_start();
		$radio_control->render_content();
		$output = ob_get_clean();

		$this->assertContains( sprintf( 'value="%s"', 'foo' ), $output );
		$this->assertContains( sprintf( 'value="%s"', 'bar' ), $output );

		$this->assertContains( sprintf( 'src="%s"', 'http://example.com/foo.svg' ), $output );
		$this->assertContains( sprintf( 'src="%s"', 'http://example.com/bar.svg' ), $output );
	}

	/**
	 * Test to_json.
	 *
	 * @see Icon_Radio_Control::to_json()
	 */
	public function test_to_json() {
		$wp_customize = new \WP_Customize_Manager();

		$wp_customize->add_setting( 'material_design_icon_collection' );

		$primary_control = new Icon_Radio_Control(
			$wp_customize,
			'material_design_icon_collection',
			[
				'label'    => 'Icon Styles',
				'section'  => 'icon',
				'priority' => 10,
				'css_var'  => '--mdc-icon-font',
			]
		);

		$json = $primary_control->json();

		$this->assertEquals( 'icon_radio', $json['type'] );
		$this->assertEquals( '--mdc-icon-font', $json['cssVar'] );
	}
}
