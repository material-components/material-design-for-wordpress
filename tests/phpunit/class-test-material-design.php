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
 * Test_Material_Design
 *
 * @package MaterialDesign
 */

namespace MaterialDesign\Plugin;

/**
 * Class Test_Material_Design
 *
 * @package MaterialDesign
 */
class Test_Material_Design extends \WP_UnitTestCase {

	/**
	 * Test _material_design_php_version_error().
	 *
	 * @see _material_design_php_version_error()
	 */
	public function test_material_design_php_version_error() {
		ob_start();
		_material_design_php_version_error();
		$buffer = ob_get_clean();
		$this->assertContains( '<div class="error">', $buffer );
	}

	/**
	 * Test _material_design_php_version_text().
	 *
	 * @see _material_design_php_version_text()
	 */
	public function test_material_design_php_version_text() {
		$this->assertContains( 'Material Design plugin error:', _material_design_php_version_text() );
	}

	/**
	 * Test _material_design_gutenberg_error().
	 *
	 * @see _material_design_gutenberg_error()
	 */
	public function test_material_design_gutenberg_error() {
		ob_start();
		_material_design_gutenberg_error();
		$buffer = ob_get_clean();
		$this->assertContains( '<div class="error">', $buffer );
	}

	/**
	 * Test _material_design_gutenberg_text().
	 *
	 * @see _material_design_gutenberg_text()
	 */
	public function test_material_design_gutenberg_text() {
		$this->assertContains( 'Material Design plugin is not available since your version of the Block Editor is too old.', _material_design_gutenberg_text() );
	}

	/**
	 * Test _material_design_gutenberg_text_only().
	 *
	 * @see _material_design_gutenberg_text_only()
	 */
	public function test_material_design_gutenberg_text_only() {
		$this->assertContains( 'Material Design plugin is not available since your version of the Block Editor is too old.', _material_design_gutenberg_text_only() );
		$this->assertNotContains( '<a href', _material_design_gutenberg_text_only() );
	}

	/**
	 * Test _material_design_activation().
	 *
	 * @see _material_design_activation()
	 */
	public function test_material_design_activation() {
		_material_design_activation();
		$this->assertNotEmpty( get_option( 'material_plugin_activated' ) );
	}
}
