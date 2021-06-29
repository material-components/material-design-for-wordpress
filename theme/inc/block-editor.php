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
