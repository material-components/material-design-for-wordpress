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
 * Material design customizer global styles.
 *
 * @package MaterialDesign
 */

namespace MaterialDesign\Theme\Customizer\Global_Style;

use MaterialDesign\Theme\Customizer;

/**
 * Attach hooks.
 *
 * @return void
 */
function setup() {
	if ( material_is_plugin_active() ) {
		add_action( 'customize_register', __NAMESPACE__ . '\register' );
	}
}

/**
 * Add and initialize colors section
 *
 * @param WP_Customize_Manager $wp_customize Theme Customizer object.
 */
function register( $wp_customize ) {
	// Add color palettes section.
	$args = [
		'priority'    => 300,
		'title'       => esc_html__( 'Global styles', 'material-design-google' ),
		'description' => esc_html__( 'Global style change will affect all the blocks used in your pages. This may override styles applied to blocks locally.', 'material-design-google' ),
	];

	Customizer\add_section( $wp_customize, 'global-setting', $args );
	add_settings( $wp_customize );
}

/**
 * Create settings based on controls
 *
 * @param WP_Customize_Manager $wp_customize Theme Customizer object.
 *
 * @return void
 */
function add_settings( $wp_customize ) {
	$settings = [];
	$controls = [];

	foreach ( get_controls() as $control ) {
		$settings[ $control['id'] ] = [
			'transport'         => 'refresh',
			'sanitize_callback' => Customizer\get_sanitize_callback( $control['type'] ),
		];

		$controls[ $control['id'] ] = array_merge(
			[
				'section' => Customizer\prepend_slug( 'global-setting' ),
			],
			$control
		);
	}

	Customizer\add_settings( $wp_customize, $settings );
	Customizer\add_controls( $wp_customize, $controls );
}

/**
 * Define color controls to use
 *
 * @return array
 */
function get_controls() {
	return [
		[
			'id'      => 'card_style',
			'label'   => esc_html__( 'Cards', 'material-design-google' ),
			'type'    => 'radio',
			'default' => 'elevated',
			'choices' => [
				'elevated' => esc_html__( 'Elevated', 'material-design-google' ),
				'outlined' => esc_html__( 'Outlined', 'material-design-google' ),
			],
		],
		[
			'id'      => 'text_style',
			'label'   => esc_html__( 'Text field', 'material-design-google' ),
			'type'    => 'radio',
			'default' => 'elevated',
			'choices' => [
				'elevated' => esc_html__( 'Elevated', 'material-design-google' ),
				'outlined' => esc_html__( 'Outlined', 'material-design-google' ),
			],
		],
	];
}
