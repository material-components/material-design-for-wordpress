<?php
/**
 * Class Onboarding_Wizard.
 *
 * @package MaterialThemeBuilder
 */

namespace MaterialThemeBuilder;

/**
 * Onboarding wizard app container
 */
class Onboarding_Wizard extends Module_Base {
	/**
	 * Render app container
	 *
	 * @return void
	 */
	public function render() {
		// phpcs:disable WordPress.Security.EscapeOutput.OutputNotEscaped
		echo '<section id="material-onboarding-wizard" class="mdc-typography"></section>';
		// phpcs:enable
	}
	
	/**
	 * Enqueue Wizard's assets
	 * 
	 * @action admin_enqueue_scripts
	 *
	 * @return void
	 */
	public function enqueue_assets() {
		$screen = get_current_screen();

		if ( 'toplevel_page_material-theme-builder' !== $screen->id ) {
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
			'material-wizard',
			$this->plugin->asset_url( 'assets/css/wizard-compiled.css' ),
			[ 'google-fonts' ],
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
				'settingsUrl'      => esc_url( admin_url( 'plugins.php' ) ),
				'placeholderImage' => esc_url( $this->plugin->asset_url( 'assets/images/wizard/placeholder.png' ) ),
				'placeholderSmall' => esc_url( $this->plugin->asset_url( 'assets/images/wizard/placeholder-small.png' ) ),
				'themeStatus'      => esc_html( $this->plugin->material_theme_status() ),
				'nonce'            => wp_create_nonce( 'wp_rest' ),
				'restUrl'          => esc_url( $this->plugin->importer_rest_controller->get_rest_base_url() ),
			]
		);
	}
}
