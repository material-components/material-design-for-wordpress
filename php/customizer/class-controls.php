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
				'title'       => esc_html__( 'Material Theme Editor', 'material-theme-builder' ),
				'description' => esc_html__( 'Material Theme Description goes here.', 'material-theme-builder' ),
			)
		);

		$sections = array(
			$slug . '_theme'      => __( 'Theme', 'material-theme-builder' ),
			$slug . '_typography' => __( 'Typography', 'material-theme-builder' ),
			$slug . '_corners'    => __( 'Corner Styles', 'material-theme-builder' ),
			$slug . '_icons'      => __( 'System Icon Collections', 'material-theme-builder' ),
			$slug . '_colors'     => __( 'Theme Color Palettes', 'material-theme-builder' ),
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
			 * Filters the customizer section args.
			 *
			 * This allows other plugins/themes to change the customizer section args.
			 *
			 * @param array $args Array of section args.
			 * @param string   $id       ID of the setting.
			 */
			$section = apply_filters( 'mtb_customizer_section_args', $args, $id );

			if ( is_array( $section ) ) {
				$wp_customize->add_section(
					$id,
					$section
				);
			} elseif ( $setting instanceof \WP_Customize_Section ) {
				$wp_customize->add_section( $section );
			}
		}

		/**
		 * List of all our custom customizer controls.
		 */
		$controls = array(
			// Example control.
			// @todo remove.
			'example_id' => array(
				'setting' => array(
					'capability'        => 'edit_theme_options',
					'sanitize_callback' => 'sanitize_text_field',
				),
				'control' => array(
					'type'     => 'text',
					'section'  => $slug . '_theme',
					'priority' => 10,
					'label'    => __( 'Example Text Field', 'material-theme-builder' ),
				),
			),
		);

		foreach ( $controls as $id => $args ) {
			if ( array_key_exists( 'setting', $args ) ) {
				/**
				 * Filters the customizer setting args.
				 *
				 * This allows other plugins/themes to change the customizer controls ards
				 *
				 * @param array $args['setting'] Array of setting args.
				 * @param string   $id       ID of the setting.
				 */
				$setting = apply_filters( 'mtb_customizer_setting_args', $args['setting'], $id );

				if ( is_array( $setting ) ) {
					$wp_customize->add_setting(
						$id,
						$setting
					);
				} elseif ( $setting instanceof \WP_Customize_Setting ) {
					$wp_customize->add_setting( $setting );
				}
			}

			if ( array_key_exists( 'control', $args ) ) {
				/**
				 * Filters the customizer control args.
				 *
				 * This allows other plugins/themes to change the customizer controls ards
				 *
				 * @param array $args['control'] Array of control args.
				 * @param string   $id       ID of the control.
				 */
				$control = apply_filters( 'mtb_customizer_control_args', $args['control'], $id );

				if ( is_array( $control ) ) {
					$wp_customize->add_control(
						$id,
						$control
					);
				} elseif ( $control instanceof \WP_Customize_Control ) {
					$wp_customize->add_control( $control );
				}
			}
		}
	}

	/**
	 * Enqueue Customizer scripts.
	 *
	 * @action customize_controls_enqueue_scripts
	 */
	public function scripts() {
		wp_enqueue_script(
			'material-theme-builder-customizer',
			$this->plugin->asset_url( 'assets/js/customize-controls.js' ),
			[ 'customize-controls', 'jquery' ],
			$this->plugin->asset_version(),
			false
		);
	}
}
