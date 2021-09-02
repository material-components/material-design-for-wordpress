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
 * Tests for Frontend class.
 *
 * @package MaterialDesign
 */

namespace MaterialDesign\Plugin;

use function MaterialDesign\Plugin\get_plugin_instance;

/**
 * Tests for Frontend class.
 */
class Test_Frontend extends \WP_UnitTestCase {

	/**
	 * Test frontend init.
	 *
	 * @return void
	 */
	public function test_init() {
		$frontend = get_plugin_instance()->frontend;
		$this->assertTrue( $frontend instanceof \MaterialDesign\Plugin\Frontend );

		$this->assertSame( 10, has_action( 'wp_head', [ $frontend, 'plugin_version_meta_tag' ] ) );
	}

	/**
	 * Test plugin version meta tag.
	 *
	 * @return void
	 */
	public function test_plugin_version_meta_tag() {
		$frontend = get_plugin_instance()->frontend;
		ob_start();
		$frontend->plugin_version_meta_tag();
		$output = ob_get_clean();
		$this->assertContains( sprintf( '<meta name="material-design-plugin" content="v%s" />', get_plugin_instance()->version() ), $output );
	}
}
