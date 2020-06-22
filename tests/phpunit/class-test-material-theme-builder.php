<?php
/**
 * Test_Material_Theme_Builder
 *
 * @package MaterialThemeBuilder
 */

namespace MaterialThemeBuilder;

/**
 * Class Test_Material_Theme_Builder
 *
 * @package MaterialThemeBuilder
 */
class Test_Material_Theme_Builder extends \WP_UnitTestCase {

	/**
	 * Test _material_theme_builder_php_version_error().
	 *
	 * @see _material_theme_builder_php_version_error()
	 */
	public function test_material_theme_builder_php_version_error() {
		ob_start();
		_material_theme_builder_php_version_error();
		$buffer = ob_get_clean();
		$this->assertContains( '<div class="error">', $buffer );
	}

	/**
	 * Test _material_theme_builder_php_version_text().
	 *
	 * @see _material_theme_builder_php_version_text()
	 */
	public function test_material_theme_builder_php_version_text() {
		$this->assertContains( 'Material Theme Builder plugin error:', _material_theme_builder_php_version_text() );
	}

	/**
	 * Test _material_theme_builder_gutenberg_error().
	 *
	 * @see _material_theme_builder_gutenberg_error()
	 */
	public function test_material_theme_builder_gutenberg_error() {
		ob_start();
		_material_theme_builder_gutenberg_error();
		$buffer = ob_get_clean();
		$this->assertContains( '<div class="error">', $buffer );
	}

	/**
	 * Test _material_theme_builder_gutenberg_text().
	 *
	 * @see _material_theme_builder_gutenberg_text()
	 */
	public function test_material_theme_builder_gutenberg_text() {
		$this->assertContains( 'Oops, we ran into an issue with installing the Material Builder Plugin.', _material_theme_builder_gutenberg_text() );
	}

	/**
	 * Test _material_theme_builder_gutenberg_text_only().
	 *
	 * @see _material_theme_builder_gutenberg_text_only()
	 */
	public function test_material_theme_builder_gutenberg_text_only() {
		$this->assertContains( 'Oops, we ran into an issue with installing the Material Builder Plugin.', _material_theme_builder_gutenberg_text_only() );
		$this->assertNotContains( '<a href', _material_theme_builder_gutenberg_text_only() );
	}

	/**
	 * Test _material_theme_builder_activation().
	 *
	 * @see _material_theme_builder_activation()
	 */
	public function test_material_theme_builder_activation() {
		_material_theme_builder_activation();
		$this->assertNotEmpty( get_transient( 'mtb-activation-notice' ) );
	}
}
