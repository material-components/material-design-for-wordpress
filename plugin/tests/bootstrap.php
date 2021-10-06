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
 * Bootstrap PHPUnit related dependencies.
 *
 * @package MaterialDesign
 */

global $_plugin_files;
$_plugin_files = [];

$_plugin_root = realpath( __DIR__ . '/..' );

if ( ! file_exists( "$_plugin_root/material-design.php" ) ) {
	$_plugin_root .= './plugin';
}

$_tests_dir = getenv( 'WP_TESTS_DIR' );

// Github Actions, Travis CI & Vagrant SSH tests directory.
if ( empty( $_tests_dir ) ) {
	$_tests_dir = '/tmp/wordpress-tests';
}

// Composer tests directory.
if ( ! is_dir( $_tests_dir . '/includes/' ) ) {
	$_tests_dir = $_plugin_root . '/vendor/xwp/wordpress-tests/phpunit';
}

if ( ! file_exists( $_tests_dir . '/includes/' ) ) {
	trigger_error( 'Unable to locate wordpress-tests', E_USER_ERROR ); // phpcs:ignore WordPress.PHP.DevelopmentFunctions.error_log_trigger_error
}

// Load polyfill which is required by latest WP and some material tests which uses latest phpunit functions.
$_yoast_polyfill_path_material = __DIR__ . '/../vendor/yoast/phpunit-polyfills/phpunitpolyfills-autoload.php';

if ( ! class_exists( 'Yoast\PHPUnitPolyfills\Autoload' ) ) {
	// Load file based on docker where vendor is mapped inside plugin folder.
	if ( ! file_exists( $_yoast_polyfill_path_material ) ) {
		$_yoast_polyfill_path_material = __DIR__ . '/../../vendor/yoast/phpunit-polyfills/phpunitpolyfills-autoload.php';
	}
	if ( file_exists( $_yoast_polyfill_path_material ) ) {
		require_once $_yoast_polyfill_path_material;
	}
}

require_once $_tests_dir . '/includes/functions.php';

// Build the plugins directory search array.
$_plugins_array = glob( realpath( __DIR__ . '/../..' ) . '/*' );

// Build the plugin files array.
foreach ( $_plugins_array as $_plugin_candidate ) {
	if ( is_dir( $_plugin_candidate ) && 'akismet' !== basename( $_plugin_candidate ) ) {
		foreach ( glob( $_plugin_candidate . '/*.php' ) as $_plugin_file_candidate ) {
			if ( basename( $_plugin_file_candidate ) !== 'material-design.php' && basename( $_plugin_candidate ) !== basename( $_plugin_file_candidate, '.php' ) ) {
				continue;
			}
			// @codingStandardsIgnoreStart
			$_plugin_file_src = file_get_contents( $_plugin_file_candidate );
			// @codingStandardsIgnoreEnd
			if ( preg_match( '/Plugin\s*Name\s*:/', $_plugin_file_src ) ) {
				$_plugin_files[] = $_plugin_file_candidate;
				break;
			}
		}
	}
}

if ( empty( $_plugin_files ) ) {
	trigger_error( 'Unable to locate any files containing a plugin metadata block.', E_USER_ERROR ); // phpcs:ignore WordPress.PHP.DevelopmentFunctions.error_log_trigger_error
}

unset( $_plugin_candidate, $_plugin_file_candidate, $_plugin_file_src );

/**
 * Loads the plugins for testing.
 */
function unit_test_load_plugin_file() {
	global $_plugin_files;

	// Load the plugins.
	foreach ( $_plugin_files as $file ) {
		require_once "$file";
	}
	unset( $_plugin_files );
}
tests_add_filter( 'muplugins_loaded', 'unit_test_load_plugin_file' );

// Run Integration Tests.
require_once $_tests_dir . '/includes/bootstrap.php';
