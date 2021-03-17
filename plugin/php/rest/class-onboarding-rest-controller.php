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
 * Class Onboarding_REST_Controller.
 *
 * @package MaterialDesign
 */

namespace MaterialDesign\Plugin\Rest;

use MaterialDesign\Plugin\Plugin;

/**
 * Class Onboarding_REST_Controller.
 */
class Onboarding_REST_Controller extends API_Base {
	/**
	 * Plugin class.
	 *
	 * @var Plugin
	 */
	public $plugin;

	/**
	 * Constructor.
	 *
	 * @param Plugin $plugin Instance of the plugin abstraction.
	 */
	public function __construct( $plugin ) {
		parent::__construct( $plugin );

		$this->rest_base = 'onboarding';
	}

	/**
	 * Registers the routes for the Theme API.
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
			return new \WP_Error( 'material_rest_cannot_update', __( 'Sorry, you cannot manage themes or import content.', 'material-design' ), [ 'status' => rest_authorization_required_code() ] );
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
				'material_design_theme_install',
				__( 'The Material Design Theme could not be installed. Theme API call failed.', 'material-design' ),
				[ 'status' => 500 ]
			);
		}

		// @codeCoverageIgnoreStart
		$upgrader = new \Theme_Upgrader( new \Automatic_Upgrader_Skin() );
		$result   = $upgrader->install( $api->download_link );

		if ( is_wp_error( $result ) || is_null( $result ) ) {
			return new \WP_Error(
				'material_design_theme_install',
				__( 'The Material Design Theme could not be installed.', 'material-design' ),
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
			return new \WP_Error( 'material_invalid_theme', __( 'The Material Design Theme is not installed.', 'material-design' ), [ 'status' => 500 ] );
		}

		$result = switch_theme( Plugin::THEME_SLUG );

		// @codeCoverageIgnoreStart
		if ( ! is_null( $result ) ) {
			return new \WP_Error( 'material_invalid_theme', __( 'The Material Design Theme cannot be activated.', 'material-design' ), [ 'status' => 500 ] );
		}

		update_option( 'material_onboarding', true, false );
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
				__( 'Material Design demo content could not be installed.', 'material-design' ),
				[ 'status' => 500 ]
			);
		}

		update_option( 'material_onboarding', true, false );
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
					'description' => __( 'Action slug.', 'material-design' ),
					'type'        => 'string',
					'context'     => [ 'view', 'edit' ],
					'readonly'    => true,
				],
				'name'   => [
					'description' => __( 'Action readable name.', 'material-design' ),
					'type'        => 'string',
					'context'     => [ 'view', 'edit' ],
					'readonly'    => true,
				],
				'status' => [
					'description' => __( 'Success status.', 'material-design' ),
					'type'        => 'string',
					'context'     => [ 'view', 'edit' ],
					'readonly'    => true,
				],
			],
		];

		return $this->add_additional_fields_schema( $schema );
	}
}
