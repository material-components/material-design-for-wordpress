<?php
/**
 * Bootstraps custom blocks.
 *
 * @package MaterialThemeBuilder
 */

namespace MaterialThemeBuilder;

use MaterialThemeBuilder\Blocks\Posts_List_Block;
use MaterialThemeBuilder\Blocks\Contact_Form_Block;

/**
 * Block type class.
 */
class Block_Types {

	/**
	 * Plugin instance.
	 *
	 * @var Plugin
	 */
	public $plugin;

	/**
	 * Registered dynamic block instances.
	 *
	 * @var array
	 */
	public $blocks = [];

	/**
	 * Associative array of styles required on the frontend for the current post.
	 *
	 * @var array
	 */
	private $frontend_styles = [];

	/**
	 * Associative array of scripts required on the frontend for the current post.
	 *
	 * @var array
	 */
	private $frontend_scripts = [];

	/**
	 * Block_Type constructor.
	 *
	 * @param Plugin $plugin Instance of the plugin abstraction.
	 */
	public function __construct( Plugin $plugin ) {
		$this->plugin = $plugin;
	}

	/**
	 * Initiate the class.
	 */
	public function init() {
		$recent_post_block            = new Posts_List_Block( $this->plugin, 'material/recent-posts' );
		$this->blocks['recent-posts'] = $recent_post_block;

		$hand_picked_post_block = new Posts_List_Block( $this->plugin, 'material/hand-picked-posts' );
		$hand_picked_post_block->init();
		$this->blocks['hand-picked-posts'] = $hand_picked_post_block;

		$contact_form_block = new Contact_Form_Block( $this->plugin );
		$contact_form_block->init();
		$this->blocks['contact-form'] = $contact_form_block;

		add_action( 'init', [ $this, 'register_mdc_assets' ] );
		add_action( 'init', [ $this, 'register_blocks' ] );
		add_action( 'enqueue_block_editor_assets', [ $this, 'enqueue_block_editor_assets' ] );
		add_filter( 'block_categories', [ $this, 'block_category' ] );
		add_action( 'wp_enqueue_scripts', [ $this, 'enqueue_required_frontend_assets' ] );
	}

	/**
	 * Registers assets compiled from Material packages.
	 */
	public function register_mdc_assets() {
		$packages = [
			'@material/button/dist/mdc.button.css',
			'@material/card/dist/mdc.card.css',
			'@material/data-table/dist/mdc.data-table.css',
			'@material/icon-button/dist/mdc.icon-button.css',
			'@material/image-list/dist/mdc.image-list.css',
			'@material/layout-grid/dist/mdc.layout-grid.css',
			'@material/list/dist/mdc.list.css',
			'@material/tab/dist/mdc.tab.css',
			'@material/tab-bar/dist/mdc.tab-bar.css',
			'@material/tab-indicator/dist/mdc.tab-indicator.css',
			'@material/tab-scroller/dist/mdc.tab-scroller.css',
			'@material/textfield/dist/mdc.textfield.css',
			'@material/typography/dist/mdc.typography.css',
		];

		foreach ( $packages as $package_path ) {
			$handle = 'mdc-' . str_replace( '.css', '', explode( 'mdc.', $package_path )[1] );

			wp_register_style(
				$handle,
				$this->plugin->dir_url . 'assets/css/' . $handle . '-compiled.css',
				[],
				$this->plugin->asset_version()
			);
		}
	}

	/**
	 * Provides an array of CSS dependencies for a given handle.
	 *
	 * @param string $handle CSS handle.
	 * @return array CSS dependencies.
	 */
	private function get_block_css_dependencies( $handle ) {
		switch ( $handle ) {
			case 'material-button':
			case 'material-button-editor':
			case 'material-buttons':
			case 'material-buttons-editor':
				return [
					'mdc-button',
					'mdc-icon-button',
				];

			case 'material-card':
			case 'material-card-editor':
			case 'material-cards-collection-editor':
				return [
					'mdc-card',
				];

			case 'material-contact-form-editor':
				return [];


			case 'material-data-table':
			case 'material-data-table-editor':
				return [
					'mdc-data-table',
				];

			case 'material-hand-picked-posts':
			case 'material-hand-picked-posts-editor':
			case 'material-recent-posts':
				return [
					'mdc-button',
					'mdc-card',
				];

			case 'material-image-list':
			case 'material-image-list-editor':
				return [
					'mdc-image-list',
				];

			case 'material-list':
			case 'material-list-editor':
				return [
					'mdc-list',
				];

			case 'material-tab-bar':
			case 'material-tab-bar-editor':
				return [
					'mdc-tab',
					'mdc-tab-bar',
					'mdc-tab-indicator',
					'mdc-tab-scroller',
				];

			default:
				return [];
		}
	}

	/**
	 * Enqueue only the scripts and styles that are needed for the current post.
	 */
	public function enqueue_required_frontend_assets() {
		foreach ( $this->frontend_scripts as $block_name => $handle ) {
			if ( has_block( $block_name ) ) {
				wp_enqueue_script( $handle );
			}
		}

		foreach ( $this->frontend_styles as $block_name => $handle ) {
			if ( has_block( $block_name ) ) {
				wp_enqueue_style( $handle );
			}
		}
	}

	/**
	 * Registers the editor JS for a block.
	 * 
	 * @param string $handle The editor script handle, prefixed by material- and suffixed by -edit.
	 * @param string $type   The asset type. Either script, editor-script, style, or editor-style.
	 */
	private function register_block_editor_asset( $handle, $type = 'editor-script' ) {
		$slug = preg_replace( '/^material-/', '', $handle );
		$slug = preg_replace( '/-editor$/', '', $slug );

		if ( 'editor-style' === $type ) {
			wp_register_style(
				$handle,
				$this->plugin->dir_url . 'assets/css/' . $slug . '-editor-compiled.css',
				array_merge(
					[
						'material-block-editor-css',
						'material-google-fonts',
					],
					$this->get_block_css_dependencies( $handle )
				),
				$this->plugin->asset_version()
			);

			return;
		}

		if ( 'style' === $type ) {
			wp_register_style(
				$handle,
				$this->plugin->dir_url . 'assets/css/' . $slug . '-compiled.css',
				$this->get_block_css_dependencies( $handle ),
				$this->plugin->asset_version()
			);

			return;
		}

		if ( 'script' === $type ) {
			$asset_file = $this->plugin->dir_path . '/assets/js/' . $slug . '.asset.php';

			if ( ! file_exists( $asset_file ) ) {
				return;
			}
	
			$asset = include $asset_file;

			wp_register_script(
				$handle,
				$this->plugin->dir_url . 'assets/js/' . $slug . '.js',
				$asset['dependencies'],
				$asset['version'],
				true
			);

			return;
		}

		$asset_file = $this->plugin->dir_path . '/assets/js/' . $slug . '-editor.asset.php';

		if ( ! file_exists( $asset_file ) ) {
			return;
		}

		$asset = include $asset_file;

		wp_register_script(
			$handle,
			$this->plugin->dir_url . 'assets/js/' . $slug . '-editor.js',
			$asset['dependencies'],
			$asset['version'],
			true
		);
	}

	/**
	 * Register our custom blocks.
	 */
	public function register_blocks() {
		if ( ! function_exists( 'register_block_type' ) ) {
			return;
		}

		$blocks_dir    = $this->plugin->dir_path . '/assets/js/blocks/';
		$block_folders = [
			'button',
			'buttons',
			'card',
			'cards-collection',
			'contact-form',
			'data-table',
			'hand-picked-posts',
			'image-list',
			'list',
			'recent-posts',
			'tab-bar',
		];

		foreach ( $block_folders as $block_name ) {
			$block_json_file = $blocks_dir . $block_name . '/block.json';
			if ( ! file_exists( $block_json_file ) ) {
				continue;
			}

			$metadata = json_decode( file_get_contents( $block_json_file ), true ); // phpcs:ignore WordPressVIPMinimum.Performance.FetchingRemoteData.FileGetContentsUnknown
			if ( ! is_array( $metadata ) || ! isset( $metadata['name'] ) ) {
				continue;
			}

			if ( isset( $metadata['editorScript'] ) ) {
				$this->register_block_editor_asset( $metadata['editorScript'], 'editor-script' );
				$metadata['editor_script'] = $metadata['editorScript'];
				unset( $metadata['editorScript'] );
			} else {
				$metadata['editor_script'] = 'material-block-editor-js';
			}

			if ( isset( $metadata['editorStyle'] ) ) {
				$this->register_block_editor_asset( $metadata['editorStyle'], 'editor-style' );
				$metadata['editor_style'] = $metadata['editorStyle'];
				unset( $metadata['editorStyle'] );
			} else {
				$metadata['editor_style'] = 'material-block-editor-css';
			}

			if ( isset( $metadata['script'] ) ) {
				$this->register_block_editor_asset( $metadata['script'], 'script' );

				// Frontend scripts will be loaded conditionally in wp_enqueue_scripts.
				$this->frontend_scripts[ $metadata['name'] ] = $metadata['script'];
				unset( $metadata['script'] );

			}

			if ( isset( $metadata['style'] ) ) {
				$this->register_block_editor_asset( $metadata['style'], 'style' );

				// Frontend styles will be loaded conditionally in wp_enqueue_scripts.
				$this->frontend_styles[ $metadata['name'] ] = $metadata['style'];
				unset( $metadata['style'] );
			}

			if ( ! empty( $this->blocks[ $block_name ] ) && method_exists( $this->blocks[ $block_name ], 'render_block' ) ) {
				$metadata['render_callback'] = [ $this->blocks[ $block_name ], 'render_block' ];
			}

			/**
			 * Filters the arguments for registering a block type.
			 *
			 * @param array $metadata Array of arguments for registering a block type.
			 */
			$args = apply_filters( 'material_theme_builder_block_type_args', $metadata );

			register_block_type( $metadata['name'], $args );
		}
	}

	/**
	 * Load Gutenberg assets.
	 */
	public function enqueue_block_editor_assets() {
		// Register block editor assets.
		$asset_file   = $this->plugin->dir_path . '/assets/js/block-editor.asset.php';
		$asset        = is_readable( $asset_file ) ? require $asset_file : [];
		$version      = isset( $asset['version'] ) ? $asset['version'] : $this->plugin->asset_version();
		$dependencies = isset( $asset['dependencies'] ) ? $asset['dependencies'] : [];

		wp_register_script(
			'material-block-editor-js',
			$this->plugin->asset_url( 'assets/js/block-editor.js' ),
			$dependencies,
			$version,
			false
		);

		wp_register_style(
			'material-block-editor-css',
			$this->plugin->asset_url( 'assets/css/block-editor-compiled.css' ),
			[],
			$version
		);

		wp_styles()->add_data( 'material-block-editor-css', 'rtl', 'replace' );

		$slug           = $this->plugin->customizer_controls->slug;
		$customizer_url = admin_url( 'customize.php?autofocus[panel]=' . $slug );

		$wp_localized_script_data = [
			'ajax_url'                 => admin_url( 'admin-ajax.php' ),
			'handpicked_posts_preview' => $this->plugin->asset_url( 'assets/images/preview/handpicked-posts.jpg' ),
			'tab_bar_preview'          => $this->plugin->asset_url( 'assets/images/preview/tab-bar.jpg' ),
			'contact_form_preview'     => $this->plugin->asset_url( 'assets/images/preview/contact-form.jpg' ),
			'defaults'                 => [
				'blocks' => $this->get_block_defaults(),
				'colors' => $this->get_color_defaults(),
			],
			'customizerUrls'           => [
				'colors' => add_query_arg( 'autofocus[section]', $slug . '_colors', $customizer_url ),
				'shape'  => add_query_arg( 'autofocus[section]', $slug . '_corner_styles', $customizer_url ),
			],
		];

		if ( Helpers::is_current_user_admin_or_editor_with_manage_options() ) {
			$wp_localized_script_data['allow_contact_form_block']    = true;
			$wp_localized_script_data['recaptcha_ajax_nonce_action'] = wp_create_nonce( 'mtb_recaptcha_ajax_nonce' );
		}

		wp_localize_script( 'material-block-editor-js', 'mtb', $wp_localized_script_data );

		wp_add_inline_style( 'material-block-editor-css', $this->plugin->customizer_controls->get_frontend_css() );

		$fonts_url = $this->plugin->customizer_controls->get_google_fonts_url( 'block-editor' );
		wp_enqueue_style(
			'material-google-fonts',
			esc_url( $fonts_url ),
			[],
			$this->plugin->asset_version()
		);
	}

	/**
	 * Add custom material block category.
	 *
	 * @param array $categories Registered categories.
	 *
	 * @return array
	 */
	public function block_category( $categories ) {
		$categories[] = [
			'slug'  => 'material',
			'title' => __( 'Material Blocks', 'material-theme-builder' ),
		];

		return $categories;
	}

	/**
	 * Get the block default attributes set in customizer.
	 *
	 * @return array
	 */
	public function get_block_defaults() {
		$defaults = [];
		$controls = $this->plugin->customizer_controls;

		// Set corner radius defaults for blocks.
		foreach ( $controls->get_corner_styles_controls() as $control ) {
			$value = $controls->get_option( $control['id'] );
			if ( ! empty( $control['blocks'] ) && is_array( $control['blocks'] ) ) {
				foreach ( $control['blocks'] as $block ) {
					$defaults[ $block ] = array_key_exists( $block, $defaults ) ? $defaults[ $block ] : [];

					// If the value exceeds min or max, limit it.
					if ( isset( $control['min'] ) && $value < $control['min'] ) {
						$value = $control['min'];
					} elseif ( isset( $control['max'] ) && $value > $control['max'] ) {
						$value = $control['max'];
					}

					$defaults[ $block ]['cornerRadius'] = absint( $value );
				}
			}
		}

		return $defaults;
	}

	/**
	 * Get default values for color controls.
	 *
	 * @return array
	 */
	public function get_color_defaults() {
		$defaults = [];
		$controls = $this->plugin->customizer_controls;

		// Set color defaults.
		foreach ( $controls->get_color_controls() as $control ) {
			$value = $controls->get_option( $control['id'] );
			if ( ! empty( $value ) ) {
				$defaults[ $control['id'] ] = $value;
			}
		};

		return $defaults;
	}
}
