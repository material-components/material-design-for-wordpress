<?php
/**
 * Bootstraps the Material Theme Builder plugin.
 *
 * @package MaterialThemeBuilder
 */

namespace MaterialThemeBuilder;

use MaterialThemeBuilder\Blocks\Recent_Posts_Block;
use MaterialThemeBuilder\Customizer\Controls;

/**
 * Main plugin bootstrap file.
 */
class Plugin extends Plugin_Base {

	/**
	 * Controls class.
	 *
	 * @var Controls
	 */
	public $customizer_controls;

	/**
	 * Recent_Posts_Block class.
	 *
	 * @var Recent_Posts_Block
	 */
	public $recent_post_block;

	/**
	 * Initiate the plugin resources.
	 *
	 * Priority is 9 because WP_Customize_Widgets::register_settings() happens at
	 * after_setup_theme priority 10. This is especially important for plugins
	 * that extend the Customizer to ensure resources are available in time.
	 *
	 * @action after_setup_theme, 9
	 */
	public function init() {
		$this->config = apply_filters( 'material_theme_builder_plugin_config', $this->config, $this );

		$this->customizer_controls = new Controls( $this );
		$this->customizer_controls->init();

		$this->recent_post_block = new Recent_Posts_Block( $this );
		$this->recent_post_block->init();
	}

	/**
	 * Load Gutenberg assets.
	 *
	 * @action enqueue_block_editor_assets
	 */
	public function enqueue_block_editor_assets() {
		wp_enqueue_script(
			'material-block-editor-js',
			$this->asset_url( 'assets/js/block-editor.js' ),
			[
				'lodash',
				'react',
				'wp-block-editor',
				'wp-date',
				'wp-api-fetch',
			],
			$this->asset_version(),
			false
		);

		wp_enqueue_style(
			'material-icons-css',
			esc_url( '//fonts.googleapis.com/icon?family=Material+Icons' ),
			[],
			$this->asset_version()
		);

		wp_enqueue_style(
			'material-block-editor-css',
			$this->asset_url( 'assets/css/block-editor-compiled.css' ),
			[],
			$this->asset_version()
		);
	}

	/**
	 * Enqueue front-end styles and scripts.
	 *
	 * @action wp_enqueue_scripts
	 */
	public function enqueue_front_end_assets() {
		wp_enqueue_script(
			'material-front-end-js',
			$this->asset_url( 'assets/js/front-end.js' ),
			[],
			$this->asset_version(),
			true
		);

		$fonts_url = $this->customizer_controls->get_google_fonts_url();
		wp_enqueue_style(
			'material-google-fonts-cdn',
			esc_url( $fonts_url ),
			[],
			$this->asset_version()
		);

		wp_enqueue_style(
			'material-front-end-css',
			$this->asset_url( 'assets/css/front-end-compiled.css' ),
			[],
			$this->asset_version()
		);

		if ( false === strpos( get_stylesheet(), 'material-theme' ) ) {
			wp_enqueue_style(
				'material-front-end-overrides-css',
				$this->asset_url( 'assets/css/front-end-overrides-compiled.css' ),
				[],
				$this->asset_version()
			);
		}

		wp_add_inline_style( 'material-front-end-css', $this->customizer_controls->get_frontend_css() );
	}

	/**
	 * Add custom material block category.
	 *
	 * @action block_categories, 10, 2
	 *
	 * @param array   $categories Registered categories.
	 * @param WP_Post $post       The current post object.
	 *
	 * @return array
	 */
	public function block_category( $categories, $post ) {
		$categories[] = [
			'slug'  => 'material',
			'title' => __( 'Material Blocks', 'material-theme-builder' ),
		];

		return $categories;
	}
}
