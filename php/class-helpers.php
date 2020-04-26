<?php
/**
 * Helpers functions.
 *
 * @package MaterialThemeBuilder
 */

namespace MaterialThemeBuilder;

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
		return array_filter(
			$blocks,
			function ( $block ) use ( $block_name ) {
				return $block['blockName'] === $block_name;
			}
		);
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
		$blocks = parse_blocks( $post->post_content );

		$found_blocks = array_filter(
			$blocks,
			function ( $block ) use ( $block_name ) {
				return $block['blockName'] === $block_name;
			}
		);

		return count( $found_blocks );
	}
}
