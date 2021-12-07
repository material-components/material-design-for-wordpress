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
 * Base class to allow sharing functionality between blocks listing posts
 * such as Recent Posts and Hand-picked posts blocks.
 *
 * @package MaterialDesign
 */

namespace MaterialDesign\Plugin\Blocks;

use MaterialDesign\Plugin\Plugin;
use MaterialDesign\Plugin\Template;
use WP_Post;
use WP_Query;
use WP_REST_Request;
use WP_REST_Response;

/**
 * Posts_List_Block class.
 */
class Posts_List_Block {
	/**
	 * Block name.
	 *
	 * @var string
	 */
	public $block_name;

	/**
	 * Constructor.
	 *
	 * @access public
	 *
	 * @param Plugin $plugin     Plugin instance.
	 * @param string $block_name Name of the block.
	 */
	public function __construct( Plugin $plugin, $block_name ) {
		$this->plugin     = $plugin;
		$this->block_name = $block_name;
	}

	/**
	 * Initiate the class.
	 *
	 * @return void
	 */
	public function init() {
		add_filter( 'rest_post_collection_params', [ $this, 'add_comment_count_to_rest_orderby_params' ] );
		add_action( 'init', [ $this, 'register_hooks' ], 100 );
	}

	/**
	 * Register hooks.
	 */
	public function register_hooks() {
		foreach ( array_keys( self::get_supported_post_types() ) as $post_type ) {
			add_filter( "rest_prepare_$post_type", [ $this, 'add_extra_post_meta' ], 10, 3 );
		}
	}

	/**
	 * Add extra post meta such as comments count, author related info.
	 *
	 * @access public
	 *
	 * @param WP_REST_Response $response Rest API response.
	 * @param WP_Post          $post     Post data.
	 * @param WP_REST_Request  $request  Rest API request data.
	 *
	 * @return WP_REST_Response
	 */
	public function add_extra_post_meta( WP_REST_Response $response, WP_Post $post, WP_REST_Request $request ) {
		$context = $request->get_param( 'context' );

		if ( 'edit' === $context && current_user_can( 'edit_posts' ) ) {
			$response->data['authorDisplayName'] = get_the_author_meta( 'display_name', $post->post_author );
			$response->data['authorUrl']         = get_author_posts_url( $post->post_author );
			$response->data['commentsCount']     = (int) get_comments_number( $post->id );
		}

		return $response;
	}

	/**
	 * Add comment_count to the list of permitted orderby values
	 *
	 * @access public
	 *
	 * @param array $params Rest API parameters.
	 *
	 * @return array
	 */
	public function add_comment_count_to_rest_orderby_params( $params ) {
		$params['orderby']['enum'][] = 'comment_count';
		return $params;
	}

	/**
	 * Renders the `material/recent-posts` or `material/hand-picked-posts` block on server.
	 *
	 * @access public
	 *
	 * @param array $attributes The block attributes.
	 *
	 * @return string Returns the post content with latest posts added.
	 */
	public function render_block( $attributes ) {
		$class = 'wp-block-material-posts-list';
		if ( isset( $attributes['align'] ) ) {
			$class .= ' align' . $attributes['align'];
		}
		$content = '<!-- No posts found -->';

		$args = [
			'posts_per_page'         => $attributes['postsToShow'],
			'post_status'            => 'publish',
			'no_found_rows'          => true,
			'update_post_meta_cache' => false,
			'ignore_sticky_posts'    => true,
			'orderby'                => 'date',
			'order'                  => 'desc',
		];

		if ( ! empty( $attributes['category'] ) && 'material/recent-posts' === $this->block_name ) {
			$args['cat'] = absint( $attributes['category'] );
		}

		if ( 'material/hand-picked-posts' === $this->block_name ) {
			if ( empty( $attributes['posts'] ) ) {
				return sprintf(
					'<div class="%s">%s</div>',
					esc_attr( $class ),
					$content
				);
			}

			if ( ! empty( $attributes['orderby'] ) ) {
				if ( 'title' === $attributes['orderby'] ) {
					$args['orderby'] = 'title';
					$args['order']   = 'asc';
				} elseif ( 'popularity' === $attributes['orderby'] ) {
					$args['orderby'] = 'comment_count';
					$args['order']   = 'desc';
				}
			}

			$post_type              = isset( $attributes['postType'] ) ? $attributes['postType'] : 'posts-pages';
			$ids                    = array_map( 'absint', $attributes['posts'] );
			$args['post__in']       = $ids;
			$args['posts_per_page'] = count( $ids ); // phpcs:ignore WordPress.WP.PostsPerPage.posts_per_page_posts_per_page
			$args['post_type']      = 'posts-pages' === $post_type ? [ 'post', 'page' ] : $post_type;
		}

		/**
		 * Filters the args for recent posts WP_Query.
		 *
		 * @param array $args       The args for the WP_Query.
		 * @param array $attributes The block's attributes.
		 */
		$args = apply_filters( 'material_design_recent_posts_query_args', $args, $attributes );

		$posts_query = new WP_Query( $args );

		// If we have posts and a valid layout style, load the template.
		if ( $posts_query->have_posts() && in_array( $attributes['style'], [ 'grid', 'list', 'masonry' ], true ) ) {
			ob_start();

			// Determine the template to show.
			$template = in_array( $attributes['style'], [ 'grid', 'list' ], true ) ? 'list-grid' : 'masonry';

			Template::get_template(
				"posts-{$template}.php",
				[
					'posts_query' => $posts_query,
					'attributes'  => $attributes,
				]
			);

			$content = ob_get_clean();
		}

		return sprintf(
			'<div class="%s">%s</div>',
			esc_attr( $class ),
			$content
		);
	}

	/**
	 * Get supported post types.
	 *
	 * @return array
	 */
	public static function get_supported_post_types() {
		return apply_filters(
			'material_design_query_post_types',
			array_filter(
				get_post_types(
					[
						'show_in_rest' => true,
						'public'       => true,
					],
					'objects'
				),
				function ( $post_type ) {
					// Ignore attachment and wp_block post types.
					return ! array_key_exists(
						$post_type,
						[
							'attachment' => 1,
							'wp_block'   => 1,
						]
					);
				},
				ARRAY_FILTER_USE_KEY
			)
		);
	}
}
