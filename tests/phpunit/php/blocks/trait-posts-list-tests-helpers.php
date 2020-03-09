<?php
/**
 * Trait_Posts_List_Tests_Helpers trait.
 *
 * @package MaterialThemeBuilder
 */

namespace MaterialThemeBuilder\Blocks;

/**
 * Trait_Posts_List_Tests_Helpers trait.
 */
trait Trait_Posts_List_Tests_Helpers {

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
	public static function wpSetUpBeforeClass( $factory ) { // phpcs:ignore
		self::generate_fixtures( $factory );
	}

	/**
	 * Cleanup created fixtures.
	 *
	 * @return void
	 */
	public static function wpTearDownAfterClass() { // phpcs:ignore
		self::delete_fixtures();
	}

	/**
	 * Helper method to generate teh fixtures.
	 *
	 * @param WP_UnitTest_Factory $factory WP Factory object.
	 *
	 * @return void
	 */
	public static function generate_fixtures( $factory ) {
		self::$old_current_user = get_current_user_id(); // phpcs:ignore
		self::$author_id        = $factory->user->create( [ 'user_login' => 'test' ] ); // phpcs:ignore
		wp_update_user(
			[
				'ID'           => self::$author_id, // phpcs:ignore
				'display_name' => 'test',
			]
		);

		wp_set_current_user( self::$author_id ); // phpcs:ignore

		$cat          = $factory->term->create(
			[
				'taxonomy' => 'category',
				'name'     => 'test',
			]
		);
		self::$cat_id = $cat; // phpcs:ignore

		self::$post_ids[] = $factory->post->create( // phpcs:ignore
			[
				'post_title'    => 'Lorem ipsum dolor sit amet',
				'post_content'  => 'Consectetur adipiscing elit. In dui quam, egestas nec aliquet ac, hendrerit vitae ligula. Morbi malesuada in lectus vel sollicitudin. Proin tellus ligula, tincidunt at sagittis eget, tempor non est. In et suscipit metus. Cras in lectus a ex ullamcorper eleifend. Aenean convallis lacus et porttitor convallis. Proin iaculis a diam et euismod. Proin lectus ex, bibendum vel pretium ut, pellentesque eget nisl.',
				'post_category' => [ $cat ],
			]
		);

		self::$post_ids[] = $factory->post->create( // phpcs:ignore
			[
				'post_title'    => 'Sed rhoncus hendrerit justo',
				'post_content'  => 'Non accumsan enim dictum ac. Cras lacus libero, porttitor quis tortor et, varius mattis nunc. In quis purus in odio laoreet ultricies in sit amet lectus. Proin varius nisl eget elit auctor hendrerit. Integer vestibulum sed libero nec consectetur. Pellentesque nulla diam, laoreet ac sapien vitae, varius dapibus arcu. Nunc lobortis urna nisl, ornare dictum est consequat ut. Morbi arcu purus, congue vitae elit non, rutrum sollicitudin leo. Pellentesque pulvinar mi quam, a hendrerit purus feugiat sed. Etiam sit amet mauris ut erat blandit auctor. Phasellus mollis sit amet arcu sed dictum. Donec ex justo, consectetur id lacus sed, vulputate porta ligula.',
				'post_category' => [ $cat ],
			]
		);

		self::$post_ids[] = $factory->post->create( // phpcs:ignore
			[
				'post_title'   => 'Phasellus non pharetra nibh',
				'post_content' => 'Aliquam ac leo sit amet ipsum porttitor dictum eu quis purus. Fusce eget semper dolor. Etiam vehicula lectus sit amet erat placerat, eu pulvinar quam accumsan. Nam bibendum hendrerit iaculis. Mauris sapien odio, rutrum id aliquam vehicula, laoreet in massa. Cras gravida at dolor non blandit.',
			]
		);

		self::$post_ids[] = $factory->post->create( // phpcs:ignore
			[
				'post_title'   => 'Nulla eget lobortis turpis',
				'post_content' => 'In a laoreet metus. Phasellus sit amet lectus rutrum, vestibulum leo vel, efficitur metus. Cras posuere feugiat purus. In ultrices, eros malesuada rhoncus finibus, mauris quam gravida risus, et pellentesque libero magna ut lectus. Interdum et malesuada fames ac ante ipsum primis in faucibus. Etiam blandit nunc ac metus consectetur, quis egestas augue elementum. Nullam erat est, eleifend vitae ullamcorper in, iaculis quis purus.',
			]
		);

		self::$post_ids[] = $factory->post->create( // phpcs:ignore
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
		set_post_thumbnail( end( self::$post_ids ), $attachment_id ); // phpcs:ignore

		$comment_id = $factory->comment->create(
			[
				'comment_post_ID' => end( self::$post_ids ), // phpcs:ignore
				'user_id'         => self::$author_id, // phpcs:ignore
			]
		);

		$comment_id = $factory->comment->create(
			[
				'comment_post_ID' => self::$post_ids[3], // phpcs:ignore
				'user_id'         => self::$author_id, // phpcs:ignore
			]
		);

		$comment_id = $factory->comment->create(
			[
				'comment_post_ID' => self::$post_ids[3], // phpcs:ignore
				'user_id'         => self::$author_id, // phpcs:ignore
			]
		);
	}

	/**
	 * Helper function to cleanup.
	 *
	 * @return void
	 */
	public static function delete_fixtures() {
		self::$author_id = null; // phpcs:ignore
		self::$post_ids  = []; // phpcs:ignore

		wp_set_current_user( self::$old_current_user ); // phpcs:ignore
	}

	/**
	 * Strip newline and tabs from content.
	 *
	 * @param string $content Content to clean.
	 *
	 * @return string
	 */
	protected function clean_content( $content ) {
		return preg_replace( '#[\n|\t]#', '', $content );
	}
}
