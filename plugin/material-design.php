<?php
/**
 * Plugin Name: Material Design
 * Plugin URI: https://github.com/material-components/material-design-for-wordpress
 * Description: The official Material Design plugin for WordPress. Customize your site’s navigation, colors, typography, and shapes, use Material Components, and choose from over 1,000 Google Fonts and Material Design icons. From the team behind Google’s open-source design system.
 * Version: 0.5.1
 * Requires at least: 5.6
 * Requires PHP:      5.6.20+
 * Author:  Material Design
 * Author URI: http://material.io
 * License: Apache License, Version 2.0
 * License URI: https://www.apache.org/licenses/LICENSE-2.0
 * Text Domain: material-design
 *
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

if ( version_compare( phpversion(), '5.6.20', '>=' ) ) {

	// Gutenberg v8.6.0 was bundled with WP 5.6, which is the earliest required.
	$gb_supported = defined( 'GUTENBERG_VERSION' ) && version_compare( GUTENBERG_VERSION, '8.6.0', '>=' );
	$wp_supported = version_compare( get_bloginfo( 'version' ), '5.6', '>=' );

	if ( ! $gb_supported && ! $wp_supported ) {
		_material_design_error( '_material_design_gutenberg_text_only', '_material_design_gutenberg_error' );
	} else {
		require_once __DIR__ . '/instance.php';

		register_activation_hook(
			__FILE__,
			'_material_design_activation'
		);

		/**
		 * Setup Material Design plugin.
		 *
		 * @codeCoverageIgnore
		 *
		 * @return void
		 */
		function _material_design_load_plugin() {
			$material_design_plugin = \MaterialDesign\Plugin\get_plugin_instance();
			$material_design_plugin->init();
		}

		add_action( 'plugins_loaded', '_material_design_load_plugin' );
	}
} else {
	_material_design_error( '_material_design_php_version_text', '_material_design_php_version_error' );
}

/**
 * Display errors.
 *
 * @param string $text_function The callback function to be used for text error.
 * @param string $html_function The callback function to be used for HTML error.
 *
 * @return void
 */
function _material_design_error( $text_function, $html_function ) {
	// @codeCoverageIgnoreStart
	if ( defined( 'WP_CLI' ) ) {
		WP_CLI::warning( call_user_func( $text_function ) );
	} else {
		add_action( 'admin_notices', $html_function );
	}
	// @codeCoverageIgnoreEnd
}

/**
 * Admin notice for incompatible versions of PHP.
 */
function _material_design_php_version_error() {
	printf( '<div class="error"><p>%s</p></div>', esc_html( _material_design_php_version_text() ) );
}

/**
 * String describing the minimum PHP version.
 *
 * @return string
 */
function _material_design_php_version_text() {
	return esc_html__( 'Material Design plugin error: Your version of PHP is too old to run this plugin. You must be running PHP 5.6.20 or higher.', 'material-design' );
}

/**
 * Admin notice if Gutenberg is not available.
 */
function _material_design_gutenberg_error() {
	printf( '<div class="error"><p>%s</p></div>', wp_kses_post( _material_design_gutenberg_text() ) );
}

/**
 * String describing the Gutenberg error.
 *
 * @return string
 */
function _material_design_gutenberg_text() {
	$update = sprintf(
		'<a href="%1$s">%2$s</a>',
		esc_url( admin_url( 'update-core.php' ) ),
		esc_html__( 'update your site', 'material-design' )
	);

	$install = sprintf(
		'<a href="%1$s">%2$s</a>',
		esc_url( admin_url( 'plugin-install.php?tab=plugin-information&plugin=gutenberg' ) ),
		esc_html__( 'Gutenberg WordPress Plugin', 'material-design' )
	);

	return wp_kses_post(
		sprintf(
			'Material Design plugin is not available since your version of the Block Editor is too old. You will need to %s to WordPress 5.2 or later or install the %s.',
			$update,
			$install
		),
		'material-design'
	);
}

/**
 * Get Gutenberg error with all HTMl stripped.
 *
 * @return string
 */
function _material_design_gutenberg_text_only() {
	return esc_html( wp_strip_all_tags( _material_design_gutenberg_text() ) );
}

/**
 * Function to fire after plugin is activated.
 *
 * @return void
 */
function _material_design_activation() {
	update_option( 'material_plugin_activated', true, false );
	set_transient( '_material_activation_redirect', 1, 30 );
}
