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

namespace MaterialDesign\Theme\BlockEditor;

/**
 * Add hooks and filters.
 */
function setup() {
	add_action( 'init', __NAMESPACE__ . '\\register_disable_section_meta' );
	add_action( 'enqueue_block_editor_assets', __NAMESPACE__ . '\\enqueue_block_editor_assets' );
	add_action( 'body_class', __NAMESPACE__ . '\\filter_body_class' );
	add_action( 'after_setup_theme', __NAMESPACE__ . '\\add_font_sizes' );
}

/**
 * Register disable section meta.
 */
function register_disable_section_meta() {
	register_post_meta(
		'',
		'material-hide-sections',
		[
			'type'         => 'object',
			'description'  => 'Whether the title should be shown in frontend.',
			'object_type'  => 'post',
			'single'       => true,
			'default'      => [],
			'show_in_rest' => [
				'schema' => [
					'type'                 => 'object',
					/**
					 * If you add a new property here, make sure to also add it
					 * in the "settingsOptionsInitial" object here:
					 * assets/src/js/block-editor/plugins/hide-sections/index.js
					 */
					'properties'           => [
						'title' => [ 'type' => 'boolean' ],
					],
					'additionalProperties' => [
						'type' => 'boolean',
					],
				],
			],
		]
	);
}

/**
 * Enqueue block editor assets.
 */
function enqueue_block_editor_assets() {
	$asset_file   = get_stylesheet_directory() . '/assets/js/block-editor.asset.php';
	$asset        = is_readable( $asset_file ) ? require $asset_file : [];
	$version      = isset( $asset['version'] ) ? $asset['version'] : wp_get_theme()->get( 'Version' );
	$dependencies = isset( $asset['dependencies'] ) ? $asset['dependencies'] : [];

	wp_enqueue_script(
		'material-block-editor-js-theme',
		get_stylesheet_directory_uri() . '/assets/js/block-editor.js',
		$dependencies,
		$version,
		false
	);
}

/**
 * Filter body class.
 *
 * @param array $classes Body class.
 *
 * @return array
 */
function filter_body_class( $classes ) {
	if ( is_single() || is_page() ) {
		$meta = get_post_meta( get_the_ID(), 'material-hide-sections', true );
		if ( ! empty( $meta['title'] ) ) {
			$classes[] = 'has-hide-title';
		}
	}

	return $classes;
}

/**
 * Em to px.
 *
 * @param float $em Em value.
 *
 * @return int
 */
function em_to_px( $em ) {
	return (int) ( $em * 16 );
}

/**
 * Add font sizes.
 *
 * @return void
 */
function add_font_sizes() {
	// Handle for 5.6 and 5.7 WP, 5.8 and later will be handled via theme.json.
	if ( version_compare( get_bloginfo( 'version' ), '5.6', '<' ) || version_compare( get_bloginfo( 'version' ), '5.8', '>=' ) ) {
		return;
	}

	add_theme_support(
		'editor-font-sizes',
		[
			[
				'name' => __( 'Display Large', 'material-design-google' ),
				'size' => em_to_px( 7.5 ),
				'slug' => 'display-large',
			],
			[
				'name' => __( 'Display Medium', 'material-design-google' ),
				'size' => em_to_px( 6.875 ),
				'slug' => 'display-medium',
			],
			[
				'name' => __( 'Display Small', 'material-design-google' ),
				'size' => em_to_px( 6 ),
				'slug' => 'display-small',
			],
			[
				'name' => __( 'Headline Large', 'material-design-google' ),
				'size' => em_to_px( 3.75 ),
				'slug' => 'headline-large',
			],
			[
				'name' => __( 'Headline Medium', 'material-design-google' ),
				'size' => em_to_px( 3 ),
				'slug' => 'headline-medium',
			],
			[
				'name' => __( 'Headline Small', 'material-design-google' ),
				'size' => em_to_px( 2.125 ),
				'slug' => 'headline-small',
			],
			[
				'name' => __( 'Title Large', 'material-design-google' ),
				'size' => em_to_px( 1.5 ),
				'slug' => 'title-large',
			],
			[
				'name' => __( 'Title Medium', 'material-design-google' ),
				'size' => em_to_px( 1.25 ),
				'slug' => 'title-medium',
			],
			[
				'name' => __( 'Title Small', 'material-design-google' ),
				'size' => em_to_px( 0.875 ),
				'slug' => 'title-small',
			],
			[
				'name' => __( 'Label Large', 'material-design-google' ),
				'size' => em_to_px( 1 ),
				'slug' => 'label-large',
			],
			[
				'name' => __( 'Label Medium', 'material-design-google' ),
				'size' => em_to_px( 0.875 ),
				'slug' => 'label-medium',
			],
			[
				'name' => __( 'Label Small', 'material-design-google' ),
				'size' => em_to_px( 0.75 ),
				'slug' => 'label-small',
			],
			[
				'name' => __( 'Body Large', 'material-design-google' ),
				'size' => em_to_px( 1 ),
				'slug' => 'body-large',
			],
			[
				'name' => __( 'Body Medium', 'material-design-google' ),
				'size' => em_to_px( 0.875 ),
				'slug' => 'body-medium',
			],
			[
				'name' => __( 'Body Small', 'material-design-google' ),
				'size' => em_to_px( 0.75 ),
				'slug' => 'body-small',
			],
		]
	);
}
