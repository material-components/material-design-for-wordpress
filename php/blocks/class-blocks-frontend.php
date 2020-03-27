<?php
/**
 * Blocks frontend class.
 *
 * @package MaterialThemeBuilder
 */

namespace MaterialThemeBuilder\Blocks;

use MaterialThemeBuilder\Module_Base;

/**
 * Blocks_Frontend class.
 */
class Blocks_Frontend extends Module_Base {
	/**
	 * Generate dynamics CSS for blocks in a post.
	 *
	 * @access public
	 *
	 * @action wp_enqueue_scripts, 20
	 */
	public function dynamic_css() {
		if ( is_singular() && function_exists( 'has_blocks' ) && has_blocks( get_the_ID() ) ) {
			global $post;
			$blocks = parse_blocks( $post->post_content );
			$styles = '';

			if ( ! empty( $blocks ) && is_array( $blocks ) ) {
				foreach ( $blocks as $block ) {
					switch ( $block['blockName'] ) {
						case 'material/image-list':
							$styles .= Image_List_Block::styles( $block );
							break;

						default:
							break;
					}
				}
			}

			wp_add_inline_style(
				'material-front-end-css',
				$styles
			);
		}
	}

	/**
	 * Add media queries for provided styles.
	 *
	 * @param array  $styles Array of styles.
	 * @param string $device Device type.
	 * @return string
	 */
	public static function get_media_queries( $styles, $device = 'mobile' ) {
		$media_queries = [
			'tablet'  => '@media all and (min-width: 600px) and (max-width: 960px) and (orientation: landscape),
			all and (min-width: 961px) and (orientation: landscape),
			all and (min-width: 600px) and (orientation: portrait),
			all and (min-width: 601px) and (max-width: 840px) and (orientation : portrait) {
				%s
			}',
			'mobile'  => '@media all and (min-width: 0) and (max-width: 360px) and (orientation: portrait),
			all and (min-width: 361px) and (orientation: portrait),
			all and (min-width: 0) and (max-width: 480px) and (orientation: landscape),
			all and (min-width: 481px) and (orientation: landscape) {
				%s
			}',
			'desktop' => '@media all and (min-width: 841px) and (max-width: 1280px) and (orientation: landscape),
			all and (min-width: 841px) and (max-width: 1280px) and (max-aspect-ratio: 4/3),
			all and (min-width: 1281px) and (max-width: 1600px),
			all and (min-width: 1601px) {
				%s
			}',
		];

		$styles = is_array( $styles ) ? implode( "\n", $styles ) : $styles;

		if ( array_key_exists( $device, $media_queries ) ) {
			return sprintf( $media_queries[ $device ], $styles );
		}

		return $styles;
	}
}
