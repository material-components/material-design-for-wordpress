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
class Icon_Radio_Control extends \WP_Customize_Control {

	/**
	 * The type of customize control being rendered.
	 *
	 * @var string
	 */
	public $type = 'icon_radio';

	/**
	 * Var name in CSS.
	 *
	 * @var string
	 */
	public $css_var = '';

	/**
	 * Displays the control content.
	 *
	 * @return void
	 */
	public function render_content() {
		if ( empty( $this->choices ) ) {
			return;
		}

		$id = Helpers::sanitize_control_id( $this->id );
		?>

		<?php if ( ! empty( $this->label ) ) : ?>
			<span class="customize-control-title"><?php echo esc_html( $this->label ); ?></span>
		<?php endif; ?>

		<?php if ( ! empty( $this->description ) ) : ?>
			<span class="description customize-control-description"><?php echo esc_html( $this->description ); ?></span>
		<?php endif; ?>

		<?php foreach ( $this->choices as $value => $args ) : ?>
			<div class="customize-inside-control-row">
				<input
					type="radio"
					<?php $this->link(); ?>
					value="<?php echo esc_attr( $value ); ?>"
					id="<?php echo esc_attr( "{$id}-{$value}" ); ?>"
					name="<?php echo esc_attr( "_customize-radio-{$id}" ); ?>"
					<?php checked( $this->value(), $value ); ?>
				/>

				<label for="<?php echo esc_attr( "{$id}-{$value}" ); ?>">
					<img
						src="<?php echo esc_url( $args['icon'] ); ?>"
						alt="<?php echo esc_attr( $args['label'] ); ?>"
						style="vertical-align: middle"
					/>
					<?php echo esc_html( $args['label'] ); ?>
				</label>
			</div>
			<?php
		endforeach;
	}

	/**
	 * Add our custom args for JSON output as params.
	 */
	public function to_json() {
		parent::to_json();
		$this->json['cssVar'] = ! empty( $this->css_var ) ? $this->css_var : [];
	}
}
