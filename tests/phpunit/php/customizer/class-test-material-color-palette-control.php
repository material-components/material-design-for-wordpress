<?php
/**
 * Copyright 2020 Material Design
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
 * @package MaterialThemeBuilder
 */

/**
 * Tests for Material_Color_Palette_Control class.
 *
 * @package MaterialThemeBuilder
 */

namespace MaterialThemeBuilder\Customizer;

/**
 * Tests for Material_Color_Palette_Control class.
 */
class Test_Material_Color_Palette_Control extends \WP_UnitTestCase {
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
	 * Test to_json.
	 *
	 * @see Material_Color_Palette_Control::to_json()
	 */
	public function test_to_json() {
		$wp_customize = new \WP_Customize_Manager();

		$wp_customize->add_setting( 'mtb_primary_color' );
		$wp_customize->add_setting( 'mtb_on_primary_color' );

		$primary_control = new Material_Color_Palette_Control(
			$wp_customize,
			'mtb_primary_color',
			[
				'label'                => 'Primary',
				'section'              => 'colors',
				'priority'             => 10,
				'related_text_setting' => 'mtb_on_primary_color',
				'related_setting'      => false,
				'css_var'              => '--mdc-theme-primary',
			]
		);

		$primary_text_control = new Material_Color_Palette_Control(
			$wp_customize,
			'mtb_on_primary_color',
			[
				'label'                => 'Primary Text',
				'section'              => 'colors',
				'priority'             => 10,
				'related_text_setting' => false,
				'related_setting'      => 'mtb_primary_color',
				'css_var'              => '--mdc-theme-on-primary',
			]
		);

		$json = $primary_control->json();

		$this->assertEquals( 'material_color', $json['type'] );
		$this->assertEquals( 'mtb_on_primary_color', $json['relatedTextSetting'] );
		$this->assertEquals( false, $json['relatedSetting'] );
		$this->assertEquals( '--mdc-theme-primary', $json['cssVar'] );

		$json = $primary_text_control->json();

		$this->assertEquals( 'material_color', $json['type'] );
		$this->assertEquals( false, $json['relatedTextSetting'] );
		$this->assertEquals( 'mtb_primary_color', $json['relatedSetting'] );
		$this->assertEquals( '--mdc-theme-on-primary', $json['cssVar'] );
	}
}
