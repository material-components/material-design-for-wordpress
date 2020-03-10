<?php
/**
 * Class Controls.
 *
 * @package MaterialThemeBuilder
 */

namespace MaterialThemeBuilder\Customizer;

use MaterialThemeBuilder\Module_Base;

/**
 * Class Controls.
 */
class Controls extends Module_Base {

	/**
	 * The slug used as a prefix for all settings and controls.
	 *
	 * @var string
	 */
	public $slug = 'mtb';

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
	 * Register customizer options.
	 *
	 * @action customize_register
	 *
	 * @param WP_Customize_Manager $wp_customize Theme Customizer object.
	 */
	public function register( $wp_customize ) {
		$this->wp_customize = $wp_customize;

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
	}

	/**
	 * Add the base panel.
	 *
	 * @return void
	 */
	public function add_panel() {
		/**
		 * Add "Your Material Theme" custom panel.
		 */
		$this->wp_customize->add_panel(
			$this->slug,
			[
				'priority'    => 10,
				'capability'  => 'edit_theme_options',
				'title'       => esc_html__( 'Material Theme Editor', 'material-theme-builder' ),
				'description' => esc_html__( 'Material Theme Description goes here.', 'material-theme-builder' ),
			]
		);
	}

	/**
	 * Add all our customizer sections.
	 *
	 * @return void
	 */
	public function add_sections() {
		$sections = [
			'style'      => __( 'Design Style', 'material-theme-builder' ),
			'colors'     => __( 'Color Palettes', 'material-theme-builder' ),
			'typography' => __( 'Typography', 'material-theme-builder' ),
			'corners'    => __( 'Corner Styles', 'material-theme-builder' ),
			'icons'      => __( 'Icon Collections', 'material-theme-builder' ),
		];

		foreach ( $sections as $id => $label ) {
			$id = $this->prepend_slug( $id );

			$args = [
				'priority'   => 10,
				'capability' => 'edit_theme_options',
				'title'      => esc_html( $label ),
				'panel'      => $this->slug,
				'type'       => 'collapse',
			];

			/**
			 * Filters the customizer section args.
			 *
			 * This allows other plugins/themes to change the customizer section args.
			 *
			 * @param array $args Array of section args.
			 * @param string   $id       ID of the setting.
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
	 * Add all controls in the "Theme" section.
	 *
	 * @return void
	 */
	public function add_theme_controls() {
		/**
		 * List of all the control settings in the Theme section.
		 */
		$settings = [
			'style'          => [
				'default' => 'baseline',
			],
			'previous_style' => [
				'default' => 'baseline',
			], // This setting does not have an associated control.
		];

		$this->add_settings( $settings );

		/**
		* List of all the controls in the Theme section.
		 */
		$controls = [
			'style' => new Image_Radio_Control(
				$this->wp_customize,
				$this->prepend_slug( 'style' ),
				[
					'section'  => 'style',
					'priority' => 10,
					'choices'  => [
						'baseline'    => [
							'label' => __( 'Baseline', 'material-theme-builder' ),
							'url'   => $this->plugin->asset_url( 'assets/images/baseline.svg' ),
						],
						'crane'       => [
							'label' => __( 'Crane', 'material-theme-builder' ),
							'url'   => $this->plugin->asset_url( 'assets/images/crane.svg' ),
						],
						'fortnightly' => [
							'label' => __( 'Fortnightly', 'material-theme-builder' ),
							'url'   => $this->plugin->asset_url( 'assets/images/fortnightly.svg' ),
						],
						'shrine'      => [
							'label' => __( 'Shrine', 'material-theme-builder' ),
							'url'   => $this->plugin->asset_url( 'assets/images/shrine.svg' ),
						],
						'custom'      => [
							'label' => __( 'Custom', 'material-theme-builder' ),
							'url'   => $this->plugin->asset_url( 'assets/images/custom.svg' ),
						],
					],
				]
			),
		];

		$this->add_controls( $controls );
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
		}

		$this->add_settings( $settings );

		/**
		* Generate list of all the controls in the colors section.
		 */
		$controls = [];

		foreach ( $this->get_color_controls() as $control ) {
			$controls[ $control['id'] ] = new Material_Color_Palette_Control(
				$this->wp_customize,
				$this->prepend_slug( $control['id'] ),
				[
					'label'                => $control['label'],
					'section'              => 'colors',
					'priority'             => 10,
					'related_text_setting' => ! empty( $control['related_text_setting'] ) ? $control['related_text_setting'] : false,
					'related_setting'      => ! empty( $control['related_setting'] ) ? $control['related_setting'] : false,
					'css_var'              => $control['css_var'],
				]
			);
		}

		$this->add_controls( $controls );
	}

	/**
	 * Add settings to customizer.
	 *
	 * @param  array $settings Array of settings to add to customizer.
	 * @return void
	 */
	public function add_settings( $settings = [] ) {

		foreach ( $settings as $id => $setting ) {
			$id = $this->prepend_slug( $id );

			if ( is_array( $setting ) ) {
				$defaults = [
					'capability'        => 'edit_theme_options',
					'sanitize_callback' => 'sanitize_text_field',
					'transport'         => 'postMessage',
					'default'           => $this->get_default( $id ),
				];

				$setting = array_merge( $defaults, $setting );
			}

			/**
			 * Filters the customizer setting args.
			 *
			 * This allows other plugins/themes to change the customizer setting args
			 *
			 * @param array   $settings[ $id ] Array of setting args.
			 * @param string   $id       ID of the setting.
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
	 * @param  array $controls Array of controls to add to customizer.
	 * @return void
	 */
	public function add_controls( $controls = [] ) {

		foreach ( $controls as $id => $control ) {
			$id = $this->prepend_slug( $id );

			/**
			 * Filters the customizer control args.
			 *
			 * This allows other plugins/themes to change the customizer controls args
			 *
			 * @param array $control Array of control args.
			 * @param string   $id       ID of the control.
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
		}
	}

	/**
	 * Enqueue Customizer scripts.
	 *
	 * @action customize_controls_enqueue_scripts
	 */
	public function scripts() {
		wp_enqueue_script(
			'material-theme-builder-customizer-js',
			$this->plugin->asset_url( 'assets/js/customize-controls.js' ),
			[ 'customize-controls', 'jquery', 'wp-element', 'wp-components' ],
			$this->plugin->asset_version(),
			false
		);

		wp_localize_script(
			'material-theme-builder-customizer-js',
			'mtb',
			[
				'designStyles' => $this->get_design_styles(),
				'controls'     => $this->added_controls,
				'styleControl' => $this->prepend_slug( 'style' ),
				'l10n'         => [
					'confirmChange' => esc_html__( 'Are you sure ?', 'material-theme-builder' ),
				],
			]
		);

		wp_enqueue_style(
			'material-theme-builder-customizer-css',
			$this->plugin->asset_url( 'assets/css/customize-controls-compiled.css' ),
			[ 'wp-components' ],
			$this->plugin->asset_version()
		);
	}

	/**
	 * Enqueue Customizer preview scripts.
	 *
	 * @action customize_preview_init
	 */
	public function preview_scripts() {
		wp_enqueue_script(
			'material-theme-builder-customizer-preview-js',
			$this->plugin->asset_url( 'assets/js/customize-preview.js' ),
			[ 'customize-controls', 'jquery' ],
			$this->plugin->asset_version(),
			false
		);
	}

	/**
	 * Render custom templates.
	 *
	 * @action customize_controls_print_footer_scripts
	 */
	public function templates() {
		Material_Color_Palette_Control::tabs_template();
	}

	/**
	 * Get custom frontend CSS based on the customizer theme settings.
	 */
	public function get_frontend_css() {
		$color_vars = '';

		foreach ( $this->get_color_controls() as $control ) {
			$value = get_theme_mod( $this->prepend_slug( $control['id'] ) );

			if ( empty( $value ) ) {
				$value = $this->get_default( $control['id'] );
			}

			$color_vars .= "\t{$control['css_var']}: $value;\n";
		}

		$color_vars = ":root {\n$color_vars}";

		return $color_vars;
	}

	/**
	 * Get default value for a setting.
	 *
	 * @param  string $setting Name of the setting.
	 * @return mixed
	 */
	public function get_default( $setting ) {
		$setting  = str_replace( "{$this->slug}_", '', $setting );
		$styles   = $this->get_design_styles();
		$baseline = $styles['baseline'];

		return isset( $baseline[ $setting ] ) ? $baseline[ $setting ] : '';
	}

	/**
	 * Get the design styles with their default values.
	 *
	 * @return array
	 */
	public function get_design_styles() {
		return [
			'baseline'    => [
				'primary_color'        => '#6200ee',
				'secondary_color'      => '#03dac6',
				'primary_text_color'   => '#ffffff',
				'secondary_text_color' => '#000000',
				'font_headlines'       => 'Roboto',
				'font_body'            => 'Roboto',
				'corner_styles'        => '4px',
				'icon_collection'      => 'filled',
			],
			'crane'       => [
				'primary_color'        => '#5d1049',
				'secondary_color'      => '#e30425',
				'primary_text_color'   => '#ffffff',
				'secondary_text_color' => '#ffffff',
				'font_headlines'       => 'Raleway Light',
				'font_body'            => 'Raleway Semi-Bold',
				'corner_styles'        => '4',
				'icon_collection'      => 'outlined',
			],
			'fortnightly' => [
				'primary_color'        => '#ffffff',
				'secondary_color'      => '#6b38fb',
				'primary_text_color'   => '#000000',
				'secondary_text_color' => '#ffffff',
				'font_headlines'       => 'Merriweather Black Italic',
				'font_body'            => 'Merriweather Regular',
				'corner_styles'        => '0',
				'icon_collection'      => 'outlined',
			],
			'shrine'      => [
				'primary_color'        => '#fedbd0',
				'secondary_color'      => '#feeae6',
				'primary_text_color'   => '#000000',
				'secondary_text_color' => '#000000',
				'font_headlines'       => 'Rubik Light',
				'font_body'            => 'Rubik Regular',
				'corner_styles'        => '4px',
				'icon_collection'      => 'outlined',
			],
		];
	}

	/**
	 * Get list of all the control settings in the Colors section.
	 */
	public function get_color_controls() {
		return [
			[
				'id'                   => 'primary_color',
				'label'                => __( 'Primary Color', 'material-theme-builder' ),
				'related_text_setting' => $this->prepend_slug( 'primary_text_color' ),
				'css_var'              => '--mdc-theme-primary',
			],
			[
				'id'                   => 'secondary_color',
				'label'                => __( 'Secondary Color', 'material-theme-builder' ),
				'related_text_setting' => $this->prepend_slug( 'secondary_text_color' ),
				'css_var'              => '--mdc-theme-secondary',
			],
			[
				'id'              => 'primary_text_color',
				'label'           => __( 'Text on Primary', 'material-theme-builder' ),
				'related_setting' => $this->prepend_slug( 'primary_color' ),
				'css_var'         => '--mdc-theme-on-primary',
			],
			[
				'id'              => 'secondary_text_color',
				'label'           => __( 'Text on Secondary', 'material-theme-builder' ),
				'related_setting' => $this->prepend_slug( 'secondary_color' ),
				'css_var'         => '--mdc-theme-on-secondary',
			],
		];
	}

	/**
	 * Prepend the slug name if it does not exist.
	 *
	 * @param  string $name The name of the setting/control.
	 * @return string
	 */
	public function prepend_slug( $name ) {
		return false === strpos( $name, "{$this->slug}_" ) ? "{$this->slug}_{$name}" : $name;
	}
}
