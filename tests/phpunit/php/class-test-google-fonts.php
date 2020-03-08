<?php
/**
 * Tests for Google_Fonts class.
 *
 * @package MaterialThemeBuilder
 */

namespace MaterialThemeBuilder;

/**
 * Tests for Google_Fonts class.
 */
class Test_Google_Fonts extends \WP_UnitTestCase {

	/**
	 * Test get_fonts.
	 *
	 * @see Google_Fonts::get_fonts()
	 */
	public function test_get_fonts() {
		Google_Fonts::$list = [
			'Raleway' => [],
		];

		// Assert if `Google_Fonts::$list` is already set, we just return it.
		$this->assertEquals(
			Google_Fonts::get_fonts(),
			[
				'Raleway' => [],
			] 
		);

		Google_Fonts::$list = [];

		// Assert we read the json file and return all fonts.
		$this->assertEquals( count( array_keys( Google_Fonts::get_fonts() ) ), 969 );
	}

	/**
	 * Test prepare_font_choice.
	 *
	 * @see Google_Fonts::prepare_font_choice()
	 */
	public function test_prepare_font_choice() {
		$font = Google_Fonts::prepare_font_choice( 'Raleway' );

		$this->assertEquals(
			$font,
			[
				'id'   => 'Raleway',
				'text' => 'Raleway',
			] 
		);
	}
}
