<?php
/**
 * Bootstraps custom blocks.
 *
 * @package MaterialThemeBuilder
 */

namespace MaterialThemeBuilder;

/**
 * Block type class.
 */
class Block_Types {
	/**
	 * Plugin instance.
	 *
	 * @var Plugin
	 */
	public $plugin;

	/**
	 * Block_Type constructor.
	 *
	 * @param Plugin $plugin Instance of the plugin abstraction.
	 */
	public function __construct( $plugin ) {
		$this->plugin = $plugin;
	}

	/**
	 * Initiate the class.
	 */
	public function init() {
		add_action( 'init', [ $this, 'register_blocks' ] );
		add_action( 'enqueue_block_editor_assets', [ $this, 'register_block_editor_assets' ] );
	}

	/**
	 * Register our custom blocks.
	 */
	public function register_blocks() {
		if ( ! function_exists( 'register_block_type' ) ) {
			return;
		}

		$blocks_dir    = $this->plugin->dir_path . '/assets/js/blocks/';
		$block_folders = [
			'button',
		];

		foreach ( $block_folders as $block_name ) {
			$block_json_file = $blocks_dir . $block_name . '/block.json';
			if ( ! file_exists( $block_json_file ) ) {
				continue;
			}

			$metadata = json_decode( file_get_contents( $block_json_file ), true ); // phpcs:ignore WordPressVIPMinimum.Performance.FetchingRemoteData.FileGetContentsUnknown
			if ( ! is_array( $metadata ) || ! $metadata['name'] ) {
				continue;
			}

			$metadata['editor_script'] = 'material-block-editor-js';
			$metadata['editor_style']  = 'material-block-editor-css';

			$callback = "render_{$block_name}_block";
			if ( method_exists( $this, $callback ) ) {
				$metadata['render_callback'] = [ $this, $callback ];
			}

			register_block_type( $metadata['name'], $metadata );
		}
	}

	/**
	 * Load Gutenberg assets.
	 */
	public function register_block_editor_assets() {
		// Register block editor assets.
		$asset_file   = $this->plugin->dir_path . '/assets/js/block-editor.asset.php';
		$asset        = is_readable( $asset_file ) ? require $asset_file : [];
		$version      = isset( $asset['version'] ) ? $asset['version'] : $this->plugin->asset_version();
		$dependencies = isset( $asset['dependencies'] ) ? $asset['dependencies'] : [];

		wp_register_script(
			'material-block-editor-js',
			$this->plugin->asset_url( 'assets/js/block-editor.js' ),
			$dependencies,
			$version,
			false
		);

		wp_register_style(
			'material-block-editor-css',
			$this->plugin->asset_url( 'assets/css/block-editor-compiled.css' ),
			[],
			$version
		);

		wp_styles()->add_data( 'material-block-editor-css', 'rtl', 'replace' );
	}
}
