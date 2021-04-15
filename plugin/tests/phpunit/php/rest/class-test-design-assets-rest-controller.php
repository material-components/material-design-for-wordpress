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
 * Tests for Design Assets REST Controller class.
 *
 * @package MaterialDesign
 */

namespace MaterialDesign\Plugin\Rest;

use WP_REST_Request;

/**
 * Class Test_Design_Assets_Rest_Controller
 *
 * @package MaterialDesign\Plugin
 */
class Test_Design_Assets_Rest_Controller extends \WP_UnitTestCase {
	/**
	 * List of registered routes.
	 *
	 * @var array[]
	 */
	public $routes;

	/**
	 * User ID.
	 *
	 * @var int
	 */
	public $admin_id;

	/**
	 * User ID.
	 *
	 * @var int
	 */
	public $non_admin_id;

	/**
	 * Setup
	 */
	public function setUp() {
		parent::setUp();

		$factory = new \WP_UnitTest_Factory();

		$this->admin_id     = $factory->user->create( [ 'role' => 'administrator' ] );
		$this->non_admin_id = $factory->user->create( [ 'role' => 'subscriber' ] );


		$this->routes = rest_get_server()->get_routes();
	}

	/**
	 * Generate a prefixed route path.
	 *
	 * @param string $path URL path.
	 * @return string Route path.
	 */
	private function get_route( $path = '' ) {
		return '/material-design/v1/design-assets' . "$path";
	}

	/**
	 * Test register_routes().
	 */
	public function test_register_routes() {
		$this->assertArrayHasKey( $this->get_route( '/retrieve-fonts(?:/(?P<force>force))?' ), $this->routes );
		$this->assertCount( 1, $this->routes[ $this->get_route( '/retrieve-fonts(?:/(?P<force>force))?' ) ] );

		$this->assertArrayHasKey( $this->get_route( '/retrieve-icons(?:/(?P<force>force))?' ), $this->routes );
		$this->assertCount( 1, $this->routes[ $this->get_route( '/retrieve-icons(?:/(?P<force>force))?' ) ] );
	}

	/**
	 * Checks that the Fonts API endpoint is responsive to admins only and returns data.
	 */
	public function test_get_fonts() {
		// Test not logged in.
		$request  = new WP_REST_Request( 'GET', $this->get_route( '/retrieve-fonts' ) );
		$response = rest_get_server()->dispatch( $request );
		$this->assertEquals( 401, $response->get_status() );

		// Test non-admin.
		wp_set_current_user( $this->non_admin_id );
		$response = rest_get_server()->dispatch( $request );
		$this->assertEquals( 403, $response->get_status() );

		// Test admin.
		wp_set_current_user( $this->admin_id );
		$response = rest_get_server()->dispatch( $request );
		$this->assertEquals( 200, $response->get_status() );
		$this->assertNotEmpty( $response->get_data()->data );

		wp_set_current_user( 0 );
	}

	/**
	 * Checks that the Icons API endpoint is responsive to admins only and returns data.
	 */
	public function test_get_icons() {
		// Test not logged in.
		$request  = new WP_REST_Request( 'GET', $this->get_route( '/retrieve-icons' ) );
		$response = rest_get_server()->dispatch( $request );
		$this->assertEquals( 401, $response->get_status() );

		// Test non-admin.
		wp_set_current_user( $this->non_admin_id );
		$response = rest_get_server()->dispatch( $request );
		$this->assertEquals( 403, $response->get_status() );

		// Test admin.
		wp_set_current_user( $this->admin_id );
		$response = rest_get_server()->dispatch( $request );
		$this->assertEquals( 200, $response->get_status() );
		$this->assertNotEmpty( $response->get_data()->data );

		wp_set_current_user( 0 );
	}
}
