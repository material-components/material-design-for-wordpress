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

				<!-- wp:material/cards-collection {"cardsProps":[{"contentLayout":"text-under-media","title":"Title goes here","displayTitle":true,"secondaryText":"Secondary text","displaySecondaryText":true,"imageSourceUrl":"","isImageEditMode":false,"displayImage":true,"supportingText":"Supporting text","displaySupportingText":true,"primaryActionButtonLabel":"Button text","primaryActionButtonUrl":"","primaryActionButtonNewTab":false,"primaryActionButtonNoFollow":false,"secondaryActionButtonLabel":"Button text","secondaryActionButtonUrl":"","secondaryActionButtonNewTab":false,"secondaryActionButtonNoFollow":false,"displayActions":true,"displaySecondaryActionButton":false,"outlined":true,"cornerRadius":8},{"contentLayout":"text-under-media","title":"Title goes here","displayTitle":true,"secondaryText":"Secondary text","displaySecondaryText":true,"imageSourceUrl":"","isImageEditMode":false,"displayImage":true,"supportingText":"Supporting text","displaySupportingText":true,"primaryActionButtonLabel":"Button text","primaryActionButtonUrl":"","primaryActionButtonNewTab":false,"primaryActionButtonNoFollow":false,"secondaryActionButtonLabel":"Button text","secondaryActionButtonUrl":"","secondaryActionButtonNewTab":false,"secondaryActionButtonNoFollow":false,"displayActions":true,"displaySecondaryActionButton":false,"outlined":true,"cornerRadius":8},{"contentLayout":"text-under-media","title":"Title goes here","displayTitle":true,"secondaryText":"Secondary text","displaySecondaryText":true,"imageSourceUrl":"","isImageEditMode":false,"displayImage":true,"supportingText":"Supporting text","displaySupportingText":true,"primaryActionButtonLabel":"Button text","primaryActionButtonUrl":"","primaryActionButtonNewTab":false,"primaryActionButtonNoFollow":false,"secondaryActionButtonLabel":"Button text","secondaryActionButtonUrl":"","secondaryActionButtonNewTab":false,"secondaryActionButtonNoFollow":false,"displayActions":true,"displaySecondaryActionButton":false,"outlined":true,"cornerRadius":8}],"gutter":{"desktop":24,"tablet":16,"mobile":10},"cornerRadius":8,"outlined":true} -->
				<div class="wp-block-material-cards-collection alignwide" id="block-material-cards-collection-1"><div class="masonry-grid layout-masonry"><div style="width:50%" class="masonry-grid_column"><div class="card-container"><div class="mdc-card mtb-card mdc-card--outlined" style="border-radius:8px"><div class="mdc-card__primary-action mtb-card__primary-action mdc-ripple-upgraded" tabindex="0"><div tabindex="0" class="mdc-card__media mdc-card__media--16-9 mtb-card__media mtb-card-with-text-under-media" style="background-image:url()"></div><div class="mtb-card__primary"><h2 class="mtb-card__title mdc-typography mdc-typography--headline6">Title goes here</h2><h3 class="mtb-card__secondary-text mdc-typography mdc-typography--subtitle2">Secondary text</h3></div><div class="mtb-card__supporting-text mtb-card__supporting-text_text-under-media mdc-typography mdc-typography--body2">Supporting text</div></div><div class="mdc-card__actions"><div class="mdc-card__action-buttons"><a href="#" class="mdc-button mdc-card__action mdc-card__action--button"><div class="mdc-button__ripple"></div><span class="mdc-button__label">Button text</span></a></div></div></div></div></div><div style="width:50%" class="masonry-grid_column"><div class="card-container"><div class="mdc-card mtb-card mdc-card--outlined" style="border-radius:8px"><div class="mdc-card__primary-action mtb-card__primary-action mdc-ripple-upgraded" tabindex="0"><div tabindex="0" class="mdc-card__media mdc-card__media--16-9 mtb-card__media mtb-card-with-text-under-media" style="background-image:url()"></div><div class="mtb-card__primary"><h2 class="mtb-card__title mdc-typography mdc-typography--headline6">Title goes here</h2><h3 class="mtb-card__secondary-text mdc-typography mdc-typography--subtitle2">Secondary text</h3></div><div class="mtb-card__supporting-text mtb-card__supporting-text_text-under-media mdc-typography mdc-typography--body2">Supporting text</div></div><div class="mdc-card__actions"><div class="mdc-card__action-buttons"><a href="#" class="mdc-button mdc-card__action mdc-card__action--button"><div class="mdc-button__ripple"></div><span class="mdc-button__label">Button text</span></a></div></div></div></div></div></div></div>
				<!-- /wp:material/cards-collection -->

				<!-- wp:material/cards-collection {"style":"grid","cardsProps":[{"contentLayout":"text-under-media","title":"Title goes here","displayTitle":true,"secondaryText":"Secondary text","displaySecondaryText":true,"imageSourceUrl":"","isImageEditMode":false,"displayImage":true,"supportingText":"Supporting text","displaySupportingText":true,"primaryActionButtonLabel":"Button text","primaryActionButtonUrl":"","primaryActionButtonNewTab":false,"primaryActionButtonNoFollow":false,"secondaryActionButtonLabel":"Button text","secondaryActionButtonUrl":"","secondaryActionButtonNewTab":false,"secondaryActionButtonNoFollow":false,"displayActions":true,"displaySecondaryActionButton":false,"outlined":true,"cornerRadius":8},{"contentLayout":"text-under-media","title":"Title goes here","displayTitle":true,"secondaryText":"Secondary text","displaySecondaryText":true,"imageSourceUrl":"","isImageEditMode":false,"displayImage":true,"supportingText":"Supporting text","displaySupportingText":true,"primaryActionButtonLabel":"Button text","primaryActionButtonUrl":"","primaryActionButtonNewTab":false,"primaryActionButtonNoFollow":false,"secondaryActionButtonLabel":"Button text","secondaryActionButtonUrl":"","secondaryActionButtonNewTab":false,"secondaryActionButtonNoFollow":false,"displayActions":true,"displaySecondaryActionButton":false,"outlined":true,"cornerRadius":8},{"contentLayout":"text-under-media","title":"Title goes here","displayTitle":true,"secondaryText":"Secondary text","displaySecondaryText":true,"imageSourceUrl":"","isImageEditMode":false,"displayImage":true,"supportingText":"Supporting text","displaySupportingText":true,"primaryActionButtonLabel":"Button text","primaryActionButtonUrl":"","primaryActionButtonNewTab":false,"primaryActionButtonNoFollow":false,"secondaryActionButtonLabel":"Button text","secondaryActionButtonUrl":"","secondaryActionButtonNewTab":false,"secondaryActionButtonNoFollow":false,"displayActions":true,"displaySecondaryActionButton":false,"outlined":true,"cornerRadius":8}],"gutter":{"desktop":24,"tablet":16,"mobile":10},"cornerRadius":8,"outlined":true} -->
				<div class="wp-block-material-cards-collection alignwide" id="block-material-cards-collection-2"><div class="mdc-layout-grid layout-grid"><div class="mdc-layout-grid__inner"><div class="card-container mdc-layout-grid__cell--span-6"><div class="mdc-card mtb-card mdc-card--outlined" style="border-radius:8px"><div class="mdc-card__primary-action mtb-card__primary-action mdc-ripple-upgraded" tabindex="0"><div tabindex="0" class="mdc-card__media mdc-card__media--16-9 mtb-card__media mtb-card-with-text-under-media" style="background-image:url()"></div><div class="mtb-card__primary"><h2 class="mtb-card__title mdc-typography mdc-typography--headline6">Title goes here</h2><h3 class="mtb-card__secondary-text mdc-typography mdc-typography--subtitle2">Secondary text</h3></div><div class="mtb-card__supporting-text mtb-card__supporting-text_text-under-media mdc-typography mdc-typography--body2">Supporting text</div></div><div class="mdc-card__actions"><div class="mdc-card__action-buttons"><a href="#" class="mdc-button mdc-card__action mdc-card__action--button"><div class="mdc-button__ripple"></div><span class="mdc-button__label">Button text</span></a></div></div></div></div><div class="card-container mdc-layout-grid__cell--span-6"><div class="mdc-card mtb-card mdc-card--outlined" style="border-radius:8px"><div class="mdc-card__primary-action mtb-card__primary-action mdc-ripple-upgraded" tabindex="0"><div tabindex="0" class="mdc-card__media mdc-card__media--16-9 mtb-card__media mtb-card-with-text-under-media" style="background-image:url()"></div><div class="mtb-card__primary"><h2 class="mtb-card__title mdc-typography mdc-typography--headline6">Title goes here</h2><h3 class="mtb-card__secondary-text mdc-typography mdc-typography--subtitle2">Secondary text</h3></div><div class="mtb-card__supporting-text mtb-card__supporting-text_text-under-media mdc-typography mdc-typography--body2">Supporting text</div></div><div class="mdc-card__actions"><div class="mdc-card__action-buttons"><a href="#" class="mdc-button mdc-card__action mdc-card__action--button"><div class="mdc-button__ripple"></div><span class="mdc-button__label">Button text</span></a></div></div></div></div></div></div></div>
				<!-- /wp:material/cards-collection -->
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
		$this->assertEquals( 110, has_action( 'wp_enqueue_scripts', [ $plugin->blocks_frontend, 'dynamic_css' ] ) );
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

		// Assert we have all mobile, tablet and desktop styles for image-list block.
		$this->assertContains( 'column-gap: 12px;', $styles[0] );
		$this->assertContains( 'column-gap: 18px;', $styles[0] );
		$this->assertContains( 'column-gap: 24px;', $styles[0] );

		// Assert we have all mobile, tablet and desktop styles for card-collections block.
		$this->assertContains( 'padding-left: 24px;', $styles[0] );
		$this->assertContains( 'margin-bottom: 24px;', $styles[0] );
		$this->assertContains( 'padding-left: 16px;', $styles[0] );
		$this->assertContains( 'margin-bottom: 16px;', $styles[0] );
		$this->assertContains( 'padding-left: 10px;', $styles[0] );
		$this->assertContains( 'margin-bottom: 10px;', $styles[0] );

		$this->assertContains( 'grid-gap: 24px;', $styles[0] );
		$this->assertContains( 'grid-gap: 16px;', $styles[0] );
		$this->assertContains( 'grid-gap: 10px;', $styles[0] );
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
		$this->assertRegExp( '/\(min-width:840px\).*' . $style_str . '/', $this->trim( $desktop ) );

		$desktop = Blocks_Frontend::get_media_queries( $style_str, 'desktop' );
		// Assert desktop media queries are returned when we pass styles as string.
		$this->assertRegExp( '/\(min-width:840px\).*' . $style_str . '/', $this->trim( $desktop ) );

		$desktop = Blocks_Frontend::get_media_queries( $style_str, 'iphone' );
		// Assert only styles are returned if an invalid device is passed.
		$this->assertEquals( $desktop, $style_str );

		$tablet = Blocks_Frontend::get_media_queries( $styles, 'tablet' );
		// Assert tablet media queries are returned.
		$this->assertRegExp( '/\(min-width:600px\)and\(max-width:839px\).*' . $style_str . '/', $this->trim( $tablet ) );

		$mobile = Blocks_Frontend::get_media_queries( $styles, 'mobile' );
		// Assert mobile media queries are returned.
		$this->assertRegExp( '/\(max-width:599px\).*' . $style_str . '/', $this->trim( $mobile ) );
	}

	/**
	 * Test layout_gutter_device_styles.
	 *
	 * @see Blocks_Frontend::layout_gutter_device_styles()
	 */
	public function test_layout_gutter_device_styles() {
		$styles = Blocks_Frontend::layout_gutter_device_styles( 'test', [], 'desktop' );

		$this->assertEquals( 0, count( $styles ) );
	}

	/**
	 * Test has_material_blocks().
	 *
	 * @see Blocks_Frontend::has_material_blocks()
	 */
	public function test_has_material_blocks() {
		global $post, $wp_query;

		$this->assertFalse( Blocks_Frontend::has_material_blocks() );

		// Setup the post as a single post.
		$post                     = get_post( self::$post_id );
		$wp_query->queried_object = $post;
		$wp_query->is_singular    = true;

		$this->assertTrue( Blocks_Frontend::has_material_blocks() );
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
