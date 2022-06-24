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

use function MaterialDesign\Theme\BlockEditor\is_material_in_fse_mode;

/**
 * Setup opt in.
 *
 * @return void
 */
function setup() {
	// Only handle this in 5.9 or later.
	if ( version_compare( get_bloginfo( 'version' ), '5.9', '<=' ) ) {
		return;
	}

	$controller = new Fse_Opt_In_Rest_Controller();
	$controller->init();

	// Admin notice for opt in.
	if ( is_admin() && ! get_theme_mod( 'fse_opt_option', '' ) ) {
		$notice_option = get_option( 'material_design_google', [] );
		if ( ! isset( $notice_option['fse_opt_notice'] ) ) {
			// Show notice to opt in.
			add_action( 'admin_notices', __NAMESPACE__ . '\\admin_notice' );
			add_action( 'wp_ajax_material_fse_notice', __NAMESPACE__ . '\\admin_dismiss_notice' );
			add_action( 'admin_enqueue_scripts', __NAMESPACE__ . '\\admin_enqueue_scripts' );
		}
	}

	// Register theme page if plugin is not active; Add variables.
	add_action( 'admin_enqueue_scripts', __NAMESPACE__ . '\\admin_enqueue_scripts_material_setting' );
	add_action( 'admin_menu', __NAMESPACE__ . '\\add_pages' );

	handle_fse_opt_out();
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
				'restUrl'  => get_rest_url( null, '/material-design-theme/v1/fse/toggle-fse-opt-in' ),
				'restPath' => '/material-design-theme/v1/fse/toggle-fse-opt-in',
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


/**
 * Handle fse opt out for.
 *
 * @return void
 */
function handle_fse_opt_out() {
	if ( ! is_material_in_fse_mode() ) {
		// Removes fse menu entry and other features.
		remove_theme_support( 'block-templates' );
		// Disable the FSE template route.
		$template_types = array_keys( get_default_block_template_types() );
		foreach ( $template_types as $template_type ) {
			// Skip 'embed' for now because it is not a regular template type.
			if ( 'embed' === $template_type ) {
				continue;
			}
			add_filter( str_replace( '-', '', $template_type ) . '_template', __NAMESPACE__ . '\\determine_template', 10, 3 );
		}
		add_filter( 'theme_file_path', __NAMESPACE__ . '\\filter_disable_fse', 10, 2 );
	}
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
	if ( is_material_in_fse_mode() ) {
		return $path;
	}

	return str_replace( 'index.html', 'index-disabled.html', $path );
}

/**
 * Determine template for non FSE theme.
 *
 * This will allow fallback to default php template if user has not opted in for FSE template.
 *
 * @param string   $_template Path to the template. See locate_template().
 * @param string   $_type     Sanitized filename without extension.
 * @param string[] $templates A list of template candidates, in descending order of priority.
 *
 * @return string
 */
function determine_template( $_template, $_type, $templates ) {
	return locate_template( $templates );
}

/**
 * Add admin notice to opt in or out.
 *
 * @return void
 */
function admin_notice() {
	$material_page_url = admin_url( 'admin.php?page=material-settings-page' );

	printf(
		'<div id="material-theme-opt-in" class="notice notice-info is-dismissible" style="transition:opacity 1s; opacity: 1;"><p>%s <a href="https://developer.wordpress.org/block-editor/getting-started/full-site-editing/">%s</a></p>',
		esc_html__( 'Google Material Theme full site editing support is available. Please note this WordPress feature is currently in beta and testing on a separate environment is advised before enabling it in production.', 'material-design-google' ),
		esc_html__( 'Read more.', 'material-design-google' )
	);

	wp_nonce_field( 'fse_opt_notice', 'fse_opt_nonce' );

	echo '<div class="button-group" style="padding-bottom: 5px;">';
	printf( '<a class="fse-opt-in-link-primary" href="%s"><button class="button button-primary" style="margin-right: 7px;">%s</button></a> ', esc_url( $material_page_url ), esc_html__( 'Enable', 'material-design-google' ) );
	printf( '<button class="button button-secondary">%s</button>', esc_html__( 'Maybe later', 'material-design-google' ) );
	echo '</div>';
	?>
	<script type="text/javascript">
		( function() {
				let callback = function() {
					const notice = document.querySelector( "#material-theme-opt-in" );
					const material_click_callback = function( e ) {
						e.preventDefault();
						const isAnchor = this.tagName === "A";
						const link = this.href;
						wp.ajax.post( "material_fse_notice", {
							_wpnonce: notice.querySelector( "input#fse_opt_nonce" ).value
						} ).done( function( response ) {
							if ( isAnchor ) {
								location.href = link;
							}
							notice.remove();
						} );
					};
					const targets = notice.querySelectorAll( ".button-secondary, .fse-opt-in-link-primary" );
					for ( let i = 0; i < targets.length; i ++ ) {
						targets[i].addEventListener( "click", material_click_callback );
					}
				};
				document.addEventListener( "DOMContentLoaded", () => setTimeout( callback, 1 ) );
			}
		)();
	</script>

	<?php

	echo '</div>';
}

/**
 * Save dismiss notice for opt in.
 *
 * @return void
 */
function admin_dismiss_notice() {
	if ( ! isset( $_POST['_wpnonce'] ) || ! wp_verify_nonce( $_POST['_wpnonce'], 'fse_opt_notice' ) ) { // phpcs:ignore WordPress.Security.ValidatedSanitizedInput.InputNotSanitized
		return;
	}

	$value = get_option( 'material_design_google', [] );

	$value['fse_opt_notice'] = true;

	update_option( 'material_design_google', $value );

	wp_send_json_success();
}

/**
 * Admin enqueue scripts dependency.
 *
 * @return void
 */
function admin_enqueue_scripts() {
	wp_enqueue_script( 'wp-util' );
}
