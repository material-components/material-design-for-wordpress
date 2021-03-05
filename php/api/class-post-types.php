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

namespace MaterialDesign\Plugin\Api;

use MaterialDesign\Plugin\Plugin;
use WP_REST_Posts_Controller;

/**
 * Class Post_Types
 *
 * @package MaterialDesign\Plugin\Api
 */
class Post_Types extends API_Base {

	/**
	 * Hold the rest post controller.
	 *
	 * @var WP_REST_Posts_Controller
	 */
	private $posts_controller;

	/**
	 * Post_Types constructor.
	 *
	 * @param Plugin $plugin Main Plugin file.
	 */
	public function __construct( $plugin ) {
		parent::__construct( $plugin );

		$this->rest_base = 'post-types';
	}

	/**
	 * Registers the REST routes.
	 */
	public function register_routes() {

		$this->posts_controller = new WP_REST_Posts_Controller( 'post' );

		register_rest_route(
			$this->namespace,
			'/' . $this->rest_base . '/get-posts',
			[
				[
					'methods'             => \WP_REST_Server::READABLE,
					'callback'            => [ $this, 'query_multiple_post_types' ],
					'permission_callback' => '__return_true',
					'schema'              => $this->posts_controller->get_item_schema(),
				],
			]
		);
	}

	/**
	 * Performs the query with support for multiple post types.
	 *
	 * @param \WP_REST_Request $request Request object.
	 */
	public function query_multiple_post_types( \WP_REST_Request $request ) {
		$post_types = apply_filters( 'material_design_query_post_types', get_post_types( [ 'show_in_rest' => true ] ) );

		$query = new \WP_Query(
			[
				'post_type'      => $post_types,
				'categories'     => $request->get_param( 'category' ),
				'posts_per_page' => $request->get_param( 'postsToShow' ),
				'include'        => $request->get_param( 'posts' ),
				'orderby'        => $request->get_param( 'orderby' ),
				'order'          => $request->get_param( 'order' ),
			]
		);

		if ( ! $query->have_posts() ) {
			return new \WP_Error(
				'material_design_no_posts_found',
				esc_html__( 'No posts found.', 'material-design' ),
				[ 'status' => 404 ]
			);
		}

		$posts = [];

		foreach ( $query->posts as $post ) {
			$data    = $this->posts_controller->prepare_item_for_response( $post, $request );
			$posts[] = $this->posts_controller->prepare_response_for_collection( $data );
		}

		return new \WP_REST_Response( $posts );
	}
}