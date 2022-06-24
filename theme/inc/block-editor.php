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

use MaterialDesign\Theme\Block\Blocks;
use MaterialDesign\Theme\Block\Override;

/**
 * Add hooks and filters.
 */
function setup() {
	add_action( 'init', __NAMESPACE__ . '\\register_disable_section_meta' );
	add_action( 'admin_init', __NAMESPACE__ . '\\force_enqueue_block_editor_assets' );
	add_action( 'enqueue_block_editor_assets', __NAMESPACE__ . '\\enqueue_block_editor_assets' );
	if ( ! is_material_in_fse_mode() ) {
		add_action( 'body_class', __NAMESPACE__ . '\\filter_body_class' );
	}

	$blocks = new Blocks();
	$blocks->init();

	$overrides_block = new Override();
}

/**
 * Force enqueue block editor assets for FSE.
 *
 * @return void
 */
function force_enqueue_block_editor_assets() {
	global $pagenow;
	if ( $pagenow !== 'site-editor.php' ) {
		return;
	}
	// Force registration of block editor assets early so .

	do_action( 'enqueue_block_editor_assets' );
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
	$asset_file    = get_stylesheet_directory() . '/assets/js/block-editor.asset.php';
	$asset         = is_readable( $asset_file ) ? require $asset_file : [];
	$version       = isset( $asset['version'] ) ? $asset['version'] : wp_get_theme()->get( 'Version' );
	$dependencies  = isset( $asset['dependencies'] ) ? $asset['dependencies'] : [];
	$theme_version = wp_get_theme()->get( 'Version' );

	wp_enqueue_script(
		'material-block-editor-js-theme',
		get_stylesheet_directory_uri() . '/assets/js/block-editor.js',
		$dependencies,
		$version,
		false
	);

	wp_localize_script(
		'material-block-editor-js-theme',
		'materialDesignThemeEditorVars',
		[
			'isFse' => is_material_in_fse_mode(),
		]
	);

	if ( ! wp_style_is( 'material-google-fonts', 'enqueued' ) ) {
		// Ideally this should be injected by the plugin if not fallback to default fonts.
		wp_enqueue_style(
			'material-google-fonts',
			esc_url( '//fonts.googleapis.com/css?family=Roboto|Material+Icons' ),
			[],
			$theme_version
		);
	}

	wp_enqueue_style(
		'material-block-editor-css-theme',
		get_stylesheet_directory_uri() . '/assets/css/block-editor-compiled.css',
		[ 'material-google-fonts-cdn' ],
		$version,
		false
	);

	wp_add_inline_style( 'material-google-fonts', \MaterialDesign\Theme\Customizer\get_css_vars() );
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
 * Is theme in FSE mode.
 *
 * @return boolean
 */
function is_material_in_fse_mode() {
	static $material_is_in_fse_mode;
	if ( isset( $material_is_in_fse_mode ) ) {
		return $material_is_in_fse_mode;
	}

	$material_is_in_fse_mode = 'in' === get_theme_mod( 'fse_opt_option', 'out' );

	return $material_is_in_fse_mode;
}
