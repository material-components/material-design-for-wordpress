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
		echo '<div class="material-onboarding-wizard"></div>';
		// phpcs:enable
	}
}
