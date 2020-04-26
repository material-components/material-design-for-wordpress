<?php
/**
 * Bootstraps the Material Theme Builder plugin.
 *
 * @package MaterialThemeBuilder
 */

namespace MaterialThemeBuilder;

use MaterialThemeBuilder\Blocks\Blocks_Frontend;
use MaterialThemeBuilder\Blocks\Image_List_Block;
use MaterialThemeBuilder\Blocks\Recent_Posts_Block;
use MaterialThemeBuilder\Blocks\Hand_Picked_Posts_Block;
use MaterialThemeBuilder\Blocks\Contact_Form_Block;
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
	 * Image_List_Block class.
	 *
	 * @var Image_List_Block
	 */
	public $image_list_block;

	/**
	 * Recent_Posts_Block class.
	 *
	 * @var Recent_Posts_Block
	 */
	public $recent_post_block;

	/**
	 * Hand_Picked_Posts_Block class.
	 *
	 * @var Hand_Picked_Posts_Block
	 */
	public $hand_picked_post_block;

	/**
	 * Contact_Form_Block class.
	 *
	 * @var Contact_Form_Block
	 */
	public $contact_form_block;

	/**
	 * Blocks_Frontend class.
	 *
	 * @var Blocks_Frontend
	 */
	public $blocks_frontend;

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

		$this->hand_picked_post_block = new Hand_Picked_Posts_Block( $this );
		$this->hand_picked_post_block->init();

		$this->image_list_block = new Image_List_Block( $this );
		$this->image_list_block->init();

		$this->contact_form_block = new Contact_Form_Block( $this );
		$this->contact_form_block->init();

		$this->blocks_frontend = new Blocks_Frontend( $this );
		$this->blocks_frontend->init();
	}

	/**
	 * Check whether or not the current user is admin or editor.
	 *
	 * @return bool
	 */
	private function is_user_admin_or_editor() {
		return current_user_can( 'editor' ) || current_user_can( 'administrator' );
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
				'wp-editor',
				'wp-date',
				'wp-api-fetch',
			],
			$this->asset_version(),
			false
		);

		$wp_localized_script_data = [
			'ajax_url' => admin_url( 'admin-ajax.php' ),
		];

		if ( $this->is_user_admin_or_editor() ) {
			$wp_localized_script_data['allow_contact_form_block']    = true;
			$wp_localized_script_data['recaptcha_site_key']          = esc_js( get_option( 'mtb_recaptcha_site_key', '' ) );
			$wp_localized_script_data['recaptcha_client_secret']     = esc_js( get_option( 'mtb_recaptcha_client_secret', '' ) );
			$wp_localized_script_data['recaptcha_ajax_nonce_action'] = wp_create_nonce( 'mtb_recaptcha_ajax_nonce' );
		}

		wp_localize_script( 'material-block-editor-js', 'mtb', $wp_localized_script_data );

		$fonts_url = $this->customizer_controls->get_google_fonts_url();

		wp_enqueue_style(
			'material-styles-css',
			esc_url( $fonts_url ),
			[],
			$this->asset_version()
		);

		wp_enqueue_style(
			'material-block-editor-css',
			$this->asset_url( 'assets/css/block-editor-compiled.css' ),
			[],
			$this->asset_version()
		);

		wp_localize_script( 'material-block-editor-js', 'mtbBlockDefaults', $this->get_block_defaults() );

		wp_add_inline_style( 'material-block-editor-css', $this->customizer_controls->get_frontend_css() );
	}

	/**
	 * Enqueue google fonts.
	 *
	 * @action wp_enqueue_scripts
	 */
	public function enqueue_google_fonts() {
		$fonts_url = $this->customizer_controls->get_google_fonts_url();

		wp_enqueue_style(
			'material-google-fonts-cdn',
			esc_url( $fonts_url ),
			[],
			$this->asset_version()
		);
	}

	/**
	 * Enqueue front-end styles and scripts.
	 *
	 * @action wp_enqueue_scripts, 100
	 */
	public function enqueue_front_end_assets() {
		wp_enqueue_script(
			'material-front-end-js',
			$this->asset_url( 'assets/js/front-end.js' ),
			[],
			$this->asset_version(),
			true
		);

		$mtb_recaptcha_site_key      = get_option( 'mtb_recaptcha_site_key', '' );
		$mtb_recaptcha_client_secret = get_option( 'mtb_recaptcha_client_secret', '' );

		$wp_localized_script_data = [ 'ajax_url' => admin_url( 'admin-ajax.php' ) ];

		if ( function_exists( 'has_block' ) && has_block( 'material/contact-form' ) && ! empty( $mtb_recaptcha_site_key ) && ! empty( $mtb_recaptcha_client_secret ) ) {
			wp_enqueue_script(
				'google-recaptcha-v3',
				'https://www.google.com/recaptcha/api.js?render=' . esc_attr( $mtb_recaptcha_site_key ),
				[ 'jquery', 'material-front-end-js' ],
				'3.0.0',
				true
			);
			$wp_localized_script_data['recaptcha_site_key'] = esc_js( $mtb_recaptcha_site_key );
		}

		wp_localize_script( 'material-front-end-js', 'mtb', $wp_localized_script_data );

		wp_enqueue_style(
			'material-front-end-css',
			$this->asset_url( 'assets/css/front-end-compiled.css' ),
			[],
			$this->asset_version()
		);

		/**
		 * Enqueue material style overrides if the theme is not material.
		 */
		if ( false === strpos( get_stylesheet(), 'material-theme' ) ) {
			wp_enqueue_style(
				'material-overrides-css',
				$this->asset_url( 'assets/css/overrides-compiled.css' ),
				[],
				$this->asset_version()
			);
		}
	}

	/**
	 * Output inline styles with css variables at the top of the head.
	 *
	 * @action wp_head, 1
	 * @action admin_head, 1
	 */
	public function frontend_inline_css() {
		// phpcs:disable WordPress.Security.EscapeOutput.OutputNotEscaped
		echo '<style id="material-css-variables">' . $this->customizer_controls->get_frontend_css() . '</style>';
		// phpcs:enable
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

	/**
	 * Get the block default attributes set in customizer.
	 *
	 * @return array
	 */
	public function get_block_defaults() {
		$defaults = [];
		$controls = $this->customizer_controls;

		// Set corner radius defaults for blocks.
		foreach ( $controls->get_corner_styles_controls() as $control ) {
			$value = $controls->get_theme_mod( $control['id'] );
			if ( ! empty( $value ) && ! empty( $control['blocks'] ) && is_array( $control['blocks'] ) ) {
				foreach ( $control['blocks'] as $block => $settings ) {
					$defaults[ $block ] = array_key_exists( $block, $defaults ) ? $defaults[ $block ] : [];

					// If the value exceeds min or max, limit it.
					if ( ! empty( $settings['limits'] ) && isset( $settings['limits']['min'] ) && $value < $settings['limits']['min'] ) {
						$value = $settings['limits']['min'];
					} elseif ( ! empty( $settings['limits'] ) && isset( $settings['limits']['max'] ) && $value > $settings['limits']['max'] ) {
						$value = $settings['limits']['max'];
					}

					$defaults[ $block ]['cornerRadius'] = absint( $value );
				}
			}
		}

		return $defaults;
	}
}
