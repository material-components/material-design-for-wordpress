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
 * Class More_Options.
 *
 * @package MaterialDesign
 */

namespace MaterialDesign\Theme\Customizer;

if ( ! class_exists( '\WP_Customize_Control' ) ) {
	return;
}

/**
 * Range Slider control.
 */
class More_Options extends \WP_Customize_Control {

	/**
	 * The type of customize control being rendered.
	 *
	 * @var string
	 */
	public $type = 'more_options';

	/**
	 * Children controls.
	 *
	 * @var array
	 */
	public $controls = [];

	/**
	 * Color mode.
	 *
	 * @var array
	 */
	public $controls_type = 'default';

	/**
	 * Displays the control content.
	 *
	 * @access public
	 * @return void
	 */
	public function render_content() {
		?>
		<div class="material-more_options material-more_options__<?php echo esc_attr( $this->controls_type ); ?>" id="<?php echo esc_attr( $this->id ); ?>">
			<a href="#" class="material-show-more-options"><?php esc_html_e( 'More Options', 'material-design-google' ); ?></a>
			<a href="#" class="material-show-more-options less-options"><?php esc_html_e( 'Less Options', 'material-design-google' ); ?></a>
		</div>
		<?php
	}

	/**
	 * Add our custom args for JSON output as params.
	 */
	public function to_json() {
		parent::to_json();
		$this->json['controls']      = ! empty( $this->controls ) ? $this->controls : [];
		$this->json['controls_type'] = ! empty( $this->controls_type ) ? $this->controls_type : [];
	}
}
