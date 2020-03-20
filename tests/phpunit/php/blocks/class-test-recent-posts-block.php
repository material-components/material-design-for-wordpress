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
class Test_Recent_Posts_Block extends Posts_Blocks_Tests_Base {
	/**
	 * Test init.
	 *
	 * @see Recent_Posts_Block::init()
	 */
	public function test_init() {
		$block = new Recent_Posts_Block( new Plugin() );
		$block->init();
		$this->assertEquals( 10, has_filter( 'rest_prepare_post', [ $block, 'add_extra_post_meta' ] ) );
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
	 * Test add_extra_post_meta.
	 *
	 * @see Recent_Posts_Block::add_extra_post_meta()
	 */
	public function test_add_extra_post_meta() {
		$block = new Recent_Posts_Block( new Plugin() );

		$request  = new \WP_REST_Request( 'GET', '/' );
		$response = new \WP_REST_Response();
		$post     = get_post( self::$post_ids[0] );

		$response = $block->add_extra_post_meta( $response, $post, $request );

		// Assert the extra fields are not set.
		$this->assertTrue( empty( $response->data['authorDisplayName'] ) );
		$this->assertTrue( empty( $response->data['authorUrl'] ) );
		$this->assertTrue( empty( $response->data['commentsCount'] ) );

		// Set context param.
		$request->set_param( 'context', 'edit' );
		$response = $block->add_extra_post_meta( $response, $post, $request );

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
		$this->assertEquals( 5, substr_count( $content, 'class="mdc-button mdc-card__action mdc-card__action--button mdc-button__post-author"' ) );
		$this->assertEquals( 5, substr_count( $content, 'class="mdc-button mdc-card__action mdc-card__action--button mdc-button__comment-count"' ) );
		$this->assertEquals( 5, substr_count( $content, 'class="single-post-card__secondary' ) );
		$this->assertEquals( 5, substr_count( $content, 'class="single-post-card__subtitle' ) );

		// Images should be rendered only for the first post.
		$this->assertEquals( 1, substr_count( $content, 'class="mdc-card__media' ) );

		$content = $this->clean_content( $content );

		// Assert an article has only 1 comment.
		$this->assertEquals( 1, substr_count( $content, '<span class="mdc-button__label">1</span>' ) );

		// Assert an article has 2 comments.
		$this->assertEquals( 1, substr_count( $content, '<span class="mdc-button__label">2</span>' ) );

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
		$this->assertEquals( 1, substr_count( $content, '<div class="wp-block-material-posts-list alignwide"' ) );
	}
}
