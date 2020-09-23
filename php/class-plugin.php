<?php
/**
 * Bootstraps the Material Theme Builder plugin.
 *
 * @package MaterialThemeBuilder
 */

namespace MaterialThemeBuilder;

use MaterialThemeBuilder\Blocks_Frontend;
use MaterialThemeBuilder\Customizer\Controls;
use MaterialThemeBuilder\Importer;
use MaterialThemeBuilder\Admin;

/**
 * Main plugin bootstrap file.
 */
class Plugin extends Plugin_Base {

	/**
	 * The theme slug.
	 *
	 * @var string
	 */
	const THEME_SLUG = 'material-theme';

	/**
	 * Controls class.
	 *
	 * @var Controls
	 */
	public $customizer_controls;

	/**
	 * Block_Type class.
	 *
	 * @var Block_Types
	 */
	public $block_types;

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

		$this->block_types = new Block_Types( $this );
		$this->block_types->init();

		$this->blocks_frontend = new Blocks_Frontend( $this );
		$this->blocks_frontend->init();

		$this->onboarding_rest_controller = new Onboarding_REST_Controller( $this );
		$this->onboarding_rest_controller->init();

		$this->importer = new Importer( $this );
		$this->importer->init();

		$this->admin = new Admin( $this );
		$this->admin->init();
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

		$mtb_recaptcha_site_key   = get_option( 'mtb_recaptcha_site_key', '' );
		$wp_localized_script_data = [ 'ajax_url' => admin_url( 'admin-ajax.php' ) ];

		if ( function_exists( 'has_block' ) && has_block( 'material/contact-form' ) && ! empty( $mtb_recaptcha_site_key ) ) {
			wp_enqueue_script(
				'google-recaptcha-v3',
				'https://www.google.com/recaptcha/api.js?render=' . esc_attr( $mtb_recaptcha_site_key ),
				[ 'material-front-end-js' ],
				'3.0.0',
				true
			);

			$wp_localized_script_data['recaptcha_site_key'] = $mtb_recaptcha_site_key;
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
	 *
	 * @action wp_head, 1
	 * @action admin_head, 1
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
	 * Redirect after activating.
	 *
	 * @action activated_plugin
	 *
	 * @param string $plugin Path to activated plugin, relative to plugins folder.
	 *
	 * @return void
	 */
	public function redirect_to_wizard( $plugin ) {
		if ( get_option( 'material_onboarding' ) || trailingslashit( $this->slug ) . $this->slug . '.php' !== $plugin || ( ! empty( filter_input( INPUT_GET, 'page', FILTER_SANITIZE_STRING ) ) && 'tgmpa-install-plugins' === filter_input( INPUT_GET, 'page', FILTER_SANITIZE_STRING ) ) ) {
			return;
		}

		wp_safe_redirect( admin_url( 'admin.php?page=material-onboarding-wizard' ) );
		exit;
	}
}
