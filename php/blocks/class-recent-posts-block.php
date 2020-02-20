<?php
/**
 * Recent Posts Block class.
 *
 * @package MaterialThemeBuilder
 */

namespace MaterialThemeBuilder\Blocks;

use MaterialThemeBuilder\Plugin;
use WP_Post;
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
	public function add_comments_count_to_post( WP_REST_Response $response, WP_Post $post, WP_REST_Request $request ) {
		$context = $request->get_param( 'context' );

		if ( 'edit' === $context ) {
			// @todo: Review if these are the most efficient methods to get some meta data
			$response->data['authorDisplayName'] = get_the_author_meta( 'display_name', $post->author );
			$response->data['authorUrl']         = get_author_posts_url( $post->author, $response->data['authorDisplayName'] );
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
	public function register_block_material_recent_posts() {
		register_block_type(
			'material/recent-posts',
			[
				'attributes'      => [
					'className'            => [
						'type' => 'string',
					],
					'style'                => [
						'type'    => 'string',
						'default' => 'vertical',
					],
					'columns'              => [
						'type'    => 'number',
						'default' => 3,
					],
					'postsToShow'          => [
						'type'    => 'number',
						'default' => 10,
					],
					'displayPostDate'      => [
						'type'    => 'boolean',
						'default' => true,
					],
					'displayPostContent'   => [
						'type'    => 'boolean',
						'default' => true,
					],
					'postContentLength'    => [
						'type'    => 'number',
						'default' => 55,
					],
					'displayFeaturedImage' => [
						'type'    => 'boolean',
						'default' => true,
					],
					'displayCommentsCount' => [
						'type'    => 'boolean',
						'default' => true,
					],
					'displayPostAuthor'    => [
						'type'    => 'boolean',
						'default' => false,
					],
					'categories'           => [
						'type' => 'string',
					],
				],
				'render_callback' => [ $this, 'render_block_material_recent_posts' ],
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
	public function render_block_material_recent_posts( $attributes ) {
		$args = [
			'posts_per_page'   => $attributes['postsToShow'],
			'post_status'      => 'publish',
			'suppress_filters' => false,
		]; // todo: redefine to match requirements.

		if ( isset( $attributes['categories'] ) ) {
			$args['category'] = $attributes['categories'];
		}

		// $recent_posts = get_posts( $args ); @todo: Use WP_Query.

		return sprintf(
			'hello world' // todo: Do the rendering.
		);
	}

}
