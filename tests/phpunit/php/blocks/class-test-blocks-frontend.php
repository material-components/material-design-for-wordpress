<?php
/**
 * Tests for Blocks_Frontend class.
 *
 * @package MaterialThemeBuilder
 */

namespace MaterialThemeBuilder\Blocks;

use function MaterialThemeBuilder\get_plugin_instance;

/**
 * Tests for Blocks_Frontend class.
 */
class Test_Blocks_Frontend extends \WP_UnitTestCase {
	/**
	 * Created PostID.
	 *
	 * @var int
	 */
	public static $post_id = [];

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
	 * Helper method to generate the fixtures
	 *
	 * @param WP_UnitTest_Factory $factory WP Factory object.
	 *
	 * @return void
	 */
	public static function generate_fixtures( $factory ) {
		self::$post_id = $factory->post->create(
			[
				'post_title'   => 'Lorem ipsum dolor sit amet',
				'post_content' => 'Consectetur adipiscing elit. In dui quam, egestas nec aliquet ac, hendrerit vitae ligula. Morbi malesuada in lectus vel sollicitudin. Proin tellus ligula, tincidunt at sagittis eget, tempor non est. In et suscipit metus. Cras in lectus a ex ullamcorper eleifend. Aenean convallis lacus et porttitor convallis. Proin iaculis a diam et euismod. Proin lectus ex, bibendum vel pretium ut, pellentesque eget nisl.

				<!-- wp:material/image-list {"gutter":{"desktop":24,"tablet":18,"mobile":12},"displayLightbox":true,"align":"wide"} -->
					<div class="wp-block-material-image-list alignwide" id="block-material-image-list-1"></div>
				<!-- /wp:material/image-list -->
				',
			]
		);
	}

	/**
	 * Test init().
	 *
	 * @see Blocks_Frontend::init()
	 */
	public function test_init() {
		$plugin = get_plugin_instance();
		$this->assertEquals( 20, has_action( 'wp_enqueue_scripts', [ $plugin->blocks_frontend, 'dynamic_css' ] ) );
	}

	/**
	 * Test dynamic_css().
	 *
	 * @see Blocks_Frontend::dynamic_css()
	 */
	public function test_dynamic_css() {
		global $post, $wp_query;

		// Setup the post as a single post.
		$post                     = get_post( self::$post_id );
		$wp_query->queried_object = $post;
		$wp_query->is_singular    = true;

		$plugin = get_plugin_instance();

		// Force enqueue the stylesheet.
		wp_enqueue_style(
			'material-front-end-css',
			$plugin->asset_url( 'assets/css/front-end-compiled.css' ),
			[],
			$plugin->asset_version()
		);

		$plugin->blocks_frontend->dynamic_css();

		$styles = wp_styles()->get_data( 'material-front-end-css', 'after' );

		// Assert we have all mobile, tablet and desktop styles.
		$this->assertContains( 'column-gap: 12px;', $styles[0] );
		$this->assertContains( 'column-gap: 18px;', $styles[0] );
		$this->assertContains( 'column-gap: 24px;', $styles[0] );
	}

	/**
	 * Test get_media_queries.
	 *
	 * @see Blocks_Frontend::get_media_queries()
	 */
	public function test_get_media_queries() {
		$styles    = [
			'div{',
			'background-color:#000;',
			'}',
		];
		$style_str = implode( '', $styles );

		$desktop = Blocks_Frontend::get_media_queries( $styles, 'desktop' );
		// Assert desktop media queries are returned.
		$this->assertRegExp( '/\(min-width:1601px\).*' . $style_str . '/', $this->trim( $desktop ) );

		$desktop = Blocks_Frontend::get_media_queries( $style_str, 'desktop' );
		// Assert desktop media queries are returned when we pass styles as string.
		$this->assertRegExp( '/\(min-width:1601px\).*' . $style_str . '/', $this->trim( $desktop ) );

		$desktop = Blocks_Frontend::get_media_queries( $style_str, 'iphone' );
		// Assert only styles are returned if an invalid device is passed.
		$this->assertEquals( $desktop, $style_str );

		$tablet = Blocks_Frontend::get_media_queries( $styles, 'tablet' );
		// Assert tablet media queries are returned.
		$this->assertRegExp( '/\(max-width:840px\)and\(orientation:portrait\).*' . $style_str . '/', $this->trim( $tablet ) );

		$mobile = Blocks_Frontend::get_media_queries( $styles, 'mobile' );
		// Assert mobile media queries are returned.
		$this->assertRegExp( '/\(min-width:481px\)and\(orientation:landscape\).*' . $style_str . '/', $this->trim( $mobile ) );
	}

	/**
	 * Strip tabs and newlines.
	 *
	 * @param  string $styles Inline CSS.
	 * @return string
	 */
	protected function trim( $styles ) {
		return preg_replace( '#[\t|\n|\s]#', '', $styles );
	}
}
