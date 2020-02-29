<?php
/**
 * Class Material_Color_Palette_Control.
 *
 * @package MaterialThemeBuilder
 */

namespace MaterialThemeBuilder\Customizer;

/**
 * Material color palette control.
 */
class Material_Color_Palette_Control extends \WP_Customize_Color_Control {

	/**
	 * The type of customize control being rendered.
	 *
	 * @var string
	 */
	public $type = 'material_color';

	/**
	 * Render a JS template for the Material color palette tabs.
	 *
	 * @return void
	 */
	public static function tabs_template() {
		?>
		<script type="text/html" id="tmpl-customize-control-material_color-tabs">
			<div class="mtb-tabs">
				<a class="mtb-tab-link" href="#mtb-palette-{{data.id}}"><?php esc_html_e( 'Palette', 'material-theme-builder' ); ?></a>
				<a class="mtb-tab-link" href="#mtb-custom-{{data.id}}"><?php esc_html_e( 'Custom', 'material-theme-builder' ); ?></a>
			</div>
			<div class="mtb-tab-content tab-palette" id="mtb-palette-{{data.id}}">Palette Content</div>
			<div class="mtb-tab-content tab-custom" id="mtb-custom-{{data.id}}"></div>
		</script>
		<?php
	}
}
