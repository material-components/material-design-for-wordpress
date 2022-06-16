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
 * Material Design Customizer Colors section.
 *
 * @package MaterialDesign
 */

namespace MaterialDesign\Theme\Customizer\Colors;

use MaterialDesign\Theme\Customizer;
use function MaterialDesign\Theme\BlockEditor\is_material_in_fse_mode;

const SECTION = 'colors';

/**
 * Attach hooks.
 *
 * @return void
 */
function setup() {
	add_action( 'customize_register', __NAMESPACE__ . '\register' );
	add_action( 'customize_save_after', __NAMESPACE__ . '\after_save' );
}

/**
 * Add and initialize colors section
 *
 * @param WP_Customize_Manager $wp_customize Theme Customizer object.
 */
function register( $wp_customize ) {
	if ( ! material_is_plugin_active() ) {
		// Add color palettes section.
		$args = [
			'priority' => 50,
			'title'    => esc_html__( 'Color Palettes', 'material-design-google' ),
		];

		Customizer\add_section( $wp_customize, 'colors', $args );
	}

	add_settings( $wp_customize );
}

/**
 * Create settings based on controls
 *
 * @param WP_Customize_Manager $wp_customize Theme Customizer object.
 * @return void
 */
function add_settings( $wp_customize ) {
	$settings = [];

	foreach ( get_controls() as $control ) {
		$settings[ $control['id'] ] = [
			'transport'         => 'postMessage',
			'sanitize_callback' => 'sanitize_hex_color',
		];
	}

	foreach ( get_dark_controls() as $control ) {
		$settings[ $control['id'] ] = [
			'transport'         => 'postMessage',
			'sanitize_callback' => 'sanitize_hex_color',
		];
	}

	Customizer\add_settings( $wp_customize, $settings );

	if ( material_is_plugin_active() ) {
		Customizer\add_color_controls(
			$wp_customize,
			array_merge(
				get_controls(),
				get_dark_controls()
			),
			SECTION
		);
	} else {
		Customizer\add_color_controls( $wp_customize, get_controls(), SECTION );
	}
}

/**
 * Define color controls to use
 *
 * @return array
 */
function get_controls() {
	$controls = [];

	if ( ! material_is_plugin_active() ) {
		$controls = [
			[
				'id'         => 'primary_color',
				'label'      => esc_html__( 'Primary Color', 'material-design-google' ),
				'css_var'    => '--mdc-theme-primary',
				'a11y_label' => __( 'Primary', 'material-design-google' ),
				'theme_json' => 'primary',
				'order'      => 1,
			],
			[
				'id'         => 'secondary_color',
				'label'      => esc_html__( 'Secondary Color', 'material-design-google' ),
				'css_var'    => '--mdc-theme-secondary',
				'a11y_label' => __( 'Secondary', 'material-design-google' ),
				'default'    => '#018786',
				'theme_json' => 'secondary',
				'order'      => 3,
			],
			[
				'id'         => 'on_primary_color',
				'label'      => esc_html__( 'On Primary Color (text and icons)', 'material-design-google' ),
				'css_var'    => '--mdc-theme-on-primary',
				'a11y_label' => __( 'On Primary', 'material-design-google' ),
				'theme_json' => 'on-primary',
				'order'      => 2,
			],
			[
				'id'         => 'on_secondary_color',
				'label'      => esc_html__( 'On Secondary Color (text and icons)', 'material-design-google' ),
				'css_var'    => '--mdc-theme-on-secondary',
				'a11y_label' => __( 'On Secondary', 'material-design-google' ),
				'theme_json' => 'on_secondary',
				'order'      => 4,
			],
			[
				'id'         => 'surface_color',
				'label'      => esc_html__( 'Surface Color', 'material-design-google' ),
				'css_var'    => '--mdc-theme-surface',
				'a11y_label' => __( 'Surface', 'material-design-google' ),
				'theme_json' => 'surface',
				'order'      => 5,
			],
			[
				'id'         => 'on_surface_color',
				'label'      => esc_html__( 'On Surface Color (text and icons)', 'material-design-google' ),
				'css_var'    => '--mdc-theme-on-surface',
				'a11y_label' => __( 'On Surface', 'material-design-google' ),
				'theme_json' => 'on_surface',
				'order'      => 6,
			],
		];
	}

	return array_merge(
		$controls,
		[
			[
				// Using the `custom_` prefix to prevent conflicts with the default WordPress
				// `background_color` setting.
				'id'                   => 'custom_background_color',
				'label'                => esc_html__( 'Background Color', 'material-design-google' ),
				'css_var'              => '--mdc-theme-background',
				'a11y_label'           => __( 'Background', 'material-design-google' ),
				'related_text_setting' => 'on_background_color',
				'theme_json'           => 'background',
				'order'                => 7,
			],
			[
				'id'              => 'on_background_color',
				'label'           => esc_html__( 'On Background Color (text and icons)', 'material-design-google' ),
				'css_var'         => '--mdc-theme-on-background',
				'a11y_label'      => __( 'On Background', 'material-design-google' ),
				'related_setting' => 'custom_background_color',
				'theme_json'      => 'on-background',
				'order'           => 8,
			],
			[
				'id'                   => 'header_color',
				'label'                => esc_html__( 'Top app bar Color', 'material-design-google' ),
				'css_var'              => '--mdc-theme-header',
				'a11y_label'           => __( 'On Top app bar', 'material-design-google' ),
				'related_text_setting' => 'on_header_color',
				'theme_json'           => 'on-top-app-bar',
				'order'                => 9,
			],
			[
				'id'              => 'on_header_color',
				'label'           => esc_html__( 'On Top app bar Color (text and icons)', 'material-design-google' ),
				'css_var'         => '--mdc-theme-on-header',
				'a11y_label'      => __( 'Top app bar', 'material-design-google' ),
				'related_setting' => 'header_color',
				'theme_json'      => 'top-app-bar',
				'order'           => 10,
			],
			[
				'id'                   => 'footer_color',
				'label'                => esc_html__( 'Footer Color', 'material-design-google' ),
				'css_var'              => '--mdc-theme-footer',
				'a11y_label'           => __( 'On Footer', 'material-design-google' ),
				'related_text_setting' => 'on_footer_color',
				'theme_json'           => 'footer',
				'order'                => 11,
			],
			[
				'id'              => 'on_footer_color',
				'label'           => esc_html__( 'On Footer Color (text and icons)', 'material-design-google' ),
				'css_var'         => '--mdc-theme-on-footer',
				'a11y_label'      => __( 'Footer', 'material-design-google' ),
				'related_setting' => 'footer_color',
				'theme_json'      => 'on-footer',
				'order'           => 12,
			],
		]
	);
}

/**
 * Dark mode controls
 *
 * @return array
 */
function get_dark_controls() {
	$controls = [
		[
			// Using the `custom_` prefix to prevent conflicts with the default WordPress
			// `background_color` setting.
			'id'                   => 'custom_background_color_dark',
			'label'                => esc_html__( 'Background Color', 'material-design-google' ),
			'css_var'              => '--mdc-theme-background',
			'a11y_label'           => __( 'Background', 'material-design-google' ),
			'related_text_setting' => 'on_background_color_dark',
			'color_mode_type'      => 'dark',
			'theme_json'           => 'background',
		],
		[
			'id'              => 'on_background_color_dark',
			'label'           => esc_html__( 'On Background Color (text and icons)', 'material-design-google' ),
			'css_var'         => '--mdc-theme-on-background',
			'a11y_label'      => __( 'On Background', 'material-design-google' ),
			'related_setting' => 'custom_background_color_dark',
			'color_mode_type' => 'dark',
			'theme_json'      => 'on-background',
		],
		[
			'id'                   => 'header_color_dark',
			'label'                => esc_html__( 'Top app bar Color', 'material-design-google' ),
			'css_var'              => '--mdc-theme-header',
			'a11y_label'           => __( 'On Top app bar', 'material-design-google' ),
			'related_text_setting' => 'on_header_color_dark',
			'color_mode_type'      => 'dark',
			'theme_json'           => 'on-top-app-bar',
		],
		[
			'id'              => 'on_header_color_dark',
			'label'           => esc_html__( 'On Top app bar Color (text and icons)', 'material-design-google' ),
			'css_var'         => '--mdc-theme-on-header',
			'a11y_label'      => __( 'Top app bar', 'material-design-google' ),
			'related_setting' => 'header_color_dark',
			'color_mode_type' => 'dark',
			'theme_json'      => 'top-app-bar',
		],
		[
			'id'                   => 'footer_color_dark',
			'label'                => esc_html__( 'Footer Color', 'material-design-google' ),
			'css_var'              => '--mdc-theme-footer',
			'a11y_label'           => __( 'On Footer', 'material-design-google' ),
			'related_text_setting' => 'on_footer_color_dark',
			'color_mode_type'      => 'dark',
			'theme_json'           => 'on-footer',
		],
		[
			'id'              => 'on_footer_color_dark',
			'label'           => esc_html__( 'On Footer Color (text and icons)', 'material-design-google' ),
			'css_var'         => '--mdc-theme-on-footer',
			'a11y_label'      => __( 'Footer', 'material-design-google' ),
			'related_setting' => 'footer_color_dark',
			'color_mode_type' => 'dark',
			'theme_json'      => 'on-footer',
		],
	];

	return $controls;
}

/**
 * Handle updating theme.json color palette.
 *
 * @param \WP_Customize_Manager $wp_customize WP_Customize instance.
 */
function after_save( $wp_customize ) {
	if ( ! is_material_in_fse_mode() ) {
		return;
	}
	$user_color_palette = get_user_color_palette( $wp_customize );

	// Get the user's theme.json from the CPT.
	$user_custom_post_type_id     = \WP_Theme_JSON_Resolver::get_user_global_styles_post_id();
	$user_theme_json_post         = get_post( $user_custom_post_type_id );
	$user_theme_json_post_content = json_decode( $user_theme_json_post->post_content );

	// Set meta settings.
	$user_theme_json_post_content->version                     = 2;
	$user_theme_json_post_content->isGlobalStylesUserThemeJSON = true; // phpcs:ignore WordPress.NamingConventions.ValidVariableName.UsedPropertyNotSnakeCase

	// Only reset the palette if the setting exists, otherwise the whole settings array gets destroyed.
	if ( property_exists( $user_theme_json_post_content, 'settings' ) && property_exists( $user_theme_json_post_content->settings, 'color' ) && property_exists( $user_theme_json_post_content->settings->color, 'palette' ) ) {
		// Start with reset palette settings.
		unset( $user_theme_json_post_content->settings->color->palette );
	}

	// Set the color palette if it is !== the default.
	if ( ! check_if_colors_are_default( $user_color_palette ) ) {
		$user_theme_json_post_content = set_settings_array(
			$user_theme_json_post_content,
			[ 'settings', 'color', 'palette' ],
			$user_color_palette
		);
	}

	// Update the theme.json with the new settings.
	$user_theme_json_post->post_content = wp_json_encode( $user_theme_json_post_content );
	wp_update_post( $user_theme_json_post );
	clear_wp_global_user_style_cache();
	delete_transient( 'global_styles' );
	delete_transient( 'global_styles_' . get_stylesheet() );
	delete_transient( 'gutenberg_global_styles' );
	delete_transient( 'gutenberg_global_styles_' . get_stylesheet() );
}

/**
 * Clear cache for global style.
 *
 * @see \WP_Theme_JSON_Resolver::get_user_data_from_custom_post_type()
 */
function clear_wp_global_user_style_cache() {
	$args      = [
		'numberposts' => 1,
		'orderby'     => 'date',
		'order'       => 'desc',
		'post_type'   => 'wp_global_styles',
		'post_status' => [ 'publish' ],
		'tax_query'   => [ // phpcs:ignore WordPress.DB.SlowDBQuery.slow_db_query_tax_query
			[
				'taxonomy' => 'wp_theme',
				'field'    => 'name',
				'terms'    => wp_get_theme()->get_stylesheet(),
			],
		],
	];
	$cache_key = sprintf( 'wp_global_styles_%s', md5( serialize( $args ) ) ); // phpcs:ignore WordPress.PHP.DiscouragedPHPFunctions.serialize_serialize
	wp_cache_delete( $cache_key );
}

/**
 * Get all color controls merged with theme and plugin.
 *
 * @return array|void
 */
function get_all_color_controls() {
	$additional_controls = apply_filters( 'material_design_theme_colors_additional_controls', [] );

	$merge_controls = array_merge( get_controls(), $additional_controls );
	$orders         = array_column( $merge_controls, 'order' );

	array_multisort( $orders, SORT_ASC, $merge_controls );

	return $merge_controls;
}

/**
 * Get user color palette.
 *
 * @param \WP_Customize_Manager $wp_customize WP_Customize instance.
 *
 * @return array
 */
function get_user_color_palette( $wp_customize ) {
	$pallets            = build_user_color_palette();
	$user_color_palette = [];
	$controls           = get_all_color_controls();

	foreach ( $controls as $control ) {
		$key = array_search( $control['theme_json'], array_column( $pallets, 'slug' ) );
		if ( false === $key ) {
			continue;
		}
		$setting = $wp_customize->get_setting( isset( $control['slug'] ) ? $control['slug'] : $control['id'] );
		$value   = $pallets[ $key ];
		if ( $setting && null !== $setting->post_value() ) {
			$value['color'] = $setting->post_value();
		}
		// Todo: Maybe handle order.
		$user_color_palette[] = $value;
	}
	return $user_color_palette;
}

/**
 * Build the user color palette.
 *
 * @return array|mixed
 */
function build_user_color_palette() {
	// Get the merged theme.json.
	$theme_json = \WP_Theme_JSON_Resolver::get_merged_data()->get_raw_data();

	$combined_color_palette = $theme_json['settings']['color']['palette']['theme'];
	$user_color_palette     = null;
	if ( isset( $theme_json['settings']['color']['palette']['custom'] ) ) {
		$user_color_palette = $theme_json['settings']['color']['palette']['custom'];
	} elseif ( isset( $theme_json['settings']['color']['palette']['user'] ) ) {
		// NOTE: This should be removed once Gutenberg 12.1 lands stably in all environments.
		$user_color_palette = $theme_json['settings']['color']['palette']['user'];
		// End Gutenberg < 12.1 compatibility patch.
	}

	// Combine theme settings with user settings.
	foreach ( $combined_color_palette as $key => $palette_item ) {
		// make theme color value the default.
		$combined_color_palette[ $key ]['default'] = $palette_item['color'];
		// use user color value if there is one.
		$user_color_value = get_user_color_value( $palette_item['slug'], $user_color_palette );
		if ( isset( $user_color_value ) ) {
			$combined_color_palette[ $key ]['color'] = $user_color_value;
		}
	}

	return $combined_color_palette;
}

/**
 * Get the user color value.
 *
 * @param string $slug    Slug.
 * @param array  $palette Color array.
 *
 * @return mixed|null
 */
function get_user_color_value( $slug, $palette ) {
	if ( ! isset( $palette ) ) {
		return null;
	}
	foreach ( $palette as $palette_item ) {
		if ( $palette_item['slug'] === $slug ) {
			return $palette_item['color'];
		}
	}

	return null;
}

/**
 * Check if color are default or added newly.
 *
 * @param array $user_color_palette User color palette.
 *
 * @return bool
 */
function check_if_colors_are_default( $user_color_palette ) {
	foreach ( $user_color_palette as $palette_color ) {
		if ( strtoupper( $palette_color['color'] ) !== strtoupper( $palette_color['default'] ) ) {
			return false;
		}
	}
	return true;
}

/**
 * Assign a value to an object at the given location.
 * Create the nested objects if they aren't already available.
 *
 * @param object $target The object to assign the value to.
 * @param array  $array  The array describing the location of the property to update.
 * @param object $value  The value to assign.
 *
 * @return  object          The modified $target object with $value assigned where $array describes
 */
function set_settings_array( $target, $array, $value ) {
	$key     = array_shift( $array );
	$current = & $target;
	while ( 0 < count( $array ) ) { // phpcs:ignore Squiz.PHP.DisallowSizeFunctionsInLoops.Found
		if ( ! property_exists( $current, $key ) ) {
			$current->{$key} = (object) [];
		}
		$current = & $current->{ $key };

		// Cast to an object in the case where it's been set as an array.
		$current = (object) $current;

		$key = array_shift( $array );
	}
	$current->{ $key } = $value;
	return $target;
}
