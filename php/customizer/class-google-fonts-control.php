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
	 * Displays the control content.
	 *
	 * @access public
	 * @return void
	 */
	public function render_content() {
		if ( ! empty( $this->label ) ) : ?>
			<span class="customize-control-title"><?php echo esc_html( $this->label ); ?></span>
		<?php endif; ?>

		<?php if ( ! empty( $this->description ) ) : ?>
			<span class="description customize-control-description"><?php echo esc_html( $this->description ); ?></span>
		<?php endif; ?>

		<div class="customize-control-google-fonts-wrap">
			<select data-value="<?php echo esc_attr( $this->value() ); ?>" name="<?php echo esc_attr( $this->id ); ?>" id="<?php echo esc_attr( $this->id ); ?>" <?php $this->link(); ?>></select>
		</div>
		<?php
	}

	/**
	 * Add our custom args for JSON output as params.
	 */
	public function to_json() {
		parent::to_json();
		$this->json['cssVars'] = ! empty( $this->css_vars ) ? $this->css_vars : [];
	}
}
