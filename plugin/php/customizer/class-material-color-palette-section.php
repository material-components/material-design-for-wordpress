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
 * Class Material_Color_Palette_Section.
 *
 * @package MaterialDesign
 */
class Material_Color_Palette_Section extends \WP_Customize_Section {

	/**
	 * Section type.
	 *
	 * @since 4.2.0
	 * @var string
	 */
	public $type = 'colors';

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
	 * Render a JS template for the Material color palette tabs.
	 *
	 * @return void
	 */
	public static function tabs_template() {
		?>
		<script type="text/html" id="tmpl-customize-section-material_color-tabs">
			<# var id = materialDesignSanitizeControlId( data.id ) #>
			<div class="material-design-section-tabs">
				<a class="material-design-tab-link material-design-tab-link--active" href="#material-design-default-{{id}}" data-palette="default"><?php esc_html_e( 'Default', 'material-design' ); ?></a>
				<a class="material-design-tab-link" href="#material-design-dark-{{id}}" data-palette="dark"><?php esc_html_e( 'Dark Mode', 'material-design' ); ?></a>
			</div>
			<ul class="material-design-tab-content tab-palette" id="material-design-default-{{id}}">
				<?php // phpcs:ignore WordPressVIPMinimum.Security.Mustache.OutputNotation ?>
				{{{ data.content }}}
			</ul>
			<ul class="material-design-tab-content tab-default tab-default active" id="material-design-default"></ul>
			<ul class="material-design-tab-content tab-dark tab-dark-mode" id="material-design-dark">
				<h3><?php esc_html_e( 'Dark Mode', 'material-design' ); ?></h3>
				<div class="description">
					<?php esc_html_e( 'We have picked optimal colors based on your default palette', 'material-design' ); ?>
				</div>
			</ul>
		</script>

		<script type="text/html" id="tmpl-customize-section-material_color-palette-template">
			<div id="material-design-color-palette-template"></div>
		</script>
		<?php
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
	}
}
