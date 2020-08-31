<?php
/**
 * Class Onboarding_REST_Controller.
 *
 * @package MaterialThemeBuilder
 */

namespace MaterialThemeBuilder;

use MaterialThemeBuilder\Plugin;

/**
 * Class Onboarding_REST_Controller.
 */
class Onboarding_REST_Controller extends \WP_REST_Controller {
	/**
	 * Constructor.
	 *
	 * @param Plugin $plugin Instance of the plugin abstraction.
	 */
	public function __construct( $plugin ) {
		$this->plugin    = $plugin;
		$this->namespace = 'material-theme-builder/v1';
		$this->rest_base = 'onboarding';
	}

	/**
	 * Initiate the class.
	 */
	public function init() {
		$this->plugin->add_doc_hooks( $this );
	}

	/**
	 * Get the base URL for this controller.
	 *
	 * @return string
	 */
	public function get_rest_base_url() {
		return esc_url( rest_url( "/{$this->namespace}/{$this->rest_base}/" ) );
	}

	/**
	 * Registers the routes for the Theme API.
	 *
	 * @action rest_api_init
	 */
	public function register_routes() {
		register_rest_route(
			$this->namespace,
			'/' . $this->rest_base . '/install-theme',
			[
				[
					'methods'             => \WP_REST_Server::EDITABLE,
					'callback'            => [ $this, 'install_theme' ],
					'permission_callback' => [ $this, 'update_item_permissions_check' ],
				],
				'schema' => [ $this, 'get_item_schema' ],
			]
		);

		register_rest_route(
			$this->namespace,
			'/' . $this->rest_base . '/activate-theme',
			[
				[
					'methods'             => \WP_REST_Server::EDITABLE,
					'callback'            => [ $this, 'activate_theme' ],
					'permission_callback' => [ $this, 'update_item_permissions_check' ],
				],
				'schema' => [ $this, 'get_item_schema' ],
			]
		);

		register_rest_route(
			$this->namespace,
			'/' . $this->rest_base . '/install-content',
			[
				[
					'methods'             => \WP_REST_Server::EDITABLE,
					'callback'            => [ $this, 'import_content' ],
					'permission_callback' => [ $this, 'update_item_permissions_check' ],
				],
				'schema' => [ $this, 'get_item_schema' ],
			]
		);
	}

	/**
	 * Check if a given request has access to manage themes.
	 *
	 * @param  WP_REST_Request $request Full details about the request.
	 * @return WP_Error|boolean
	 */
	public function update_item_permissions_check( $request ) {
		if ( ! current_user_can( 'install_themes' ) ) {
			return new \WP_Error( 'material_rest_cannot_update', __( 'Sorry, you cannot manage themes or import content.', 'material-theme-builder' ), [ 'status' => rest_authorization_required_code() ] );
		}
		return true;
	}

	/**
	 * Installs the material theme.
	 *
	 * @param  WP_REST_Request $request Full details about the request.
	 * @return WP_Error|array Theme installation status.
	 */
	public function install_theme( $request ) {
		$installed_themes = wp_get_themes();

		if ( in_array( Plugin::THEME_SLUG, array_keys( $installed_themes ), true ) ) {
			return( [
				'slug'   => Plugin::THEME_SLUG,
				'name'   => $installed_themes[ Plugin::THEME_SLUG ]->get( 'Name' ),
				'status' => 'success',
			] );
		}

		// @codeCoverageIgnoreStart
		include_once ABSPATH . '/wp-admin/includes/admin.php';
		include_once ABSPATH . '/wp-admin/includes/theme-install.php';
		include_once ABSPATH . '/wp-admin/includes/theme.php';
		include_once ABSPATH . '/wp-admin/includes/class-wp-upgrader.php';
		include_once ABSPATH . '/wp-admin/includes/class-theme-upgrader.php';

		// @todo Remove after the theme is published to WP theme repo.
		add_filter(
			'themes_api',
			function( $return, $action, $args ) {
				if ( 'theme_information' === $action && isset( $args->slug ) && Plugin::THEME_SLUG === $args->slug ) {
					return (object) [
						'name'          => 'Material Theme',
						'download_link' => 'https://storage.googleapis.com/xwp-mdc/material-theme/material-theme.zip',
					];
				}

				return $return;
			},
			10,
			3
		);
		// @codeCoverageIgnoreEnd

		$api = themes_api(
			'theme_information',
			[
				'slug'   => Plugin::THEME_SLUG,
				'fields' => [
					'sections' => false,
				],
			]
		);

		if ( is_wp_error( $api ) ) {
			return new \WP_Error(
				'material_theme_install',
				__( 'Material theme could not be installed. Theme API call failed.', 'material-theme-builder' ),
				[ 'status' => 500 ]
			);
		}

		// @codeCoverageIgnoreStart
		$upgrader = new \Theme_Upgrader( new \Automatic_Upgrader_Skin() );
		$result   = $upgrader->install( $api->download_link );

		if ( is_wp_error( $result ) || is_null( $result ) ) {
			return new \WP_Error(
				'material_theme_install',
				__( 'Material theme could not be installed.', 'material-theme-builder' ),
				[ 'status' => 500 ]
			);
		}

		return [
			'slug'   => Plugin::THEME_SLUG,
			'name'   => $api->name,
			'status' => 'success',
		];
		// @codeCoverageIgnoreEnd
	}

	/**
	 * Activate the material theme.
	 *
	 * @param  WP_REST_Request $request Full details about the request.
	 * @return WP_Error|array Theme activation status.
	 */
	public function activate_theme( $request ) {
		require_once ABSPATH . 'wp-admin/includes/theme.php';

		$installed_themes = wp_get_themes();

		if ( ! in_array( Plugin::THEME_SLUG, array_keys( $installed_themes ), true ) ) {
			return new \WP_Error( 'material_invalid_theme', __( 'Material theme is not installed.', 'material-theme-builder' ), [ 'status' => 500 ] );
		}

		$result = switch_theme( Plugin::THEME_SLUG );

		// @codeCoverageIgnoreStart
		if ( ! is_null( $result ) ) {
			return new \WP_Error( 'material_invalid_theme', __( 'Material theme cannot be activated.', 'material-theme-builder' ), [ 'status' => 500 ] );
		}
		// @codeCoverageIgnoreEnd

		return( [
			'slug'   => Plugin::THEME_SLUG,
			'name'   => $installed_themes[ Plugin::THEME_SLUG ]->get( 'Name' ),
			'status' => 'success',
		] );
	}

	/**
	 * Call to importer
	 *
	 * @param  WP_REST_Request $request Full details about the request.
	 * @return WP_Error|array Theme installation status.
	 */
	public function import_content( $request ) {
		include_once ABSPATH . 'wp-admin/includes/media.php';
		include_once ABSPATH . 'wp-admin/includes/file.php';
		include_once ABSPATH . 'wp-admin/includes/image.php';

		$result = $this->plugin->importer->init_import();

		// @codeCoverageIgnoreStart
		if ( is_wp_error( $result ) || is_null( $result ) ) {
			return new \WP_Error(
				'material_importer',
				__( 'Material demo content could not be installed.', 'material-theme-builder' ),
				[ 'status' => 500 ]
			);
		}
		// @codeCoverageIgnoreEnd

		return [
			'slug'   => 'demo-importer',
			'name'   => 'Demo Importer',
			'status' => esc_html( $result ),
		];
	}

	/**
	 * Get the schema, conforming to JSON Schema.
	 *
	 * @return array
	 */
	public function get_item_schema() {
		$schema = [
			'schema'     => 'http://json-schema.org/draft-04/schema#',
			'title'      => 'onboarding',
			'type'       => 'object',
			'properties' => [
				'slug'   => [
					'description' => __( 'Action slug.', 'material-theme-builder' ),
					'type'        => 'string',
					'context'     => [ 'view', 'edit' ],
					'readonly'    => true,
				],
				'name'   => [
					'description' => __( 'Action readable name.', 'material-theme-builder' ),
					'type'        => 'string',
					'context'     => [ 'view', 'edit' ],
					'readonly'    => true,
				],
				'status' => [
					'description' => __( 'Success status.', 'material-theme-builder' ),
					'type'        => 'string',
					'context'     => [ 'view', 'edit' ],
					'readonly'    => true,
				],
			],
		];

		return $this->add_additional_fields_schema( $schema );
	}
}
