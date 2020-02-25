<?php
/**
 * Recent Posts Block class.
 *
 * @package MaterialThemeBuilder
 */

namespace MaterialThemeBuilder\Blocks;

use MaterialThemeBuilder\Plugin;
use MaterialThemeBuilder\Template;
use WP_Post;
use WP_Query;
use WP_REST_Request;
use WP_REST_Response;

/**
 * Recent_Posts_Block class.
 */
class Recent_Posts_Block {

	/**
	 * Plugin class.
	 *
	 * @var Plugin
	 */
	public $plugin;

	/**
	 * Constructor.
	 *
	 * @access public
	 *
	 * @param Plugin $plugin Plugin instance.
	 */
	public function __construct( Plugin $plugin ) {
		$this->plugin = $plugin;
	}

	/**
	 * Initiate the class.
	 *
	 * @access public
	 */
	public function init() {
		$this->plugin->add_doc_hooks( $this );
	}

	/**
	 * Add comments count to post rest api.
	 *
	 * @access public
	 *
	 * @filter rest_prepare_post
	 *
	 * @param WP_REST_Response $response Rest API response.
	 * @param WP_Post          $post     Post data.
	 * @param WP_REST_Request  $request  Rest API request data.
	 *
	 * @return WP_REST_Response
	 */
	public function add_comments_count( WP_REST_Response $response, WP_Post $post, WP_REST_Request $request ) {
		$context = $request->get_param( 'context' );

		if ( 'edit' === $context && 'post' === $post->post_type ) {
			$response->data['authorDisplayName'] = get_the_author_meta( 'display_name', $post->post_author );
			$response->data['authorUrl']         = get_author_posts_url( $post->post_author, $response->data['authorDisplayName'] );
			$response->data['commentsCount']     = (int) get_comments_number( $post->id );
		}

		return $response;
	}

	/**
	 * Registers the `material/recent-posts` block on server.
	 *
	 * @access public
	 *
	 * @action init
	 */
	public function register_block() {

		register_block_type(
			'material/recent-posts',
			[
				'attributes'      => [
					'className'             => [
						'type' => 'string',
					],
					'style'                 => [
						'type'    => 'string',
						'default' => 'masonry',
					],
					'contentLayout'         => [
						'type'    => 'string',
						'default' => 'text-above-media',
					],
					'columns'               => [
						'type'    => 'number',
						'default' => 3,
					],
					'postsToShow'           => [
						'type'    => 'number',
						'default' => 10,
					],
					'outlined'              => [
						'type'    => 'boolean',
						'default' => false,
					],
					'displayPostDate'       => [
						'type'    => 'boolean',
						'default' => true,
					],
					'displayPostContent'    => [
						'type'    => 'boolean',
						'default' => true,
					],
					'postContentLength'     => [
						'type'    => 'number',
						'default' => 20,
					],
					'displayFeaturedImage'  => [
						'type'    => 'boolean',
						'default' => true,
					],
					'featuredImageSizeSlug' => [
						'type'    => 'string',
						'default' => 'large',
					],
					'displayCommentsCount'  => [
						'type'    => 'boolean',
						'default' => true,
					],
					'displayPostAuthor'     => [
						'type'    => 'boolean',
						'default' => false,
					],
					'categories'            => [
						'type' => 'string',
					],
				],
				'render_callback' => [ $this, 'render_block' ],
			]
		);
	}

	/**
	 * Renders the `material/recent-posts` block on server.
	 *
	 * @access public
	 *
	 * @param array $attributes The block attributes.
	 *
	 * @return string Returns the post content with latest posts added.
	 */
	public function render_block( $attributes ) {
		$args = [
			'posts_per_page'         => $attributes['postsToShow'],
			'post_status'            => 'publish',
			'no_found_rows'          => true,
			'update_post_meta_cache' => false,
			'ignore_sticky_posts'    => true,
		];

		if ( ! empty( $attributes['categories'] ) ) {
			$args['cat'] = absint( $attributes['categories'] );
		}

		/**
		 * Filters the args for recent posts WP_Query.
		 *
		 * @param array $args The args for the WP_Query.
		 * @param array $attributes The block's attributes.
		 */
		$args = apply_filters( 'mtb_recent_posts_query_args', $args, $attributes );

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

			return ob_get_clean();
		}

		return '<!-- No posts found -->';
	}

}
