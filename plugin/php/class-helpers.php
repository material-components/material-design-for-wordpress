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
 * Helpers functions.
 *
 * @package MaterialDesign
 */

namespace MaterialDesign\Plugin;

/**
 * Plugin Helpers class.
 */
class Helpers {
	/**
	 * Get the block from referer.
	 *
	 * @param string $wp_http_referer HTTP referer.
	 * @param string $block_name      Block name.
	 *
	 * @return array|mixed
	 */
	public static function get_block_from_referer( $wp_http_referer, $block_name ) {
		// phpcs:disable WordPressVIPMinimum.Functions.RestrictedFunctions.url_to_postid_url_to_postid
		$post_id = url_to_postid( $wp_http_referer );

		$post = get_post( $post_id );

		$blocks = [];
		if ( $post ) {
			$blocks = parse_blocks( $post->post_content );
		}
		return current( self::get_block_by_name( $blocks, $block_name ) );
	}

	/**
	 * Get block by name.
	 *
	 * @param array  $blocks     Blocks.
	 * @param string $block_name Block name.
	 *
	 * @return array
	 */
	public static function get_block_by_name( $blocks, $block_name ) {
		$matched_blocks = [];

		foreach ( $blocks as $block ) {
			if ( isset( $block['innerBlocks'] ) && is_array( $block['innerBlocks'] ) ) {
				$matched_blocks = array_merge(
					$matched_blocks,
					self::get_block_by_name( $block['innerBlocks'], $block_name )
				);
			}
			if ( $block['blockName'] === $block_name ) {
				$matched_blocks[] = $block;
			}
		}
		return $matched_blocks;
	}

	/**
	 * Get block count from post.
	 *
	 * @param object $post       Post.
	 * @param string $block_name Block name.
	 *
	 * @return int
	 */
	public static function get_block_count_from_post( $post, $block_name ) {
		$blocks         = parse_blocks( $post->post_content );
		$matched_blocks = self::get_block_by_name( $blocks, $block_name );

		return count( $matched_blocks );
	}

	/**
	 * Check whether or not the current user is admin or editor with the manage options capability.
	 *
	 * @return bool
	 */
	public static function is_current_user_admin_or_editor_with_manage_options() {
		return (
			current_user_can( 'editor' ) && current_user_can( 'manage_options' )
			|| current_user_can( 'administrator' )
		);
	}

	/**
	 * Get a page by it's title.
	 *
	 * @param string       $page_title Page title.
	 * @param string       $output     Optional. The required return type. One of OBJECT, ARRAY_A, or ARRAY_N, which correspond to
	 *                                 a WP_Post object, an associative array, or a numeric array, respectively. Default OBJECT.
	 * @param string|array $post_type  Optional. Post type or array of post types. Default 'page'.
	 * @return WP_Post|array|null WP_Post (or array) on success, or null on failure.
	 */
	public static function get_page_by_title( $page_title, $output = OBJECT, $post_type = 'page' ) {
		if ( get_plugin_instance()->is_wpcom_vip_prod() && function_exists( 'wpcom_vip_get_page_by_title' ) ) {
			return \wpcom_vip_get_page_by_title(
				sanitize_text_field( $page_title ),
				$output,
				sanitize_text_field( $post_type )
			);
		}

		return get_page_by_title( // phpcs:ignore WordPressVIPMinimum.Functions.RestrictedFunctions.get_page_by_title_get_page_by_title
			sanitize_text_field( $page_title ),
			$output,
			sanitize_text_field( $post_type )
		);
	}

	/**
	 * Convert color hex code to rgb
	 *
	 * @param  string|array $hex Hex/RGB of the color.
	 * @return mixed
	 */
	public static function hex_to_rgb( $hex ) {
		if ( is_array( $hex ) && ! empty( $hex ) ) {
			return $hex;
		}

		$hex = strtolower( ltrim( $hex, '#' ) );
		if ( 3 !== strlen( $hex ) && 6 !== strlen( $hex ) ) {
			return false;
		}

		$values = str_split( $hex, ( 3 === strlen( $hex ) ) ? 1 : 2 );

		return array_map( 'self::hexdec', $values );
	}

	/**
	 * Mix 2 colors with a weight.
	 *
	 * @see https://sass-lang.com/documentation/modules/color#mix
	 *
	 * @param mixed $color1 Color hex/RGB array.
	 * @param mixed $color2 Color hex/RGB array.
	 * @param float $weight Weight to use for mixing.
	 * @return string
	 */
	public static function mix_colors( $color1, $color2, $weight = 0.5 ) {
		$weight = min( $weight, 1 );
		$weight = $weight * 2 - 1;
		$alpha  = 0;

		$w1 = ( ( $weight * -1 === $alpha ? $weight : ( $weight + $alpha ) / ( 1 + $weight * $alpha ) ) + 1 ) / 2.0;
		$w2 = 1.0 - $w1;

		$color1 = self::hex_to_rgb( $color1 );
		$color2 = self::hex_to_rgb( $color2 );

		$mixed = [
			round( $w1 * $color1[0] + $w2 * $color2[0] ),
			round( $w1 * $color1[1] + $w2 * $color2[1] ),
			round( $w1 * $color1[2] + $w2 * $color2[2] ),
		];

		return '#' . implode( '', array_map( 'self::dechex', $mixed ) );
	}

	/**
	 * Convert color hex to dec.
	 *
	 * @param  string $hex_code Color hex code.
	 * @return int
	 */
	public static function hexdec( $hex_code ) {
		return hexdec( str_pad( $hex_code, 2, $hex_code ) );
	}

	/**
	 * Convert color dec to hex.
	 *
	 * @param  int $decimal Number.
	 * @return string
	 */
	public static function dechex( $decimal ) {
		return str_pad( dechex( $decimal ), 2, '0', STR_PAD_LEFT );
	}

	/**
	 * Sanitize a customizer control id.
	 *
	 * @param  string $id The id to sanitize.
	 * @return string
	 */
	public static function sanitize_control_id( $id ) {
		return str_replace( [ '[', ']' ], [ '-', '' ], $id );
	}
}
