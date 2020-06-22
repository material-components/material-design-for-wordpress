<?php
/**
 * Plugin Name: Material Design for WordPress
 * Plugin URI: https://github.com/xwp/material-theme-builder-wp
 * Description: Build beautiful sites, faster. Material Design is a design system – backed by open-source code – that helps teams build high-quality digital experiences. This plugin lets you use Material Components and custom styles in your WordPress site.
 * Version: 1.0.0-alpha
 * Author:  Material Design
 * Author URI: http://material.io
 * License: GPLv2+
 * License URI: http://www.gnu.org/licenses/gpl-2.0.txt
 * Text Domain: material-theme-builder
 * Domain Path: /languages
 *
 * Copyright (c) 2020 XWP (https://xwp.co/)
 *
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License, version 2 or, at
 * your discretion, any later version, as published by the Free
 * Software Foundation.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program; if not, write to the Free Software
 * Foundation, Inc., 51 Franklin St, Fifth Floor, Boston, MA 02110-1301 USA
 *
 * @package MaterialThemeBuilder
 */

if ( version_compare( phpversion(), '5.6.20', '>=' ) && function_exists( 'register_block_type' ) ) {
	require_once __DIR__ . '/instance.php';
	register_activation_hook(
		__FILE__,
		'_material_theme_builder_activation'
	);
} elseif ( ! function_exists( 'register_block_type' ) ) {
	_material_theme_builder_error( '_material_theme_builder_gutenberg_text_only', '_material_theme_builder_gutenberg_error' );
} else {
	_material_theme_builder_error( '_material_theme_builder_php_version_text', '_material_theme_builder_php_version_error' );
}

/**
 * Display errors.
 *
 * @param string $text_function The callback function to be used for text error.
 * @param string $html_function The callback function to be used for HTML error.
 *
 * @return void
 */
function _material_theme_builder_error( $text_function, $html_function ) {
	if ( defined( 'WP_CLI' ) ) {
		WP_CLI::warning( call_user_func( $text_function ) );
	} else {
		add_action( 'admin_notices', $html_function );
	}
}

/**
 * Admin notice for incompatible versions of PHP.
 */
function _material_theme_builder_php_version_error() {
	printf( '<div class="error"><p>%s</p></div>', esc_html( _material_theme_builder_php_version_text() ) );
}

/**
 * String describing the minimum PHP version.
 *
 * @return string
 */
function _material_theme_builder_php_version_text() {
	return esc_html__( 'Material Theme Builder plugin error: Your version of PHP is too old to run this plugin. You must be running PHP 5.6.20 or higher.', 'material-theme-builder' );
}

/**
 * Admin notice if Gutenberg is not available.
 */
function _material_theme_builder_gutenberg_error() {
	printf( '<div class="error"><p>%s</p></div>', wp_kses_post( _material_theme_builder_gutenberg_text() ) );
}

/**
 * String describing the Gutenberg error.
 *
 * @return string
 */
function _material_theme_builder_gutenberg_text() {
	$update = sprintf(
		'<a href="%1$s">%2$s</a>',
		esc_url( admin_url( 'update-core.php' ) ),
		esc_html__( 'update your site', 'material-theme-builder' )
	);

	$install = sprintf(
		'<a href="%1$s">%2$s</a>',
		esc_url( admin_url( 'plugin-install.php?tab=plugin-information&plugin=gutenberg' ) ),
		esc_html__( 'Gutenberg WordPress Plugin', 'material-theme-builder' )
	);

	return wp_kses_post(
		sprintf(
			'Oops, we ran into an issue with installing the Material Builder Plugin. You will need to %s to WordPress 5.0 or later or install the %s.',
			$update,
			$install
		),
		'material-theme-builder'
	);
}

/**
 * Get Gutenberg error with all HTMl stripped.
 *
 * @return string
 */
function _material_theme_builder_gutenberg_text_only() {
	return esc_html( wp_strip_all_tags( _material_theme_builder_gutenberg_text() ) );
}

/**
 * Function to fire after plugin is activated.
 *
 * @return void
 */
function _material_theme_builder_activation() {
	set_transient( 'mtb-activation-notice', true, 5 );
}
