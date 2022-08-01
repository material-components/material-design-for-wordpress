<?php
/**
 * Gutenberg Blocks.
 *
 * Notes:
 * - Register all the blocks living in the folder 'blocks'.
 *   - Check for blocks declared at DYNAMIC_BLOCKS,
 *     so the plugin knows a callback_render is required for it.
 * - Register the main JavaScript file of the plugin (editor.js) related to the editor (backend).
 * - Verify if a block exists on the current page/post,
 *   and if it doesn't exist, dequeue/deregister the assets from that block.
 *
 * New block:
 * - If a new block is created and IT'S NOT server-render, there is nothing to be changed here.
 * - If a new block is created and IT'S server-render, be sure to update the constant DYNAMIC_BLOCKS.
 *
 * @package MaterialDesign
 */

namespace MaterialDesign\Plugin\Blocks;

use MaterialDesign\Plugin\Module_Base;

/**
 * Class Blocks
 *
 * @package MaterialDesign
 */
class Blocks extends Module_Base {

	/**
	 * Dynamic blocks.
	 */
	const DYNAMIC_BLOCKS = [
		'material/card-query'                => 'template-parts/blocks/card-query.php',
		'material/image-card-query'          => 'template-parts/blocks/image-card-query.php',
		'material/query-pagination'          => 'template-parts/blocks/query-pagination.php',
		'material/query-pagination-next'     => 'template-parts/blocks/query-pagination-next.php',
		'material/query-pagination-previous' => 'template-parts/blocks/query-pagination-previous.php',
		'material/query-pagination-first'    => 'template-parts/blocks/query-pagination-first.php',
		'material/query-pagination-last'     => 'template-parts/blocks/query-pagination-last.php',
	];

	/**
	 * Register any needed hooks/filters.
	 *
	 * @action init
	 */
	public function init() {
		// Only add block for 5.8 or later.
		if ( version_compare( '5.8', get_bloginfo( 'version' ), '<=' ) ) {
			add_action( 'init', [ $this, 'action_register_blocks' ] );
		}
	}

	/**
	 * Register all blocks living in the "/blocks/" folder in the theme.
	 */
	public function action_register_blocks() {
		$folders = static::get_blocks_folders();

		// Register blocks.
		foreach ( $folders as $folder ) {
			$object = static::get_block_object( $folder );

			if ( ! $object ) {
				continue;
			}

			if ( ! array_key_exists( $object['name'], static::DYNAMIC_BLOCKS ) ) {
				// Todo once class-block-type.php is migrated this condition can be removed.
				continue;
			}

			// If this is a dynamic block, register render_callback.
			if ( array_key_exists( $object['name'], static::DYNAMIC_BLOCKS ) ) {
				$object['render_callback'] = [ static::class, 'render' ];
			}

			/**
			 * Filters the arguments for registering a block type.
			 *
			 * @param array  $metadata Array of arguments for registering a block type.
			 * @param string $name     Block name.
			 */
			$args = apply_filters( 'material_design_block_type_args', $object, $object['name'] );

			if ( function_exists( 'register_block_type' ) ) {
				register_block_type( $folder, $args );
			}
		}
	}

	/**
	 * Get all blocks from file-system (folders).
	 *
	 * @return array
	 */
	public static function get_blocks_folders() {
		$root_folder = __DIR__ . '/../../assets/js/blocks';

		return glob( $root_folder . '/*', GLOB_ONLYDIR | GLOB_MARK );
	}

	/**
	 * Get block object.
	 *
	 * @param string $block_folder Block folder.
	 *
	 * @return object
	 */
	public static function get_block_object( $block_folder ) {
		$block_file = $block_folder . 'block.json';

		if ( ! file_exists( $block_file ) ) {
			return null;
		}

		// phpcs:ignore WordPressVIPMinimum.Performance.FetchingRemoteData.FileGetContentsUnknown
		return json_decode( file_get_contents( $block_file ), true );
	}

	/**
	 * Render Dynamic blocks.
	 *
	 * @param array  $attributes Block attributes.
	 * @param string $content    Block content.
	 * @param object $block      Block object.
	 *
	 * @return false|string
	 */
	public static function render( $attributes, $content, $block ) {
		$template = __DIR__ . '/../' . static::DYNAMIC_BLOCKS[ $block->name ];

		if ( ! file_exists( $template ) ) {
			return false;
		}

		// Remove this once server side context is available via gutenberg.
		if ( ! empty( $block->block_type->uses_context ) && ! empty( $_GET['materialParamContext'] ) ) { // phpcs:ignore WordPress.Security.NonceVerification.Recommended
			foreach ( $block->block_type->uses_context as $context ) {
				if ( empty( $_GET['materialParamContext'][ $context ] ) ) { // phpcs:ignore WordPress.Security.NonceVerification.Recommended
					continue;
				}
				switch ( $context ) {
					case 'postId':
					case 'queryId':
						$sanitize_callback = 'intval';
						break;
					case 'postType':
						$sanitize_callback = 'sanitize_key';
						break;
				}
				$block->context[ $context ] = call_user_func( $sanitize_callback, $_GET['materialParamContext'][ $context ] ); // phpcs:ignore WordPress.Security.NonceVerification.Recommended, WordPress.Security.ValidatedSanitizedInput.InputNotSanitized
			}
		}

		ob_start();

		load_template(
			$template,
			false,
			[
				'attributes' => $attributes,
				'content'    => $content,
				'block'      => $block,
			]
		);

		return ob_get_clean();
	}
}
