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
 * Class Admin.
 *
 * @package MaterialDesign
 */

namespace MaterialDesign\Plugin;

use MaterialDesign\Plugin\Api\Update_Fonts;
use MaterialDesign\Plugin\Api\Update_Icons;
use WP_Error;
use WP_REST_Request;
use WP_REST_Response;

/**
 * Class Design_Assets_Rest_Controller
 *
 * @package MaterialDesign\Plugin
 */
class Design_Assets_Rest_Controller extends \WP_REST_Controller {
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
		$this->plugin    = $plugin;
		$this->namespace = 'material-design/v1';
		$this->rest_base = 'design-assets';
	}

	/**
	 * Initiate the class and hooks.
	 */
	public function init() {
		add_action( 'rest_api_init', [ $this, 'register_routes' ] );
	}

	/**
	 * Get the base URL for this controller.
	 *
	 * @return string
	 */
	public function get_base_path() {
		return esc_url( "/{$this->namespace}/{$this->rest_base}/" );
	}

	/**
	 * Registers the routes for the Theme API.
	 */
	public function register_routes() {
		register_rest_route(
			$this->namespace,
			'/' . $this->rest_base . '/retrieve-fonts(?:/(?P<force>force))?',
			[
				[
					'methods'             => \WP_REST_Server::READABLE,
					'callback'            => [ $this, 'get_fonts' ],
					'permission_callback' => function( WP_REST_Request $request ) {
						return current_user_can( 'manage_options' );
					},
				],
				'schema' => [ $this, 'get_item_schema' ],
			]
		);

		register_rest_route(
			$this->namespace,
			'/' . $this->rest_base . '/retrieve-icons(?:/(?P<force>force))?',
			[
				[
					'methods'             => \WP_REST_Server::READABLE,
					'callback'            => [ $this, 'get_icons' ],
					'permission_callback' => function( WP_REST_Request $request ) {
						return current_user_can( 'manage_options' );
					},
				],
				'schema' => [ $this, 'get_item_schema' ],
			]
		);

		register_rest_route(
			$this->namespace,
			'/' . $this->rest_base . '/register-api-key',
			[
				[
					'methods'             => \WP_REST_Server::CREATABLE,
					'callback'            => [ $this, 'register_api_key' ],
					'permission_callback' => function( WP_REST_Request $request ) {
						return current_user_can( 'manage_options' );
					},
				],
				'schema' => [ $this, 'get_item_schema' ],
			]
		);
	}

	/**
	 * Get the schema, conforming to JSON Schema.
	 *
	 * @return array
	 */
	public function get_item_schema() {
		$schema = [
			'schema'     => 'http://json-schema.org/draft-04/schema#',
			'title'      => 'design-assets',
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

	/**
	 * Retrieve, and potentially update, Icons and Fonts
	 */
	public function retrieve_assets() {
		$data = [
			'fonts' => $this->get_fonts(),
			'icons' => $this->get_icons(),
		];

		wp_send_json( $data );
	}

	/**
	 * Returns fonts data
	 *
	 * @param WP_REST_Request $request REST request object.
	 *
	 * @return false|\stdClass|string
	 */
	public function get_fonts( $request ) {
		$force = $request->get_param( 'force' );

		$fonts = new Update_Fonts( 'force' === $force, false, true );

		if ( ! $fonts->has_api_key() ) {
			return new WP_Error(
				'rest_fonts_no_api_key',
				$fonts->material_design_no_apikey_textonly()
			);
		}

		$data  = $fonts->get_fonts();
		$count = count( $data->data );

		if ( 0 === $count ) {
			return new WP_Error(
				'rest_fonts_unknown_error',
				esc_html__( 'No fonts were returned, please verify your API Key is valid', 'material-design' )
			);
		}

		$parsed = (object) [
			'page'        => 1,
			'per_page'    => $count,
			'count'       => $count,
			'total_pages' => 1,
			'lastUpdated' => $this->get_fonts_last_updated(),
			'data'        => (array) $data->data,
		];

		return $parsed;
	}

	/**
	 * Returns fonts data.
	 * Usage:
	 *  /wp-json/material-design/v1/design-assets/retrieve-icons
	 *  /wp-json/material-design/v1/design-assets/retrieve-icons/force (forces load from HTTP source)
	 *
	 * @param WP_REST_Request $request REST request object.
	 *
	 * @return mixed
	 */
	public function get_icons( $request ) {
		$force = $request->get_param( 'force' );

		$icons = new Update_Icons( 'force' === $force );
		$data  = $icons->get_icons();
		$count = count( $data->data );

		$parsed = (object) [
			'page'        => 1,
			'per_page'    => $count,
			'count'       => $count,
			'total_pages' => 1,
			'data'        => $data->data,
		];

		return $parsed;
	}

	/**
	 * Insert API Key in options table
	 * Usage:
	 *  /wp-json/material-design/v1/design-assets/register-api-key
	 *
	 * @param WP_REST_Request $request REST request object.
	 *
	 * @return mixed
	 */
	public function register_api_key( $request ) {
		$api_key = $request->get_param( 'key' );

		if ( empty( $api_key ) ) {
			$response = delete_option( $this->plugin->get_api_slug() );
		} else {
			$response = update_option( $this->plugin->get_api_slug(), $api_key );
		}


		if ( is_wp_error( $response ) ) {
			return $response;
		}

		return new WP_REST_Response( $response, 200 );
	}

	/**
	 * Return last updated value in miliseconds
	 *
	 * @return int Unix timestamp * 1000
	 */
	public function get_fonts_last_updated() {
		return absint( Update_Fonts::get_last_updated() ) * 1000;
	}

	/**
	 * Return last updated value in miliseconds
	 *
	 * @return int Unix timestamp * 1000
	 */
	public function get_icons_last_updated() {
		return absint( Update_Icons::get_last_updated() ) * 1000;
	}
}
