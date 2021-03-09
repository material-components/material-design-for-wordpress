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
 * Tests for Update Icons class.
 *
 * @package MaterialDesign
 */

namespace MaterialDesign\Plugin\Updates;

use MaterialDesign\Plugin\Plugin;
use function MaterialDesign\Plugin\get_plugin_instance;

/**
 * Class Test_Update_Icons
 *
 * @package MaterialDesign\Plugin\Updates
 */
class Test_Update_Icons extends \WP_UnitTestCase {

	/**
	 * Plugin instance.
	 *
	 * @var Plugin
	 */
	private $plugin;

	/**
	 * Class that forces HTTP instead of local filesystem.
	 *
	 * @var Update_Icons
	 */
	private $api_force_http;

	/**
	 * Class that forces Local instead of HTTP.
	 *
	 * @var Update_Icons
	 */
	private $api_no_force_http;

	/**
	 * Test setup.
	 */
	public function setUp() {
		parent::setUp();

		$this->plugin            = get_plugin_instance();
		$this->api_force_http    = new Update_Icons( true );
		$this->api_no_force_http = new Update_Icons( false );

		add_filter( 'pre_http_request', [ $this, 'mock_codepoints' ], 10, 3 );
		add_filter( 'pre_http_request', [ $this, 'mock_icons_json' ], 10, 3 );
		add_filter( 'material_design_file_get_contents', [ $this, 'mock_icons_json' ] );
	}

	/**
	 * Test teardown
	 */
	public function tearDown() {
		parent::tearDown();

		remove_filter( 'pre_http_request', [ $this, 'mock_codepoints' ], 10, 3 );
		remove_filter( 'pre_http_request', [ $this, 'mock_icons_json' ], 10, 3 );
		remove_filter( 'material_design_file_get_contents', [ $this, 'mock_icons_json' ] );
	}

	/**
	 * Tests whether the codepoint retrieval returns expected data over http or via file system.
	 */
	public function test_get_codepoints() {

		$data = [];

		try {
			$this->api_force_http->get_http_response( false );
		} catch ( \Exception $e ) {
			$data = json_decode( $e->getMessage(), true );
		}

		$this->assertEquals( '10k e951', $data['body'] );

		set_transient( Update_Icons::TRANSIENT, time(), 300 );
		try {
			$this->api_no_force_http->get_http_response( false );
		} catch ( \Exception $e ) {
			$data = json_decode( $e->getMessage(), true );
		}
		$this->assertEquals( '10k e951', $data['body'] );
		delete_transient( Update_Icons::TRANSIENT );
	}

	/**
	 * Tests whether Codepoints data is transformed to valid icons.json format.
	 */
	public function test_parse_codepoints() {
		$data = [];

		try {
			$this->api_force_http->get_http_response( false );
		} catch ( \Exception $e ) {
			$data = json_decode( $e->getMessage(), true );
		}

		$actual   = $this->api_force_http->parse_codepoints( $data['body'], false );
		$expected = $this->mock_icons();

		$this->assertEquals( $expected, $actual );

		set_transient( Update_Icons::TRANSIENT, time(), 300 );
		try {
			$this->api_no_force_http->get_http_response( false );
		} catch ( \Exception $e ) {
			$data = json_decode( $e->getMessage(), true );
		}
		$actual   = $this->api_force_http->parse_codepoints( $data['body'], false );
		$expected = $this->mock_icons();

		$this->assertEquals( $expected, $actual );

		delete_transient( Update_Icons::TRANSIENT );
	}

	/**
	 * Mock Codepoints data.
	 *
	 * @param bool|string|\WP_Error $preempt Short-circuit HTTP request.
	 * @param array                 $args    Arguments.
	 * @param string                $url     Request URL.
	 *
	 * @throws \Exception Exception.
	 */
	public function mock_codepoints( $preempt, $args, $url ) /* phpcs:ignore WordPressVIPMinimum.Hooks.AlwaysReturnInFilter.MissingReturnStatement */ {
		throw new \Exception(
			wp_json_encode(
				[
					'url'     => $url,
					'method'  => $args['method'],
					'headers' => $args['headers'],
					'body'    => '10k e951',
					'preempt' => $preempt,
				]
			)
		);
	}

	/**
	 * Mocks a icons.json stub.
	 *
	 * @return object
	 */
	public function mock_icons() {
		return (object) [
			'icons' => [
				'e951' => (object) [
					'id'   => 'e951',
					'name' => '10k',
				],
			],
		];
	}
}
