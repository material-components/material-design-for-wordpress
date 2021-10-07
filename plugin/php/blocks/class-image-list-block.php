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
 * Image List Block class.
 *
 * @package MaterialDesign
 */

namespace MaterialDesign\Plugin\Blocks;

use MaterialDesign\Plugin\Blocks_Frontend;

/**
 * Image_List_Block class.
 */
class Image_List_Block {

	/**
	 * Generate the styles for an image list block.
	 *
	 * @access public
	 *
	 * @param array $block The block array.
	 *
	 * @return string Returns the generated inline CSS.
	 */
	public static function styles( $block ) {
		$block_type = \WP_Block_Type_Registry::get_instance()->get_registered( $block['blockName'] );
		$styles     = [];

		if ( isset( $block['attrs']['images'] ) ) {
			unset( $block['attrs']['images'] );
		}

		if ( null !== $block_type ) {
			$id         = '';
			$attributes = $block_type->prepare_attributes_for_render( $block['attrs'] );

			if ( ! empty( $attributes['id'] ) ) {
				$id = $attributes['id'];
			} elseif ( preg_match( '#id="(block-material-image-list-[^"]+)"#', $block['innerHTML'], $matches ) ) {
				$id = $matches[1];
			}

			foreach ( [ 'desktop', 'tablet', 'mobile' ] as $device ) {
				$styles[] = Blocks_Frontend::get_media_queries( self::get_device_styles( $id, $attributes, $device ), $device );
			}
		}

		return implode( "\n", $styles );
	}

	/**
	 * Get device specific styles.
	 *
	 * @param  string $id ID of the element.
	 * @param  array  $attributes Block attributes.
	 * @param  string $device Device type.
	 * @return array
	 */
	public static function get_device_styles( $id, $attributes, $device = 'desktop' ) {
		if ( ! isset( $attributes['gutter'] ) || ! isset( $attributes['gutter'][ $device ] ) ) {
			return [];
		}

		$styles      = [];
		$item_styles = [];
		$columns     = is_array( $attributes['columns'] ) && array_key_exists( $device, $attributes['columns'] ) ? $attributes['columns'][ $device ] : $attributes['columns'];

		if ( ! empty( $attributes['style'] ) && 'masonry' === $attributes['style'] ) {
			$styles[] = sprintf( '#%s .mdc-image-list {', $id );
			$styles[] = sprintf( 'column-count: %s;', $columns );
			$styles[] = sprintf( 'column-gap: %spx;', $attributes['gutter'][ $device ] );
			$styles[] = "}\n";

			$styles[] = sprintf( '#%s .mdc-image-list__item-wrap {', $id );
			$styles[] = sprintf( 'margin-bottom: %spx', absint( $attributes['gutter'][ $device ] ) );
			$styles[] = "}\n";
		} else {
			$item_styles[] = sprintf( '#%s .mdc-image-list__item {', $id );
			$item_styles[] = sprintf( 'width: calc(100%% / %s - %spx);', $columns, absint( $attributes['gutter'][ $device ] ) + 1 / $columns );
			$item_styles[] = sprintf( 'margin: %spx;', absint( $attributes['gutter'][ $device ] ) / 2 );
			$item_styles[] = "}\n";
		}

		$image_styles = [];
		if ( isset( $attributes['cornerRadius'] ) ) {
			$image_styles = [
				sprintf( '#%s .mdc-image-list__image {', $id ),
				sprintf( 'border-radius: %spx;', absint( $attributes['cornerRadius'] ) ),
				"}\n",
				sprintf( '#%s .mdc-image-list__supporting {', $id ),
				sprintf( 'border-bottom-left-radius: %spx;', absint( $attributes['cornerRadius'] ) ),
				sprintf( 'border-bottom-right-radius: %spx;', absint( $attributes['cornerRadius'] ) ),
				"}\n",
			];
		}

		return array_merge( $styles, $item_styles, $image_styles );
	}
}
