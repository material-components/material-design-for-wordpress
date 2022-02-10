<?php
/**
 * Copyright 2022 Google LLC
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
 * Material Design Customizer fse opt in section.
 *
 * @package MaterialDesign
 */

namespace MaterialDesign\Theme\Customizer\OptIn;

use MaterialDesign\Theme\Customizer;

/**
 * Attach hooks
 */
function setup() {
	add_action( 'customize_register', __NAMESPACE__ . '\\register' );
	add_filter( 'theme_file_path', __NAMESPACE__ . '\\filter_disable_fse', 10, 2 );
}

/**
 * Register settings and controls.
 *
 * @param \WP_Customize $wp_customize WP_Customize instance.
 *
 * @return void
 */
function register( $wp_customize ) {
	// Add layout section.
	$args = [
		'priority' => 650,
		'title'    => esc_html__( 'Opt in/out for full site editing', 'material-design-google' ),
	];

	Customizer\add_section( $wp_customize, 'fse_opt', $args );

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
			'transport'         => '',
			'sanitize_callback' => 'MaterialDesign\\Theme\\Customizer\\sanitize_select',
			'default'           => $control['default'],
		];

		$controls[ $control['id'] ] = array_merge(
			[
				'section' => Customizer\prepend_slug( 'fse_opt' ),
			],
			$control
		);

	}

	Customizer\add_settings( $wp_customize, $settings );
	Customizer\add_controls( $wp_customize, $controls );
}

/**
 * Define core controls to use
 *
 * @return array
 */
function get_controls() {
	return [
		[
			'id'          => 'fse_opt_option',
			'label'       => esc_html__( 'Opt for Full site editing', 'material-design-google' ),
			'description' => sprintf( '<p class="description">%s</p>', esc_html__( 'Full site editing feature is in beta. You can opt in or out for full site editing. Please test it out in local or staging environment before turning on in production.', 'material-design-google' ) ),
			'type'        => 'radio',
			'default'     => 'out',
			'choices'     => [
				'in'  => esc_html__( 'Opt in', 'material-design-google' ),
				'out' => esc_html__( 'Opt out', 'material-design-google' ),
			],
		],
	];
}

/**
 * Filter site path to enable and disable FSE.
 *
 * @param string $path File path.
 * @param string $file Relative theme path.
 *
 * @return string
 */
function filter_disable_fse( $path, $file ) {
	if ( 'index.html' !== basename( $file ) ) {
		return $path;
	}
	if ( 'in' === get_theme_mod( 'fse_opt_option', 'out' ) ) {
		return $path;
	}

	return str_replace( 'index.html', 'index-disabled.html', $path );
}
