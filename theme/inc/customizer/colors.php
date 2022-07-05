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
	// If plugin is available take precedense.
	if ( material_is_plugin_active() ) {
		return;
	}

	$settings = [
		'color_palette' => [
			'default' => [],
		],
	];

	foreach ( get_controls() as $control ) {
		$settings[ $control['id'] ] = [
			'transport'         => 'postMessage',
			'sanitize_callback' => 'sanitize_hex_color',
		];
	}

	Customizer\add_settings( $wp_customize, $settings );

	Customizer\add_color_controls( $wp_customize, get_controls(), 'colors' );
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
				'label'      => esc_html__( 'Source Color', 'material-design-google' ),
				'css_var'    => '--md-sys-color-primary',
				'a11y_label' => __( 'Source Color', 'material-design-google' ),
			],
		];
	}

	return $controls;
}
