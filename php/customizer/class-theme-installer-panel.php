<?php
/**
 * Class Theme_Installer_Panel.
 *
 * @package MaterialThemeBuilder
 */

namespace MaterialThemeBuilder\Customizer;

class Theme_Installer_Panel extends \WP_Customize_Panel {

	/**
	 * Panel type.
	 */
	public $type = 'material-theme-installer';

	/**
	 * An Underscore (JS) template for rendering this panel's container.
	 *
	 * The themes panel renders a custom panel heading with the current theme and a switch themes button.
	 *
	 * @see WP_Customize_Panel::print_template()
	 *
	 * @since 4.9.0
	 */
	protected function render_template() {
		?>
		<li id="accordion-section-theme-installer" class="accordion-section control-panel-themes">
			<div class="accordion-section-title theme-installer-panel">
				<h3><?php _e( 'Install Material Theme', 'material-theme-builder' ); ?></h3>
				<span class="customize-action">
					<?php _e( 'Install and activate Material Theme for full site customization.', 'material-theme-builder' ); ?>
				</span>
				<br>
				<a href="#" class="button"><?php _e( 'Install theme', 'material-theme-builder' ); ?></a>
			</div>
			<ul class="accordion-sub-container control-panel-content"></ul>
		</li>
		<?php
	}
}
