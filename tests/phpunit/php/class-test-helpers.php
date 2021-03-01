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
 * Tests for Helpers class.
 *
 * @package MaterialDesign
 */

namespace MaterialDesign\Plugin;

use MaterialDesign\Plugin\Helpers;
use function MaterialDesign\Plugin\get_plugin_instance;

/**
 * Tests for Helpers class.
 */
class Test_Helpers extends \WP_UnitTestCase {

	/**
	 * Test hex_to_rgb.
	 *
	 * @see Helpers::hex_to_rgb()
	 */
	public function test_hex_to_rgb() {
		$colors = [
			'#000000' => [ 0, 0, 0 ],
			'#ffffff' => [ 255, 255, 255 ],
			'#ff0000' => [ 255, 0, 0 ],
			'#00ffff' => [ 0, 255, 255 ],
			'#0ff'    => [ 0, 255, 255 ],
			'#ff5733' => [ 255, 87, 51 ],
			'#2a2d5a' => [ 42, 45, 90 ],
			'#5a2a48' => [ 90, 42, 72 ],
			'#07971d' => [ 7, 151, 29 ],
			'fff'     => [ 255, 255, 255 ],
			'ffff'    => false,
		];

		foreach ( $colors as $hex => $rgb ) {
			$this->assertEquals( $rgb, Helpers::hex_to_rgb( $hex ) );
		}

		$this->assertEquals( [ 7, 151, 29 ], Helpers::hex_to_rgb( [ 7, 151, 29 ] ) );
	}

	/**
	 * Test mix_colors.
	 *
	 * @see Helpers::mix_colors()
	 */
	public function test_mix_colors() {
		$this->assertEquals( '#698aa2', Helpers::mix_colors( '#036', '#d2e1dd' ) );
		$this->assertEquals( '#355f84', Helpers::mix_colors( '#036', '#d2e1dd', .75 ) );
		$this->assertEquals( '#9eb6bf', Helpers::mix_colors( '#036', '#d2e1dd', .25 ) );
	}

	/**
	 * Test hexdec.
	 *
	 * @see Helpers::hexdec()
	 */
	public function test_hexdec() {
		$this->assertEquals( 255, Helpers::hexdec( 'f' ) );
		$this->assertEquals( 255, Helpers::hexdec( 'ff' ) );
		$this->assertEquals( 15, Helpers::hexdec( '0f' ) );
	}

	/**
	 * Test dechex.
	 *
	 * @see Helpers::dechex()
	 */
	public function test_dechex() {
		$this->assertEquals( '0f', Helpers::dechex( 15 ) );
		$this->assertEquals( 'ff', Helpers::dechex( 255 ) );
		$this->assertEquals( 'cd', Helpers::dechex( 205 ) );
	}
}
