<?php
/**
 * Tests for Helpers class.
 *
 * @package MaterialThemeBuilder
 */

namespace MaterialThemeBuilder;

use MaterialThemeBuilder\Helpers;
use function MaterialThemeBuilder\get_plugin_instance;

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
}
