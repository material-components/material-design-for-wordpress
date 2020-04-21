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
	 * @action wp_enqueue_scripts, 110
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

						case 'material/cards-collection':
							$styles .= self::layout_gutter_styles(
								$block,
								[
									'desktop' => 24,
									'tablet'  => 16,
									'mobile'  => 16,
								]
							);
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
	 * @param mixed  $styles Array or string of styles.
	 * @param string $device Device type.
	 * @return string
	 */
	public static function get_media_queries( $styles, $device = 'mobile' ) {
		$media_queries = [
			'desktop' => '@media (min-width: 840px) {
				%s
			}',
			'tablet'  => '@media (min-width: 600px) and (max-width: 839px) {
				%s
			}',
			'mobile'  => '@media (max-width: 599px) {
				%s
			}',
		];

		$styles = is_array( $styles ) ? implode( "\n", $styles ) : $styles;

		if ( array_key_exists( $device, $media_queries ) ) {
			return sprintf( $media_queries[ $device ], $styles );
		}

		return $styles;
	}

	/**
	 * Generate the layout gutter styles for a block.
	 *
	 * @access public
	 *
	 * @param array $block    The block array.
	 * @param array $defaults Gutter defaults.
	 *
	 * @return string Returns the generated inline CSS.
	 */
	public static function layout_gutter_styles( $block, $defaults = [] ) {
		$attributes           = $block['attrs'];
		$attributes['gutter'] = isset( $attributes['gutter'] ) ? $attributes['gutter'] : [];
		$attributes['gutter'] = array_merge( $defaults, $attributes['gutter'] );

		$id     = '';
		$styles = [];

		if ( preg_match( '#id="(block-material-[^"]+)"#', $block['innerHTML'], $matches ) ) {
			$id = $matches[1];
		}

		foreach ( [ 'desktop', 'tablet', 'mobile' ] as $device ) {
			$styles[] = self::get_media_queries( self::layout_gutter_device_styles( $id, $attributes, $device ), $device );
		}

		return implode( "\n", $styles );
	}

	/**
	 * Get layout gutter styles for a device.
	 *
	 * @param  string $id ID of the element.
	 * @param  array  $attributes Block attributes.
	 * @param  string $device Device type.
	 * @return array
	 */
	public static function layout_gutter_device_styles( $id, $attributes, $device = 'desktop' ) {
		if ( ! isset( $attributes['gutter'] ) || ! isset( $attributes['gutter'][ $device ] ) ) {
			return [];
		}

		$styles = [];

		if ( ! empty( $attributes['style'] ) && 'masonry' !== $attributes['style'] ) {
			$styles[] = sprintf( '#%s .mdc-layout-grid__inner {', $id );
			$styles[] = sprintf( 'grid-gap: %spx;', $attributes['gutter'][ $device ] );
			$styles[] = "}\n";
		} else {
			$styles[] = sprintf( '#%s .masonry-grid_column {', $id );
			$styles[] = sprintf( 'padding-left: %spx;', $attributes['gutter'][ $device ] );
			$styles[] = "}\n";

			$styles[] = sprintf( '#%s .masonry-grid_column > div {', $id );
			$styles[] = sprintf( 'margin-bottom: %spx;', $attributes['gutter'][ $device ] );
			$styles[] = "}\n";
		}

		return $styles;
	}
}
