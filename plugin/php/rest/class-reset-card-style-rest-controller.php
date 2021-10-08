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

/**
 * Class Reset_Card_Style_Controller
 *
 * @package MaterialDesign\Plugin\Rest
 */
class Reset_Card_Style_Rest_Controller extends API_Base {

	/**
	 * Posts_REST_Controller constructor.
	 *
	 * @param Plugin $plugin Main Plugin file.
	 */
	public function __construct( $plugin ) {
		parent::__construct( $plugin );

		$this->rest_base = 'migrate-global-card-style';
	}

	/**
	 * Get the route to fetch posts.
	 *
	 * @return string
	 */
	public function get_route() {
		return '/' . $this->namespace . '/' . $this->rest_base;
	}

	/**
	 * Registers the REST routes.
	 */
	public function register_routes() {

		register_rest_route(
			$this->namespace,
			'/' . $this->rest_base,
			[
				[
					'methods'             => \WP_REST_Server::CREATABLE,
					'callback'            => [ $this, 'migrate_posts' ],
					'permission_callback' => function() {
						// Since we are running migration for multiple post-types.
						return current_user_can( 'manage_options' );
					},
					'args'                => [],
					'schema'              => [],
				],
			]
		);
	}

	/**
	 * Performs the query with support for multiple post types.
	 *
	 * @param \WP_REST_Request $request Request object.
	 */
	public function migrate_posts( \WP_REST_Request $request ) {
		global $wpdb;

		$editor_support_post_types = get_post_types_by_support( 'editor' );
		$public_post_type          = get_post_types(
			[
				'public' => true,
			]
		);
		$post_types                = array_intersect( $editor_support_post_types, $public_post_type );
		$post_types                = implode( "','", $post_types );

		$result = $wpdb->get_col( $wpdb->prepare( "SELECT ID FROM {$wpdb->posts} WHERE post_type IN ('" . $post_types . "') AND ( post_content LIKE %s OR post_content like %s ) limit 100", '%"cardStyle":"outlined"%', '%"cardStyle":"elevated"%' ) ); // phpcs:ignore WordPress.DB.DirectDatabaseQuery.DirectQuery, WordPress.DB.DirectDatabaseQuery.NoCaching, WordPress.DB.PreparedSQL.NotPrepared
		// Hook to ignore modified date.
		add_filter( 'wp_insert_post_data', [ $this, 'stop_modified_date_update' ], 10, 2 );
		foreach ( $result as $post_id ) {
			$post               = get_post( $post_id );
			$post->post_content = str_replace(
				[
					'"cardStyle":"outlined"',
					'"cardStyle":"elevated"',
				],
				'"cardStyle":"global"',
				$post->post_content
			);
			$post->post_content = str_replace(
				' mdc-card--outlined',
				'',
				$post->post_content
			);
			$post->post_content = str_replace( 'mdc-card ', 'mdc-card mdc-card--global-override ', $post->post_content );
			wp_update_post( $post->to_array() );
			clean_post_cache( $post->ID );
		}
		remove_filter( 'wp_insert_post_data', [ $this, 'stop_modified_date_update' ] );

		return new \WP_REST_Response(
			[
				'pending' => count( $result ) === 100,
			]
		);
	}

	/**
	 * Stop modified date update for migrated posts.
	 *
	 * @param array $new new array.
	 * @param array $old old array.
	 *
	 * @return array
	 */
	public function stop_modified_date_update( $new, $old ) {
		if ( empty( $old['post_modified'] ) || empty( $old['post_modified_gmt'] ) || ( ! empty( $new['post_type'] ) && $new['post_type'] === 'revision' ) ) {
			return $new;
		}
		$new['post_modified']     = $old['post_modified'];
		$new['post_modified_gmt'] = $old['post_modified_gmt'];

		return $new;
	}
}
