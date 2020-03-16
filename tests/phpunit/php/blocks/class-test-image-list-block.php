<?php
/**
 * Tests for Image_List_Block class.
 *
 * @package MaterialThemeBuilder
 */

namespace MaterialThemeBuilder\Blocks;

use function MaterialThemeBuilder\get_plugin_instance;

/**
 * Tests for Image_List_Block class.
 */
class Test_Image_List_Block extends \WP_UnitTestCase {
	/**
	 * Test init().
	 *
	 * @see Image_List_Block::init()
	 */
	public function test_init() {
		$plugin = get_plugin_instance();
		$this->assertEquals( 10, has_action( 'init', [ $plugin->image_list_block, 'register_block' ] ) );
	}

	/**
	 * Test register_block.
	 *
	 * @see Image_List_Block::register_block()
	 */
	public function test_register_block() {
		// Unregister the block if it's registered already.
		unregister_block_type( 'material/image-list' );

		$block = new Image_List_Block( get_plugin_instance() );
		$block->register_block();

		$blocks = \WP_Block_Type_Registry::get_instance()->get_all_registered();

		// Assert the block is registered.
		$this->assertTrue( array_key_exists( 'material/image-list', $blocks ) );
	}

	/**
	 * Test get_device_styles().
	 *
	 * @see Blocks_Frontend::get_device_styles()
	 */
	public function test_get_device_styles() {
		$attributes = [
			'gutter'  => [
				'desktop' => 24,
				'tablet'  => 18,
				'mobile'  => 12,
			],
			'style'   => 'masonry',
			'columns' => 2,
		];

		$plugin = get_plugin_instance();

		$desktop = $plugin->image_list_block->get_device_styles( 'image-list-1', $attributes );
		$tablet  = $plugin->image_list_block->get_device_styles( 'image-list-1', $attributes, 'tablet' );
		$mobile  = $plugin->image_list_block->get_device_styles( 'image-list-1', $attributes, 'mobile' );

		// Assert we have all mobile, tablet and desktop styles.
		$this->assertContains( 'column-gap: 12px;', implode( '', $mobile ) );
		$this->assertContains( 'column-gap: 18px;', implode( '', $tablet ) );
		$this->assertContains( 'column-gap: 24px;', implode( '', $desktop ) );

		// Assert styles are returned correctly for "List".
		$attributes['style'] = 'list';
		$desktop             = $plugin->image_list_block->get_device_styles( 'image-list-1', $attributes );
		$this->assertContains( 'margin: 12px;', implode( '', $desktop ) );

		// Assert no styles are returned for an unknown device.
		$unknown = $plugin->image_list_block->get_device_styles( 'image-list-1', $attributes, 'unknown' );
		$this->assertEmpty( $unknown );
	}
}
