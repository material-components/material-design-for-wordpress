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
 * Material Design Customizer
 *
 * @package MaterialDesign
 */

namespace MaterialDesign\Theme\Customizer;

use MaterialDesign\Theme\Customizer\Colors;
use MaterialDesign\Theme\Customizer\More_Options;
use function MaterialDesign\Plugin\get_plugin_instance;

/**
 * Attach hooks.
 *
 * @return void
 */
function setup() {
	add_action( 'customize_register', __NAMESPACE__ . '\register' );
	add_action( 'customize_preview_init', __NAMESPACE__ . '\preview_scripts' );

	add_action( 'customize_controls_enqueue_scripts', __NAMESPACE__ . '\scripts' );

	add_action( 'admin_head', __NAMESPACE__ . '\print_css_vars', 2 );
}

/**
 * Add postMessage support for site title and description for the Theme Customizer.
 *
 * @param WP_Customize_Manager $wp_customize Theme Customizer object.
 */
function register( $wp_customize ) {
	if ( ! material_is_plugin_active() ) {
		$wp_customize->add_panel(
			get_slug(),
			[
				'priority'    => 10,
				'capability'  => 'edit_theme_options',
				'title'       => esc_html__( 'Material Design Options', 'material-design-google' ),
				'description' => esc_html__( 'Change the color, shape, typography, and icons below to customize your theme style. Navigate to the Material Library to see your custom styles applied across Material Components.', 'material-design-google' ),
			]
		);
	}

	$wp_customize->get_setting( 'blogname' )->transport         = 'postMessage';
	$wp_customize->get_setting( 'blogdescription' )->transport  = 'postMessage';
	$wp_customize->get_setting( 'header_textcolor' )->transport = 'postMessage';

	if ( isset( $wp_customize->selective_refresh ) ) {
		$wp_customize->selective_refresh->add_partial(
			'blogname',
			array(
				'selector'        => '.site-title a',
				'render_callback' => __NAMESPACE__ . '\get_blogname',
			)
		);
		$wp_customize->selective_refresh->add_partial(
			'blogdescription',
			array(
				'selector'        => '.site-description',
				'render_callback' => __NAMESPACE__ . '\get_description',
			)
		);
	}
}

/**
 * Define settings prefix.
 *
 * @return string Settings prefix.
 */
function get_slug() {
	return 'material_design';
}

/**
 * Render the site title for the selective refresh partial.
 *
 * @return void
 */
function get_blogname() {
	bloginfo( 'name' );
}

/**
 * Render the site tagline for the selective refresh partial.
 *
 * @return void
 */
function get_description() {
	bloginfo( 'description' );
}

/**
 * Binds JS handlers to make Theme Customizer preview reload changes asynchronously.
 *
 * @return void
 */
function preview_scripts() {
	$theme_version = wp_get_theme()->get( 'Version' );
	$suffix        = defined( 'SCRIPT_DEBUG' ) && SCRIPT_DEBUG ? '' : '.min';

	wp_enqueue_script(
		'material-design-google-customizer-preview',
		get_template_directory_uri() . "/assets/js/customize-preview{$suffix}.js",
		[ 'customize-selective-refresh' ],
		$theme_version,
		true
	);

	$css_vars      = [];
	$css_vars_dark = [];

	foreach ( Colors\get_controls() as $control ) {
		$css_vars[ $control['id'] ] = $control['css_var'];
	}

	foreach ( Colors\get_dark_controls() as $control ) {
		$css_vars_dark[ $control['id'] ] = $control['css_var'];
	}

	wp_localize_script(
		'material-design-google-customizer-preview',
		'materialDesignThemeColorControls',
		$css_vars
	);

	wp_localize_script(
		'material-design-google-customizer-preview',
		'materialDesignThemeColorControlsDark',
		$css_vars_dark
	);
}

/**
 * Enqueue control scripts.
 *
 * @return void
 */
function scripts() {
	$theme_version = wp_get_theme()->get( 'Version' );
	$suffix        = defined( 'SCRIPT_DEBUG' ) && SCRIPT_DEBUG ? '' : '.min';

	wp_enqueue_style(
		'material-design-google-customizer-styles',
		get_template_directory_uri() . "/assets/css/customize-controls-compiled{$suffix}.css",
		[ 'wp-color-picker' ],
		$theme_version
	);
	wp_style_add_data( 'material-design-google-customizer-styles', 'rtl', 'replace' );

	wp_enqueue_script(
		'material-design-google-customizer-controls',
		get_template_directory_uri() . "/assets/js/customize-controls{$suffix}.js",
		[ 'wp-color-picker', 'wp-i18n', 'customize-controls' ],
		$theme_version,
		true
	);

	$color_controls = [];

	foreach ( Colors\get_controls() as $control ) {
		$color_controls[] = $control['id'];
	}

	wp_localize_script(
		'material-design-google-customizer-controls',
		'materialDesignThemeColorControls',
		$color_controls
	);
}

/**
 * Register sections.
 *
 * @param WP_Customize_Manager $wp_customize Theme Customizer object.
 * @param String               $id ID of the section.
 * @param Array                $args Section args to add.
 */
function add_section( $wp_customize, $id, $args ) {
	$id   = prepend_slug( $id );
	$slug = get_slug();
	$args = array_merge(
		[
			'capability' => 'edit_theme_options',
			'panel'      => $slug,
			'type'       => 'collapse',
		],
		$args
	);

	/**
	 * Filters the customizer section args.
	 *
	 * This allows other plugins/themes to change the customizer section args.
	 *
	 * @param array  $args Array of section args.
	 * @param string $id   ID of the section.
	 */
	$section = apply_filters( $slug . '_customizer_section_args', $args, $id );

	if ( is_array( $section ) ) {
		$wp_customize->add_section(
			$id,
			$section
		);
	} elseif ( $section instanceof \WP_Customize_Section ) {
		$section->id = $id;
		$wp_customize->add_section( $section );
	}
}

/**
 * Register setting in customizer.
 *
 * @param  mixed $wp_customize Theme Customizer object.
 * @param  mixed $settings     Settings to register in customizer.
 * @return void
 */
function add_settings( $wp_customize, $settings = [] ) {
	$slug = get_slug();

	// TRT automation doesn't recognize the default sanitization callback below.
	$func = sprintf( '%s_%s', 'add', 'setting' );

	foreach ( $settings as $id => $setting ) {
		if ( is_array( $setting ) ) {
			$defaults = [
				'capability'        => 'edit_theme_options',
				'sanitize_callback' => 'sanitize_text_field',
				'transport'         => 'postMessage',
				'default'           => get_default( $id ),
			];

			$setting = array_merge( $defaults, $setting );
		}

		/**
		 * Filters the customizer setting args.
		 *
		 * This allows other plugins/themes to change the customizer setting args.
		 *
		 * @param array   $setting Array of setting args.
		 * @param string  $id      ID of the setting.
		 */
		$setting = apply_filters( $slug . '_customizer_setting_args', $setting, $id );

		if ( is_array( $setting ) ) {
			$wp_customize->$func(
				$id,
				$setting
			);
		} elseif ( $setting instanceof \WP_Customize_Setting ) {
			$setting->id = $id;
			$wp_customize->$func( $setting );
		}
	}
}

/**
 * Prepend the slug name if it does not exist.
 *
 * @param  string $name The name of the setting/control.
 * @return string
 */
function prepend_slug( $name ) {
	$slug = get_slug();

	return ( false === strpos( $name, "{$slug}_" ) && false === strpos( $name, 'nav_menu_locations' ) )
		? "{$slug}_{$name}" : $name;
}

/**
 * Get default value for a setting.
 *
 * @param  string $setting Name of the setting.
 * @return mixed
 */
function get_default( $setting ) {
	$slug     = get_slug();
	$setting  = str_replace( "{$slug}_", '', $setting );
	$defaults = get_default_values();

	return isset( $defaults[ $setting ] ) ? $defaults[ $setting ] : '';
}

/**
 * Set default values.
 *
 * @return array
 */
function get_default_values() {
	$defaults = [
		'primary_color'                => '#6200ee',
		'on_primary_color'             => '#ffffff',
		'secondary_color'              => '#018786',
		'on_secondary_color'           => '#000000',
		'surface_color'                => '#ffffff',
		'on_surface_color'             => '#000000',
		'custom_background_color'      => '#ffffff',
		'custom_background_color_dark' => '#121212',
		'on_background_color'          => '#000000',
		'on_background_color_dark'     => '#ffffff',
		'header_color'                 => '',
		'on_header_color'              => '',
		'footer_color'                 => '#ffffff',
		'on_footer_color'              => '#000000',
		'archive_layout'               => 'card',
		'archive_width'                => 'normal',
		'archive_comments'             => true,
		'archive_author'               => true,
		'archive_excerpt'              => true,
		'archive_date'                 => true,
		'archive_outlined'             => false,
		'comment_fields_style'         => 'outlined',
		'header_search_display'        => true,
		'header_title_display'         => false,
		'header_bar_layout'            => 'standard',
		'footer_text'                  => '',
		'hide_back_to_top'             => false,

	];

	return $defaults;
}

/**
 * Add controls to customizer.
 *
 * @param  WP_Customize $wp_customize WP_Customize instance.
 * @param  array        $controls Array of controls to add to customizer.
 * @return void
 */
function add_controls( $wp_customize, $controls = [] ) {
	$slug = get_slug();

	foreach ( $controls as $id => $control ) {
		/**
		 * Filters the customizer control args.
		 *
		 * This allows other plugins/themes to change the customizer controls args.
		 *
		 * @param array  $control Array of control args.
		 * @param string $id      ID of the control.
		 */
		$control = apply_filters( $slug . '_customizer_control_args', $control, $id );

		if ( is_array( $control ) ) {
			if ( 'color' === $control['type'] ) {
				$wp_customize->add_control(
					new \WP_Customize_Color_Control(
						$wp_customize,
						$id,
						$control
					)
				);
			} else {
				$wp_customize->add_control(
					$id,
					$control
				);
			}
		} elseif ( $control instanceof \WP_Customize_Control ) {
			$control->id      = $id;
			$control->section = isset( $control->section ) ? $control->section : '';
			$wp_customize->add_control( $control );
		}
	}
}

/**
 * Add color controls to customizer.
 * Use `Material_Color_Palette_Control` if the material plugin is active.
 *
 * @param  WP_Customize $wp_customize   WP_Customize instance.
 * @param  array        $color_controls Array of controls to add to customizer.
 * @param  string       $section Section to add the controls to.
 * @return void
 */
function add_color_controls( $wp_customize, $color_controls, $section ) {
	/**
	 * Generate list of all the controls in the colors section.
	 */
	$controls = [];

	/**
	 * Controls to nest in the more options section.
	 */
	$more_controls = [
		'default' => [],
		'dark'    => [],
	];

	$section = prepend_slug( $section );

	foreach ( $color_controls as $control ) {
		if ( material_is_plugin_active() ) {
			$controls[ $control['id'] ] = new \MaterialDesign\Plugin\Customizer\Material_Color_Palette_Control(
				$wp_customize,
				$control['id'],
				[
					'label'                => $control['label'],
					'section'              => $section,
					'related_text_setting' => ! empty( $control['related_text_setting'] ) ? $control['related_text_setting'] : false,
					'related_setting'      => ! empty( $control['related_setting'] ) ? $control['related_setting'] : false,
					'css_var'              => $control['css_var'],
					'a11y_label'           => ! empty( $control['a11y_label'] ) ? $control['a11y_label'] : '',
					'priority'             => 200,
					'color_mode_type'      => ! empty( $control['color_mode_type'] ) ? $control['color_mode_type'] : 'default',
				]
			);
		} else {
			$controls[ $control['id'] ] = [
				'label'   => $control['label'],
				'section' => $section,
				'type'    => 'color',
			];
		}

		// Group header and footer colors into more options.
		if (
			(
				false !== strpos( $control['id'], 'header_color' ) ||
				false !== strpos( $control['id'], 'footer_color' )
			) &&
			! strpos( $control['id'], '_dark' )
		) {
			$more_controls['default'][] = $control['id'];
		}

		if (
			(
				false !== strpos( $control['id'], 'header_color' ) ||
				false !== strpos( $control['id'], 'footer_color' )
			) &&
			strpos( $control['id'], '_dark' )
		) {
			$more_controls['dark'][] = $control['id'];
		}
	}

	$wp_customize->add_setting(
		'colors_more_options',
		[
			'sanitize_callback' => 'wp_kses_post',
		]
	);

	$wp_customize->add_setting(
		'colors_more_options_dark',
		[
			'sanitize_callback' => 'wp_kses_post',
		]
	);

	$controls['colors_more_options'] = new More_Options(
		$wp_customize,
		'colors_more_options',
		[
			'section'       => $section,
			'priority'      => 300,
			'controls'      => $more_controls['default'],
			'controls_type' => 'default',
		]
	);

	$controls['colors_more_options_dark'] = new More_Options(
		$wp_customize,
		'colors_more_options_dark',
		[
			'section'       => $section,
			'priority'      => 300,
			'controls'      => $more_controls['dark'],
			'controls_type' => 'dark',
		]
	);

	add_controls( $wp_customize, $controls );
}

/**
 * Get custom frontend CSS vars based on the customizer theme settings.
 */
function get_css_vars() {
	$css             = '';
	$color_vars      = [];
	$color_vars_dark = [];
	$defaults        = get_default_values();
	$controls        = Colors\get_controls();
	$controls_dark   = Colors\get_dark_controls();

	foreach ( $controls as $control ) {
		$default = isset( $defaults[ $control['id'] ] ) ? $defaults[ $control['id'] ] : '';
		$value   = get_theme_mod( $control['id'], $default );

		if ( empty( $value ) ) {
			continue;
		}

		$color_vars[] = sprintf( '%s: %s;', esc_html( $control['css_var'] ), esc_html( $value ) );
		$rgb          = hex_to_rgb( $value );

		if ( ! empty( $rgb ) ) {
			$rgb          = implode( ',', $rgb );
			$color_vars[] = sprintf( '%s: %s;', esc_html( $control['css_var'] . '-rgb' ), esc_html( $rgb ) );
		}
	}

	foreach ( $controls_dark as $control ) {
		$default = isset( $defaults[ $control['id'] ] ) ? $defaults[ $control['id'] ] : '';
		$value   = get_theme_mod( $control['id'], $default );

		if ( empty( $value ) ) {
			continue;
		}

		$color_vars_dark[] = sprintf( '%s: %s;', esc_html( $control['css_var'] ), esc_html( $value ) );
		$rgb               = hex_to_rgb( $value );

		if ( ! empty( $rgb ) ) {
			$rgb               = implode( ',', $rgb );
			$color_vars_dark[] = sprintf( '%s: %s;', esc_html( $control['css_var'] . '-rgb' ), esc_html( $rgb ) );
		}
	}

	// Generate additional surface variant vars required by some components.
	$surface    = get_theme_mod( 'surface_color' );
	$on_surface = get_theme_mod( 'on_surface_color' );

	if ( ! material_is_plugin_active() && ! empty( $surface ) && ! empty( $on_surface ) ) {
		$mix_4        = mix_colors( $on_surface, $surface, 0.04 );
		$color_vars[] = esc_html( "--mdc-theme-surface-mix-4: $mix_4;" );

		$mix_12       = mix_colors( $on_surface, $surface, 0.12 );
		$color_vars[] = esc_html( "--mdc-theme-surface-mix-12: $mix_12;" );
	}

	$glue            = "\n\t\t\t";
	$color_vars      = implode( $glue, $color_vars );
	$color_vars_dark = implode( $glue, $color_vars_dark );

	$css = "
		:root {
			{$color_vars}
		}

		/* Forced dark mode */
		body[data-color-scheme='dark'] {
			{$color_vars_dark}
		}

		/* Forced light mode */
		body[data-color-scheme='light'] {
			{$color_vars}
		}
	";

	if ( material_is_plugin_active() && get_dark_mode_status() !== 'inactive' ) {
		$css .= "
			@media (prefers-color-scheme: dark) {
				:root {
					{$color_vars_dark}
				}
			}
		";
	}

	return $css;
}

/**
 * Get dark mode status.
 *
 * @return string
 */
function get_dark_mode_status() {
	$plugin = get_plugin_instance();
	if ( property_exists( $plugin, 'customizer_controls' ) && method_exists( $plugin->customizer_controls, 'get_dark_mode_status' ) ) {
		return $plugin->customizer_controls->get_dark_mode_status();
	}

	return 'inactive';
}

/**
 * Print css variables at the top of the head.
 */
function print_css_vars() {
	?>
	<style id="material-design-google-css-variables">
		<?php echo get_css_vars(); // phpcs:disable WordPress.Security.EscapeOutput.OutputNotEscaped ?>
	</style>
	<?php
}

/**
 * Convert color hex code to rgb.
 *
 * @param  string|array $hex Hex/RGB of the color.
 * @return mixed
 */
function hex_to_rgb( $hex ) {
	if ( is_array( $hex ) && ! empty( $hex ) ) {
		return $hex;
	}

	$hex = strtolower( ltrim( $hex, '#' ) );
	if ( 3 !== strlen( $hex ) && 6 !== strlen( $hex ) ) {
		return false;
	}

	$values = str_split( $hex, ( 3 === strlen( $hex ) ) ? 1 : 2 );

	return array_map(
		__NAMESPACE__ . '\hexdec',
		$values
	);
}

/**
 * Mix 2 colors with a weight.
 *
 * @see https://sass-lang.com/documentation/modules/color#mix
 *
 * @param mixed $color1 Color hex/RGB array.
 * @param mixed $color2 Color hex/RGB array.
 * @param float $weight Weight to use for mixing.
 * @return string
 */
function mix_colors( $color1, $color2, $weight = 0.5 ) {
	$weight = min( $weight, 1 );
	$weight = $weight * 2 - 1;
	$alpha  = 0;

	$w1 = ( ( $weight * -1 === $alpha ? $weight : ( $weight + $alpha ) / ( 1 + $weight * $alpha ) ) + 1 ) / 2.0;
	$w2 = 1.0 - $w1;

	$color1 = hex_to_rgb( $color1 );
	$color2 = hex_to_rgb( $color2 );

	$mixed = [
		round( $w1 * $color1[0] + $w2 * $color2[0] ),
		round( $w1 * $color1[1] + $w2 * $color2[1] ),
		round( $w1 * $color1[2] + $w2 * $color2[2] ),
	];

	return '#' . implode( '', array_map( __NAMESPACE__ . '\dechex', $mixed ) );
}

/**
 * Convert color dec to hex.
 *
 * @param  int $decimal Number.
 * @return string
 */
function dechex( $decimal ) {
	return str_pad( \dechex( $decimal ), 2, '0', STR_PAD_LEFT );
}

/**
 * Convert color hex to dec.
 *
 * @param  string $hex_code Color hex code.
 * @return int
 */
function hexdec( $hex_code ) {
	return \hexdec( str_pad( $hex_code, 2, $hex_code ) );
}

/**
 * Get Material Design plugin option by name.
 *
 * @param  string $name name of the option.
 * @return mixed
 */
function get_material_design_option( $name ) {
	$value = false;
	if ( material_is_plugin_active() ) {
		$value = \MaterialDesign\Plugin\get_plugin_instance()->customizer_controls->get_option( $name );
	}

	return apply_filters( 'get_material_design_option', $value, $name );
}


/**
 * Checkbox sanitization callback.
 *
 * Sanitization callback for 'checkbox' type controls. This callback sanitizes `$checked`
 * as a boolean value, either TRUE or FALSE.
 *
 * @param bool $checked Whether the checkbox is checked.
 * @return bool Whether the checkbox is checked.
 */
function sanitize_checkbox( $checked ) {
	// Boolean check.
	return ( ( isset( $checked ) && true === (bool) $checked ) ? true : false );
}

/**
 * Select sanitization callback.
 *
 * - Sanitization: select
 * - Control: select, radio
 *
 * Sanitization callback for 'select' and 'radio' type controls. This callback sanitizes `$input`
 * as a slug, and then validates `$input` against the choices defined for the control.
 *
 * @see sanitize_key()               https://developer.wordpress.org/reference/functions/sanitize_key/
 * @see $wp_customize->get_control() https://developer.wordpress.org/reference/classes/wp_customize_manager/get_control/
 *
 * @param string               $input   Slug to sanitize.
 * @param WP_Customize_Setting $setting Setting instance.
 * @return string Sanitized slug if it is a valid choice; otherwise, the setting default.
 */
function sanitize_select( $input, $setting ) {
	// Ensure input is a slug.
	$input = sanitize_key( $input );

	// Get list of choices from the control associated with the setting.
	$choices = $setting->manager->get_control( $setting->id )->choices;

	// If the input is a valid key, return it; otherwise, return the default.
	return ( array_key_exists( $input, $choices ) ? $input : $setting->default );
}

/**
 * Get sanitize callback based on setting type.
 *
 * @param  string $setting_type Type of the setting.
 * @return string
 */
function get_sanitize_callback( $setting_type ) {
	switch ( $setting_type ) {
		case 'radio':
		case 'select':
			return __NAMESPACE__ . '\sanitize_select';

		case 'checkbox':
			return __NAMESPACE__ . '\sanitize_checkbox';

		case 'color':
			return 'sanitize_hex_color';

		default:
			return 'sanitize_text_field';
	}
}
