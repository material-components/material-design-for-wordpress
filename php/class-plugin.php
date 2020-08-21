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
	 * Onboarding REST Controller class.
	 *
	 * @var Importer_REST_Controller
	 */
	public $importer_rest_controller;

	/**
	 * Importer class.
	 *
	 * @var Importer
	 */
	public $importer;

	/**
	 * Wizard class.
	 *
	 * @var mixed
	 */
	public $wizard;

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

		$this->importer_rest_controller = new Importer_REST_Controller( $this );
		$this->importer_rest_controller->init();

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
			[ 'jquery' ],
			$this->asset_version(),
			true
		);

		$mtb_recaptcha_site_key   = get_option( 'mtb_recaptcha_site_key', '' );
		$wp_localized_script_data = [ 'ajax_url' => admin_url( 'admin-ajax.php' ) ];

		if ( function_exists( 'has_block' ) && has_block( 'material/contact-form' ) && ! empty( $mtb_recaptcha_site_key ) ) {
			wp_enqueue_script(
				'google-recaptcha-v3',
				'https://www.google.com/recaptcha/api.js?render=' . esc_attr( $mtb_recaptcha_site_key ),
				[ 'jquery', 'material-front-end-js' ],
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
	 * Prints an admin notice.
	 *
	 * @param string $title   The title to be showed in the notice.
	 * @param string $message The message of the notice.
	 *
	 * @return void
	 */
	public function material_notice( $title, $message ) {
		?>

		<div class="notice notice-info is-dismissible material-notice-container">
			<img
				src="<?php echo esc_url( $this->asset_url( 'assets/images/plugin-logo.png' ) ); ?>"
				alt="<?php esc_attr_e( 'Material Theme Builder', 'material-theme-builder' ); ?>"
			/>

			<div class="material-notice-container__content">
				<h3 class="material-notice-container__content__title">
					<?php echo esc_html( $title ); ?>
				</h3>
				<p class="material-notice-container__content__text">
					<?php
					echo wp_kses(
						$message,
						[
							'a' => [
								'href'  => [],
								'class' => [],
							],
						]
					);
					?>
				</p>
			</div>
		</div>

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
	 * Returns the status of the material theme
	 *
	 * @return string
	 */
	public function material_theme_status() {
		if ( ! $this->theme_installed() ) {
			return 'install';
		}

		if ( self::THEME_SLUG !== get_template() ) {
			return 'activate';
		}

		return 'ok';
	}

	/**
	 * Show admin notice if theme isn't installed.
	 *
	 * @action admin_notices, 10, 2
	 *
	 * @return void
	 */
	public function theme_not_installed_notice() {
		$status = $this->material_theme_status();
		$screen = get_current_screen();

		// Theme already active or inside wizards. Don't show the notice.
		if (
			'ok' === $status
			|| 'toplevel_page_material-settings' === $screen->id
			|| 'material_page_material-onboarding-wizard' === $screen->id
			|| ! empty( get_option( 'material_theme_activated' ) )
		) {
			return;
		}

		$title   = esc_html__(
			'Install Material Theme to take advantage of all Material Plugin customizations',
			'material-theme-builder'
		);
		$message = esc_html__(
			'The Material Plugin enables you to customize Material Components. We recommend installing the companion Material Theme for full site customization.',
			'material-theme-builder'
		);
		$label   = esc_html__( 'Install theme', 'material-theme-builder' );

		if ( 'activate' === $status ) {
			$title   = esc_html__(
				'Activate Material Theme to take advantage of all Material Plugin customizations',
				'material-theme-builder'
			);
			$message = esc_html__(
				'The Material Plugin enables you to customize Material Components. We recommend activating the companion Material Theme for full site customization.',
				'material-theme-builder'
			);
			$label   = esc_html__( 'Activate theme', 'material-theme-builder' );
		}

		$action_link = sprintf(
			'<a href="%s" class="material-theme-%s">%s</a>',
			esc_url( admin_url( '/themes.php?search=Material+Theme' ) ),
			esc_attr( $status ),
			esc_html( $label )
		);

		$this->material_notice(
			$title,
			sprintf(
				'%s %s',
				$message,
				$action_link
			)
		);
	}

	/**
	 * Show admin notice if theme and plugin are active.
	 *
	 * @action admin_notices, 9, 2
	 *
	 * @return void
	 */
	public function plugin_activated_notice() {
		$screen = get_current_screen();

		// Theme not active or plugin didn't JUST activate. Stop here.
		if ( self::THEME_SLUG !== get_template()
			|| ! get_transient( 'mtb-activation-notice' )
			|| 'toplevel_page_material-settings' === $screen->id
			|| 'material_page_material-onboarding-wizard' === $screen->id ) {
			return;
		}

		delete_transient( 'mtb-activation-notice' );
		?>

		<div class="notice notice-info is-dismissible material-notice-container">
			<img
				src="<?php echo esc_url( $this->asset_url( 'assets/images/logo-outline-dark.svg' ) ); ?>"
				alt="<?php esc_attr_e( 'Material Theme Builder', 'material-theme-builder' ); ?>"
			/>

			<div class="material-notice-container__content">
				<h3 class="material-notice-container__content__title">
					<?php esc_html_e( 'See Material Theming in action', 'material-theme-builder' ); ?>
				</h3>
				<p class="material-notice-container__content__text">
					<?php esc_html_e( "You've set up Material, now it's time to customize your site. Get started by viewing the demo content and entering the Customizer", 'material-theme-builder' ); ?>
				</p>

				<?php // TODO: This might no longer be required. ?>
				<form action="<?php echo esc_url( admin_url( 'admin.php?page=material-settings' ) ); ?>" method="post">
					<div class="material-demo__optin">
						<input type="checkbox" name="mtb-install-demo" id="mtb-install-demo" value="1" />
						<label for="mtb-install-demo"><?php esc_html_e( 'Create sample pages using Material blocks', 'material-theme-builder' ); ?></label>
						<?php wp_nonce_field( 'mtb-install-demo' ); ?>
					</div>

					<button class="material-demo__button"><?php esc_html_e( "Let's go!", 'material-theme-builder' ); ?></button>
				</form>
			</div>
		</div>

		<?php
	}

	/**
	 * Redirect after activating
	 *
	 * @action activated_plugin
	 *
	 * @param string $plugin Path to activated plugin, relative to plugins folder.
	 *
	 * @return void
	 */
	public function redirect_to_wizard( $plugin ) {
		if ( trailingslashit( $this->slug ) . $this->slug . '.php' !== $plugin || ( ! empty( filter_input( INPUT_GET, 'page', FILTER_SANITIZE_STRING ) ) && 'tgmpa-install-plugins' === filter_input( INPUT_GET, 'page', FILTER_SANITIZE_STRING ) ) ) {
			return;
		}

		wp_safe_redirect( admin_url( 'admin.php?page=material-onboarding-wizard' ) );
		exit;
	}

	/**
	 * Get a page by it's title.
	 *
	 * @param string       $page_title Page title.
	 * @param string       $output     Optional. The required return type. One of OBJECT, ARRAY_A, or ARRAY_N, which correspond to
	 *                                 a WP_Post object, an associative array, or a numeric array, respectively. Default OBJECT.
	 * @param string|array $post_type  Optional. Post type or array of post types. Default 'page'.
	 * @return WP_Post|array|null WP_Post (or array) on success, or null on failure.
	 */
	public function get_page_by_title( $page_title, $output = OBJECT, $post_type = 'page' ) {
		if ( $this->is_wpcom_vip_prod() ) {
			return wpcom_vip_get_page_by_title(
				sanitize_text_field( $page_title ),
				$output,
				sanitize_text_field( $post_type )
			);
		}

		return get_page_by_title( // phpcs:ignore WordPressVIPMinimum.Functions.RestrictedFunctions.get_page_by_title_get_page_by_title
			sanitize_text_field( $page_title ),
			$output,
			sanitize_text_field( $post_type )
		);
	}
}
