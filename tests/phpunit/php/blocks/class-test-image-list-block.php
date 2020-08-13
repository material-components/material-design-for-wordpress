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
	 * Test get_device_styles().
	 *
	 * @see Blocks_Frontend::get_device_styles()
	 */
	public function test_get_device_styles() {
		$attributes = [
			'gutter'       => [
				'desktop' => 24,
				'tablet'  => 18,
				'mobile'  => 12,
			],
			'style'        => 'masonry',
			'columns'      => 2,
			'cornerRadius' => 8,
		];

		$image_list_block = new Image_List_Block( get_plugin_instance() );

		$desktop = $image_list_block->get_device_styles( 'image-list-1', $attributes );
		$tablet  = $image_list_block->get_device_styles( 'image-list-1', $attributes, 'tablet' );
		$mobile  = $image_list_block->get_device_styles( 'image-list-1', $attributes, 'mobile' );

		// Assert we have all mobile, tablet and desktop styles.
		$this->assertContains( 'column-gap: 12px;', implode( '', $mobile ) );
		$this->assertContains( 'column-gap: 18px;', implode( '', $tablet ) );
		$this->assertContains( 'column-gap: 24px;', implode( '', $desktop ) );

		// Assert styles are returned correctly for "List".
		$attributes['style'] = 'list';
		$desktop             = $image_list_block->get_device_styles( 'image-list-1', $attributes );
		$this->assertContains( 'margin: 12px;', implode( '', $desktop ) );

		// Assert no styles are returned for an unknown device.
		$unknown = $image_list_block->get_device_styles( 'image-list-1', $attributes, 'unknown' );
		$this->assertEmpty( $unknown );
	}
}
