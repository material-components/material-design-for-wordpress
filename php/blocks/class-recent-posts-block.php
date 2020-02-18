<?php
/**
 * Recent Posts Block class.
 *
 * @package MaterialThemeBuilder
 */

namespace MaterialThemeBuilder\Blocks;

use MaterialThemeBuilder\Plugin;

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
	 * Registers the `material/recent-posts` block on server.
	 * @action init
	 */
	public function register_block_material_recent_posts() {
		register_block_type(
			'material/recent-posts',
			[
				'attributes'      => [
					'align'                   => [
						'type' => 'string',
						'enum' => [ 'left', 'center', 'right', 'wide', 'full' ],
					],
					'className'               => [
						'type' => 'string',
					],
					'categories'              => [
						'type' => 'string',
					],
					'postsToShow'             => [
						'type'    => 'number',
						'default' => 10,
					],
					'displayPostContent'      => [
						'type'    => 'boolean',
						'default' => false,
					],
					'displayPostContentRadio' => [
						'type'    => 'string',
						'default' => 'excerpt',
					],
					'excerptLength'           => [
						'type'    => 'number',
						'default' => 55,
					],
					'displayPostDate'         => [
						'type'    => 'boolean',
						'default' => false,
					],
					'postLayout'              => [
						'type'    => 'string',
						'default' => 'list',
					],
					'columns'                 => [
						'type'    => 'number',
						'default' => 3,
					],
					'order'                   => [
						'type'    => 'string',
						'default' => 'desc',
					],
					'orderBy'                 => [
						'type'    => 'string',
						'default' => 'date',
					],
					'displayFeaturedImage'    => [
						'type'    => 'boolean',
						'default' => false,
					],
					'featuredImageAlign'      => [
						'type' => 'string',
						'enum' => [ 'left', 'center', 'right' ],
					],
					'featuredImageSizeSlug'   => [
						'type'    => 'string',
						'default' => 'thumbnail',
					],
					'featuredImageSizeWidth'  => [
						'type'    => 'number',
						'default' => null,
					],
					'featuredImageSizeHeight' => [
						'type'    => 'number',
						'default' => null,
					],
				], // todo: redefine to match requirements
				'render_callback' => [ $this, 'render_block_material_recent_posts' ],
			]
		);
	}

	/**
	 * Renders the `material/recent-posts` block on server.
	 *
	 * @param array $attributes The block attributes.
	 *
	 * @return string Returns the post content with latest posts added.
	 */
	public function render_block_material_recent_posts( $attributes ) {
		$args = [
			'posts_per_page'   => $attributes['postsToShow'],
			'post_status'      => 'publish',
			'order'            => $attributes['order'],
			'orderby'          => $attributes['orderBy'],
			'suppress_filters' => false,
		]; // todo: redefine to match requirements

		if ( isset( $attributes['categories'] ) ) {
			$args['category'] = $attributes['categories'];
		}

		$recent_posts = get_posts( $args );

		return sprintf(
			'hello world' // todo: Do the rendering
		);
	}

}
