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
 * Class Range_Slider_Control.
 *
 * @package MaterialDesign
 */

namespace MaterialDesign\Plugin\Customizer;

use MaterialDesign\Plugin\Helpers;

/**
 * Range Slider control.
 */
class Range_Slider_Control extends \WP_Customize_Control {

	/**
	 * The type of customize control being rendered.
	 *
	 * @var string
	 */
	public $type = 'range_slider';

	/**
	 * CSS var.
	 *
	 * @var string
	 */
	public $css_var = '';

	/**
	 * Extra data.
	 *
	 * @var array
	 */
	public $extra = [];

	/**
	 * Slider min value
	 *
	 * @var Number
	 */
	public $min = 0;

	/**
	 * Slider max value
	 *
	 * @var Number
	 */
	public $max = 100;

	/**
	 * Slider initial value
	 *
	 * @var Number
	 */
	public $initial_value = 0;

	/**
	 * Children controls.
	 *
	 * @var array
	 */
	public $children = [];

	/**
	 * Displays the control content.
	 *
	 * @access public
	 * @return void
	 */
	public function render_content() {
		$id = Helpers::sanitize_control_id( $this->id );
		?>
		<div class="material-design-range_slider" id="<?php echo esc_html( $id ); ?>"></div>
		<?php
	}

	/**
	 * Add our custom args for JSON output as params.
	 */
	public function to_json() {
		parent::to_json();
		$this->json['cssVar']       = ! empty( $this->css_var ) ? $this->css_var : [];
		$this->json['min']          = ! empty( $this->min ) ? $this->min : 0;
		$this->json['max']          = ! empty( $this->max ) ? $this->max : 100;
		$this->json['initialValue'] = ! empty( $this->initial_value ) ? $this->initial_value : 0;
		$this->json['extra']        = ! empty( $this->extra ) ? $this->extra : [];
		$this->json['children']     = ! empty( $this->children ) ? $this->children : [];
	}
}
