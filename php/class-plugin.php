<?php
/**
 * Bootstraps the Material Theme Builder plugin.
 *
 * @package MaterialThemeBuilder
 */

namespace MaterialThemeBuilder;

use MaterialThemeBuilder\BazBar\Sample;
use MaterialThemeBuilder\Blocks\Recent_Posts_Block;

/**
 * Main plugin bootstrap file.
 */
class Plugin extends Plugin_Base {

	/**
	 * Sample class.
	 *
	 * @var Sample
	 */
	public $sample;

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

		$this->sample = new Sample( $this );
		$this->sample->init();

		$this->recent_post_block = new Recent_Posts_Block( $this );
		$this->recent_post_block->init();
	}

	/**
	 * Load Gutenberg assets.
	 *
	 * @action enqueue_block_editor_assets
	 */
	public function enqueue_editor_assets() {
		wp_enqueue_script(
			'material-theme-builder-wp-js',
			$this->asset_url( 'assets/js/block-editor.js' ),
			[
				'lodash',
				'react',
				'wp-block-editor',
			],
			$this->asset_version(),
			false
		);

		wp_enqueue_style(
			'material-theme-builder-wp-fonts-css',
			esc_url( '//fonts.googleapis.com/icon?family=Material+Icons' ),
			[],
			$this->asset_version()
		);

		wp_enqueue_style(
			'material-theme-builder-wp-css',
			$this->asset_url( 'assets/css/block-editor-compiled.css' ),
			[],
			$this->asset_version()
		);
	}

	/**
	 * Enqueue frontend styles and scripts.
	 *
	 * @action wp_enqueue_scripts
	 */
	public function enqueue_frontend_assets() {
		wp_enqueue_script(
			'material-theme-builder-wp-frontend-js',
			$this->asset_url( 'assets/js/front.js' ),
			[],
			$this->asset_version(),
			true
		);

		wp_enqueue_style(
			'material-theme-builder-wp-fonts-css',
			esc_url( '//fonts.googleapis.com/icon?family=Material+Icons' ),
			[],
			$this->asset_version()
		);

		wp_enqueue_style(
			'material-theme-builder-wp-frontend-css',
			$this->asset_url( 'assets/css/front-compiled.css' ),
			[],
			$this->asset_version()
		);
	}

	/**
	 * Register Customizer scripts.
	 *
	 * @action wp_default_scripts, 11
	 *
	 * @param \WP_Scripts $wp_scripts Instance of \WP_Scripts.
	 */
	public function register_scripts( \WP_Scripts $wp_scripts ) {}

	/**
	 * Register Customizer styles.
	 *
	 * @action wp_default_styles, 11
	 *
	 * @param \WP_Styles $wp_styles Instance of \WP_Styles.
	 */
	public function register_styles( \WP_Styles $wp_styles ) {}

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
