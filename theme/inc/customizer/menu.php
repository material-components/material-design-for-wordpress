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
 * Material Design Customizer Menu options.
 *
 * @package MaterialDesign
 */

namespace MaterialDesign\Theme\Customizer\Menu;

use MaterialDesign\Theme\Customizer;

/**
 * Attach hooks
 */
function setup() {
	add_action( 'customize_register', __NAMESPACE__ . '\add_tabs_description', 12 );
	add_action( 'admin_notices', __NAMESPACE__ . '\add_admin_notice' );
}

/**
 * Attach a new description to an existing control
 *
 * @param  WP_Customize_Manager $wp_customize Theme Custopmizer object.
 * @return void
 */
function add_tabs_description( $wp_customize ) {
	$tabs_control = $wp_customize->get_control( 'nav_menu_locations[menu-1]' );

	if ( ! $tabs_control ) {
		return;
	}

	$tabs_control->description = esc_html__( 'Only the top level items will display.', 'material-design-google' );
}

/**
 * Add drawer menu notice in menu admin panel
 *
 * @return void
 */
function add_admin_notice() {
	$screen = get_current_screen();

	if ( ! $screen || 'nav-menus' !== $screen->id ) {
		return;
	}

	printf(
		'<div class="notice notice-info is-dismissible"><p><strong>%1$s</strong> %2$s</p></div>',
		esc_html__( 'Tabs Menu:', 'material-design-google' ),
		esc_html__( 'Only the top level items will display.', 'material-design-google' )
	);
}
