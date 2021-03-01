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
 * Tests for Image_List_Block class.
 *
 * @package MaterialDesign
 */

namespace MaterialDesign\Plugin\Blocks;

use function MaterialDesign\Plugin\get_plugin_instance;

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

		$desktop = Image_List_Block::get_device_styles( 'image-list-1', $attributes );
		$tablet  = Image_List_Block::get_device_styles( 'image-list-1', $attributes, 'tablet' );
		$mobile  = Image_List_Block::get_device_styles( 'image-list-1', $attributes, 'mobile' );

		// Assert we have all mobile, tablet and desktop styles.
		$this->assertContains( 'column-gap: 12px;', implode( '', $mobile ) );
		$this->assertContains( 'column-gap: 18px;', implode( '', $tablet ) );
		$this->assertContains( 'column-gap: 24px;', implode( '', $desktop ) );

		// Assert styles are returned correctly for "List".
		$attributes['style'] = 'list';
		$desktop             = Image_List_Block::get_device_styles( 'image-list-1', $attributes );
		$this->assertContains( 'margin: 12px;', implode( '', $desktop ) );

		// Assert no styles are returned for an unknown device.
		$unknown = Image_List_Block::get_device_styles( 'image-list-1', $attributes, 'unknown' );
		$this->assertEmpty( $unknown );
	}
}
