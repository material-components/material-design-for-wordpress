<?php
/**
 * Image List Block class.
 *
 * @package MaterialThemeBuilder
 */

namespace MaterialThemeBuilder\Blocks;

use MaterialThemeBuilder\Module_Base;

/**
 * Image_List_Block class.
 */
class Image_List_Block extends Module_Base {

	/**
	 * Name of the block.
	 *
	 * @var string
	 */
	public $block_name = 'material/image-list';

	/**
	 * Registers the `material/image-list` block on server,
	 * this is not a pure dynamic block, only the CSS/styles are generated in PHP.
	 * Registering the block here allows us to access the block attribute default values.
	 *
	 * @access public
	 *
	 * @action init
	 */
	public function register_block() {
		register_block_type(
			$this->block_name,
			[
				'attributes'      => [
					'id'              => [
						'type'      => 'string',
						'source'    => 'attribute',
						'attribute' => 'id',
						'selector'  => '*',
					],
					'images'          => [
						'type'     => 'array',
						'default'  => [],
						'source'   => 'query',
						'selector' => '.mdc-image-list__item',
						'query'    => [
							'url'     => [
								'type'      => 'string',
								'source'    => 'attribute',
								'selector'  => 'img',
								'attribute' => 'src',
							],
							'fullUrl' => [
								'type'      => 'string',
								'source'    => 'attribute',
								'selector'  => 'img',
								'attribute' => 'data-full-url',
							],
							'link'    => [
								'type'      => 'string',
								'source'    => 'attribute',
								'selector'  => 'img',
								'attribute' => 'data-link',
							],
							'alt'     => [
								'type'      => 'string',
								'source'    => 'attribute',
								'selector'  => 'img',
								'attribute' => 'alt',
								'default'   => '',
							],
							'id'      => [
								'type'      => 'string',
								'source'    => 'attribute',
								'selector'  => 'img',
								'attribute' => 'data-id',
							],
							'caption' => [
								'type'     => 'string',
								'source'   => 'html',
								'selector' => '.mdc-image-list__label',
							],
						],
					],
					'ids'             => [
						'type'    => 'array',
						'items'   => [
							'type' => 'number',
						],
						'default' => [],
					],
					'style'           => [
						'type'    => 'string',
						'default' => 'masonry',
					],
					'columns'         => [
						'type'    => 'number',
						'default' => 2,
					],
					'gutter'          => [
						'type'    => 'object',
						'default' => [
							'desktop' => 16,
							'tablet'  => 12,
							'mobile'  => 12,
						],
					],
					'cornerRadius'    => [
						'type'    => 'number',
						'default' => 4,
					],
					'displayLightbox' => [
						'type'    => 'boolean',
						'default' => false,
					],
					'displayCaptions' => [
						'type'    => 'boolean',
						'default' => true,
					],
					'textProtection'  => [
						'type'    => 'boolean',
						'default' => true,
					],
					'linkTo'          => [
						'type'    => 'string',
						'default' => 'media',
					],
				],
				'render_callback' => null,
			]
		);
	}

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

		if ( null !== $block_type ) {
			$id = '';

			if ( preg_match( '#id="(block-material-image-list-[^"]+)"#', $block['innerHTML'], $matches ) ) {
				$id = $matches[1];
			}

			$attributes = $block_type->prepare_attributes_for_render( $block['attrs'] );

			foreach ( [ 'mobile', 'tablet', 'desktop' ] as $device ) {
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

		if ( ! empty( $attributes['style'] ) && 'masonry' === $attributes['style'] ) {
			$styles[] = sprintf( '#%s .mdc-image-list {', $id );
			$styles[] = sprintf( 'column-count: %s;', $attributes['columns'] );
			$styles[] = sprintf( 'column-gap: %spx;', $attributes['gutter'][ $device ] );
			$styles[] = "}\n";

			$styles[] = sprintf( '#%s .mdc-image-list__item-wrap {', $id );
			$styles[] = sprintf( 'margin-bottom: %spx', absint( $attributes['gutter'][ $device ] ) );
			$styles[] = "}\n";
		} else {
			$item_styles[] = sprintf( '#%s .mdc-image-list__item {', $id );
			$item_styles[] = sprintf( 'width: calc(100%% / %s - %spx);', $attributes['columns'], absint( $attributes['gutter'][ $device ] ) + 1 / $attributes['columns'] );
			$item_styles[] = sprintf( 'margin: %spx;', absint( $attributes['gutter'][ $device ] ) / 2 );
			$item_styles[] = "}\n";
		}

		$image_styles = [
			sprintf( '#%s .mdc-image-list__image {', $id ),
			sprintf( 'border-radius: %spx;', absint( $attributes['cornerRadius'] ) ),
			"}\n",
			sprintf( '#%s .mdc-image-list__supporting {', $id ),
			sprintf( 'border-bottom-left-radius: %spx;', absint( $attributes['cornerRadius'] ) ),
			sprintf( 'border-bottom-right-radius: %spx;', absint( $attributes['cornerRadius'] ) ),
			"}\n",
		];

		return array_merge( $styles, $item_styles, $image_styles );
	}

}
