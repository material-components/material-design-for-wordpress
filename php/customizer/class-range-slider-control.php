<?php
/**
 * Class Range_Slider_Control.
 *
 * @package MaterialThemeBuilder
 */

namespace MaterialThemeBuilder\Customizer;

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
		$id = str_replace( [ '[', ']' ], [ '-', '' ], $this->id );
		?>
		<div class="mtb-range_slider" id="<?php echo esc_html( $id ); ?>"></div>
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
