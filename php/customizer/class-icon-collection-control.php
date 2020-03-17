<?php
/**
 * Class Google_Fonts_Control.
 *
 * @package MaterialThemeBuilder
 */

namespace MaterialThemeBuilder\Customizer;

/**
 * Google Fonts control.
 */
class Icon_Collection_Control extends \WP_Customize_Control {

	/**
	 * The type of customize control being rendered.
	 *
	 * @var string
	 */
	public $type = 'icon-collection';

	/**
	 * Displays the control content.
	 *
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

		<?php foreach ( $this->choices as $value => $args ) : ?>
			<div class="customize-inside-control-row">
				<input 
					id="<?php echo esc_attr( "{$this->id}-{$value}" ); ?>"
					type="radio" 
					value="<?php echo esc_attr( $value ); ?>" 
					name="<?php echo esc_attr( "_customize-radio-{$this->id}" ); ?>"
					<?php checked( $this->value(), $value ); ?>
				/>

				<label for="<?php echo esc_attr( "{$this->id}-{$value}" ); ?>">
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
	// public function to_json() {
	// 	parent::to_json();
	// 	$this->json['cssVars'] = ! empty( $this->css_vars ) ? $this->css_vars : [];
	// }
}
