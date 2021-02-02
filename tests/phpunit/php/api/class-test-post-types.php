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
 * Tests for Post_Types class.
 *
 * @package MaterialDesign
 */

namespace MaterialDesign\Plugin\Api;

use WP_Test_REST_Controller_Testcase;
use WP_UnitTest_Factory;

/**
 * Class Test_Post_Types
 *
 * @package MaterialDesign\Plugin\Api
 */
class Test_Post_Types extends WP_Test_REST_Controller_Testcase {
	/**
	 * List of registered routes.
	 *
	 * @var array[]
	 */
	private static $routes;

	/**
	 * Post object with REST support.
	 *
	 * @var \WP_Post Post object with REST support.
	 */
	public static $foo_post;

	/**
	 * Post object without REST support.
	 *
	 * @var \WP_Post Post object without REST support.
	 */
	public static $bar_post;

	/**
	 * Post object with REST support.
	 *
	 * @var \WP_Post Post object with REST support.
	 */
	public static $baz_post;

	/**
	 * Create fake data before our tests run.
	 *
	 * @param WP_UnitTest_Factory $factory Helper that lets us create fake data.
	 */
	public static function wpSetUpBeforeClass( $factory ) {

		register_post_type(
			'foo',
			[
				'show_in_rest' => true,
			]
		);

		register_post_type(
			'bar',
			[
				'show_in_rest' => false,
			]
		);

		self::$foo_post = $factory->post->create(
			[
				'post_type' => 'foo',
				'title'     => 'Foo Post',
			]
		);

		self::$bar_post = $factory->post->create(
			[
				'post_type' => 'bar',
				'title'     => 'Bar Post',
			]
		);

		self::$baz_post = $factory->post->create(
			[
				'title' => 'Baz Post',
			]
		);


		static::$routes = rest_get_server()->get_routes();
	}

	/**
	 * Remove fake data.
	 */
	public static function wpTearDownAfterClass() {
		wp_delete_post( self::$foo_post );
		wp_delete_post( self::$bar_post );
	}

	/**
	 * Generate a prefixed route path.
	 *
	 * @param string $path URL path.
	 * @return string Route path.
	 */
	private function get_route( $path = '' ) {
		return '/material-design/v1/' . "$path";
	}

	/**
	 * Test to make sure the route exists.
	 */
	public function test_register_routes() {
		$this->assertArrayHasKey( $this->get_route( 'post-types/get-posts' ), static::$routes );
		$this->assertCount( 1, static::$routes[ $this->get_route( 'post-types/get-posts' ) ] );
	}

	/**
	 * Tests to ensure we are getting expected responses and data.
	 */
	public function test_query_multiple_post_types() {
		$request  = new \WP_REST_Request( 'GET', $this->get_route( 'post-types/get-posts' ) );
		$response = rest_get_server()->dispatch( $request );
		$data     = $response->get_data();

		// There's only two posts.
		$this->assertCount( 2, $data );

		// They are only type 'foo' and 'post'.
		foreach ( $data as $post ) {
			$this->assertTrue( in_array( $post->post_type, [ 'foo', 'post' ] ) );
		}

		// What about no posts found.
		$callable = function() {
			return 'page';
		};

		add_filter( 'material_design_query_post_types', $callable );
		$response = rest_get_server()->dispatch( $request );
		$this->assertEquals( 404, $response->get_status() );
		remove_filter( 'material_design_query_post_types', $callable );
	}

	/**
	 * Skipped
	 */
	public function test_context_param() {
		$this->markTestSkipped( 'Method not implemented' );
	}

	/**
	 * Skipped
	 */
	public function test_get_items() {
		$this->markTestSkipped( 'Method not implemented' );
	}

	/**
	 * Skipped
	 */
	public function test_get_item() {
		$this->markTestSkipped( 'Method not implemented' );
	}

	/**
	 * Skipped
	 */
	public function test_create_item() {
		$this->markTestSkipped( 'Method not implemented' );
	}

	/**
	 * Skipped
	 */
	public function test_update_item() {
		$this->markTestSkipped( 'Method not implemented' );
	}

	/**
	 * Skipped
	 */
	public function test_delete_item() {
		$this->markTestSkipped( 'Method not implemented' );
	}

	/**
	 * Skipped
	 */
	public function test_prepare_item() {
		$this->markTestSkipped( 'Method not implemented' );
	}

	/**
	 * Skipped
	 */
	public function test_get_item_schema() {
		$this->markTestSkipped( 'Uses Core Post Controller Schema' );
	}
}
