<?php
/**
 * Copyright 2022 Google LLC
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
 * Material Design Customizer fse opt in section.
 *
 * @package MaterialDesign
 */

namespace MaterialDesign\Theme\Customizer\OptIn;

use MaterialDesign\Theme\Customizer;
use function MaterialDesign\Theme\BlockEditor\is_material_in_fse_mode;

/**
 * Attach hooks for FSE.
 */
function setup() {
	// Only handle this in 5.9 or later.
	if ( version_compare( get_bloginfo( 'version' ), '5.9', '<=' ) ) {
		return;
	}

	add_action( 'customize_register', __NAMESPACE__ . '\\register' );

	if ( is_admin() && ! get_theme_mod( 'fse_opt_option', '' ) ) {
		$notice_option = get_option( 'material_design_google', [] );
		if ( ! isset( $notice_option['fse_opt_notice'] ) ) {
			// Show notice to opt in.
			add_action( 'admin_notices', __NAMESPACE__ . '\\admin_notice' );
			add_action( 'wp_ajax_material_fse_notice', __NAMESPACE__ . '\\admin_dismiss_notice' );
			add_action( 'admin_enqueue_scripts', __NAMESPACE__ . '\\admin_enqueue_scripts' );
		}
	}

	handle_fse_opt_out();
}

/**
 * Handle fse opt out for.
 *
 * @return void
 */
function handle_fse_opt_out() {
	global $wp_customize;
	// Customizer preview happens at wp_loaded hook which is too late as template is selected on init.
	// See \WP_Customize_Manager::wp_loaded().
	// Verify customize preview nonce.
	$is_preview    = ( $wp_customize instanceof \WP_Customize_Manager ) && $wp_customize->is_preview();
	$preview_nonce = $is_preview && isset( $_POST['nonce'] ) && wp_verify_nonce( $_POST['nonce'], 'preview-customize_' . get_stylesheet() ); // phpcs:ignore WordPress.Security.ValidatedSanitizedInput.InputNotSanitized
	// This allows us to check and load appropriate theme mods.
	$request = $preview_nonce ? json_decode( wp_unslash( isset( $_POST['customized'] ) ? $_POST['customized'] : '' ), true ) : []; // phpcs:ignore WordPress.Security.ValidatedSanitizedInput.InputNotSanitized
	if ( ( ! is_material_in_fse_mode() && ! $preview_nonce ) || ( isset( $request['fse_opt_option'] ) && 'out' === $request['fse_opt_option'] ) ) {
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
 * Register settings and controls.
 *
 * @param \WP_Customize_Manager $wp_customize WP_Customize instance.
 *
 * @return void
 */
function register( $wp_customize ) {
	// Add layout section.
	$args = [
		'priority' => 650,
		'title'    => esc_html__( 'Opt in/out for full site editing', 'material-design-google' ),
	];

	Customizer\add_section( $wp_customize, 'fse_opt', $args );

	add_settings( $wp_customize );
}

/**
 * Create settings based on controls
 *
 * @param \WP_Customize_Manager $wp_customize Theme Customizer object.
 *
 * @return void
 */
function add_settings( $wp_customize ) {
	$settings = [];
	$controls = [];

	foreach ( get_controls() as $control ) {
		$settings[ $control['id'] ] = [
			'transport'         => 'refresh',
			'sanitize_callback' => 'MaterialDesign\\Theme\\Customizer\\sanitize_select',
			'default'           => $control['default'],
		];

		$controls[ $control['id'] ] = array_merge(
			[
				'section' => Customizer\prepend_slug( 'fse_opt' ),
			],
			$control
		);

	}

	Customizer\add_settings( $wp_customize, $settings );
	Customizer\add_controls( $wp_customize, $controls );
}

/**
 * Define core controls to use
 *
 * @return array
 */
function get_controls() {
	return [
		[
			'id'          => 'fse_opt_option',
			'label'       => esc_html__( 'Enable Full Site editing', 'material-design-google' ),
			'description' => sprintf( '<p class="description">%s</p>', esc_html__( 'Full site editing is currently in beta. If you wish to enable the full site editing version of the theme, please test it out on a test environment before considering going live.', 'material-design-google' ) ),
			'type'        => 'radio',
			'default'     => 'out',
			'choices'     => [
				'in'  => esc_html__( 'Opt in', 'material-design-google' ),
				'out' => esc_html__( 'Opt out', 'material-design-google' ),
			],
		],
	];
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
	$customizer_url = admin_url( 'customize.php?autofocus[panel]=' . Customizer\get_slug() );
	$customizer_url = add_query_arg( 'autofocus[section]', Customizer\prepend_slug( 'fse_opt' ), $customizer_url );

	printf(
		'<div id="material-theme-opt-in" class="notice notice-warning is-dismissible" style="transition:opacity 1s; opacity: 1;"><p>%s</p>',
		esc_html__( 'Google Material Theme full site editing support is available. Please note this WordPress feature is currently in beta. If you wish to enable the full site editing version of the theme, please test it out on a test environment before going live.', 'material-design-google' )
	);

	printf( '<p class="hidden">%s</p>', esc_html__( 'You can enable this feature from customizer.', 'material-design-google' ) );

	wp_nonce_field( 'fse_opt_notice', 'fse_opt_nonce' );

	echo '<div class="button-group" style="padding-bottom: 5px;">';
	printf( '<a href="%s"><button class="button button-primary" style="margin-right: 15px;">%s</button></a> ', esc_url( $customizer_url ), esc_html__( 'Enable in customizer', 'material-design-google' ) );
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
							const buttonSecondary = this.classList.contains( "button-secondary" );
							if ( buttonSecondary ) {
								const p = document.querySelectorAll( "p" );
								for ( let i = 0; i < p.length; i ++ ) {
									p[i].classList.toggle( "hidden" );
								}
							}
							const link = this.href;
							wp.ajax.post( "material_fse_notice", {
								_wpnonce: notice.querySelector( "input#fse_opt_nonce" ).value
							} ).done( function( response ) {
								if ( isAnchor ) {
									location.href = link;
								}
								if ( buttonSecondary ) {
									setTimeout( function() {
										notice.style.opacity = 0;
										setTimeout( function() {
											notice.remove();
										}, 1000 );
									}, 3000 );
								} else {
									notice.remove();
								}
							} );
						};
						const targets = notice.querySelectorAll( ".button-secondary, a" );
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
