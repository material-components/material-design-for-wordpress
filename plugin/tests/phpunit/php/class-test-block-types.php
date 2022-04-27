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
 * Tests for Block_Types class.
 *
 * @package MaterialDesign
 */

namespace MaterialDesign\Plugin;

use MaterialDesign\Plugin\Plugin;
use MaterialDesign\Plugin\Customizer\Controls;

/**
 * Tests for Block_Types class.
 */
class Test_Block_Types extends \WP_UnitTestCase {

	/**
	 * List of all material blocks.
	 *
	 * @var array
	 */
	private static $blocks = [
		'button',
		'card',
		'cards-collection',
		'contact-form',
		'data-table',
		'hand-picked-posts',
		'image-list',
		'list',
		'recent-posts',
		'tab-bar',
	];

	/**
	 * Test for init() method.
	 *
	 * @see Plugin::init()
	 */
	public function test_init() {
		$block_types = get_plugin_instance()->block_types;

		$this->assertTrue( is_a( $block_types->blocks['recent-posts'], '\MaterialDesign\Plugin\Blocks\Posts_List_Block' ) );
		$this->assertTrue( is_a( $block_types->blocks['hand-picked-posts'], '\MaterialDesign\Plugin\Blocks\Posts_List_Block' ) );
		$this->assertTrue( is_a( $block_types->blocks['contact-form'], '\MaterialDesign\Plugin\Blocks\Contact_Form_Block' ) );

		$this->assertEquals( 10, has_action( 'init', [ $block_types, 'register_blocks' ] ) );
		$this->assertEquals( 10, has_action( 'enqueue_block_editor_assets', [ $block_types, 'enqueue_block_editor_assets' ] ) );
	}

	/**
	 * Test register_blocks.
	 *
	 * @see Block_Type::register_blocks()
	 */
	public function test_register_blocks() {
		$block_types = new Block_Types( get_plugin_instance() );

		// Unregister all the blocks if they are registered already.
		array_walk(
			self::$blocks,
			function( $block ) {
				unregister_block_type( 'material/' . $block );
			}
		);

		$block_types->register_blocks();

		$blocks = \WP_Block_Type_Registry::get_instance()->get_all_registered();

		array_walk(
			self::$blocks,
			function( $block_name ) use ( $blocks ) {
				// Assert the block is registered.
				$this->assertTrue( array_key_exists( 'material/' . $block_name, $blocks ) );

				$block = $blocks[ 'material/' . $block_name ];

				$this->assertEquals( 'material-block-editor-js', $block->editor_script );
				$this->assertEquals( 'material-block-editor-css', $block->editor_style );

				$block_folder = get_plugin_instance()->dir_path . '/assets/js/blocks/' . $block_name;
				$block_json   = $block_folder . '/block.json';
				$metadata     = json_decode( file_get_contents( $block_json ), true ); // phpcs:ignore

				$this->assertEquals( $metadata['category'], $block->category );
				unset( $block->attributes['lock'] );
				$this->assertEquals( $metadata['attributes'], $block->attributes );

				if ( isset( $metadata['supports'] ) ) {
					$this->assertEquals( $metadata['supports'], $block->supports );
				}
			}
		);
	}

	/**
	 * Test for enqueue_block_editor_assets() method.
	 *
	 * @see Plugin::enqueue_block_editor_assets()
	 */
	public function test_enqueue_block_editor_assets() {
		$user_id = self::factory()->user->create( [ 'role' => 'editor' ] );
		wp_set_current_user( $user_id );

		$block_types = new Block_Types( get_plugin_instance() );
		$block_types->enqueue_block_editor_assets();

		$this->assertTrue( wp_script_is( 'material-block-editor-js', 'registered' ) );
		$this->assertTrue( wp_style_is( 'material-block-editor-css', 'registered' ) );
		$this->assertTrue( wp_style_is( 'material-google-fonts', 'enqueued' ) );

		// Assert inline css vars are added.
		$inline_css = wp_styles()->get_data( 'material-block-editor-css', 'after' );
		$this->assertNotEmpty( $inline_css );

		$inline_js = wp_scripts()->get_data( 'material-block-editor-js', 'data' );

		// Assert inline js vars contains ajax url data.
		$this->assertRegexp( '/ajax_url/', $inline_js );
	}

	/**
	 * Test for enqueue_block_editor_assets() method for editor user with the manage options capability.
	 *
	 * @see Plugin::enqueue_block_editor_assets()
	 */
	public function test_enqueue_block_editor_assets_for_editor_role_with_manage_options_cap() {
		$editor_role = get_role( 'editor' );
		$editor_role->add_cap( 'manage_options' );
		$user_id = self::factory()->user->create( [ 'role' => 'editor' ] );
		wp_set_current_user( $user_id );

		$block_types = new Block_Types( get_plugin_instance() );
		$block_types->enqueue_block_editor_assets();

		$this->assertTrue( wp_script_is( 'material-block-editor-js', 'registered' ) );
		$this->assertTrue( wp_style_is( 'material-block-editor-css', 'registered' ) );
		$this->assertTrue( wp_style_is( 'material-google-fonts', 'enqueued' ) );

		// Assert inline css vars are added.
		$inline_css = wp_styles()->get_data( 'material-block-editor-css', 'after' );
		$this->assertNotEmpty( $inline_css );

		$inline_js = wp_scripts()->get_data( 'material-block-editor-js', 'data' );

		// Assert inline js vars contains `allow_contact_form_block`.
		$this->assertRegexp( '/allow_contact_form_block/', $inline_js );
		$editor_role->remove_cap( 'manage_options' );
	}

	/**
	 * Test for enqueue_block_editor_assets() method for editor user with the manage options capability.
	 *
	 * @see Plugin::enqueue_block_editor_assets()
	 */
	public function test_enqueue_block_editor_assets_for_administrator() {
		$user_id = self::factory()->user->create( [ 'role' => 'administrator' ] );
		wp_set_current_user( $user_id );

		$block_types = new Block_Types( get_plugin_instance() );
		$block_types->enqueue_block_editor_assets();

		$this->assertTrue( wp_script_is( 'material-block-editor-js', 'registered' ) );
		$this->assertTrue( wp_style_is( 'material-block-editor-css', 'registered' ) );
		$this->assertTrue( wp_style_is( 'material-google-fonts', 'enqueued' ) );

		// Assert inline css vars are added.
		$inline_css = wp_styles()->get_data( 'material-block-editor-css', 'after' );
		$this->assertNotEmpty( $inline_css );

		$inline_js = wp_scripts()->get_data( 'material-block-editor-js', 'data' );

		// Assert inline css js contains `allow_contact_form_block`.
		$this->assertRegexp( '/allow_contact_form_block/', $inline_js );
	}

	/**
	 * Test for block_category() method.
	 *
	 * @see Plugin::block_category()
	 */
	public function test_block_category() {
		$block_types = new Block_Types( get_plugin_instance() );

		$categories = $block_types->block_category( [], null );
		$this->assertContains( 'material', wp_list_pluck( $categories, 'slug' ) );
	}

	/**
	 * Test for get_block_defaults() method.
	 *
	 * @see Plugin::get_block_defaults()
	 */
	public function test_get_block_defaults() {
		$block_types = new Block_Types( get_plugin_instance() );

		$controls = $block_types->plugin->customizer_controls;
		$defaults = $block_types->get_block_defaults();

		$this->assertEquals(
			[
				'cornerRadius' => 4,
			],
			$defaults['material/button']
		);

		// Add filter to return 12, 48 and -1 sequantially as the cornerRadius for button.
		add_filter(
			"{$controls->slug}_get_option_button_radius",
			function () {
				static $index = 0;
				$values       = [ 12, 48, -1 ];
				return $values[ $index++ ];
			}
		);

		$defaults = $block_types->get_block_defaults();
		$this->assertEquals(
			[
				'cornerRadius' => 12,
			],
			$defaults['material/button']
		);

		$defaults = $block_types->get_block_defaults();
		$this->assertEquals(
			[
				'cornerRadius' => 20,
			],
			$defaults['material/button']
		);

		$defaults = $block_types->get_block_defaults();
		$this->assertEquals(
			[
				'cornerRadius' => 0,
			],
			$defaults['material/button']
		);
	}
}
