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
 * Bootstraps custom blocks.
 *
 * @package MaterialDesign
 */

namespace MaterialDesign\Plugin;

use MaterialDesign\Plugin\Blocks\Card_Block;
use MaterialDesign\Plugin\Blocks\Posts_List_Block;
use MaterialDesign\Plugin\Blocks\Contact_Form_Block;

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

		add_action( 'init', [ $this, 'register_blocks' ] );
		add_action( 'enqueue_block_editor_assets', [ $this, 'enqueue_block_editor_assets' ] );
		// For 5.8 WP use block_categories_all filter.
		if ( version_compare( get_bloginfo( 'version' ), '5.8', '>=' ) ) {
			add_filter( 'block_categories_all', [ $this, 'block_category' ] );
		} else {
			add_filter( 'block_categories', [ $this, 'block_category' ] );
		}

		// Override global style class.
		$static_card_blocks = [
			'material/cards-collection',
			'material/card',
		];

		foreach ( $static_card_blocks as $static_card_block ) {
			$static_block = new Card_Block( $this->plugin, $static_card_block );
			$static_block->init();
		}
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
			if ( ! is_array( $metadata ) || ! $metadata['name'] ) {
				continue;
			}

			$metadata['editor_script'] = 'material-block-editor-js';
			$metadata['editor_style']  = 'material-block-editor-css';

			if ( ! empty( $this->blocks[ $block_name ] ) && method_exists( $this->blocks[ $block_name ], 'render_block' ) ) {
				$metadata['render_callback'] = [ $this->blocks[ $block_name ], 'render_block' ];
			}

			/**
			 * Filters the arguments for registering a block type.
			 *
			 * @param array $metadata Array of arguments for registering a block type.
			 */
			$args = apply_filters( 'material_design_block_type_args', $metadata );

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

		// Remove any unregistered deps for back-compat.
		foreach ( $dependencies as $index => $script ) {
			if ( ! wp_script_is( $script, 'registered' ) ) {
				unset( $dependencies[ $index ] );
			}
		}

		// Enqueue RichText polyfills if WP version is less than 5.3.
		if ( version_compare( get_bloginfo( 'version' ), '5.3', '<' ) ) {
			wp_enqueue_script(
				'material-block-editor-polyfills',
				$this->plugin->asset_url( 'assets/js/polyfills.js' ),
				[],
				$version,
				false
			);
		}

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

		// Posts and Pages is not a post type. It's a combination. Set it manually.
		$post_types = [
			[
				'label' => esc_html__( 'Posts and Pages', 'material-design' ),
				'value' => 'posts-pages',
				'route' => $this->plugin->posts_rest_controller->get_posts_route(),
			],
		];

		// Only find post types that are available in_rest, and parse them into expected data structure.
		$post_type_objects = Posts_List_Block::get_supported_post_types();

		foreach ( $post_type_objects as $slug => $post_type ) {
			$controller = $this->get_rest_controller( $post_type );

			if ( $controller && ! in_array( $slug, [ 'attachment', 'wp_block', 'post', 'page' ] ) ) {
				$route = '';

				if ( in_array( get_class( $controller ), [ 'WP_REST_Posts_Controller' ], true ) ) {
					$namespace = 'wp/v2';
					$rest_base = ! empty( $post_type->rest_base ) ? $post_type->rest_base : $post_type->name;
					$route     = sprintf( '/%s/%s', $namespace, $rest_base );
				}

				$post_types[] = [
					'label' => esc_html( $post_type->label ),
					'value' => esc_attr( $slug ),
					'route' => apply_filters( 'material_design_post_type_rest_route', $route, $post_type ),
				];
			}
		}

		$wp_localized_script_data = [
			'ajax_url'                  => admin_url( 'admin-ajax.php' ),
			'handpicked_posts_preview'  => $this->plugin->asset_url( 'assets/images/preview/handpicked-posts.jpg' ),
			'tab_bar_preview'           => $this->plugin->asset_url( 'assets/images/preview/tab-bar.jpg' ),
			'contact_form_preview'      => $this->plugin->asset_url( 'assets/images/preview/contact-form.jpg' ),
			'defaults'                  => [
				'blocks'      => $this->get_block_defaults(),
				'colors'      => $this->get_color_defaults(),
				'globalStyle' => $this->get_global_styles(),
			],
			'customizerUrls'            => [
				'colors' => add_query_arg( 'autofocus[section]', $slug . '_colors', $customizer_url ),
				'shape'  => add_query_arg( 'autofocus[section]', $slug . '_corner_styles', $customizer_url ),
			],
			'postTypes'                 => $post_types,
			'doesRequireBackCompatList' => version_compare( get_bloginfo( 'version' ), '5.8', '<' ),
		];

		if ( Helpers::is_current_user_admin_or_editor_with_manage_options() ) {
			$wp_localized_script_data['allow_contact_form_block']    = true;
			$wp_localized_script_data['recaptcha_ajax_nonce_action'] = wp_create_nonce( 'material_design_recaptcha_ajax_nonce' );
		}

		wp_localize_script( 'material-block-editor-js', 'materialDesign', $wp_localized_script_data );

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
			'title' => __( 'Material Blocks', 'material-design' ),
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

	/**
	 * Gets the REST API controller for a post type.
	 *
	 * Will only instantiate the controller class once per request.
	 *
	 * @param WP_Post_Type $post_type The post type object.
	 *
	 * @see https://core.trac.wordpress.org/browser/tags/5.7/src/wp-includes/class-wp-post-type.php#L748
	 *
	 * @return WP_REST_Controller|null The controller instance, or null if the post type
	 *                                 is set not to show in rest.
	 */
	public function get_rest_controller( $post_type ) {
		if ( ! $post_type || ! is_a( $post_type, '\WP_Post_Type' ) ) {
			return null;
		}

		if ( method_exists( $post_type, 'get_rest_controller' ) ) {
			return $post_type->get_rest_controller();
		}

		if ( ! $post_type->show_in_rest ) {
			return null;
		}

		$class = $post_type->rest_controller_class ? $post_type->rest_controller_class : \WP_REST_Posts_Controller::class;

		if ( ! class_exists( $class ) ) {
			return null;
		}

		if ( ! is_subclass_of( $class, \WP_REST_Controller::class ) ) {
			return null;
		}

		if ( ! empty( $post_type->rest_controller ) ) {
			return $post_type->rest_controller;
		}

		return new $class( $post_type->name );
	}

	/**
	 * Get global style configs.
	 *
	 * @param string $key get single value.
	 *
	 * @return array|string
	 */
	public function get_global_styles( $key = null ) {
		$defaults = [];
		$controls = $this->plugin->customizer_controls;

		foreach ( $controls->get_global_style_controls() as $control ) {
			$value = $controls->get_option( $control['id'] );
			if ( ! empty( $value ) ) {
				$defaults[ $control['id'] ] = $value;
			}
		}

		return ( $key ? ( isset( $defaults[ $key ] ) ? $defaults[ $key ] : '' ) : $defaults );
	}
}
