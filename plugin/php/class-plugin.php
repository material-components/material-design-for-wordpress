<?php
/**
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @package MaterialDesign
 */

/**
 * Bootstraps the Material Design plugin.
 *
 * @package MaterialDesign
 */

namespace MaterialDesign\Plugin;

use MaterialDesign\Plugin\Admin\Admin_Updates;
use MaterialDesign\Plugin\Cli\Fonts;
use MaterialDesign\Plugin\Cli\Icons;
use MaterialDesign\Plugin\Customizer\Controls;
use MaterialDesign\Plugin\Rest\Design_Assets_REST_Controller;
use MaterialDesign\Plugin\Rest\Posts_REST_Controller;
use MaterialDesign\Plugin\Rest\Onboarding_REST_Controller;
use MaterialDesign\Plugin\Rest\Reset_Card_Style_Controller;
use MaterialDesign\Plugin\Rest\Reset_Card_Style_Rest_Controller;

/**
 * Main plugin bootstrap file.
 */
class Plugin extends Plugin_Base {

	/**
	 * The theme slug.
	 *
	 * @var string
	 */
	const THEME_SLUG = 'material-design-google';

	/**
	 * Controls class.
	 *
	 * @var Controls
	 */
	public $customizer_controls;

	/**
	 * Block_Types class.
	 *
	 * @var Block_Types
	 */
	public $block_types;

	/**
	 * Block_Patterns class.
	 *
	 * @var Block_Patterns
	 */
	public $block_patterns;

	/**
	 * Blocks_Frontend class.
	 *
	 * @var Blocks_Frontend
	 */
	public $blocks_frontend;

	/**
	 * Onboarding REST Controller class.
	 *
	 * @var Onboarding_REST_Controller
	 */
	public $onboarding_rest_controller;

	/**
	 * Posts REST Controller Class.
	 *
	 * @var Posts_REST_Controller
	 */
	public $posts_rest_controller;

	/**
	 * Design_Assets_REST_Controller class
	 *
	 * @var Design_Assets_REST_Controller
	 */
	public $assets_rest_controller;

	/**
	 * Rest api migration for card style.
	 *
	 * @var Reset_Card_Style_Rest_Controller
	 */
	public $reset_card_style_rest_controller;

	/**
	 * Importer class.
	 *
	 * @var Importer
	 */
	public $importer;

	/**
	 * Getting Started class.
	 *
	 * @var Admin
	 */
	public $admin;

	/**
	 * Handles API Updates for Fonts and Icons.
	 *
	 * @var Admin_Updates
	 */
	public $admin_updates;

	/**
	 * Holds the CLI class for updating Fonts
	 *
	 * @var Fonts
	 */
	public $fonts;

	/**
	 * Holds the CLI class for updating Icons
	 *
	 * @var Icons
	 */
	public $icons;

	/**
	 * Hold plugin frontend class.
	 *
	 * @var Frontend
	 */
	public $frontend;

	/**
	 * Initiate the plugin resources.
	 *
	 * @throws \Exception Generic Exception.
	 */
	public function init() {
		$this->config = apply_filters( 'material_design_plugin_config', $this->config, $this );

		$this->customizer_controls = new Controls( $this );
		$this->customizer_controls->init();

		$this->block_types = new Block_Types( $this );
		$this->block_types->init();

		$this->block_patterns = new Block_Patterns( $this );
		$this->block_patterns->init();

		$this->blocks_frontend = new Blocks_Frontend( $this );
		$this->blocks_frontend->init();

		$this->onboarding_rest_controller = new Onboarding_REST_Controller( $this );
		$this->onboarding_rest_controller->init();

		$this->posts_rest_controller = new Posts_REST_Controller( $this );
		$this->posts_rest_controller->init();

		$this->assets_rest_controller = new Design_Assets_REST_Controller( $this );
		$this->assets_rest_controller->init();

		$this->reset_card_style_rest_controller = new Reset_Card_Style_Rest_Controller( $this );
		$this->reset_card_style_rest_controller->init();

		$this->importer = new Importer( $this );
		$this->importer->init();

		$this->admin = new Admin( $this );
		$this->admin->init();

		$this->admin_updates = new Admin_Updates();
		$this->admin_updates->init();

		$this->frontend = new Frontend( $this );
		$this->frontend->init();

		// Init CLI.
		if ( defined( 'WP_CLI' ) && false !== WP_CLI ) {
			$this->fonts = new Fonts();
			$this->fonts->register();

			$this->icons = new Icons();
			$this->icons->register();
		}

		add_action( 'wp_enqueue_scripts', [ $this, 'enqueue_google_fonts' ] );
		add_action( 'wp_enqueue_scripts', [ $this, 'enqueue_front_end_assets' ], 100 );
		add_action( 'wp_head', [ $this, 'frontend_inline_css' ], 1 );
		add_action( 'admin_head', [ $this, 'frontend_inline_css' ], 1 );
		add_action( 'plugin_row_meta', [ $this, 'get_plugin_row_meta' ], 10, 2 );
	}

	/**
	 * Enqueue google fonts.
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
	 */
	public function enqueue_front_end_assets() {
		wp_enqueue_script(
			'material-front-end-js',
			$this->asset_url( 'assets/js/front-end.js' ),
			[],
			$this->asset_version(),
			true
		);

		$material_design_recaptcha_site_key = get_option( 'material_design_recaptcha_site_key', '' );
		$wp_localized_script_data           = [
			'ajax_url'              => admin_url( 'admin-ajax.php' ),
			'darkModeStatus'        => $this->customizer_controls->get_dark_mode_status(),
			'globalStyle'           => $this->block_types->get_global_styles(),
			'isMaterialThemeActive' => $this->theme_status() === 'ok',
		];

		if ( function_exists( 'has_block' ) && has_block( 'material/contact-form' ) && ! empty( $material_design_recaptcha_site_key ) ) {
			wp_enqueue_script(
				'google-recaptcha-v3',
				'https://www.google.com/recaptcha/api.js?render=' . esc_attr( $material_design_recaptcha_site_key ),
				[ 'material-front-end-js' ],
				'3.0.0',
				true
			);

			$wp_localized_script_data['recaptcha_site_key'] = $material_design_recaptcha_site_key;
		}

		wp_localize_script( 'material-front-end-js', 'materialDesign', $wp_localized_script_data );

		wp_enqueue_style(
			'material-front-end-css',
			$this->asset_url( 'assets/css/front-end-compiled.css' ),
			[],
			$this->asset_version()
		);

		/**
		 * Enqueue material style overrides if the theme is not material.
		 */
		if ( self::THEME_SLUG !== get_template() ) {
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
	 */
	public function frontend_inline_css() {
		?>
		<style id="material-css-variables">
			<?php echo $this->customizer_controls->get_frontend_css(); // phpcs:disable WordPress.Security.EscapeOutput.OutputNotEscaped ?>
		</style>
		<?php
	}

	/**
	 * Checks whether the material theme is installed.
	 *
	 * @return bool
	 */
	public function theme_installed() {
		return file_exists( trailingslashit( get_theme_root() ) . self::THEME_SLUG . '/style.css' );
	}

	/**
	 * Returns the status of the material theme.
	 *
	 * @return string
	 */
	public function theme_status() {
		if ( ! $this->theme_installed() ) {
			return 'install';
		}

		if ( self::THEME_SLUG !== get_template() ) {
			return 'activate';
		}

		return 'ok';
	}

	/**
	 * Updates the plugin row meta with links to review plugin and get support.
	 *
	 * @param string[]|mixed $meta        An array of the plugin's metadata, including the version, author, author URI,
	 *                                    and plugin URI.
	 * @param string         $plugin_file Path to the plugin file relative to the plugins directory.
	 *
	 * @return string[]|mixed Plugin row meta.
	 */
	public function get_plugin_row_meta( $meta, $plugin_file ) {
		if ( plugin_basename( realpath( __DIR__ . '/../material-design.php' ) ) !== $plugin_file ) {
			return $meta;
		}
		if ( ! is_array( $meta ) ) {
			return $meta;
		}
		$redirect_to = 'admin.php?page=material-settings#learn';


		$additional_meta = [
			'<a href="' . esc_url( admin_url( $redirect_to ) ) . '" target="_blank" rel="noreferrer noopener">' . esc_html__( 'Learn more', 'material-design' ) . '</a>',
			'<a href="https://wordpress.org/support/plugin/material-design/" target="_blank" rel="noreferrer noopener">' . esc_html__( 'Contact support', 'material-design' ) . '</a>',
			'<a href="https://wordpress.org/support/plugin/material-design/reviews/#new-post" target="_blank" rel="noreferrer noopener">' . esc_html__( 'Leave review', 'material-design' ) . '</a>',
		];

		return array_merge( $meta, $additional_meta );
	}
}
