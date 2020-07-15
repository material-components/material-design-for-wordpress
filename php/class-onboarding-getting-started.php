<?php
/**
 * Class Onboarding_Getting_Started.
 *
 * @package MaterialThemeBuilder
 */

namespace MaterialThemeBuilder;

/**
 * Onboarding wizard app container
 */
class Onboarding_Getting_Started extends Module_Base {
	/**
	 * Render form UI
	 *
	 * @TODO: Rename to Material Settings
	 *
	 * @return string Markup to display in page
	 */
	public function render_page() {
		$should_import = filter_input( INPUT_POST, 'mtb-install-demo', FILTER_SANITIZE_NUMBER_INT );

		// @codeCoverageIgnoreStart
		if ( $should_import ) {
			return $this->import_demo();
		}
		// @codeCoverageIgnoreEnd

		ob_start();
		?>

		<div id="material-gsm" class="material-gsm"></div>

		<?php
		return ob_get_clean();
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

		if ( 'material_page_material_settings' !== $screen->id ) {
			return;
		}

		// Get Roboto Mono and icons.
		wp_enqueue_style(
			'google-fonts',
			'//fonts.googleapis.com/css2?family=Roboto+Mono&family=Material+Icons',
			[],
			$this->plugin->asset_version()
		);

		wp_enqueue_style(
			'material-gsm',
			$this->plugin->asset_url( 'assets/css/getting-started-compiled.css' ),
			[ 'google-fonts' ],
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
				'redirect'      => esc_url( admin_url( 'themes.php' ) ),
				'themeStatus'   => esc_html( $this->plugin->material_theme_status() ),
				'contentStatus' => esc_html( $this->locate_demo_content() ),
			]
		);
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
