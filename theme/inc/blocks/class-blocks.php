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

namespace MaterialDesign\Theme\Block;

/**
 * Class Blocks
 *
 * @package MaterialDesign
 */
class Blocks {

	/**
	 * Dynamic blocks.
	 * [ 'material/back-to-top' => 'template-parts/blocks/back-to-top.php' ]
	 */
	const DYNAMIC_BLOCKS = [
		'material/search'           => 'template-parts/blocks/search.php',
		'material/query-pagination' => 'template-parts/blocks/query-pagination.php',
	];

	/**
	 * Register any needed hooks/filters.
	 */
	public function init() {
		$this->action_register_blocks();
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
			$args = [];
			/**
			 * Filters the arguments for registering a block type.
			 *
			 * @param array $metadata Array of arguments for registering a block type.
			 */
			$args = apply_filters( 'material_design_theme_block_type_args', $args, $object->name );
			// If this is a dynamic block, register render_callback.
			if ( array_key_exists( $object->name, static::DYNAMIC_BLOCKS ) ) {
				$args ['render_callback'] = [ static::class, 'render' ];
			}

			register_block_type( $folder, $args );
		}
	}

	/**
	 * Get all blocks from file-system (folders).
	 *
	 * @return array
	 */
	public static function get_blocks_folders() {
		$root_folder = get_stylesheet_directory() . '/assets/src/block-editor/blocks';

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
		return json_decode( file_get_contents( $block_file ) );
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
		$template = trailingslashit( get_stylesheet_directory() ) . static::DYNAMIC_BLOCKS[ $block->name ];

		if ( ! file_exists( $template ) ) {
			return false;
		}

		ob_start();

		load_template(
			$template,
			false,
			[
				'attributes' => $attributes,
				'content'    => $content,
			]
		);

		return ob_get_clean();
	}
}
