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
 * Test_Block_Editor
 *
 * @package MaterialDesign
 */

namespace MaterialDesign\Test\Theme\BlockEditor;

use MaterialDesign\Theme\BlockEditor;

/**
 * Class Test_Block_Editor
 *
 * @package MaterialDesign
 */
class Test_Block_Editor extends \WP_UnitTestCase {

	/**
	 * Post id.
	 *
	 * @var int
	 */
	protected static $post_id;

	/**
	 * Post id.
	 *
	 * @var int
	 */
	protected static $cpt_post_id;

	/**
	 * Backed up meta keys.
	 *
	 * @var array
	 */
	protected static $wp_meta_keys_saved;

	/**
	 * Setup.
	 *
	 * @param \WP_UnitTest_Factory $factory Factory method.
	 */
	public static function wpSetUpBeforeClass( $factory ) {
		self::$post_id = $factory->post->create( [ 'post_type' => 'page' ] );
		register_post_type(
			'cpt',
			[
				'show_in_rest' => true,
				'supports'     => [ 'custom-fields' ],
			]
		);
		self::$cpt_post_id        = $factory->post->create( [ 'post_type' => 'cpt' ] );
		self::$wp_meta_keys_saved = isset( $GLOBALS['wp_meta_keys'] ) ? $GLOBALS['wp_meta_keys'] : [];
	}

	/**
	 * Tear down.
	 */
	public static function wpTearDownAfterClass() {
		$GLOBALS['wp_meta_keys'] = self::$wp_meta_keys_saved;
		wp_delete_post( self::$post_id, true );
		wp_delete_post( self::$cpt_post_id, true );

		unregister_post_type( 'cpt' );
	}

	/**
	 * Test init.
	 */
	public function test_init() {
		$this->assertEquals( 10, has_action( 'init', 'MaterialDesign\\Theme\\BlockEditor\\register_disable_section_meta' ) );
		$this->assertEquals( 10, has_action( 'enqueue_block_editor_assets', 'MaterialDesign\\Theme\\BlockEditor\\enqueue_block_editor_assets' ) );
		$this->assertEquals( 10, has_action( 'body_class', 'MaterialDesign\\Theme\\BlockEditor\\filter_body_class' ) );
	}

	/**
	 * Test enqueue_block_editor_assets().
	 *
	 * @see enqueue_block_editor_assets()
	 */
	public function test_enqueue_block_editor_assets() {
		BlockEditor\enqueue_block_editor_assets();
		$this->assertTrue( wp_script_is( 'material-block-editor-js-theme' ) );
	}

	/**
	 * Test register_disable_section_meta.
	 */
	public function test_register_disable_section_meta() {
		global $wp_meta_keys;
		BlockEditor\register_disable_section_meta();
		$this->assertIsArray( $wp_meta_keys['post']['']['material-hide-sections'] );
		// Ensure no data exists currently.
		$values = get_post_meta( self::$post_id, 'material-hide-sections', true );
		$this->assertEmpty( $values );

		$this->grant_write_permission();

		$data = [
			'meta' => [
				'material-hide-sections' => [ 'title' => 1 ],
			],
		];

		$map = [
			'pages' => self::$post_id,
			'cpt'   => self::$cpt_post_id,
		];
		foreach ( $map as $key => $post_id ) {
			$request = new \WP_REST_Request( 'POST', sprintf( '/wp/v2/%s/%d', $key, $post_id ) );
			$request->set_body_params( $data );

			$response = rest_get_server()->dispatch( $request );
			$this->assertSame( 200, $response->get_status() );

			$meta = get_post_meta( $post_id, 'material-hide-sections', false );
			$this->assertNotEmpty( $meta );
			$this->assertCount( 1, $meta );
			$this->assertNotEmpty( 'test_value', $meta[0]['title'] );
		}
	}

	/**
	 * Test filter_body_class.
	 */
	public function test_filter_body_class() {
		global $post, $wp_query;
		$post                = self::$post_id;
		$wp_query->is_single = true;
		update_post_meta( self::$post_id, 'material-hide-sections', [ 'title' => 1 ] );
		$class = BlockEditor\filter_body_class( [] );
		$this->assertTrue( in_array( 'has-hide-title', $class, true ) );
	}

	/**
	 * Grant write permission to meta.
	 */
	protected function grant_write_permission() {
		// Ensure we have write permission.
		$user = $this->factory()->user->create(
			[
				'role' => 'editor',
			]
		);
		wp_set_current_user( $user );
	}
}
