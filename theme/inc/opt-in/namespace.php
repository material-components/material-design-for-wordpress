<?php
/**
 *  Copyright 2022 Google LLC
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *        http://www.apache.org/licenses/LICENSE-2.0
 *
 *   Unless required by applicable law or agreed to in writing, software
 *   distributed under the License is distributed on an "AS IS" BASIS,
 *   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 *
 * @package MaterialDesign
 */

/**
 * Setup opt in.
 */

namespace MaterialDesign\Theme\OptIn;

/**
 * Setup opt in.
 *
 * @return void
 */
function setup() {
	$controller = new Fse_Opt_In_Rest_Controller();
	$controller->init();

	add_action( 'admin_enqueue_scripts', __NAMESPACE__ . '\\admin_enqueue_scripts_material_setting' );
	add_action( 'admin_menu', __NAMESPACE__ . '\\add_pages' );
}

/**
 * Admin enqueue variable for material setting.
 *
 * @return void
 */
function admin_enqueue_scripts_material_setting() {
	$screen           = get_current_screen();
	$is_plugin_active = material_is_plugin_active();


	if ( $screen && in_array( $screen->id, [ 'toplevel_page_material-settings-page', 'material_page_material-settings-page' ], true ) ) {
		if ( ! $is_plugin_active ) {
			$is_debug        = ( defined( '\WP_DEBUG' ) && \WP_DEBUG );
			$is_script_debug = ( defined( '\SCRIPT_DEBUG' ) && \SCRIPT_DEBUG );
			$version         = $is_debug && $is_script_debug ? time() : wp_get_theme()->get( 'Version' );
			// Get Roboto Mono and icons.
			wp_enqueue_style(
				'material-admin-google-fonts',
				'//fonts.googleapis.com/css2?family=Roboto+Mono&family=Material+Icons',
				[],
				$version
			);

			wp_enqueue_style(
				'material-settings',
				get_template_directory_uri() . '/assets/css/settings-compiled.css',
				[ 'material-admin-google-fonts' ],
				$version
			);

			wp_enqueue_script(
				'material-settings',
				get_template_directory_uri() . '/assets/js/settings.js',
				[ 'wp-element', 'wp-i18n', 'wp-api-fetch', 'wp-date', 'wp-components' ],
				$version,
				true
			);

		}

		wp_localize_script(
			'material-settings',
			'materialDesignWizardTheme',
			[
				'restPath' => get_rest_url( null, '/material-design-theme/v1/fse/toggle-fse-opt-in' ),
				'nonce'    => wp_create_nonce( 'wp_rest' ),
				'isOptIn'  => get_theme_mod( 'fse_opt_option', 'out' ) === 'in',
			]
		);
	}
}

/**
 * Add Page.
 *
 * @return void
 */
function add_pages() {

	if ( material_is_plugin_active() ) {
		return;
	}

	add_menu_page(
		esc_html__( 'Material Design for WordPress', 'material-design-google' ),
		esc_html__( 'Material', 'material-design-google' ),
		'manage_options',
		'material-settings-page',
		__NAMESPACE__ . '\\render_settings_page',
		'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyMiAyMiI+PHBhdGggZD0iTTExIDBDNC45IDAgMCA0LjkgMCAxMXM0LjkgMTEgMTEgMTEgMTEtNC45IDExLTExUzE3LjEgMCAxMSAwek00IDE2LjZjLTEuMi0xLjUtMi0zLjUtMi01LjZzLjgtNC4xIDItNS42djExLjJ6bTcgMy40Yy0yLjEgMC00LjEtLjgtNS42LTJoMTEuM2MtMS42IDEuMi0zLjYgMi01LjcgMnptMC02LjVMNy4yIDZoNy41TDExIDEzLjV6TTE2IDh2OGgtNGw0LTh6bS02IDhINlY4bDQgOHpNNS40IDRDNi45IDIuOCA4LjkgMiAxMSAyczQuMS44IDUuNiAySDUuNHpNMTggMTYuNlY1LjRjMS4yIDEuNSAyIDMuNSAyIDUuNnMtLjggNC4xLTIgNS42eiIgZmlsbD0iI2FhYSIvPjwvc3ZnPg=='
	);
}

/**
 * Render settings page.
 *
 * @return void
 */
function render_settings_page() {
	?>
	<div id="material-settings" class="material-settings mdc-layout-grid mdc-typography"></div>
	<?php
}
