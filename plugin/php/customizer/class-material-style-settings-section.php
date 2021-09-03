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

namespace MaterialDesign\Plugin\Customizer;

use MaterialDesign\Plugin\Plugin;

/**
 * Class Material_Style_Settings_Section.
 *
 * @package MaterialDesign
 */
class Material_Style_Settings_Section extends \WP_Customize_Section {

	/**
	 * Section type.
	 *
	 * @since 4.2.0
	 * @var string
	 */
	public $type = 'style_settings';

	/**
	 * Plugin reference
	 *
	 * @var Plugin
	 */
	public $plugin;

	/**
	 * Constructor.
	 *
	 * Any supplied $args override class property defaults.
	 *
	 * @since 3.4.0
	 *
	 * @param \WP_Customize_Manager $manager Customizer bootstrap instance.
	 * @param string                $id      A specific ID of the section.
	 * @param array                 $args    {
	 *     Optional. Array of properties for the new Section object. Default empty array.
	 *
	 *     @type int             $priority           Priority of the section, defining the display order
	 *                                               of panels and sections. Default 160.
	 *     @type string          $panel              The panel this section belongs to (if any).
	 *                                               Default empty.
	 *     @type string          $capability         Capability required for the section.
	 *                                               Default 'edit_theme_options'
	 *     @type string|string[] $theme_supports     Theme features required to support the section.
	 *     @type string          $title              Title of the section to show in UI.
	 *     @type string          $description        Description to show in the UI.
	 *     @type string          $type               Type of the section.
	 *     @type callable        $active_callback    Active callback.
	 *     @type bool            $description_hidden Hide the description behind a help icon,
	 *                                               instead of inline above the first control.
	 *                                               Default false.
	 * }
	 * @param Plugin                $plugin Reference to parent plugin.
	 */
	public function __construct( $manager, $id, $args = [], $plugin = null ) {
		parent::__construct( $manager, $id, $args );

		$this->plugin = $plugin;
	}

	/**
	 * Get section parameters for JS.
	 *
	 * @since 4.9.0
	 * @return array Exported parameters.
	 */
	public function json() {
		$options           = get_option( 'material_design' );
		$exported          = parent::json();
		$exported['style'] = ucfirst( $options['style'] );

		return $exported;
	}

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
		<li id="accordion-section-{{ data.id }}" class="accordion-section control-section control-section-{{ data.type }}">
			<h3 class="accordion-section-title" tabindex="0">
				{{ data.title }}
				<span class="screen-reader-text"><?php esc_html_e( 'Press return or enter to open this section', 'material-design' ); ?></span>
			</h3>
			<ul class="accordion-section-content">
				<li class="customize-section-description-container section-meta <# if ( data.description_hidden ) { #>customize-info<# } #>">
					<div class="customize-section-title">
						<button class="customize-section-back" tabindex="-1">
							<span class="screen-reader-text"><?php esc_html_e( 'Back', 'material-design' ); ?></span>
						</button>
						<h3>
							<span class="customize-action">
								<?php esc_html_e( 'Theme Preferences', 'material-design' ); ?>
							</span>
							<span id="js-customize-section-style" class="customize-section-style">
								{{ data.style }}
							</span>

							{{ data.title }}
						</h3>
						<# if ( data.description && data.description_hidden ) { #>
						<button type="button" class="customize-help-toggle dashicons dashicons-editor-help" aria-expanded="false"><span class="screen-reader-text"><?php esc_html_e( 'Help', 'material-design' ); ?></span></button>
						<div class="description customize-section-description">
							<?php // phpcs:ignore WordPressVIPMinimum.Security.Mustache.OutputNotation ?>
							{{{ data.description }}}
						</div>
						<# } #>

						<div class="customize-control-notifications-container"></div>
					</div>

					<# if ( data.description && ! data.description_hidden ) { #>
					<div class="description customize-section-description">
						<?php // phpcs:ignore WordPressVIPMinimum.Security.Mustache.OutputNotation ?>
						{{{ data.description }}}
					</div>
					<# } #>
				</li>
			</ul>
		</li>
		<?php
	}
}
