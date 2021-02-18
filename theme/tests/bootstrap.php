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

global $_theme_files;
$_theme_files = [];

$_theme_root = realpath( __DIR__ . '/..' );
$_theme_name = basename( $_theme_root );

$_tests_dir = getenv( 'WP_TESTS_DIR' );

global $wp_tests_options;
$wp_tests_options = [
	'template'      => $_theme_name,
	'stylesheet'    => $_theme_name,
	'current_theme' => $_theme_name,
];

// Travis CI & Vagrant SSH tests directory.
if ( empty( $_tests_dir ) ) {
	$_tests_dir = '/tmp/wordpress-tests';
}

// Composer tests directory.
if ( ! is_dir( $_tests_dir . '/includes/' ) ) {
	$_tests_dir = $_theme_root . '/vendor/xwp/wordpress-tests/phpunit';
}

if ( ! file_exists( $_tests_dir . '/includes/' ) ) {
	trigger_error( 'Unable to locate wordpress-tests', E_USER_ERROR ); // phpcs:ignore WordPress.PHP.DevelopmentFunctions.error_log_trigger_error
}

require_once $_tests_dir . '/includes/functions.php';

// Run Integration Tests.
require_once $_tests_dir . '/includes/bootstrap.php';
