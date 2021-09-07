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
 * Material Design Customizer Colors section.
 *
 * @package MaterialDesign
 */

namespace MaterialDesign\Theme\Customizer\Colors;

use MaterialDesign\Theme\Customizer;

/**
 * Attach hooks.
 *
 * @return void
 */
function setup() {
	add_action( 'customize_register', __NAMESPACE__ . '\register' );
}

/**
 * Add and initialize colors section
 *
 * @param WP_Customize_Manager $wp_customize Theme Customizer object.
 */
function register( $wp_customize ) {
	if ( ! material_is_plugin_active() ) {
		// Add color palettes section.
		$args = [
			'priority' => 50,
			'title'    => esc_html__( 'Color Palettes', 'material-design-google' ),
		];

		Customizer\add_section( $wp_customize, 'colors', $args );
	}

	add_settings( $wp_customize );
}

/**
 * Create settings based on controls
 *
 * @param WP_Customize_Manager $wp_customize Theme Customizer object.
 * @return void
 */
function add_settings( $wp_customize ) {
	$settings = [];

	foreach ( get_controls() as $control ) {
		$settings[ $control['id'] ] = [
			'transport'         => 'postMessage',
			'sanitize_callback' => 'sanitize_hex_color',
		];
	}

	foreach ( get_dark_controls() as $control ) {
		$settings[ $control['id'] ] = [
			'transport'         => 'postMessage',
			'sanitize_callback' => 'sanitize_hex_color',
		];
	}

	Customizer\add_settings( $wp_customize, $settings );

	if ( material_is_plugin_active() ) {
		Customizer\add_color_controls(
			$wp_customize,
			array_merge(
				get_controls(),
				get_dark_controls()
			),
			'colors'
		);
	} else {
		Customizer\add_color_controls( $wp_customize, get_controls(), 'colors' );
	}
}

/**
 * Define color controls to use
 *
 * @return array
 */
function get_controls() {
	$controls = [];



	if ( ! material_is_plugin_active() ) {
		$controls = [
			[
				'id'         => 'primary_color',
				'label'      => esc_html__( 'Primary Color', 'material-design-google' ),
				'css_var'    => '--mdc-theme-primary',
				'a11y_label' => __( 'Primary', 'material-design-google' ),
			],
			[
				'id'         => 'secondary_color',
				'label'      => esc_html__( 'Secondary Color', 'material-design-google' ),
				'css_var'    => '--mdc-theme-secondary',
				'a11y_label' => __( 'Secondary', 'material-design-google' ),
				'default'    => '#018786',
			],
			[
				'id'         => 'on_primary_color',
				'label'      => esc_html__( 'On Primary Color (text and icons)', 'material-design-google' ),
				'css_var'    => '--mdc-theme-on-primary',
				'a11y_label' => __( 'On Primary', 'material-design-google' ),
			],
			[
				'id'         => 'on_secondary_color',
				'label'      => esc_html__( 'On Secondary Color (text and icons)', 'material-design-google' ),
				'css_var'    => '--mdc-theme-on-secondary',
				'a11y_label' => __( 'On Secondary', 'material-design-google' ),
			],
			[
				'id'         => 'surface_color',
				'label'      => esc_html__( 'Surface Color', 'material-design-google' ),
				'css_var'    => '--mdc-theme-surface',
				'a11y_label' => __( 'Surface', 'material-design-google' ),
			],
			[
				'id'         => 'on_surface_color',
				'label'      => esc_html__( 'On Surface Color (text and icons)', 'material-design-google' ),
				'css_var'    => '--mdc-theme-on-surface',
				'a11y_label' => __( 'On Surface', 'material-design-google' ),
			],
		];
	}

	return array_merge(
		$controls,
		[
			[
				// Using the `custom_` prefix to prevent conflicts with the default WordPress
				// `background_color` setting.
				'id'                   => 'custom_background_color',
				'label'                => esc_html__( 'Background Color', 'material-design-google' ),
				'css_var'              => '--mdc-theme-background',
				'a11y_label'           => __( 'Background', 'material-design-google' ),
				'related_text_setting' => 'on_background_color',

			],
			[
				'id'              => 'on_background_color',
				'label'           => esc_html__( 'On Background Color (text and icons)', 'material-design-google' ),
				'css_var'         => '--mdc-theme-on-background',
				'a11y_label'      => __( 'On Background', 'material-design-google' ),
				'related_setting' => 'custom_background_color',
			],
			[
				'id'                   => 'header_color',
				'label'                => esc_html__( 'Top app bar Color', 'material-design-google' ),
				'css_var'              => '--mdc-theme-header',
				'a11y_label'           => __( 'On Top app bar', 'material-design-google' ),
				'related_text_setting' => 'on_header_color',
			],
			[
				'id'              => 'on_header_color',
				'label'           => esc_html__( 'On Top app bar Color (text and icons)', 'material-design-google' ),
				'css_var'         => '--mdc-theme-on-header',
				'a11y_label'      => __( 'Top app bar', 'material-design-google' ),
				'related_setting' => 'header_color',
			],
			[
				'id'                   => 'footer_color',
				'label'                => esc_html__( 'Footer Color', 'material-design-google' ),
				'css_var'              => '--mdc-theme-footer',
				'a11y_label'           => __( 'On Footer', 'material-design-google' ),
				'related_text_setting' => 'on_footer_color',
			],
			[
				'id'              => 'on_footer_color',
				'label'           => esc_html__( 'On Footer Color (text and icons)', 'material-design-google' ),
				'css_var'         => '--mdc-theme-on-footer',
				'a11y_label'      => __( 'Footer', 'material-design-google' ),
				'related_setting' => 'footer_color',
			],
		]
	);
}

/**
 * Dark mode controls
 *
 * @return array
 */
function get_dark_controls() {
	$controls = [];

	$controls = [
		[
			// Using the `custom_` prefix to prevent conflicts with the default WordPress
			// `background_color` setting.
			'id'                   => 'custom_background_color_dark',
			'label'                => esc_html__( 'Background Color', 'material-design-google' ),
			'css_var'              => '--mdc-theme-background',
			'a11y_label'           => __( 'Background', 'material-design-google' ),
			'related_text_setting' => 'on_background_color_dark',
			'color_mode_type'      => 'dark',
		],
		[
			'id'              => 'on_background_color_dark',
			'label'           => esc_html__( 'On Background Color (text and icons)', 'material-design-google' ),
			'css_var'         => '--mdc-theme-on-background',
			'a11y_label'      => __( 'On Background', 'material-design-google' ),
			'related_setting' => 'custom_background_color_dark',
			'color_mode_type' => 'dark',
		],
		[
			'id'                   => 'header_color_dark',
			'label'                => esc_html__( 'Top app bar Color', 'material-design-google' ),
			'css_var'              => '--mdc-theme-header',
			'a11y_label'           => __( 'On Top app bar', 'material-design-google' ),
			'related_text_setting' => 'on_header_color_dark',
			'color_mode_type'      => 'dark',
		],
		[
			'id'              => 'on_header_color_dark',
			'label'           => esc_html__( 'On Top app bar Color (text and icons)', 'material-design-google' ),
			'css_var'         => '--mdc-theme-on-header',
			'a11y_label'      => __( 'Top app bar', 'material-design-google' ),
			'related_setting' => 'header_color_dark',
			'color_mode_type' => 'dark',
		],
		[
			'id'                   => 'footer_color_dark',
			'label'                => esc_html__( 'Footer Color', 'material-design-google' ),
			'css_var'              => '--mdc-theme-footer',
			'a11y_label'           => __( 'On Footer', 'material-design-google' ),
			'related_text_setting' => 'on_footer_color_dark',
			'color_mode_type'      => 'dark',
		],
		[
			'id'              => 'on_footer_color_dark',
			'label'           => esc_html__( 'On Footer Color (text and icons)', 'material-design-google' ),
			'css_var'         => '--mdc-theme-on-footer',
			'a11y_label'      => __( 'Footer', 'material-design-google' ),
			'related_setting' => 'footer_color_dark',
			'color_mode_type' => 'dark',
		],
	];

	return $controls;
}
