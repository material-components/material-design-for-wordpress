<?php
/**
 * Class Controls.
 *
 * @package MaterialThemeBuilder
 */

namespace MaterialThemeBuilder\Customizer;

use MaterialThemeBuilder\Module_Base;

/**
 * Class Controls.
 */
class Controls extends Module_Base {
	/**
	 * Register customizer options.
	 *
	 * @action customize_register
	 *
	 * @param WP_Customize_Manager $wp_customize Theme Customizer object.
	 */
	public function register( $wp_customize ) {
		$slug = 'material_theme';

		/**
		 * Add "Your Material Theme" custom panel.
		 */
		$wp_customize->add_panel(
			$slug,
			array(
				'priority'    => 10,
				'capability'  => 'edit_theme_options',
				'title'       => esc_html__( 'Your Material Theme', 'material-theme-builder' ),
				'description' => esc_html__( 'Material Theme Description goes here.', 'material-theme-builder' ),
			) 
		);

		$sections = array(
			$slug . '_theme'  => __( 'Theme', 'material-theme-builder' ),
			$slug . '_font'   => __( 'Theme Font Families', 'material-theme-builder' ),
			$slug . '_corner' => __( 'Corner Styles', 'material-theme-builder' ),
			$slug . '_icons'  => __( 'System Icon Collections', 'material-theme-builder' ),
			$slug . '_colors' => __( 'Theme Color Palettes', 'material-theme-builder' ),
		);

		foreach ( $sections as $id => $label ) {
			$args = array(
				'priority'   => 10,
				'capability' => 'edit_theme_options',
				'title'      => esc_html( $label ),
				'panel'      => $slug,
				'type'       => 'collapse',
			);

			/**
			 * Add custom section.
			 */
			$wp_customize->add_section( $id, apply_filters( 'mtb_customizer_section_args', $args, $id ) );
		}
	}

	/**
	 * Enqueue Customizer scripts.
	 *
	 * @action customize_controls_enqueue_scripts
	 */
	public function enqueue_customizer_scripts() {
		wp_enqueue_script(
			'material-theme-builder-customizer',
			$this->plugin->asset_url( 'assets/js/customize-controls.js' ),
			[ 'customize-controls', 'underscore', 'jquery' ],
			$this->plugin->asset_version(),
			false
		);
	}
}
