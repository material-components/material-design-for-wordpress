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
 * Class Material_Styles_Panel.
 *
 * @package MaterialDesign
 */

namespace MaterialDesign\Plugin\Customizer;

class Material_Styles_Section extends \WP_Customize_Section {

	/**
	 * Section type.
	 *
	 * @since 4.2.0
	 * @var string
	 */
	public $type = 'material_styles';

	/**
	 * An Underscore (JS) template for rendering this panel's container.
	 *
	 * The themes panel renders a custom panel heading with the current theme and a switch themes button.
	 *
	 * @see WP_Customize_Panel::print_template()
	 *
	 * @since 4.9.0
	 */
	public function render_template() {
		?>
		<li id="accordion-section-{{ data.id }}" class="accordion-section control-panel-themes">
			<h3 class="accordion-section-title">
				<?php
					echo '<span class="customize-action">' . __( 'Active style' ) . '</span> {{ data.title }}';
				?>

				<button type="button" class="button change-theme" aria-label="<?php esc_attr_e( 'Change theme' ); ?>"><?php _ex( 'Change', 'theme' ); ?></button>
			</h3>
			<ul class="accordion-sub-container control-panel-content"></ul>
		</li>
		<?php
	}
}
