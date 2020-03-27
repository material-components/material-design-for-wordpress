<?php
/**
 * Tests for Recent_Posts_Block class.
 *
 * @package MaterialThemeBuilder
 */

namespace MaterialThemeBuilder\Blocks;

use MaterialThemeBuilder\Plugin;

/**
 * Tests for Recent_Posts_Block class.
 */
class Test_Recent_Posts_Block extends \WP_UnitTestCase {

	/**
	 * Current user.
	 *
	 * @var int
	 */
	public static $old_current_user;

	/**
	 * Author ID.
	 *
	 * @var int
	 */
	public static $author_id;

	/**
	 * List of PostIds created.
	 *
	 * @var array
	 */
	public static $post_ids = [];

	/**
	 * Test category ID.
	 *
	 * @var int
	 */
	public static $cat_id;

	/**
	 * Generate some text fixtures.
	 *
	 * @param WP_UnitTest_Factory $factory WP Factory object.
	 *
	 * @return void
	 */
	public static function wpSetUpBeforeClass( $factory ) {
		self::generate_fixtures( $factory );
	}

	/**
	 * Cleanup created fixtures.
	 *
	 * @return void
	 */
	public static function wpTearDownAfterClass() {
		self::delete_fixtures();
	}

	/**
	 * Helper method to generate teh fixtures
	 *
	 * @param WP_UnitTest_Factory $factory WP Factory object.
	 *
	 * @return void
	 */
	public static function generate_fixtures( $factory ) {
		self::$old_current_user = get_current_user_id();
		self::$author_id        = $factory->user->create( [ 'user_login' => 'test' ] );
		wp_update_user(
			[
				'ID'           => self::$author_id,
				'display_name' => 'test',
			]
		);

		wp_set_current_user( self::$author_id );

		$cat          = $factory->term->create(
			[
				'taxonomy' => 'category',
				'name'     => 'test',
			]
		);
		self::$cat_id = $cat;

		self::$post_ids[] = $factory->post->create(
			[
				'post_title'    => 'Lorem ipsum dolor sit amet',
				'post_content'  => 'Consectetur adipiscing elit. In dui quam, egestas nec aliquet ac, hendrerit vitae ligula. Morbi malesuada in lectus vel sollicitudin. Proin tellus ligula, tincidunt at sagittis eget, tempor non est. In et suscipit metus. Cras in lectus a ex ullamcorper eleifend. Aenean convallis lacus et porttitor convallis. Proin iaculis a diam et euismod. Proin lectus ex, bibendum vel pretium ut, pellentesque eget nisl.',
				'post_category' => [ $cat ],
			]
		);

		self::$post_ids[] = $factory->post->create(
			[
				'post_title'    => 'Sed rhoncus hendrerit justo',
				'post_content'  => 'Non accumsan enim dictum ac. Cras lacus libero, porttitor quis tortor et, varius mattis nunc. In quis purus in odio laoreet ultricies in sit amet lectus. Proin varius nisl eget elit auctor hendrerit. Integer vestibulum sed libero nec consectetur. Pellentesque nulla diam, laoreet ac sapien vitae, varius dapibus arcu. Nunc lobortis urna nisl, ornare dictum est consequat ut. Morbi arcu purus, congue vitae elit non, rutrum sollicitudin leo. Pellentesque pulvinar mi quam, a hendrerit purus feugiat sed. Etiam sit amet mauris ut erat blandit auctor. Phasellus mollis sit amet arcu sed dictum. Donec ex justo, consectetur id lacus sed, vulputate porta ligula.',
				'post_category' => [ $cat ],
			]
		);

		self::$post_ids[] = $factory->post->create(
			[
				'post_title'   => 'Phasellus non pharetra nibh',
				'post_content' => 'Aliquam ac leo sit amet ipsum porttitor dictum eu quis purus. Fusce eget semper dolor. Etiam vehicula lectus sit amet erat placerat, eu pulvinar quam accumsan. Nam bibendum hendrerit iaculis. Mauris sapien odio, rutrum id aliquam vehicula, laoreet in massa. Cras gravida at dolor non blandit.',
			]
		);

		self::$post_ids[] = $factory->post->create(
			[
				'post_title'   => 'Nulla eget lobortis turpis',
				'post_content' => 'In a laoreet metus. Phasellus sit amet lectus rutrum, vestibulum leo vel, efficitur metus. Cras posuere feugiat purus. In ultrices, eros malesuada rhoncus finibus, mauris quam gravida risus, et pellentesque libero magna ut lectus. Interdum et malesuada fames ac ante ipsum primis in faucibus. Etiam blandit nunc ac metus consectetur, quis egestas augue elementum. Nullam erat est, eleifend vitae ullamcorper in, iaculis quis purus.',
			]
		);

		self::$post_ids[] = $factory->post->create(
			[
				'post_title'   => 'Nunc ac malesuada sem',
				'post_content' => 'Pellentesque non enim ut metus scelerisque condimentum sit amet id ipsum. Pellentesque congue sem orci, a egestas libero maximus et. Nunc mattis sem et lectus lacinia feugiat vel ac tellus. Morbi sed massa nunc. Cras odio purus, maximus ac sapien ut, vestibulum aliquet est.',
			]
		);

		$post_id       = $factory->post->create();
		$attachment_id = $factory->attachment->create_object(
			'image.jpg',
			$post_id,
			[
				'post_mime_type' => 'image/jpeg',
				'post_type'      => 'attachment',
			]
		);

		// Set a featured image for the last post.
		set_post_thumbnail( end( self::$post_ids ), $attachment_id );

		$comment_id = $factory->comment->create(
			[
				'comment_post_ID' => end( self::$post_ids ),
				'user_id'         => self::$author_id,
			]
		);

		$comment_id = $factory->comment->create(
			[
				'comment_post_ID' => self::$post_ids[3],
				'user_id'         => self::$author_id,
			]
		);

		$comment_id = $factory->comment->create(
			[
				'comment_post_ID' => self::$post_ids[3],
				'user_id'         => self::$author_id,
			]
		);
	}

	/**
	 * Helper function to cleanup.
	 *
	 * @return void
	 */
	public static function delete_fixtures() {
		self::$author_id = null;
		self::$post_ids  = [];

		wp_set_current_user( self::$old_current_user );
	}

	/**
	 * Test init.
	 *
	 * @see Recent_Posts_Block::init()
	 */
	public function test_init() {
		$block = new Recent_Posts_Block( new Plugin() );
		$block->init();
		$this->assertEquals( 10, has_filter( 'rest_prepare_post', [ $block, 'add_comments_count' ] ) );
		$this->assertEquals( 10, has_action( 'init', [ $block, 'register_block' ] ) );
	}

	/**
	 * Test register_block.
	 *
	 * @see Recent_Posts_Block::register_block()
	 */
	public function test_register_block() {
		// Unregister the block if it's registered already.
		unregister_block_type( 'material/recent-posts' );

		$block = new Recent_Posts_Block( new Plugin() );
		$block->register_block();

		// Assert the block is registered.
		$this->assertTrue( in_array( 'material/recent-posts', get_dynamic_block_names(), true ) );
	}

	/**
	 * Test add_comments_count.
	 *
	 * @see Recent_Posts_Block::add_comments_count()
	 */
	public function test_add_comments_count() {
		$block = new Recent_Posts_Block( new Plugin() );

		$request  = new \WP_REST_Request( 'GET', '/' );
		$response = new \WP_REST_Response();
		$post     = get_post( self::$post_ids[0] );

		$response = $block->add_comments_count( $response, $post, $request );

		// Assert the extra fields are not set.
		$this->assertTrue( empty( $response->data['authorDisplayName'] ) );
		$this->assertTrue( empty( $response->data['authorUrl'] ) );
		$this->assertTrue( empty( $response->data['commentsCount'] ) );

		// Set context param.
		$request->set_param( 'context', 'edit' );
		$response = $block->add_comments_count( $response, $post, $request );

		// Assert the fields are set.
		$this->assertEquals( 'test', $response->data['authorDisplayName'] );
		$this->assertEquals( 'http://example.org/?author=' . $post->post_author, $response->data['authorUrl'] );
		$this->assertEquals( 0, $response->data['commentsCount'] );
	}

	/**
	 * Test test_render_block.
	 *
	 * @see Recent_Posts_Block::test_render_block()
	 */
	public function test_render_block() {
		$block = new Recent_Posts_Block( new Plugin() );

		$attributes = [
			'postsToShow' => 5,
			'style'       => 'grid-new',
		];

		$content = $block->render_block( $attributes );

		// Assert no content is returned if no posts found or invalid style is selected.
		$this->assertContains( '<!-- No posts found -->', $content );

		$attributes['style'] = 'grid';
		$content             = $block->render_block( $attributes );

		// Assert grid layout is loaded.
		$this->assertContains( '<div class="mdc-layout-grid', $content );

		$attributes['style'] = 'masonry';
		$content             = $block->render_block( $attributes );

		// Assert masonry layout is loaded.
		$this->assertContains( '<div class="masonry-grid', $content );

		// Assert 5 posts are rendered.
		$this->assertEquals( 5, substr_count( $content, '<div class="single-post-card single-post-basic' ) );

		$attributes['category'] = self::$cat_id;
		$content                = $block->render_block( $attributes );

		// Assert only 2 posts in the test category are rendered.
		$this->assertEquals( 2, substr_count( $content, '<div class="single-post-card single-post-basic' ) );

		unset( $attributes['category'] );
		$attributes['displayPostAuthor']    = true;
		$attributes['displayCommentsCount'] = true;
		$attributes['displayPostContent']   = true;
		$attributes['displayPostDate']      = true;
		$attributes['displayFeaturedImage'] = true;

		$content = $block->render_block( $attributes );

		// Assert all partials are rendered.
		$this->assertEquals( 5, substr_count( $content, 'class="mdc-button post-author"' ) );
		$this->assertEquals( 5, substr_count( $content, 'class="mdc-button comment-count"' ) );
		$this->assertEquals( 5, substr_count( $content, 'class="single-post-card__secondary' ) );
		$this->assertEquals( 5, substr_count( $content, 'class="single-post-card__subtitle' ) );

		// Images should be rendered only for the first post.
		$this->assertEquals( 1, substr_count( $content, 'class="mdc-card__media' ) );

		$content = $this->clean_content( $content );

		// Assert an article has only 1 comment.
		$this->assertEquals( 1, substr_count( $content, '<span class="mdc-button__label">1 comment</span>' ) );

		// Assert an article has 2 comments.
		$this->assertEquals( 1, substr_count( $content, '<span class="mdc-button__label">2 comments</span>' ) );

		$attributes['contentLayout'] = 'text-over-media';
		$content                     = $block->render_block( $attributes );
		$content                     = $this->clean_content( $content );

		// Assert the article with featured image shows content inside the image container.
		$this->assertEquals( 1, substr_count( $content, 'style="background-image: url(http://example.org/wp-content/uploads/image.jpg)"><div class="mdc-card__media-content">' ) );

		// Assert all 5 posts are rendered.
		$this->assertEquals( 5, substr_count( $content, 'class="single-post-card__title' ) );

		$attributes['contentLayout'] = 'text-under-media';
		$content                     = $block->render_block( $attributes );
		$content                     = $this->clean_content( $content );

		// Assert the article with featured image shows content below the image container.
		$this->assertEquals( 1, substr_count( $content, '<!-- mdc-card__media --><div class="single-post-card__primary">' ) );

		$attributes['align'] = 'wide';
		$content             = $block->render_block( $attributes );

		// Assert alignwide class is rendered.
		$this->assertEquals( 1, substr_count( $content, '<div class="wp-block-material-recent-posts alignwide"' ) );

		$attributes['displayFeaturedImage'] = false;
		$content                            = $block->render_block( $attributes );

		// Assert layout defaults to `text-above-media`.
		$this->assertEquals( 5, substr_count( $content, '<h2 class="single-post-card__title' ) );
	}

	/**
	 * Strip newline and tabs from content
	 *
	 * @param string $content Content to clean.
	 *
	 * @return string
	 */
	protected function clean_content( $content ) {
		return preg_replace( '#[\n|\t]#', '', $content );
	}
}
