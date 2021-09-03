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
 * Class Test_Update_Fonts.
 *
 * @package MaterialDesign\Plugin\Updates
 */
class Test_Update_Fonts extends \WP_UnitTestCase {

	/**
	 * Plugin instance.
	 *
	 * @var Plugin
	 */
	private $plugin;

	/**
	 * Class that forces HTTP instead of local filesystem.
	 *
	 * @var Update_Fonts
	 */
	private $api_force_http;

	/**
	 * Class that forces Local instead of HTTP.
	 *
	 * @var Update_Fonts
	 */
	private $api_no_force_http;

	/**
	 * Test setup.
	 */
	public function setUp() {
		parent::setUp();

		$this->plugin            = get_plugin_instance();
		$this->api_force_http    = new Update_Fonts( true );
		$this->api_no_force_http = new Update_Fonts( false );

		add_filter( 'pre_http_request', [ $this, 'mock_font_request' ], 10, 3 );
		add_filter( 'material_design_file_get_contents', [ $this, 'mock_file_json' ] );
	}

	/**
	 * Test teardown
	 */
	public function tearDown() {
		parent::tearDown();

		remove_filter( 'pre_http_request', [ $this, 'mock_fonts' ], 10, 3 );
		remove_filter( 'material_design_file_get_contents', [ $this, 'mock_file_json' ] );
	}

	/**
	 * Tests that method returns expected object.
	 */
	public function test_get_fonts() {
		try {
			$data = $this->api_force_http->get_fonts( false );

			$this->assertNotEmpty( $data );
		} catch ( \Exception $e ) {
			$actual   = json_decode( $e->getMessage() );
			$expected = (object) [
				'items' => [
					(object) [
						'family'   => 'ABeeZee',
						'variants' => [
							'regular',
							'italic',
						],
						'category' => 'sans-serif',
					],
				],
			];

			$this->assertEquals( $expected, json_decode( $actual->body ) );
		}
	}

	/**
	 * Tests that the transformation of the API response matches the file format.
	 */
	public function test_json_to_file() {
		$json = null;
		try {
			$this->api_force_http->get_http_response();
		} catch ( \Exception $e ) {
			$data = json_decode( $e->getMessage() );
		}

		$actual = $this->api_force_http->json_to_file( $data->body, false );

		$this->assertEquals( $this->mock_file_json(), $actual );
	}

	/**
	 * Tests that API request happens.
	 */
	public function test_get_http_response() {

		$actual = null;
		try {
			$this->api_force_http->get_http_response();
		} catch ( \Exception $e ) {
			$data   = json_decode( $e->getMessage() );
			$actual = wp_json_encode( $data->body );
		}

		$this->assertEquals( '"{\"items\":[{\"family\":\"ABeeZee\",\"variants\":[\"regular\",\"italic\"],\"category\": \"sans-serif\"}]}"', $actual );
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
	public function mock_font_request( $preempt, $args, $url ) /* phpcs:ignore WordPressVIPMinimum.Hooks.AlwaysReturnInFilter.MissingReturnStatement */ {
		throw new \Exception(
			wp_json_encode(
				[
					'url'     => $url,
					'method'  => $args['method'],
					'headers' => $args['headers'],
					'body'    => '{"items":[{"family":"ABeeZee","variants":["regular","italic"],"category": "sans-serif"}]}',
					'preempt' => $preempt,
				]
			)
		);
	}

	/**
	 * Mocks the JSON file.
	 *
	 * @return string
	 */
	public function mock_file_json() {
		return json_encode( json_decode( '{"ABeeZee":{"variants":["regular","italic"],"category":"sans-serif"}}' ), JSON_PRETTY_PRINT ); /* phpcs:ignore */
	}

	/**
	 * Test get_api_slug
	 */
	public function test_get_api_slug() {
		$result = $this->api_force_http->get_api_slug();

		$this->assertEquals( 'google_fonts_api_key', $result );
	}
}
