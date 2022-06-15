<?php
/**
 *  Copyright 2022 Google LLC
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *        http://www.apache.org/licenses/LICENSE-2.0
 *
 *   Unless required by applicable law or agreed to in writing, software
 *   distributed under the License is distributed on an "AS IS" BASIS,
 *   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 *
 * @package MaterialDesign
 */

namespace MaterialDesign\Theme\OptIn;

use WP_REST_Request;
use WP_REST_Response;

/**
 * Class Fse_Opt_In_Rest_Controller
 *
 * @package MaterialDesign\Theme
 */
class Fse_Opt_In_Rest_Controller extends \WP_REST_Controller {

	/**
	 * Constructor.
	 */
	public function __construct() {
		$this->namespace = 'material-design-theme/v1';
		$this->rest_base = 'fse';
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
	 * Get opt in path.
	 *
	 * @return string
	 */
	public function get_opt_in_path() {
		return $this->get_base_path() . 'toggle-fse-opt-in';
	}

	/**
	 * Registers the routes for the Theme API.
	 */
	public function register_routes() {
		register_rest_route(
			$this->namespace,
			'/' . $this->rest_base . '/toggle-fse-opt-in',
			[
				[
					'methods'             => \WP_REST_Server::CREATABLE,
					'callback'            => [ $this, 'fse_opt_in_out' ],
					'permission_callback' => [ $this, 'has_permissions' ],
				],
				'schema' => [ $this, 'get_item_schema' ],
			]
		);
	}

	/**
	 * Determine if the user has permissions to make a request.
	 *
	 * @return boolean
	 */
	public function has_permissions() {
		return current_user_can( 'manage_options' );
	}

	/**
	 * Get the schema, conforming to JSON Schema.
	 *
	 * @return array
	 */
	public function get_item_schema() {
		$schema = [
			'schema'     => 'http://json-schema.org/draft-04/schema#',
			'title'      => 'toggle-fse-opt-in',
			'type'       => 'object',
			'properties' => [
				'checked' => [
					'description' => __( 'Has opt in', 'material-design-google' ),
					'type'        => 'string',
					'context'     => [ 'view', 'edit' ],
					'readonly'    => true,
				],
			],
		];

		return $this->add_additional_fields_schema( $schema );
	}

	/**
	 * Toggle FSE opt in.
	 *
	 * Usage:
	 *  /wp-json/material-design-theme/v1/fse/toggle-fse-opt-in
	 *
	 * @param WP_REST_Request $request REST request object.
	 *
	 * @return mixed
	 */
	public function fse_opt_in_out( $request ) {
		$checked = $request->get_param( 'checked' );

		$response = set_theme_mod( 'fse_opt_option', $checked ? 'in' : 'out' );

		return new WP_REST_Response( $response, 200 );
	}
}
