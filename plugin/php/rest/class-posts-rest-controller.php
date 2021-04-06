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

namespace MaterialDesign\Plugin\Rest;

use MaterialDesign\Plugin\Plugin;
use MaterialDesign\Plugin\Blocks\Posts_List_Block;
use WP_REST_Posts_Controller;

/**
 * Class Posts_REST_Controller
 *
 * @package MaterialDesign\Plugin\Rest
 */
class Posts_REST_Controller extends API_Base {

	/**
	 * Hold the rest post controller.
	 *
	 * @var WP_REST_Posts_Controller
	 */
	private $posts_controller;

	/**
	 * Posts_REST_Controller constructor.
	 *
	 * @param Plugin $plugin Main Plugin file.
	 */
	public function __construct( $plugin ) {
		parent::__construct( $plugin );

		$this->rest_base = 'post-types';
	}

	/**
	 * Get the rout to fetch posts.
	 *
	 * @return string
	 */
	public function get_posts_route() {
		return '/' . $this->namespace . '/' . $this->rest_base . '/get-posts';
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
					'permission_callback' => function() {
						return current_user_can( 'edit_posts' );
					},
					'args'                => [
						'post_type' => [
							'default'           => 'posts-pages',
							'sanitize_callback' => 'sanitize_text_field',
						],
					],
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
		$post_types = array_keys( Posts_List_Block::get_supported_post_types() );
		$post_type  = $request->get_param( 'post_type' );

		if ( 'posts-pages' !== $post_type && ! in_array( $post_type, (array) $post_types, true ) ) {
			return new \WP_Error(
				'material_design_invalid_post_type',
				esc_html__( 'Invalid post type.', 'material-design' ),
				[ 'status' => 400 ]
			);
		}

		$post_type = 'posts-pages' === $post_type ? [ 'page', 'post' ] : $post_type;

		$query_args = [
			'post_type'           => $post_type,
			'categories'          => $request->get_param( 'category' ),
			'posts_per_page'      => $request->get_param( 'per_page' ),
			'orderby'             => $request->get_param( 'orderby' ),
			'order'               => $request->get_param( 'order' ),
			'ignore_sticky_posts' => true,
		];

		if ( ! empty( $request->get_param( 'include' ) ) ) {
			$query_args['post__in'] = $request->get_param( 'include' );
		}

		$query = new \WP_Query( $query_args );

		if ( ! $query->have_posts() ) {
			return new \WP_REST_Response( [] );
		}

		$posts = [];

		foreach ( $query->posts as $post ) {
			$data    = $this->posts_controller->prepare_item_for_response( $post, $request );
			$posts[] = $this->posts_controller->prepare_response_for_collection( $data );
		}

		return new \WP_REST_Response( $posts );
	}
}
