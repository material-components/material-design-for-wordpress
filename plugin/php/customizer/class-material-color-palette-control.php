<?php
/**
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @package MaterialDesign
 */

/**
 * Class Material_Color_Palette_Control.
 *
 * @package MaterialDesign
 */

namespace MaterialDesign\Plugin\Customizer;

use MaterialDesign\Plugin\Helpers;

/**
 * Material color palette control.
 */
class Material_Color_Palette_Control extends \WP_Customize_Control {

	/**
	 * The type of customize control being rendered.
	 *
	 * @var string
	 */
	public $type = 'material_color';

	/**
	 * Related setting id of text color, applicable only if this is a background color.
	 *
	 * @var string
	 */
	public $related_text_setting = '';

	/**
	 * Related setting id of background color, applicable only if this is a text color.
	 *
	 * @var string
	 */
	public $related_setting = '';

	/**
	 * Var name in CSS.
	 *
	 * @var string
	 */
	public $css_var = '';

	/**
	 * Color accessibility label.
	 *
	 * @var string
	 */
	public $a11y_label = '';

	/**
	 * Default setting name
	 *
	 * @var string
	 */
	public $default_mode_setting = '';

	/**
	 * Default color mode
	 *
	 * @var string
	 */
	public $color_mode_type = 'default';

	/**
	 * Render a JS template for the Material color palette tabs.
	 *
	 * @return void
	 */
	public static function tabs_template() {
		?>
		<script type="text/html" id="tmpl-customize-control-material_color-tabs">
			<# var id = materialDesignSanitizeControlId( data.id ) #>
			<div class="material-design-tabs">
				<a class="material-design-tab-link" href="#material-design-palette-{{id}}"><?php esc_html_e( 'Palette', 'material-design' ); ?></a>
				<a class="material-design-tab-link" href="#material-design-custom-{{id}}"><?php esc_html_e( 'Custom', 'material-design' ); ?></a>
			</div>
			<div class="material-design-tab-content tab-palette" id="material-design-palette-{{id}}"></div>
			<div class="material-design-tab-content tab-custom" id="material-design-custom-{{id}}"></div>
			<div class="material-design-accessibility"></div>
		</script>
		<script type="text/html" id="tmpl-customize-control-material_color-accessibility">
			<div class="material-color-accessibility">
				<label><?php esc_html_e( 'Current Scheme', 'material-design' ); ?></label>
				<div class="material-color-accessibility-inner">
					<# _.each( data.colors, function( color ) { #>
						<div class="material-color-accessibility-row">
							<div class="material-color-accessibility-color">
								<span style="background-color: {{ color.hex }}"></span> <strong>{{ color.type }}</strong>
							</div>

							<# _.each( color.variations, function( variation ) { #>
								<# if ( null === variation.result ) { #>
									{{ variation.size }} <?php esc_html_e( 'text', 'material-design' ); ?>:
									{{ variation.textColor }}
									<?php esc_html_e( ' text not legible', 'material-design' ); ?>
									<span style="background-color: {{ variation.colorHex }}; color: {{ variation.textColorHex }}"><?php esc_html_e( 'Aa', 'material-design' ); ?></span>
									<span class="dashicons dashicons-warning"></span><br/>
								<# } #>
							<# } ); #>
						</div>
					<# } ); #>
				</div>
			</div>
		</script>
		<?php
	}

	/**
	 * Displays the control wrapper.
	 *
	 * @access public
	 * @return void
	 */
	public function render() {
		$id    = 'customize-control-' . str_replace( [ '[', ']' ], [ '-', '' ], $this->id );
		$class = 'customize-control customize-control-' . $this->type;

		printf( '<li id="%s" class="%s">', esc_attr( $id ), esc_attr( $class ) );
		$this->render_content();
		echo '</li>';
	}

	/**
	 * Add our custom args for JSON output as params.
	 */
	public function to_json() {
		parent::to_json();
		$this->json['relatedTextSetting'] = ! empty( $this->related_text_setting ) ? $this->related_text_setting : false;
		$this->json['relatedSetting']     = ! empty( $this->related_setting ) ? $this->related_setting : false;
		$this->json['cssVar']             = ! empty( $this->css_var ) ? $this->css_var : false;
		$this->json['a11yLabel']          = ! empty( $this->a11y_label ) ? $this->a11y_label : '';
		$this->json['id']                 = ! empty( $this->id ) ? $this->id : '';
		$this->json['defaultModeSetting'] = ! empty( $this->default_mode_setting ) ? $this->default_mode_setting : '';
		$this->json['colorModeType']      = ! empty( $this->color_mode_type ) ? $this->color_mode_type : '';
	}
}
