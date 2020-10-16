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
 * Class Google_Fonts_Control.
 *
 * @package MaterialDesign
 */

namespace MaterialDesign\Plugin\Customizer;

use MaterialDesign\Plugin\Helpers;

/**
 * Google Fonts control.
 */
class Google_Fonts_Control extends \WP_Customize_Control {

	/**
	 * The type of customize control being rendered.
	 *
	 * @var string
	 */
	public $type = 'google_fonts';

	/**
	 * List of CSS vars.
	 *
	 * @var array
	 */
	public $css_vars = [];

	/**
	 * Displays the control wrapper.
	 *
	 * @access public
	 * @return void
	 */
	public function render() {
		$id    = 'customize-control-' . str_replace( [ '[', ']' ], [ '-', '' ], $this->id );
		$class = 'customize-control customize-control-' . $this->type;

		if ( empty( $this->choices ) ) {
			$class .= ' customize-control-child-' . $this->type;
		}

		printf( '<li id="%s" class="%s">', esc_attr( $id ), esc_attr( $class ) );
		$this->render_content();
		echo '</li>';
	}

	/**
	 * Displays the control content.
	 *
	 * @access public
	 * @return void
	 */
	public function render_content() {
		$id = Helpers::sanitize_control_id( $this->id );
		if ( ! empty( $this->label ) && ! empty( $this->choices ) ) : ?>
			<span class="customize-control-title"><?php echo esc_html( $this->label ); ?></span>
		<?php endif; ?>

		<?php if ( ! empty( $this->description ) ) : ?>
			<span class="description customize-control-description"><?php echo esc_html( $this->description ); ?></span>
		<?php endif; ?>

		<?php if ( ! empty( $this->choices ) ) : ?>
			<div class="customize-control-google-fonts-wrap">
				<select data-value="<?php echo esc_attr( $this->value() ); ?>" name="<?php echo esc_attr( $id ); ?>" id="<?php echo esc_attr( $id ); ?>" <?php $this->link(); ?>></select>
			</div>
		<?php else : ?>
			<div class="customize-control-google-fonts-extra" id="<?php echo esc_html( $id ); ?>"></div>
			<?php
		endif;
	}

	/**
	 * Add our custom args for JSON output as params.
	 */
	public function to_json() {
		parent::to_json();
		$this->json['cssVars']  = ! empty( $this->css_vars ) ? $this->css_vars : [];
		$this->json['children'] = ! empty( $this->choices ) ? $this->choices : [];
	}
}
