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
 * Tests for Block_Patterns class.
 *
 * @package MaterialDesign
 */

namespace MaterialDesign\Plugin;

/**
 * Tests for Block_Patterns class.
 */
class Test_Block_Patterns extends \WP_UnitTestCase {

	/**
	 * List of all material block patterns.
	 *
	 * @var array
	 */
	private static $patterns = [
		'call-to-action',
		'call-to-action-benefits',
		'contact-form',
		'call-to-action-features',
		'features-list',
		'highlights',
		'logos',
		'media-grid',
		'numbers',
		'single-feature',
		'single-feature-extended',
		'hero-section',
		'pricing',
		'hero-section-image',
		'latest-posts',
	];

	/**
	 * Test for init() method.
	 *
	 * @see Plugin::init()
	 */
	public function test_init() {
		$block_patterns = get_plugin_instance()->block_patterns;

		$this->assertEquals( 9, has_action( 'init', [ $block_patterns, 'register' ] ) );
	}

	/**
	 * Test register.
	 *
	 * @see Block_Type::register()
	 */
	public function test_register() {
		if ( ! class_exists( '\WP_Block_Patterns_Registry' ) ) {
			$this->markTestSkipped( 'Skipping test as `WP_Block_Patterns_Registry` class does not exist.' );
			return;
		}

		$block_patterns = new Block_Patterns( get_plugin_instance() );

		// Unregister all the block patterns if they are registered already.
		array_walk(
			self::$patterns,
			function( $block ) {
				unregister_block_pattern( 'material/' . $block );
			}
		);

		$block_patterns->register();

		$registered = \WP_Block_Patterns_Registry::get_instance()->get_all_registered();
		$patterns   = [];

		foreach ( $registered as $pattern ) {
			$patterns[ $pattern['name'] ] = $pattern;
		}

		array_walk(
			self::$patterns,
			function( $pattern ) use ( $patterns ) {
				$pattern_name = 'material/' . $pattern;

				// Assert the block pattern is registered.
				$this->assertTrue( array_key_exists( $pattern_name, $patterns ), sprintf( '"%s" pattern is not registered', $pattern_name ) );

				// Assert the block pattern category contains `material`.
				$this->assertContains( 'material', $patterns[ $pattern_name ]['categories'] );
			}
		);
	}

	/**
	 * Test for register_category() method.
	 *
	 * @see Plugin::register_category()
	 */
	public function test_register_category() {
		if ( ! class_exists( '\WP_Block_Pattern_Categories_Registry' ) ) {
			$this->markTestSkipped( 'Skipping test as `WP_Block_Pattern_Categories_Registry` class does not exist.' );
			return;
		}

		$block_patterns = new Block_Patterns( get_plugin_instance() );
		$block_patterns->register();

		$registered = \WP_Block_Pattern_Categories_Registry::get_instance()->get_all_registered();

		$this->assertContains( 'material', wp_list_pluck( $registered, 'name' ) );
	}
}
