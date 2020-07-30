<?php
/**
 * Class Admin.
 *
 * @package MaterialThemeBuilder
 */

namespace MaterialThemeBuilder;

/**
 * Class to handle admin settings and actions.
 */
class Admin extends Module_Base {
	/**
	 * Create admin pages.
	 * - Getting started page.
	 * - Onboarding Wizard page.
	 *
	 * @action admin_menu
	 *
	 * @return void
	 */
	public function add_pages() {
		add_menu_page(
			esc_html__( 'Material Design for WordPress', 'material-theme-builder' ),
			esc_html__( 'Material', 'material-theme-builder' ),
			'manage_options',
			'material-settings',
			[ $this, 'render_getting_started_page' ],
			trailingslashit( $this->plugin->dir_url ) . 'assets/images/logo-outline.svg'
		);

		add_submenu_page(
			'material-settings',
			esc_html__( 'Getting Started', 'material-theme-builder' ),
			esc_html__( 'Getting Started', 'material-theme-builder' ),
			'manage_options',
			'material-settings',
			[ $this, 'render_getting_started_page' ]
		);

		add_submenu_page(
			'material-settings',
			esc_html__( 'Onboarding Wizard', 'material-theme-builder' ),
			esc_html__( 'Onboarding Wizard', 'material-theme-builder' ),
			'manage_options',
			'material-theme-builder',
			[ $this, 'render_onboarding_wizard_page' ]
		);
	}


	/**
	 * Render getting started page.
	 *
	 * @TODO: Rename to Material Settings
	 */
	public function render_getting_started_page() {
		$should_import = filter_input( INPUT_POST, 'mtb-install-demo', FILTER_SANITIZE_NUMBER_INT );

		// @codeCoverageIgnoreStart
		if ( $should_import ) {
			return $this->import_demo();
		}
		// @codeCoverageIgnoreEnd
		?>

		<div id="material-gsm" class="material-gsm"></div>

		<?php
	}

	/**
	 * Render onboarding wizard page.
	 */
	public function render_onboarding_wizard_page() {
		?>

		<section id="material-onboarding-wizard" class="mdc-typography"></section>

		<?php
	}

	/**
	 * Enqueue getting started assets
	 *
	 * @action admin_enqueue_scripts
	 *
	 * @return void
	 */
	public function enqueue_assets() {
		$screen = get_current_screen();

		wp_enqueue_style(
			'material-admin-css',
			$this->plugin->asset_url( 'assets/css/admin-compiled.css' ),
			[],
			$this->plugin->asset_version()
		);

		wp_enqueue_script(
			'material-admin-js',
			$this->plugin->asset_url( 'assets/js/admin.js' ),
			[],
			$this->plugin->asset_version(),
			true
		);

		wp_localize_script(
			'material-admin-js',
			'mtbOnboarding',
			[
				'restUrl'     => esc_url( $this->plugin->onboarding_rest_controller->get_rest_base_url() ),
				'redirect'    => esc_url( admin_url( 'themes.php' ) ),
				'nonce'       => wp_create_nonce( 'wp_rest' ),
				'themeStatus' => esc_html( $this->plugin->material_theme_status() ),
			]
		);

		if ( 'toplevel_page_material-settings' === $screen->id ) {
			// Get Roboto Mono and icons.
			wp_enqueue_style(
				'material-admin-google-fonts',
				'//fonts.googleapis.com/css2?family=Roboto+Mono&family=Material+Icons',
				[],
				$this->plugin->asset_version()
			);

			wp_enqueue_style(
				'material-gsm',
				$this->plugin->asset_url( 'assets/css/getting-started-compiled.css' ),
				[ 'material-admin-google-fonts' ],
				$this->plugin->asset_version()
			);

			wp_enqueue_script(
				'material-gsm',
				$this->plugin->asset_url( 'assets/js/getting-started.js' ),
				[ 'wp-element', 'wp-i18n' ],
				$this->plugin->asset_version(),
				true
			);

			wp_localize_script(
				'material-gsm',
				'mtbGsm',
				[
					'wizardUrl'     => esc_url( menu_page_url( 'material-theme-builder', false ) ),
					'editorUrl'     => esc_url( admin_url( 'edit.php' ) ),
					'redirect'      => esc_url( admin_url( 'themes.php' ) ),
					'themeStatus'   => esc_html( $this->plugin->material_theme_status() ),
					'contentStatus' => esc_html( $this->locate_demo_content() ),
				]
			);

			wp_localize_script(
				'material-admin-js',
				'mtbWizard',
				[
					'restUrl' => esc_url( $this->plugin->importer_rest_controller->get_rest_base_url() ),
					'nonce'   => wp_create_nonce( 'wp_rest' ),
				]
			);
		}

		if ( 'material_page_material-theme-builder' === $screen->id ) {
			// Get Roboto Mono and icons.
			wp_enqueue_style(
				'material-admin-google-fonts',
				'//fonts.googleapis.com/css2?family=Roboto+Mono&family=Material+Icons',
				[],
				$this->plugin->asset_version()
			);

			wp_enqueue_style(
				'material-wizard',
				$this->plugin->asset_url( 'assets/css/wizard-compiled.css' ),
				[ 'material-admin-google-fonts' ],
				$this->plugin->asset_version()
			);

			wp_enqueue_script(
				'material-wizard',
				$this->plugin->asset_url( 'assets/js/wizard.js' ),
				[ 'wp-element', 'wp-i18n' ],
				$this->plugin->asset_version(),
				true
			);

			wp_localize_script(
				'material-wizard',
				'mtbWizard',
				[
					'pagesUrl'         => esc_url( admin_url( 'edit.php?post_type=page' ) ),
					'settingsUrl'      => esc_url( admin_url( 'admin.php?page=material-settings' ) ),
					'assetsPath'       => esc_url( $this->plugin->asset_url( 'assets/images/wizard/' ) ),
					'placeholderImage' => esc_url( $this->plugin->asset_url( 'assets/images/wizard/placeholder.png' ) ),
					'placeholderSmall' => esc_url( $this->plugin->asset_url( 'assets/images/wizard/placeholder-small.png' ) ),
					'nonce'            => wp_create_nonce( 'wp_rest' ),
					'restUrl'          => esc_url( $this->plugin->importer_rest_controller->get_rest_base_url() ),
				]
			);
		}
	}

	/**
	 * Update theme activated option if material theme is activated.
	 *
	 * @action switch_theme, 10, 2
	 *
	 * @param  string   $new_name Name of the theme.
	 * @param  WP_Theme $new_theme WP_Theme instance of the new theme.
	 * @return void
	 */
	public function switch_theme_material( $new_name, $new_theme ) {
		if ( Plugin::THEME_SLUG === $new_theme->get_stylesheet() ) {
			update_option( 'material_theme_activated', true, false );
		}
	}

	/**
	 * Look for demo posts
	 *
	 * @return string Status of demo content
	 */
	public function locate_demo_content() {
		/**
		 * Fetch the imported posts.
		 */
		$query = new \WP_Query(
			[
				'post_status'            => 'publish',
				'post_type'              => [ 'page' ],
				'posts_per_page'         => 1,
				'meta_key'               => '_mtb-demo-content',
				'meta_value'             => 1, // phpcs:ignore WordPress.DB.SlowDBQuery.slow_db_query_meta_value
				'no_found_rows'          => true,
				'update_post_meta_cache' => false,
				'update_post_term_cache' => false,
			]
		);

		if ( $query->have_posts() ) {
			return 'ok';
		}

		return 'install';
	}
}
