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

namespace MaterialDesign\Plugin\Rest;

use WP_Test_REST_Controller_Testcase;
use WP_UnitTest_Factory;

/**
 * Class Test_Post_Types
 *
 * @package MaterialDesign\Plugin\Rest
 */
class Test_Posts_REST_Controller extends WP_Test_REST_Controller_Testcase {
	/**
	 * Author user for test.
	 *
	 * @var int
	 */
	protected static $author_id;

	/**
	 * Subscriber user for test.
	 *
	 * @var int
	 */
	protected static $subscriber_id;

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
		self::$foo_post = $factory->post->create(
			[
				'title' => 'Foo Post',
			]
		);

		self::$bar_post = $factory->post->create(
			[
				'title' => 'Bar Post',
			]
		);


		static::$routes = rest_get_server()->get_routes();

		self::$author_id     = $factory->user->create(
			[ 'role' => 'author' ]
		);
		self::$subscriber_id = $factory->user->create(
			[ 'role' => 'subscriber' ]
		);
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
		wp_set_current_user( self::$subscriber_id );

		$request  = new \WP_REST_Request( 'GET', $this->get_route( 'post-types/get-posts' ) );
		$response = rest_get_server()->dispatch( $request );
		$data     = $response->get_data();

		$this->assertEquals( 'rest_forbidden', $data['code'] );
		$this->assertEquals( 403, $data['data']['status'] );

		wp_set_current_user( self::$author_id );

		$request  = new \WP_REST_Request( 'GET', $this->get_route( 'post-types/get-posts' ) );
		$response = rest_get_server()->dispatch( $request );
		$data     = $response->get_data();

		// There's only two posts.
		$this->assertCount( 2, $data );
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
