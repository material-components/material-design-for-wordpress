<?php
/**
 * Class ImageRadioControl.
 *
 * @package MaterialThemeBuilder
 */

namespace MaterialThemeBuilder\Customizer;

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
		?>

		<?php if ( ! empty( $this->label ) ) : ?>
			<span class="customize-control-title"><?php echo esc_html( $this->label ); ?></span>
		<?php endif; ?>

		<?php if ( ! empty( $this->description ) ) : ?>
			<span class="description customize-control-description"><?php echo esc_html( $this->description ); ?></span>
		<?php endif; ?>

		<div class="customize-control-image-radio-wrap" id="<?php echo esc_attr( "input_{$this->id}" ); ?>">

			<?php
			foreach ( $this->choices as $value => $args ) :
				$label = isset( $args['label'] ) ? $args['label'] : '';
				?>

				<div class="customize-control-image-radio-control">
					<input type="radio" value="<?php echo esc_attr( $value ); ?>" name="<?php echo esc_attr( "_customize-radio-{$this->id}" ); ?>" id="<?php echo esc_attr( "{$this->id}-{$value}" ); ?>" <?php $this->link(); ?> <?php checked( $this->value(), $value ); ?> />

					<label for="<?php echo esc_attr( "{$this->id}-{$value}" ); ?>">
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
