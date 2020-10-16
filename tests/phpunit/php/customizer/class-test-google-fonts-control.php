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
 * Tests for Google_Fonts_Control class.
 *
 * @package MaterialDesign
 */

namespace MaterialDesign\Plugin\Customizer;

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
	 * Test render.
	 *
	 * @see Google_Fonts_Control::render()
	 */
	public function test_render() {
		$wp_customize = new \WP_Customize_Manager();

		$font_control = new Google_Fonts_Control(
			$wp_customize,
			'head_font_family',
			[
				'label'       => 'Headlines Subtitles',
				'description' => 'Font family for all headlines',
				'choices'     => [
					[
						'id'    => 'test',
						'label' => 'Headline 1',
					],
				],
			]
		);

		ob_start();
		$font_control->render();
		$output = ob_get_clean();

		// Assert wrapper is rendered.
		$this->assertContains( '<li id="customize-control-head_font_family" class="customize-control customize-control-google_fonts">', $output );

		$font_control = new Google_Fonts_Control(
			$wp_customize,
			'head_font_family',
			[
				'label' => 'Headline 1',
			]
		);

		ob_start();
		$font_control->render();
		$output = ob_get_clean();

		// Assert child class is present.
		$this->assertContains( '<li id="customize-control-head_font_family" class="customize-control customize-control-google_fonts customize-control-child-google_fonts">', $output );
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
				'choices'     => [
					[
						'id'    => 'test',
						'label' => 'Headline 1',
					],
				],
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

		$wp_customize->add_setting( 'material_design_primary_color' );
		$wp_customize->add_setting( 'material_design_on_primary_color' );

		$primary_control = new Google_Fonts_Control(
			$wp_customize,
			'material_design_primary_color',
			[
				'label'                => 'Headlines',
				'priority'             => 10,
				'related_text_setting' => 'material_design_head_font_family',
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
