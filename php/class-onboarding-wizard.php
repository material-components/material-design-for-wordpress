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

		wp_enqueue_script(
			'material-wizard',
			$this->plugin->asset_url( 'assets/js/wizard.js' ),
			[ 'wp-element', 'wp-i18n' ],
			$this->plugin->asset_version(),
			true
		);

		wp_enqueue_style(
			'material-wizard',
			$this->plugin->asset_url( 'assets/css/wizard-compiled.css' ),
			[],
			$this->plugin->asset_version()
		);
	}
}
