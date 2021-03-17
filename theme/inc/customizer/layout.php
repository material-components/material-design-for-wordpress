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
 * Material Design Customizer Layout section.
 *
 * @package MaterialDesign
 */

namespace MaterialDesign\Theme\Customizer\Layout;

use MaterialDesign\Theme\Customizer;

/**
 * Attach hooks
 */
function setup() {
	add_action( 'customize_register', __NAMESPACE__ . '\register' );
}

/**
 * Register settings and controls.
 *
 * @param  WP_Customize $wp_customize WP_Customize instance.
 * @return void
 */
function register( $wp_customize ) {
	// Add layout section.
	$args = [
		'priority' => 200,
		'title'    => esc_html__( 'Post Settings', 'material-design-google' ),
	];

	Customizer\add_section( $wp_customize, 'layout', $args );

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
	$controls = [];

	foreach ( get_controls() as $control ) {
		$settings[ $control['id'] ] = [
			'transport'         => 'postMessage',
			'sanitize_callback' => Customizer\get_sanitize_callback( $control['type'] ),
		];

		$controls[ $control['id'] ] = array_merge(
			[
				'section' => Customizer\prepend_slug( 'layout' ),
			],
			$control
		);
	}

	Customizer\add_settings( $wp_customize, $settings );
	Customizer\add_controls( $wp_customize, $controls );

	$wp_customize->selective_refresh->add_partial(
		'archive_layout',
		[
			'selector'        => '.site-main__inner',
			'render_callback' => __NAMESPACE__ . '\render_layout',
			'settings'        => get_control_ids(),
		]
	);
}

/**
 * Define core controls to use
 *
 * @return array
 */
function get_controls() {
	return [
		[
			'id'      => 'archive_width',
			'label'   => esc_html__( 'Posts layout width', 'material-design-google' ),
			'type'    => 'radio',
			'choices' => [
				'wide'   => esc_html__( 'Wide', 'material-design-google' ),
				'normal' => esc_html__( 'Normal', 'material-design-google' ),
			],
		],
		[
			'id'      => 'archive_layout',
			'label'   => esc_html__( 'Posts layout', 'material-design-google' ),
			'type'    => 'radio',
			'choices' => [
				'card'  => esc_html__( 'Card', 'material-design-google' ),
				'image' => esc_html__( 'Image List', 'material-design-google' ),
			],
		],
		[
			'id'              => 'archive_card_options',
			'label'           => esc_html__( 'Card display options', 'material-design-google' ),
			'type'            => 'hidden',
			'active_callback' => __NAMESPACE__ . '\is_card_layout',
		],
		[
			'id'              => 'archive_comments',
			'label'           => esc_html__( 'Comments', 'material-design-google' ),
			'type'            => 'checkbox',
			'active_callback' => __NAMESPACE__ . '\is_card_layout',
		],
		[
			'id'              => 'archive_author',
			'label'           => esc_html__( 'Author', 'material-design-google' ),
			'type'            => 'checkbox',
			'active_callback' => __NAMESPACE__ . '\is_card_layout',
		],
		[
			'id'              => 'archive_excerpt',
			'label'           => esc_html__( 'Excerpt', 'material-design-google' ),
			'type'            => 'checkbox',
			'active_callback' => __NAMESPACE__ . '\is_card_layout',
		],
		[
			'id'              => 'archive_date',
			'label'           => esc_html__( 'Date', 'material-design-google' ),
			'type'            => 'checkbox',
			'active_callback' => __NAMESPACE__ . '\is_card_layout',
		],
		[
			'id'              => 'archive_outlined',
			'label'           => esc_html__( 'Outlined', 'material-design-google' ),
			'type'            => 'checkbox',
			'active_callback' => __NAMESPACE__ . '\is_card_layout',
		],
		[
			'id'      => 'comment_fields_style',
			'label'   => esc_html__( 'Comment field display options', 'material-design-google' ),
			'type'    => 'radio',
			'default' => 'outlined',
			'choices' => [
				'outlined' => esc_html__( 'Outlined', 'material-design-google' ),
				'filled'   => esc_html__( 'Filled', 'material-design-google' ),
			],
		],
	];
}

/**
 * Get control ids.
 *
 * @return Array
 */
function get_control_ids() {
	return wp_list_pluck( get_controls(), 'id' );
}

/**
 * Render selected layout
 *
 * @return void
 */
function render_layout() {
	get_template_part( 'template-parts/archive' );
}

/**
 * Determine if the layout is card.
 *
 * @return boolean
 */
function is_card_layout() {
	return 'card' === get_theme_mod( 'archive_layout', 'card' );
}
