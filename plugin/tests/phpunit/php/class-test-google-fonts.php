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
 * Tests for Google_Fonts class.
 *
 * @package MaterialDesign
 */

namespace MaterialDesign\Plugin;

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

		// Assert we read the json file and return fonts. Actual number will change with updates.
		$this->assertNotEmpty( array_keys( Google_Fonts::get_fonts() ) );
	}

	/**
	 * Test prepare_font_choice.
	 *
	 * @see Google_Fonts::prepare_font_choice()
	 */
	public function test_prepare_font_choice() {
		$font = Google_Fonts::prepare_font_choice( 'Raleway', [ 'variants' => [ '100' ] ] );

		$this->assertEquals(
			$font,
			[
				'id'       => 'Raleway',
				'text'     => 'Raleway',
				'variants' => [
					'100',
				],
			]
		);
	}
}
