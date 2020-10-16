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
 * Class ImageRadioControl.
 *
 * @package MaterialDesign
 */

namespace MaterialDesign\Plugin\Customizer;

use MaterialDesign\Plugin\Helpers;

/**
 * Image radio control.
 */
class Image_Radio_Control extends \WP_Customize_Control {

	/**
	 * The type of customize control being rendered.
	 *
	 * @var string
	 */
	public $type = 'image_radio';

	/**
	 * Displays the control content.
	 *
	 * @access public
	 * @return void
	 */
	public function render_content() {

		/* If no choices are provided, bail. */
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

		<div class="customize-control-image-radio-wrap" id="<?php echo esc_attr( "input_{$id}" ); ?>">

			<?php
			foreach ( $this->choices as $value => $args ) :
				$label = isset( $args['label'] ) ? $args['label'] : '';
				?>

				<div class="customize-control-image-radio-control">
					<input type="radio" value="<?php echo esc_attr( $value ); ?>" name="<?php echo esc_attr( "_customize-radio-{$id}" ); ?>" id="<?php echo esc_attr( "{$id}-{$value}" ); ?>" <?php $this->link(); ?> <?php checked( $this->value(), $value ); ?> />

					<label for="<?php echo esc_attr( "{$id}-{$value}" ); ?>">
						<span class="label"><?php echo esc_html( $label ); ?></span>

						<?php if ( ! empty( $args['url'] ) ) : ?>
							<img src="<?php echo esc_url( $args['url'] ); ?>" alt="<?php echo esc_attr( $label ); ?>" />
						<?php endif; ?>
					</label>
				</div>

			<?php endforeach; ?>

		</div><!-- .image -->
		<?php
	}
}
