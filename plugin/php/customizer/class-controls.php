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
 * Class Controls.
 *
 * @package MaterialDesign
 */

namespace MaterialDesign\Plugin\Customizer;

use MaterialDesign\Plugin\Admin;
use MaterialDesign\Plugin\Module_Base;
use MaterialDesign\Plugin\Google_Fonts;
use MaterialDesign\Plugin\Blocks_Frontend;
use MaterialDesign\Plugin\Helpers;

/**
 * Class Controls.
 */
class Controls extends Module_Base {
	/**
	 * Constant for dark mode settings.
	 *
	 * @var string
	 */
	public $dark_mode_suffix = '_dark';

	/**
	 * Constant for high contrast mode settings.
	 *
	 * @var string
	 */
	public $contrast_mode_suffix = '_contrast';

	/**
	 * The slug used as a prefix for all settings and controls.
	 *
	 * @var string
	 */
	public $slug = 'material_design';

	/**
	 * WP_Customize_Manager object reference.
	 *
	 * @var \WP_Customize_Manager
	 */
	public $wp_customize;

	/**
	 * List of added controls.
	 *
	 * @var array
	 */
	public $added_controls = [];

	/**
	 * Initiate the class and hooks.
	 */
	public function init() {
		add_action( 'customize_register', [ $this, 'register' ] );
		add_action( 'customize_controls_enqueue_scripts', [ $this, 'scripts' ] );
		add_action( 'customize_preview_init', [ $this, 'preview_scripts' ], 100 );
		add_action( 'customize_controls_print_footer_scripts', [ $this, 'templates' ] );
		add_action( 'customize_sanitize_js_material_design_notify', [ $this, 'show_material_components_notification' ] );
		add_action( 'wp_ajax_material_design_notification_dismiss', [ $this, 'notification_dismiss' ] );

		add_filter( 'material_design_customizer_section_args', [ $this, 'filter_style_section' ], 10, 2 );
	}

	/**
	 * Register customizer options.
	 *
	 * @param \WP_Customize_Manager $wp_customize Theme Customizer object.
	 */
	public function register( $wp_customize ) {
		$this->wp_customize = $wp_customize;

		$this->wp_customize->register_section_type( Material_Styles_Section::class );

		$this->wp_customize->register_section_type( Material_Style_Settings_Section::class );

		$this->wp_customize->register_section_type( Material_Color_Palette_Section::class );

		// Register custom control types.
		$this->wp_customize->register_control_type( Material_Color_Palette_Control::class );

		// Add the panel.
		$this->add_panel();

		// Add all the customizer sections.
		$this->add_sections();

		// Add all controls in the "Theme" section.
		$this->add_theme_controls();

		// Add all controls in the "Colors" section.
		$this->add_color_controls();

		// Add all controls in the "Typography" section.
		$this->add_typography_controls();

		// Add all controls in the "Corner Styles" section.
		$this->add_corner_styles_controls();

		// Add all controls in the "Icon Styles" section.
		$this->add_icon_collection_controls();

		// Add global style control.
		$this->add_global_style_control();

		// Add learn control.
		$this->add_learn_control();
	}

	/**
	 * Add the base panel.
	 *
	 * @return void
	 */
	public function add_panel() {
		/**
		 * Add "Material Design Options" custom panel.
		 */
		$this->wp_customize->add_panel(
			$this->slug,
			[
				'priority'    => 10,
				'capability'  => 'edit_theme_options',
				'title'       => esc_html__( 'Material Design Options', 'material-design' ),
				'description' => esc_html__( 'Change the color, shape, typography, and icons below to customize your theme style. Navigate to the Material Blocks to see your custom styles applied across Material Components..', 'material-design' ),
			]
		);
	}

	/**
	 * Add all our customizer sections.
	 *
	 * @return void
	 */
	public function add_sections() {

		$learn_description  = '<p>';
		$learn_description .= __( 'Learn about the concepts behind material Design.', 'material-design' );
		$learn_description .= sprintf(
			' <a href="%1$s" class="external-link" target="_blank">%2$s<span class="screen-reader-text"> %3$s</span></a>',
			Admin::MATERIAL_URL,
			__( 'Vist material.io', 'material-design' ),
			/* translators: Accessibility text. */
			__( '(opens in a new tab)', 'material-design' )
		);
		$learn_description .= '</p>';

		$sections = [
			'style'           => __( 'Starter Styles', 'material-design' ),
			'style_settings'  => __( 'Style', 'material-design' ),
			'colors'          => __( 'Color Palette', 'material-design' ),
			'typography'      => __( 'Typography (Font Styles)', 'material-design' ),
			'corner_styles'   => __( 'Shape Size', 'material-design' ),
			'icons'           => __( 'Icon Styles', 'material-design' ),
			'dark_colors'     => __( 'Dark Color Palette', 'material-design' ),
			'contrast_colors' => __( 'High Contrast Color Palette', 'material-design' ),
			'global_style'    => [
				'label'    => __( 'Global Styles', 'material-design' ),
				'priority' => 300,
			],
			'learn'           => [
				'label'       => __( 'Learn More', 'material-design' ),
				'priority'    => 400,
				'description' => $learn_description,
			],
		];

		foreach ( $sections as $id => $maybe_label ) {
			$id = $this->prepend_slug( $id );

			$label = is_array( $maybe_label ) ? $maybe_label['label'] : $maybe_label;
			$args  = [
				'priority'   => 10,
				'capability' => 'edit_theme_options',
				'title'      => esc_html( $label ),
				'panel'      => $this->slug,
				'type'       => 'collapse',
			];
			$args  = is_array( $maybe_label ) ? array_merge( $args, $maybe_label ) : $args;

			/**
			 * Filters the customizer section args.
			 *
			 * This allows other plugins/themes to change the customizer section args.
			 *
			 * @param array $args Array of section args.
			 * @param string $id ID of the section.
			 */
			$section = apply_filters( $this->slug . '_customizer_section_args', $args, $id );

			if ( is_array( $section ) ) {
				$this->wp_customize->add_section(
					$id,
					$section
				);
			} elseif ( $section instanceof \WP_Customize_Section ) {
				$section->id = $id;
				$this->wp_customize->add_section( $section );
			}
		}
	}

	/**
	 * Sanitize serialized json.
	 *
	 * @param string $json_color_palette json string.
	 *
	 * @return false|string
	 */
	public function sanitize_color_palette_json( $json_color_palette ) {
		$color_palette   = json_decode( $json_color_palette, true );
		$sanitized_color = Helpers::sanitize_js_generated_colors( $color_palette );

		return wp_json_encode( $sanitized_color );
	}

	/**
	 * Add all controls in the "Theme" section.
	 *
	 * @return void
	 */
	public function add_theme_controls() {
		/**
		 * List of all the control settings in the Theme section.
		 */
		$settings = [
			'color_palette'  => [
				'default'           => [],
				'sanitize_callback' => [ $this, 'sanitize_color_palette_json' ],
			],
			/**
			 * This setting does not have an associated control
			 * it's used to display material components notification.
			 */
			'notify'         => [
				'default' => 0,
			],
			'style_settings' => [
				'default' => [
					'dark'     => 'auto',
					'contrast' => 'auto',
					'switcher' => false,
					'active'   => 'default',
				],
			],
		];

		$this->add_settings( $settings );

		$controls_settings = [
			'style_settings' => new Style_Settings_Control(
				$this->wp_customize,
				$this->prepare_option_name( 'style_settings' ),
				[
					'section'  => 'colors',
					'priority' => 200,
					'style'    => get_option( $this->prepare_option_name( 'style' ) ),
					'css_var'  => '--mdc-theme-setting',
				]
			),
		];

		$this->add_controls( $controls_settings );

		$active_mode_settings = [
			'active_mode' => [
				'default' => 'default',
			],
		];

		$this->add_settings( $active_mode_settings );
	}

	/**
	 * Add all controls in the "Colors" section.
	 *
	 * @return void
	 */
	public function add_color_controls() {
		/**
		 * Generate list of all the settings in the colors section.
		 */
		$settings = [];

		foreach ( $this->get_color_controls() as $control ) {
			$settings[ $control['id'] ] = [
				'sanitize_callback' => 'sanitize_hex_color',
			];

			$settings[ $control['id'] . $this->dark_mode_suffix ] = [
				'sanitize_callback' => 'sanitize_hex_color',
			];

			$settings[ $control['id'] . $this->contrast_mode_suffix ] = [
				'sanitize_callback' => 'sanitize_hex_color',
			];
		}

		$this->add_settings( $settings );

		/**
		 * Generate list of all the controls in the colors section.
		 */
		$controls           = [];
		$dark_mode_controls = [];
		$contrast_controls  = [];

		foreach ( $this->get_color_controls() as $control ) {
			$args = [
				'label'                => $control['label'],
				'section'              => 'colors',
				'priority'             => 10,
				'related_text_setting' => ! empty( $control['related_text_setting'] ) ?
					$control['related_text_setting'] : false,
				'related_setting'      => ! empty( $control['related_setting'] ) ? $control['related_setting'] :
					false,
				'css_var'              => $control['css_var'],
				'a11y_label'           => ! empty( $control['a11y_label'] ) ? $control['a11y_label'] : '',
			];

			$controls[ $control['id'] ] = new Material_Color_Palette_Control(
				$this->wp_customize,
				$this->prepare_option_name( $control['id'] ),
				$args
			);
		}

		$this->add_controls( $controls );
		$this->add_controls( $dark_mode_controls );
	}

	/**
	 * Add all controls in the "Typography" section.
	 *
	 * @return void
	 */
	public function add_typography_controls() {
		/**
		 * Generate list of all the settings in the Typography section.
		 */
		$settings            = [];
		$typography_controls = $this->get_typography_controls();
		$extra_controls      = call_user_func_array( 'array_merge', wp_list_pluck( $typography_controls, 'choices' ) );

		$all_controls = array_merge(
			$typography_controls,
			$extra_controls
		);

		foreach ( $all_controls as $control ) {
			$settings[ $control['id'] ] = [];
		}

		$this->add_settings( $settings );

		/**
		 * Generate list of all the controls in the Typography section.
		 */
		$controls = [];

		foreach ( $typography_controls as $control ) {
			$controls[ $control['id'] ] = new Google_Fonts_Control(
				$this->wp_customize,
				$this->prepare_option_name( $control['id'] ),
				[
					'section'  => 'typography',
					'priority' => 10,
					'label'    => $control['label'],
					'css_vars' => $control['css_vars'],
					'choices'  => ( ! empty( $control['choices'] ) ) ? $control['choices'] : [],
				]
			);

			foreach ( $control['choices'] as $choice ) {
				$controls[ $choice['id'] ] = new Google_Fonts_Control(
					$this->wp_customize,
					$this->prepare_option_name( $choice['id'] ),
					[
						'section'  => 'typography',
						'priority' => 10,
						'label'    => $choice['label'],
						'css_vars' => $choice['css_vars'],
						'choices'  => ( ! empty( $choice['choices'] ) ) ? $choice['choices'] : [],
					]
				);
			}
		}

		$this->add_controls( $controls );
	}

	/**
	 * Add all controls in the "Corner Styles" section.
	 *
	 * @return void
	 */
	public function add_corner_styles_controls() {
		/**
		 * Generate list of all the settings in the Corner Styles section.
		 */
		$settings = [];

		foreach ( $this->get_corner_styles_controls() as $control ) {
			$settings[ $control['id'] ] = [];
		}

		$this->add_settings( $settings );

		/**
		 * Generate list of all the controls in the Corner Styles section.
		 */
		$controls        = [];
		$corner_controls = $this->get_corner_styles_controls();

		$control = $corner_controls[0];

		$corner_controls = array_slice( $corner_controls, 1 );
		foreach ( $corner_controls as $i => $ctrl ) {
			$corner_controls[ $i ]['id'] = $this->prepare_option_name( $ctrl['id'] );
		}

		$controls[ $control['id'] ] = new Range_Slider_Control(
			$this->wp_customize,
			$this->prepare_option_name( $control['id'] ),
			[
				'section'       => 'corner_styles',
				'priority'      => 10,
				'label'         => isset( $control['label'] ) ? $control['label'] : '',
				'description'   => isset( $control['description'] ) ? $control['description'] : '',
				'min'           => isset( $control['min'] ) ? $control['min'] : 0,
				'max'           => isset( $control['max'] ) ? $control['max'] : 100,
				'initial_value' => isset( $control['initial_value'] ) ? $control['initial_value'] : 0,
				'css_var'       => isset( $control['css_var'] ) ? $control['css_var'] : '',
				'children'      => $corner_controls,
			]
		);

		$this->add_controls( $controls );
	}

	/**
	 * Add all controls in the "Icon Styles" section.
	 *
	 * @return void
	 */
	public function add_icon_collection_controls() {
		$settings = [
			'icon_collection' => [
				'default' => 'filled',
			],
		];

		$this->add_settings( $settings );

		/**
		 * List of all the controls in the Theme section.
		 */
		$controls = [
			'icon_collection' => new Icon_Radio_Control(
				$this->wp_customize,
				$this->prepare_option_name( 'icon_collection' ),
				[
					'section'  => 'icons',
					'priority' => 10,
					'choices'  => $this->get_icon_collection_controls(),
					'css_var'  => '--mdc-icons-font-family',
				]
			),
		];

		$this->add_controls( $controls );
	}

	/**
	 * Add settings to customizer.
	 *
	 * @param array $settings Array of settings to add to customizer.
	 *
	 * @return void
	 */
	public function add_settings( $settings = [] ) {
		foreach ( $settings as $id => $setting ) {
			$id = $this->prepare_option_name( $id );

			if ( is_array( $setting ) ) {
				$defaults = [
					'capability'        => 'edit_theme_options',
					'sanitize_callback' => 'sanitize_text_field',
					'transport'         => 'postMessage',
					'default'           => $this->get_default( $id ),
					'type'              => 'option',
				];

				$setting = array_merge( $defaults, $setting );
			}

			/**
			 * Filters the customizer setting args.
			 *
			 * This allows other plugins/themes to change the customizer setting args.
			 *
			 * @param array $setting Array of setting args.
			 * @param string $id ID of the setting.
			 */
			$setting = apply_filters( $this->slug . '_customizer_setting_args', $setting, $id );

			if ( is_array( $setting ) ) {
				$this->wp_customize->add_setting(
					$id,
					$setting
				);
			} elseif ( $setting instanceof \WP_Customize_Setting ) {
				$setting->id = $id;
				$this->wp_customize->add_setting( $setting );
			}
		}
	}

	/**
	 * Add controls to customizer.
	 *
	 * @param array $controls Array of controls to add to customizer.
	 *
	 * @return void
	 */
	public function add_controls( $controls = [] ) {
		foreach ( $controls as $id => $control ) {
			$id = $this->prepare_option_name( $id );

			/**
			 * Filters the customizer control args.
			 *
			 * This allows other plugins/themes to change the customizer controls args.
			 *
			 * @param array $control Array of control args.
			 * @param string $id ID of the control.
			 */
			$control = apply_filters( $this->slug . '_customizer_control_args', $control, $id );

			if ( is_array( $control ) ) {
				$control['section'] = isset( $control['section'] ) ? $this->prepend_slug( $control['section'] ) : '';
				$this->wp_customize->add_control(
					$id,
					$control
				);
				$this->added_controls[] = $id;
			} elseif ( $control instanceof \WP_Customize_Control ) {
				$control->id      = $id;
				$control->section = isset( $control->section ) ? $this->prepend_slug( $control->section ) : '';
				$this->wp_customize->add_control( $control );
				$this->added_controls[] = $id;
			}

			/**
			 * If the control is Range Slider and has childen, add them to the `added_controls` list
			 * so the JS events are attached.
			 */
			if ( ! empty( $control->children ) && is_array( $control->children ) && ( $control instanceof Range_Slider_Control ) ) {
				$this->added_controls = array_merge(
					$this->added_controls,
					array_map(
						function ( $child ) {
							return $child['id'];
						},
						$control->children
					)
				);
			}
		}
	}


	/**
	 * Get global style controls.
	 *
	 * @return array[]
	 */
	public function get_learn_controls() {
		return [
			[
				'id'          => 'Newsletter',
				'label'       => '',
				'type'        => 'hidden',
				'default'     => 'inherit',
				'description' =>
					/* translators: %s is material io link. */
					sprintf( '<p>' . __( 'Learn more about material design at %s.', 'material-design' ) . '</p>', '<a href="https://material.io/" target="_blank">material.io</a>' ) .
					'<p>' . __( 'Sign up to get updates and news about material design via email.', 'material-design' ) . '<p>' .
					sprintf(
						' <a href="%1$s" class="button external-link" target="_blank">%2$s<span class="screen-reader-text"> %3$s</span></a>',
						Admin::NEWSLETTER_URL,
						__( 'Subscribe to Newsletter', 'material-design' ),
						/* translators: Accessibility text. */
						__( '(opens in a new tab)', 'material-design' )
					),
			],

		];
	}

	/**
	 * Add global style control.
	 */
	public function add_learn_control() {
		$settings = [];
		$controls = [];

		foreach ( $this->get_learn_controls() as $control ) {
			$settings[ $control['id'] ] = [
				'transport'         => 'refresh',
				'sanitize_callback' => [ $this, 'sanitize_select' ],
				'default'           => $control['default'],
			];

			$controls[ $control['id'] ] = array_merge(
				[
					'section' => 'learn',
				],
				$control
			);
		}

		$this->add_settings( $settings );
		$this->add_controls( $controls );
	}


	/**
	 * Enqueue Customizer scripts.
	 */
	public function scripts() {
		wp_enqueue_script(
			'material-design-plugin-customizer-js',
			$this->plugin->asset_url( 'assets/js/customize-controls.js' ),
			[
				'jquery',
				'wp-color-picker',
				'customize-controls',
				'wp-element',
				'wp-components',
				'wp-i18n',
				'wp-api-fetch',
			],
			$this->plugin->asset_version(),
			false
		);

		$demo_images = $this->plugin->importer->get_attachments( true );
		if ( empty( $demo_images ) ) {
			$demo_images = array_map(
				function ( $image ) {
					return add_query_arg( 'w', 720, $image );
				},
				array_keys( $this->plugin->importer->images )
			);
		} else {
			$demo_images = array_map(
				function ( $image ) {
					return $image['url'];
				},
				array_values( $demo_images )
			);
		}
		$demo_images = array_slice( $demo_images, 0, 9 );

		wp_localize_script(
			'material-design-plugin-customizer-js',
			'materialDesign',
			[
				'slug'                   => $this->slug,
				'designStyles'           => $this->get_design_styles(),
				'controls'               => $this->added_controls,
				'styleControl'           => $this->prepare_option_name( 'style' ),
				'styleSettings'          => $this->prepare_option_name( 'style_settings' ),
				'prevStyleControl'       => $this->prepare_option_name( 'previous_style' ),
				'colorPalette'           => $this->prepare_option_name( 'color_palette' ),
				'iconCollectionsControl' => $this->prepare_option_name( 'icon_collection' ),
				'activeModeControl'      => $this->prepare_option_name( 'active_mode' ),
				'iconCollectionsOptions' => $this->get_icon_collection_controls(),
				'l10n'                   => [
					'confirmChange'    => esc_html__( 'You will lose any custom theme changes. Would you like to continue ?', 'material-design' ),
					'componentsNotice' => __( 'Customize Material Components and styles throughout your site.<br/><a href="#">View example page</a>', 'material-design' ),
				],
				'googleFonts'            => Google_Fonts::get_font_choices(),
				'notifyNonce'            => wp_create_nonce( 'material_design_notify_nonce' ),
				'pluginPath'             => $this->plugin->asset_url( '' ),
				'themeStatus'            => $this->plugin->theme_status(),
				'nonce'                  => wp_create_nonce( 'wp_rest' ),
				'restPath'               => esc_url( $this->plugin->onboarding_rest_controller->get_base_path() ),
				'resetCardStyleRest'     => esc_url( $this->plugin->reset_card_style_rest_controller->get_base_path() ),
				'images'                 => $demo_images,
				'colorControls'          => $this->get_color_controls(),
			]
		);

		wp_enqueue_style(
			'material-design-plugin-customizer-css',
			$this->plugin->asset_url( 'assets/css/customize-controls-compiled.css' ),
			[ 'wp-components' ],
			$this->plugin->asset_version()
		);

		wp_enqueue_style(
			'material-design-plugin-icons-css',
			esc_url( '//fonts.googleapis.com/icon?family=Material+Icons' ),
			[],
			$this->plugin->asset_version()
		);
	}

	/**
	 * Get Google Fonts CDN URL to be enqueued based on the selected settings.
	 *
	 * @param string $context The context of the request.
	 *
	 * @return string
	 */
	public function get_google_fonts_url( $context = '' ) {
		$icons_style  = $this->get_icon_style( '+' );
		$merged_fonts = [ 'Material+Icons' . $icons_style ];
		$fonts        = [];

		if ( 'block-editor' === $context ) {
			$merged_fonts[] = 'Material+Icons+Outlined';
		}

		// Get the font families used.
		foreach ( $this->get_typography_controls() as $control ) {
			$fonts[ $control['id'] ] = [
				'family'   => $this->get_option( $control['id'] ),
				'variants' => [],
			];
		}

		// Get the variant/weight used for each font control.
		foreach ( $this->get_typography_controls() as $c ) {
			$variants = [];
			foreach ( $c['choices'] as $control ) {
				$value = json_decode( $this->get_option( $control['id'] ), true );

				if ( ! empty( $value ) && ! empty( $value['weight'] ) ) {
					$weight = $value['weight'];
				} else {
					$weight = $control['weight']['default'];
				}

				$variants[] = $weight;

			}
			$fonts[ $c['id'] ]['variants'] = $variants;
		}

		// Use font family with key to make it unique and merge it's variants.
		$font_families = [];
		foreach ( $fonts as $font ) {
			$variants                      = str_replace( 'regular', '400', implode( ',', array_unique( $font['variants'] ) ) );
			$font_family                   = str_replace( ' ', '+', $font['family'] );
			$font_families[ $font_family ] = array_merge( isset( $font_families[ $font_family ] ) ? $font_families[ $font_family ] : [], explode( ',', $variants ) );
		}

		// Merge variants and make it unique.
		foreach ( $font_families as $family => $variants ) {
			$merged_fonts[] = $family . ':' . implode( ',', array_unique( $variants ) );
		}

		$fonts_url =
			add_query_arg( 'family', implode( '|', $merged_fonts ), '//fonts.googleapis.com/css' );

		/**
		 * Filter Google Fonts URL.
		 *
		 * @param string $fonts_url Fonts URL.
		 * @param array $font_families Font families set in customizer.
		 */
		return apply_filters( 'material_design_google_fonts_url', $fonts_url, $font_families );
	}

	/**
	 * Get CSS variable which should set the font-family for material-icons.
	 *
	 * @return string
	 */
	public function get_icon_collection_css() {
		return sprintf( '--mdc-icons-font-family: "Material Icons%s";', esc_html( $this->get_icon_style() ) );
	}

	/**
	 * Get Icon style.
	 *
	 * @param string $replace String to replace `-` with.
	 *
	 * @return string
	 */
	public function get_icon_style( $replace = ' ' ) {
		$icons_style = $this->get_option( 'icon_collection' );

		return ( $icons_style && 'filled' !== $icons_style )
			? $replace . str_replace( '-', $replace, ucwords( $icons_style, '-' ) ) : '';
	}

	/**
	 * Enqueue Customizer preview scripts.
	 */
	public function preview_scripts() {
		wp_enqueue_script(
			'material-design-plugin-customizer-preview-js',
			$this->plugin->asset_url( 'assets/js/customize-preview.js' ),
			[ 'jquery', 'lodash', 'wp-i18n' ],
			$this->plugin->asset_version(),
			true
		);
	}

	/**
	 * Render custom templates.
	 */
	public function templates() {
		Material_Color_Palette_Control::tabs_template();
	}

	/**
	 * Get custom frontend CSS based on the customizer theme settings.
	 */
	public function get_frontend_css() {
		$color_vars         = [];
		$corner_styles_vars = [];
		$font_vars          = [];
		$google_fonts       = Google_Fonts::get_fonts();
		$dark_mode_vars     = [];
		$light_mode_vars    = [];

		$typography_controls = $this->get_typography_controls();
		foreach ( $typography_controls as $control ) {
			$value = $this->get_option( $control['id'] );

			$fallback = 'sans-serif';
			if ( array_key_exists( $value, $google_fonts ) ) {
				if ( array_key_exists( 'category', $google_fonts[ $value ] ) ) {
					$fallback = $google_fonts[ $value ]['category'];
				}
			}

			if ( ! empty( $control['css_vars']['family'] ) ) {
				foreach ( $control['css_vars']['family'] as $var ) {
					$font_vars[] = sprintf(
						'%s: "%s", %s;',
						esc_html( $var ),
						esc_html( $value ),
						esc_html( $fallback )
					);
				}
			}
		}

		$typography_extra_controls = wp_list_pluck( $typography_controls, 'choices' );

		// Merge all controls.
		$typography_extra_controls = call_user_func_array( 'array_merge', $typography_extra_controls );

		foreach ( $typography_extra_controls as $control ) {
			$value = json_decode( $this->get_option( $control['id'] ), true );

			if ( ! empty( $value ) && ! empty( $control['css_vars'] ) ) {
				$font_style = 'normal';

				foreach ( $control['css_vars'] as $type => $var ) {
					if ( 'style' === $type || ! isset( $value[ $type ] ) ) {
						continue;
					}

					if ( 'size' === $type ) {
						$font_vars[] = sprintf(
							'%s: %spx !important;',
							esc_html( $var ),
							esc_html( $value[ $type ] )
						);
					} elseif ( 'weight' === $type ) {
						$font_vars[] = sprintf(
							'%s: %s !important;',
							esc_html( $var ),
							esc_html( intval( $value[ $type ] ) )
						);

						if ( preg_match( '/italic$/', $value[ $type ] ) ) {
							$font_style = 'italic';
						}

						$font_vars[] = sprintf(
							'%s: %s !important;',
							esc_html( $control['css_vars']['style'] ),
							esc_html( $font_style )
						);
					} elseif ( 'tracking' === $type ) {
						$font_size     = isset( $value['size'] ) ? $value['size'] : 16;
						$line_tracking = $value[ $type ] / $font_size;
						$font_vars[]   = sprintf(
							'%s: %srem !important;',
							esc_html( $var ),
							esc_html( $line_tracking )
						);
					} else {
						$font_vars[] = sprintf(
							'%s: %s !important;',
							esc_html( $var ),
							esc_html( $value[ $type ] )
						);
					}
				}
			}
		}

		foreach ( $this->get_corner_styles_controls() as $control ) {
			if ( empty( $control['css_var'] ) ) {
				continue;
			}

			$value = $this->get_option( $control['id'] );

			if ( isset( $control['max'] ) || isset( $control['min'] ) ) {
				if ( isset( $control['min'] ) && $value < $control['min'] ) {
					$value = $control['min'];
				}

				if ( isset( $control['max'] ) && $value > $control['max'] ) {
					$value = $control['max'];
				}
			}

			$corner_styles_vars[] = sprintf(
				'%s: %spx;',
				esc_html( $control['css_var'] ),
				esc_html( $value )
			);
		}

		$glue               = "\n\t\t\t\t";
		$icon_collection    = $this->get_icon_collection_css();
		$color_vars         = implode( $glue, $color_vars );
		$corner_styles_vars = implode( $glue, $corner_styles_vars );
		$font_vars          = implode( $glue, $font_vars );
		$color_palette      = $this->get_option( 'color_palette' );
		$light_mode_vars    = '';
		$dark_mode_vars     = '';

		if ( $color_palette ) {
			$color_palette = json_decode( $color_palette, true );
		}

		if ( ! empty( $color_palette ) ) {
			$light_mode_vars = implode( $glue, $this->generate_theme_variables( $color_palette['schemes']['light'] ) );
			$dark_mode_vars  = implode( $glue, $this->generate_theme_variables( $color_palette['schemes']['dark'] ) );
		}


		$css = "
			:root {
				/* Theme color vars */
				{$light_mode_vars}

				/* Icon collection type var */
				{$icon_collection}

				/* Typography vars */
				{$font_vars}

				/* Corner Styles vars */
				{$corner_styles_vars}
			}

			/* Forced light mode */
			body[data-color-scheme='light'] {
				{$light_mode_vars}
			}

			/* Forced dark mode */
			body[data-color-scheme='dark'] {
				{$dark_mode_vars}
			}
		";

		if ( 'inactive' !== $this->get_dark_mode_status() ) {
			$css .= "
				@media (prefers-color-scheme: light) {
					:root {
						{$light_mode_vars}
					}
				}

				@media (prefers-color-scheme: dark) {
					:root {
						{$dark_mode_vars}
					}
				}
			";
		}

		/**
		 * Filter frontend custom CSS & CSS vars.
		 *
		 * @param string $css CSS/CSS vars printed in the frontend.
		 */
		return apply_filters( $this->slug . '_frontend_css', $css );
	}

	/**
	 * Get default value for a setting.
	 *
	 * @param string $name Name of the setting.
	 *
	 * @return mixed
	 */
	public function get_default( $name ) {
		$name   = $this->remove_option_prefix( $name );
		$styles = $this->get_design_styles();
		$value  = isset( $styles['baseline'], $styles['baseline'][ $name ] ) ? $styles['baseline'][ $name ] : '';

		/**
		 * Filter default value for an option.
		 *
		 * @param mixed $value Value of the option.
		 * @param string $name Name of the option.
		 */
		return apply_filters( $this->slug . '_get_default_option', $value, $name );
	}

	/**
	 * Get the design styles with their default values.
	 *
	 * @return array
	 */
	public function get_design_styles() {
		$design_styles = [
			'baseline'    => [
				'primary_color'                => '#6200ee',
				'primary_color_dark'           => '#bb86fc',
				'primary_color_contrast'       => '#6200ee',
				'on_primary_color'             => '#ffffff',
				'on_primary_color_dark'        => '#000000',
				'on_primary_color_contrast'    => '#ffffff',
				'secondary_color'              => '#018786',
				'secondary_color_dark'         => '#03dac5',
				'secondary_color_contrast'     => '#018786',
				'on_secondary_color'           => '#000000',
				'on_secondary_color_dark'      => '#000000',
				'on_secondary_color_contrast'  => '#000000',
				'tertiary_color'               => '#7D5260',
				'tertiary_dark'                => '#7D5260',
				'tertiary_contrast'            => '#7D5260',
				'on_tertiary_color'            => '#FFFFFF',
				'on_tertiary_color_dark'       => '#FFFFFF',
				'on_tertiary_color_contrast'   => '#FFFFFF',
				'surface_color'                => '#ffffff',
				'surface_color_dark'           => '#121212',
				'surface_color_contrast'       => '#ffffff',
				'on_surface_color'             => '#000000',
				'on_surface_color_dark'        => '#ffffff',
				'on_surface_color_contrast'    => '#000000',
				'custom_background_color'      => '#ffffff',
				'custom_background_color_dark' => '#121212',
				'on_background_color'          => '#000000',
				'on_background_color_dark'     => '#ffffff',
				'footer_color'                 => '#ffffff',
				'on_footer_color'              => '#000000',
				'display_font_family'          => 'Roboto',
				'headline_font_family'         => 'Roboto',
				'title_font_family'            => 'Roboto',
				'label_font_family'            => 'Roboto',
				'body_font_family'             => 'Roboto',
				'global_radius'                => '4',
				'button_radius'                => '4',
				'card_radius'                  => '4',
				'chip_radius'                  => '4',
				'data_table_radius'            => '4',
				'image_list_radius'            => '4',
				'nav_drawer_radius'            => '4',
				'text_field_radius'            => '4',
				'icon_collection'              => 'filled',
			],
			'crane'       => [
				'primary_color'               => '#5d1049',
				'primary_color_dark'          => '#5d1049',
				'primary_color_contrast'      => '#5d1049',
				'secondary_color'             => '#e30425',
				'secondary_color_dark'        => '#e30425',
				'secondary_color_contrast'    => '#e30425',
				'on_primary_color'            => '#ffffff',
				'on_primary_color_dark'       => '#ffffff',
				'on_primary_color_contrast'   => '#ffffff',
				'on_secondary_color'          => '#ffffff',
				'on_secondary_color_dark'     => '#ffffff',
				'on_secondary_color_contrast' => '#ffffff',
				'surface_color'               => '#ffffff',
				'surface_color_dark'          => '#ffffff',
				'surface_color_contrast'      => '#ffffff',
				'on_surface_color'            => '#000000',
				'on_surface_color_dark'       => '#000000',
				'on_surface_color_contrast'   => '#000000',
				'custom_background_color'     => '#f4e2ed',
				'on_background_color'         => '#000000',
				'footer_color'                => '#ffffff',
				'on_footer_color'             => '#000000',
				'display_font_family'         => 'Raleway',
				'headline_font_family'        => 'Raleway',
				'title_font_family'           => 'Raleway',
				'label_font_family'           => 'Raleway',
				'body_font_family'            => 'Raleway',
				'global_radius'               => '16',
				'button_radius'               => '16',
				'card_radius'                 => '16',
				'chip_radius'                 => '16',
				'data_table_radius'           => '16',
				'image_list_radius'           => '16',
				'nav_drawer_radius'           => '16',
				'text_field_radius'           => '16',
				'icon_collection'             => 'outlined',
			],
			'fortnightly' => [
				'primary_color'               => '#121212',
				'primary_color_dark'          => '#121212',
				'primary_color_contrast'      => '#121212',
				'secondary_color'             => '#6b38fb',
				'secondary_color_dark'        => '#6b38fb',
				'secondary_color_contrast'    => '#6b38fb',
				'on_primary_color'            => '#ffffff',
				'on_primary_color_dark'       => '#ffffff',
				'on_primary_color_contrast'   => '#ffffff',
				'on_secondary_color'          => '#ffffff',
				'on_secondary_color_dark'     => '#ffffff',
				'on_secondary_color_contrast' => '#ffffff',
				'surface_color'               => '#ffffff',
				'surface_color_dark'          => '#ffffff',
				'surface_color_contrast'      => '#ffffff',
				'on_surface_color'            => '#000000',
				'on_surface_color_dark'       => '#000000',
				'on_surface_color_contrast'   => '#000000',
				'custom_background_color'     => '#ffffff',
				'on_background_color'         => '#000000',
				'footer_color'                => '#ffffff',
				'on_footer_color'             => '#000000',
				'display_font_family'         => 'Merriweather',
				'headline_font_family'        => 'Merriweather',
				'title_font_family'           => 'Merriweather',
				'label_font_family'           => 'Merriweather',
				'body_font_family'            => 'Merriweather',
				'global_radius'               => '0',
				'button_radius'               => '0',
				'card_radius'                 => '0',
				'chip_radius'                 => '0',
				'data_table_radius'           => '0',
				'image_list_radius'           => '0',
				'nav_drawer_radius'           => '0',
				'text_field_radius'           => '0',
				'icon_collection'             => 'sharp',
			],
			'blossom'     => [
				'primary_color'               => '#e56969',
				'primary_color_dark'          => '#e56969',
				'primary_color_contrast'      => '#e56969',
				'secondary_color'             => '#ef9a9a',
				'secondary_color_dark'        => '#ef9a9a',
				'secondary_color_contrast'    => '#ef9a9a',
				'on_primary_color'            => '#ffffff',
				'on_primary_color_dark'       => '#ffffff',
				'on_primary_color_contrast'   => '#ffffff',
				'on_secondary_color'          => '#442c2e',
				'on_secondary_color_dark'     => '#442c2e',
				'on_secondary_color_contrast' => '#442c2e',
				'surface_color'               => '#fff1ee',
				'surface_color_dark'          => '#fff1ee',
				'surface_color_contrast'      => '#fff1ee',
				'on_surface_color'            => '#442c2e',
				'on_surface_color_dark'       => '#442c2e',
				'on_surface_color_contrast'   => '#442c2e',
				'custom_background_color'     => '#fff1ee',
				'on_background_color'         => '#442c2e',
				'footer_color'                => '#fff1ee',
				'on_footer_color'             => '#442c2e',
				'display_font_family'         => 'Rubik',
				'headline_font_family'        => 'Rubik',
				'title_font_family'           => 'Rubik',
				'label_font_family'           => 'Rubik',
				'body_font_family'            => 'Rubik',
				'global_radius'               => '8',
				'button_radius'               => '8',
				'card_radius'                 => '8',
				'chip_radius'                 => '8',
				'data_table_radius'           => '8',
				'image_list_radius'           => '8',
				'nav_drawer_radius'           => '8',
				'text_field_radius'           => '8',
				'icon_collection'             => 'round',
			],
		];

		/**
		 * Filter design styles.
		 *
		 * @param string $design_styles Design styles.
		 */
		return apply_filters( $this->slug . '_design_styles', $design_styles );
	}

	/**
	 * Get list of all the control settings in the Colors section.
	 */
	public function get_color_controls() {
		return [
			[
				'id'                   => 'primary_color',
				'label'                => __( 'Source Color', 'material-design' ),
				'a11y_label'           => __( 'Source Color', 'material-design' ),
				'related_text_setting' => $this->prepare_option_name( 'on_primary_color' ),
				'css_var'              => '--md-sys-color-primary',
			],
		];
	}

	/**
	 * Get list of all the control settings in the Typography section.
	 *
	 * @return array
	 */
	public function get_typography_controls() {
		$default_fonts = [
			'display'  => 'Roboto',
			'headline' => 'Roboto',
			'title'    => 'Roboto Medium',
			'label'    => 'Roboto Medium',
			'body'     => 'Roboto Medium',
		];

		$controls = [];
		foreach ( $default_fonts as $base_key => $default_font ) {
			$controls[] = [
				'id'       => sprintf( '%s_font_family', $base_key ),
				'label'    => ucfirst( $base_key ),
				'css_vars' => [
					'family' => [
						sprintf( '--md-sys-typescale-%s-large-font', $base_key ),
						sprintf( '--md-sys-typescale-%s-medium-font', $base_key ),
						sprintf( '--md-sys-typescale-%s-small-font', $base_key ),
					],
				],
				'choices'  => $this->get_typography_extra_controls( $base_key ),
			];
		}

		return $controls;
	}

	/**
	 * Get list of all the control settings in the Typography section.
	 *
	 * @return array
	 */
	public function get_corner_styles_controls() {
		return [
			[
				'id'            => 'global_radius',
				'label'         => __( 'Global Corner Styles', 'material-design' ),
				'description'   => __( 'Change the global shape size for all components, expand to customize the shape size for individual components.', 'material-design' ),
				'min'           => 0,
				'max'           => 36,
				'initial_value' => 4,
			],
			[
				'id'            => 'button_radius',
				'label'         => __( 'Buttons', 'material-design' ),
				'min'           => 0,
				'max'           => 20,
				'initial_value' => 36,
				'css_var'       => '--mdc-button-radius',
				'blocks'        => [
					'material/button',
				],
			],
			[
				'id'            => 'card_radius',
				'label'         => __( 'Card', 'material-design' ),
				'min'           => 0,
				'max'           => 24,
				'initial_value' => 12,
				'css_var'       => '--mdc-card-radius',
				'blocks'        => [
					'material/card',
					'material/cards-collection',
					'material/image-list',
				],
			],
			[
				'id'            => 'chip_radius',
				'label'         => __( 'Chip', 'material-design' ),
				'min'           => 0,
				'max'           => 16,
				'initial_value' => 8,
				'css_var'       => '--mdc-chip-radius',
			],
			[
				'id'            => 'data_table_radius',
				'label'         => __( 'Data table', 'material-design' ),
				'min'           => 0,
				'max'           => 36,
				'initial_value' => 24,
				'css_var'       => '--mdc-data-table-radius',
				'blocks'        => [
					'material/data-table',
				],
			],
			[
				'id'            => 'image_list_radius',
				'label'         => __( 'Image List', 'material-design' ),
				'min'           => 0,
				'max'           => 24,
				'initial_value' => 12,
				'css_var'       => '--mdc-image-list-radius',
				'blocks'        => [
					'material/image-list',
				],
			],
			[
				'id'            => 'nav_drawer_radius',
				'label'         => __( 'Nav Drawer', 'material-design' ),
				'min'           => 0,
				'max'           => 36,
				'initial_value' => 0,
				'css_var'       => '--mdc-nav-drawer-radius',
			],
			[
				'id'            => 'text_field_radius',
				'label'         => __( 'Text Field', 'material-design' ),
				'min'           => 0,
				'max'           => 20,
				'initial_value' => 4,
				'css_var'       => '--mdc-text-field-radius',
			],
		];
	}

	/**
	 * Get list of all the control settings in the Icon Collections section.
	 *
	 * @return array
	 */
	public function get_icon_collection_controls() {
		return [
			'filled'   => [
				'label' => __( 'Filled', 'material-design' ),
				'icon'  => $this->plugin->asset_url( 'assets/images/icon-collections/filled.svg' ),
			],
			'outlined' => [
				'label' => __( 'Outlined', 'material-design' ),
				'icon'  => $this->plugin->asset_url( 'assets/images/icon-collections/outlined.svg' ),
			],
			'round'    => [
				'label' => __( 'Rounded', 'material-design' ),
				'icon'  => $this->plugin->asset_url( 'assets/images/icon-collections/rounded.svg' ),
			],
			'two-tone' => [
				'label' => __( 'Two-tone', 'material-design' ),
				'icon'  => $this->plugin->asset_url( 'assets/images/icon-collections/two-tone.svg' ),
			],
			'sharp'    => [
				'label' => __( 'Sharp', 'material-design' ),
				'icon'  => $this->plugin->asset_url( 'assets/images/icon-collections/sharp.svg' ),
			],
		];
	}

	/**
	 * Prepend the slug name if it does not exist.
	 *
	 * @param string $name The name of the setting/control.
	 *
	 * @return string
	 */
	public function prepend_slug( $name ) {
		return false === strpos( $name, "{$this->slug}_" ) ? "{$this->slug}_{$name}" : $name;
	}

	/**
	 * Prepend the slug name if it does not exist.
	 *
	 * @param string $name The name of the setting/control.
	 *
	 * @return string
	 */
	public function prepare_option_name( $name ) {
		return false === strpos( $name, "{$this->slug}[" ) ? "{$this->slug}[{$name}]" : $name;
	}

	/**
	 * Prepend the slug name if it does not exist.
	 *
	 * @param string $name The name of the setting/control.
	 *
	 * @return string
	 */
	public function remove_option_prefix( $name ) {
		if ( preg_match( '/\[([^\]]+)\]/', $name, $matches ) ) {
			return $matches[1];
		}

		return $name;
	}

	/**
	 * Get option with fallback to the default value.
	 *
	 * @param string $name Name of the option.
	 *
	 * @return mixed
	 */
	public function get_option( $name ) {
		$values = get_option( $this->slug );

		if ( empty( $values ) || ! isset( $values[ $name ] ) ) {
			$value = $this->get_default( $name );
		} else {
			$value = $values[ $name ];
		}

		/**
		 * Filter option value.
		 *
		 * @param mixed $value Option value.
		 * @param string $name Option name.
		 */
		return apply_filters( "{$this->slug}_get_option_{$name}", $value, $name );
	}

	/**
	 * Update option value.
	 *
	 * @param string $name Name of the option.
	 * @param mixed  $value Value of the option.
	 *
	 * @return mixed
	 */
	public function update_option( $name, $value ) {
		$values = get_option( $this->slug );

		if ( empty( $values ) ) {
			$values = [];
		}

		$values[ $name ] = $value;

		return update_option( $this->slug, $values );
	}

	/**
	 * Maybe show the material components notification if the current previewed
	 * page does not contain any material blocks.
	 *
	 * @param mixed $value Saved value.
	 *
	 * @return mixed
	 */
	public function show_material_components_notification( $value ) {
		if ( is_customize_preview() && is_singular() && Blocks_Frontend::has_material_blocks() ) {
			return false;
		}

		return $value;
	}

	/**
	 * Update notification dismiss count.
	 */
	public function notification_dismiss() {
		if ( ! check_ajax_referer( 'material_design_notify_nonce', 'nonce', false ) ) {
			wp_send_json_error( 'invalid_nonce' );
		}

		$count = $this->get_option( 'notify' );
		$count = empty( $count ) ? 0 : $count;
		$this->update_option( 'notify', ++ $count );
		wp_send_json_success(
			[
				'count' => $count,
			]
		);
	}

	/**
	 * Copy color settings from theme on activation.
	 *
	 * @return void
	 */
	public function copy_saved_color_settings() {
		if ( 'ok' === $this->plugin->theme_status() ) {
			$values = get_option( $this->slug );

			foreach ( $this->get_color_controls() as $control ) {
				$theme_value = get_theme_mod( $control['id'] );

				if ( ( empty( $values ) || empty( $values[ $control['id'] ] ) ) && ! empty( $theme_value ) ) {
					$this->update_option( $control['id'], $theme_value );
				}
			}
		}
	}

	/**
	 * Default typography options
	 *
	 * @param mixed $args Customized values.
	 *
	 * @return array Values to use in control.
	 */
	public function get_typography_weight_controls( $args ) {
		$args = wp_parse_args(
			$args,
			[
				'label'   => __( 'Style', 'material-design' ),
				'type'    => 'select',
				'default' => __( 'Normal', 'material-design' ),
				'choices' => [],
			]
		);

		return $args;
	}

	/**
	 * Return size control data.
	 *
	 * @param mixed $args Customized values.
	 *
	 * @return array Values to use in control.
	 */
	public function get_typography_size_controls( $args ) {
		$args = wp_parse_args(
			$args,
			[
				'label'   => __( 'Size', 'material-design' ),
				'type'    => 'number',
				'min'     => 2,
				'default' => 12,
				'max'     => 64,
			]
		);

		return $args;
	}

	/**
	 * Get tracking controls.
	 *
	 * @param mixed $args Customized values.
	 *
	 * @return array Values to use in control.
	 */
	public function get_tracking_controls( $args ) {
		$args = wp_parse_args(
			$args,
			[
				'label'   => __( 'Tracking (Letter spacing)', 'material-design' ),
				'type'    => 'number',
				'min'     => -5,
				'default' => 0,
				'max'     => 100,
			]
		);

		return $args;
	}

	/**
	 * Get tracking controls.
	 *
	 * @param mixed $args Customized values.
	 *
	 * @return array Values to use in control.
	 */
	public function get_line_height_controls( $args ) {
		$args = wp_parse_args(
			$args,
			[
				'label'   => __( 'Line height', 'material-design' ),
				'type'    => 'number',
				'min'     => 0,
				'default' => 0,
				'max'     => 64,
			]
		);

		return $args;
	}

	/**
	 * Build typography size and weight controls.
	 *
	 * @param string $token Token name like Display, Headline, Title etc..
	 *
	 * @return array Values for controllers.
	 */
	public function get_typography_extra_controls( $token ) {
		$controls = [];

		$default_fonts_size = [
			'display'  => [
				'large'  => 120,
				'medium' => 110,
				'small'  => 96,
			],
			'headline' => [
				'large'  => 60,
				'medium' => 48,
				'small'  => 34,
			],
			'title'    => [
				'large'  => 24,
				'medium' => 20,
				'small'  => 16,
			],
			'label'    => [
				'large'  => 16,
				'medium' => 14,
				'small'  => 11,
			],
			'body'     => [
				'large'  => 16,
				'medium' => 14,
				'small'  => 12,
			],
		];

		$default_tracking = [
			'display'  => [
				'large'  => -1.5,
				'medium' => -1.5,
				'small'  => -1.5,
			],
			'headline' => [
				'large' => -0.5,
				'small' => 0.25,
			],
			'title'    => [
				'medium' => 0.15,
				'small'  => 0.1,
			],
			'label'    => [
				'large'  => 0.15,
				'medium' => 0.1,
				'small'  => 0.1,
			],
			'body'     => [
				'large'  => 0.25,
				'medium' => 0.4,
				'small'  => 0.4,
			],
		];

		$default_weight = [
			'display'  => [
				'large'  => 300,
				'medium' => 300,
				'small'  => 300,
			],
			'headline' => [
				'large'  => 300,
				'medium' => 400,
				'small'  => 400,
			],
			'title'    => [
				'large'  => 400,
				'medium' => 500,
				'small'  => 500,
			],
			'label'    => [
				'large'  => 400,
				'medium' => 500,
				'small'  => 500,
			],
			'body'     => [
				'large'  => 400,
				'medium' => 400,
				'small'  => 400,
			],
		];

		$default_line_height = [
			'display'  => [
				'large'  => 6,
				'medium' => 6,
				'small'  => 6,
			],
			'headline' => [
				'large'  => 3.75,
				'medium' => 3.125,
				'small'  => 2.5,
			],
			'title'    => [
				'large'  => 1.33,
				'medium' => 1.75,
				'small'  => 1.57,
			],
			'label'    => [
				'large'  => 1.75,
				'medium' => 1.375,
				'small'  => 1.125,
			],
			'body'     => [
				'large'  => 1.5,
				'medium' => 1.25,
				'small'  => 1.25,
			],
		];

		$sub_tokens = [ 'large', 'medium', 'small' ];

		foreach ( $sub_tokens as $sub_t ) {
			$id         = sprintf( '%s_%s', $token, $sub_t );
			$controls[] = [
				'id'         => $id,
				'setting'    => $this->prepare_option_name( $id ),
				'css_vars'   => [
					'lineHeight' => sprintf( '--md-sys-typescale-%s-%s-line-height', $token, $sub_t ),
					'size'       => sprintf( '--md-sys-typescale-%s-%s-size', $token, $sub_t ),
					'tracking'   => sprintf( '--md-sys-typescale-%s-%s-tracking', $token, $sub_t ),
					'weight'     => sprintf( '--md-sys-typescale-%s-%s-weight', $token, $sub_t ),
					'style'      => sprintf( '--md-sys-typescale-%s-%s-style', $token, $sub_t ),
				],
				'value'      => $this->get_option( $id ),
				'label'      => sprintf(
					/* translators: %1$s Token and %2$s Sub-token name. */
					esc_html__( '%1$s %2$s', 'material-design' ),
					ucfirst( $token ),
					$sub_t
				),
				'size'       => $this->get_typography_size_controls(
					[
						'default' => $default_fonts_size[ $token ][ $sub_t ],
						'max'     => 140,
					]
				),
				'weight'     => $this->get_typography_weight_controls(
					[
						'default' => $default_weight[ $token ][ $sub_t ],
					]
				),
				'lineHeight' => $this->get_line_height_controls(
					[
						'default' => $default_line_height[ $token ][ $sub_t ],
					]
				),
				'tracking'   => $this->get_tracking_controls(
					[
						'default' => isset( $default_tracking[ $token ][ $sub_t ] ) ? $default_tracking[ $token ][ $sub_t ] : 0,
					]
				),
			];
		}

		return $controls;
	}

	/**
	 * Use custom section for style
	 *
	 * @param array $args array Section arguments.
	 * @param int   $id string Section ID.
	 *
	 * @return Material_Styles_Section|Material_Style_Settings_Section|array Filtered value
	 */
	public function filter_style_section( $args, $id ) {
		if ( 'material_design_style' === $id ) {
			$args['type'] = 'styles';

			return new Material_Styles_Section(
				$this->wp_customize,
				$id,
				$args,
				$this->plugin
			);
		}

		if ( 'material_design_style_settings' === $id ) {
			$args['type'] = 'style_settings';

			return new Material_Style_Settings_Section(
				$this->wp_customize,
				$id,
				$args,
				$this->plugin
			);
		}

		if ( 'material_design_colors' === $id ) {
			$args['type'] = 'colors';

			return new Material_Color_Palette_Section(
				$this->wp_customize,
				$id,
				$args,
				$this->plugin
			);
		}

		return $args;
	}

	/**
	 * Override control arguments for dark mode variants.
	 *
	 * @param array  $control Control to override.
	 * @param array  $args    Arguments to override.
	 * @param string $variant Dark mode variant.
	 *
	 * @return Material_Color_Palette_Control New control variant
	 */
	public function get_dark_mode_controls_override( $control, $args, $variant ) {
		$variant_suffix = ( 'dark_colors' === $variant ) ? $this->dark_mode_suffix : $this->contrast_mode_suffix;
		$variant_type   = ( 'dark_colors' === $variant ) ? 'dark' : 'contrast';

		// Dark mode overrides.
		$args['section']              = 'colors';
		$args['related_setting']      = ! empty( $control['related_setting'] )
			? str_replace( ']', $variant_suffix . ']', $control['related_setting'] )
			: false;
		$args['related_text_setting'] = ! empty( $control['related_text_setting'] )
			? str_replace( ']', $variant_suffix . ']', $control['related_text_setting'] )
			: false;
		$args['default_mode_setting'] = $this->prepare_option_name( $control['id'] );
		$args['color_mode_type']      = $variant_type;

		return new Material_Color_Palette_Control(
			$this->wp_customize,
			$this->prepare_option_name( $control['id'] . $variant_suffix ),
			$args
		);
	}

	/**
	 * Check whether or not dark mode is forced.
	 *
	 * @return string status of dark mode.
	 */
	public function get_dark_mode_status() {
		$selected_style = $this->get_option( 'style' );
		$style_settings = $this->get_option( 'style_settings' );
		$style_settings = is_string( $style_settings ) ? json_decode( $style_settings, true ) : [];
		$selected_style = $selected_style ? $selected_style : 'baseline';
		if ( empty( $style_settings[ $selected_style ] ) ) {
			return 'inactive';
		}

		// Auto and active is dark mode active.
		return $style_settings[ $selected_style ]['dark'];
	}

	/**
	 * Retrieve source color.
	 *
	 * @return string hex source color.
	 */
	public function get_source_color() {
		return $this->get_option( 'primary_color' );
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
	 * @param string                $input   Slug to sanitize.
	 * @param \WP_Customize_Setting $setting Setting instance.
	 *
	 * @return string Sanitized slug if it is a valid choice; otherwise, the setting default.
	 */
	public function sanitize_select( $input, $setting ) {
		// Ensure input is a slug.
		$input = sanitize_key( $input );

		// Get list of choices from the control associated with the setting.
		$choices = $setting->manager->get_control( $setting->id )->choices;

		// If the input is a valid key, return it; otherwise, return the default.
		return ( array_key_exists( $input, $choices ) ? $input : $setting->default );
	}

	/**
	 * Get global style controls.
	 *
	 * @return array[]
	 */
	public function get_global_style_controls() {
		return [
			[
				'id'      => 'card_style',
				'label'   => esc_html__( 'Cards', 'material-design' ),
				'type'    => 'radio',
				'default' => 'filled',
				'choices' => [
					'elevated' => esc_html__( 'Elevated', 'material-design' ),
					'outlined' => esc_html__( 'Outlined', 'material-design' ),
					'filled'   => esc_html__( 'Filled', 'material-design' ),
				],
			],
		];
	}

	/**
	 * Add global style control.
	 */
	public function add_global_style_control() {
		$settings = [];
		$controls = [];

		foreach ( $this->get_global_style_controls() as $control ) {
			$settings[ $control['id'] ] = [
				'transport'         => 'refresh',
				'sanitize_callback' => [ $this, 'sanitize_select' ],
				'default'           => $control['default'],
			];

			$controls[ $control['id'] ] = array_merge(
				[
					'section' => 'global_style',
				],
				$control
			);
		}

		$settings['card_reset'] = [
			'transport'         => '',
			'sanitize_callback' => '',
			'default'           => '',
		];

		$controls['card_reset'] = [
			'type'        => 'button',
			'section'     => 'global_style',
			'description' => __( 'On click of reset, all card posts with card blocks will be updated to use inherit from global card style.', 'material-design' ),
			'settings'    => [],
			'input_attrs' => [
				'value' => __( 'Reset', 'material-design' ),
				'class' => 'button button-primary material-global-style-reset',
			],
		];

		$this->add_settings( $settings );
		$this->add_controls( $controls );
	}

	/**
	 * Generate color variables based on current palette.
	 *
	 * @param array $color_palette Current color palette.
	 *
	 * @return array Array of variables.
	 */
	public function generate_theme_variables( $color_palette ) {
		$variables = [];

		if ( empty( $color_palette ) ) {
			return [];
		}

		foreach ( $color_palette as $key => $value ) {
			$token = '--md-sys-color-' . strtolower( preg_replace( '/([a-z])([A-Z])/', '$1-$2', $key ) );
			$color = Helpers::rgb_to_hex( $value );

			// RGB in csv format `0,0,0` - used in rgba function.
			$variables[ $token . '-rgb' ] = sprintf( '%1$s:%2$s;', $token . '-rgb', Helpers::rgb_to_rgb_string( $value ) );

			$variables[ $token ] = sprintf( '%1$s:%2$s;', $token, $color );
		}

		return $variables;
	}
}
