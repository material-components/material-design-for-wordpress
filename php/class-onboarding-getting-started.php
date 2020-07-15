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
	}
}
