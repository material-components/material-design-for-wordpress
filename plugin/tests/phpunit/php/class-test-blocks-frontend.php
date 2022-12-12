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
 * Tests for Blocks_Frontend class.
 *
 * @package MaterialDesign
 */

namespace MaterialDesign\Plugin;

use function MaterialDesign\Plugin\get_plugin_instance;

/**
 * Tests for Blocks_Frontend class.
 */
class Test_Blocks_Frontend extends \WP_UnitTestCase {
	/**
	 * Created PostID.
	 *
	 * @var int
	 */
	public static $post_id = 0;

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

				<!-- wp:material/image-list {"gutter":{"desktop":24,"tablet":18,"mobile":12},"align":"wide"} -->
					<div class="wp-block-material-image-list alignwide" id="block-material-image-list-1"></div>
				<!-- /wp:material/image-list -->

				<!-- wp:material/cards-collection {"cardsProps":[{"contentLayout":"text-under-media","title":"Title goes here","displayTitle":true,"secondaryText":"Secondary text","displaySecondaryText":true,"imageSourceUrl":"","isImageEditMode":false,"displayImage":true,"supportingText":"Supporting text","displaySupportingText":true,"primaryActionButtonLabel":"Button text","primaryActionButtonUrl":"","primaryActionButtonNewTab":false,"primaryActionButtonNoFollow":false,"secondaryActionButtonLabel":"Button text","secondaryActionButtonUrl":"","secondaryActionButtonNewTab":false,"secondaryActionButtonNoFollow":false,"displayActions":true,"displaySecondaryActionButton":false,"outlined":true,"cornerRadius":8},{"contentLayout":"text-under-media","title":"Title goes here","displayTitle":true,"secondaryText":"Secondary text","displaySecondaryText":true,"imageSourceUrl":"","isImageEditMode":false,"displayImage":true,"supportingText":"Supporting text","displaySupportingText":true,"primaryActionButtonLabel":"Button text","primaryActionButtonUrl":"","primaryActionButtonNewTab":false,"primaryActionButtonNoFollow":false,"secondaryActionButtonLabel":"Button text","secondaryActionButtonUrl":"","secondaryActionButtonNewTab":false,"secondaryActionButtonNoFollow":false,"displayActions":true,"displaySecondaryActionButton":false,"outlined":true,"cornerRadius":8},{"contentLayout":"text-under-media","title":"Title goes here","displayTitle":true,"secondaryText":"Secondary text","displaySecondaryText":true,"imageSourceUrl":"","isImageEditMode":false,"displayImage":true,"supportingText":"Supporting text","displaySupportingText":true,"primaryActionButtonLabel":"Button text","primaryActionButtonUrl":"","primaryActionButtonNewTab":false,"primaryActionButtonNoFollow":false,"secondaryActionButtonLabel":"Button text","secondaryActionButtonUrl":"","secondaryActionButtonNewTab":false,"secondaryActionButtonNoFollow":false,"displayActions":true,"displaySecondaryActionButton":false,"outlined":true,"cornerRadius":8}],"gutter":{"desktop":24,"tablet":16,"mobile":10},"cornerRadius":8,"outlined":true} -->
				<div class="wp-block-material-cards-collection alignwide" id="block-material-cards-collection-1"><div class="masonry-grid layout-masonry"><div style="width:50%" class="masonry-grid_column"><div class="card-container"><div class="mdc-card material-design-card mdc-card--outlined" style="border-radius:8px"><div class="mdc-card__primary-action material-design-card__primary-action mdc-ripple-upgraded" tabindex="0"><div tabindex="0" class="mdc-card__media mdc-card__media--16-9 material-design-card__media material-design-card-with-text-under-media" style="background-image:url()"></div><div class="material-design-card__primary"><h2 class="material-design-card__title title-large">Title goes here</h2><h3 class="material-design-card__secondary-text body-medium">Secondary text</h3></div><div class="material-design-card__supporting-text material-design-card__supporting-text_text-under-media body-medium">Supporting text</div></div><div class="mdc-card__actions"><div class="mdc-card__action-buttons"><a href="#" class="mdc-button mdc-card__action mdc-card__action--button"><div class="mdc-button__ripple"></div><span class="mdc-button__label">Button text</span></a></div></div></div></div></div><div style="width:50%" class="masonry-grid_column"><div class="card-container"><div class="mdc-card material-design-card mdc-card--outlined" style="border-radius:8px"><div class="mdc-card__primary-action material-design-card__primary-action mdc-ripple-upgraded" tabindex="0"><div tabindex="0" class="mdc-card__media mdc-card__media--16-9 material-design-card__media material-design-card-with-text-under-media" style="background-image:url()"></div><div class="material-design-card__primary"><h2 class="material-design-card__title title-medium">Title goes here</h2><h3 class="material-design-card__secondary-text body-medium">Secondary text</h3></div><div class="material-design-card__supporting-text material-design-card__supporting-text_text-under-media body-medium">Supporting text</div></div><div class="mdc-card__actions"><div class="mdc-card__action-buttons"><a href="#" class="mdc-button mdc-card__action mdc-card__action--button"><div class="mdc-button__ripple"></div><span class="mdc-button__label">Button text</span></a></div></div></div></div></div></div></div>
				<!-- /wp:material/cards-collection -->

				<!-- wp:material/cards-collection {"style":"grid","cardsProps":[{"contentLayout":"text-under-media","title":"Title goes here","displayTitle":true,"secondaryText":"Secondary text","displaySecondaryText":true,"imageSourceUrl":"","isImageEditMode":false,"displayImage":true,"supportingText":"Supporting text","displaySupportingText":true,"primaryActionButtonLabel":"Button text","primaryActionButtonUrl":"","primaryActionButtonNewTab":false,"primaryActionButtonNoFollow":false,"secondaryActionButtonLabel":"Button text","secondaryActionButtonUrl":"","secondaryActionButtonNewTab":false,"secondaryActionButtonNoFollow":false,"displayActions":true,"displaySecondaryActionButton":false,"outlined":true,"cornerRadius":8},{"contentLayout":"text-under-media","title":"Title goes here","displayTitle":true,"secondaryText":"Secondary text","displaySecondaryText":true,"imageSourceUrl":"","isImageEditMode":false,"displayImage":true,"supportingText":"Supporting text","displaySupportingText":true,"primaryActionButtonLabel":"Button text","primaryActionButtonUrl":"","primaryActionButtonNewTab":false,"primaryActionButtonNoFollow":false,"secondaryActionButtonLabel":"Button text","secondaryActionButtonUrl":"","secondaryActionButtonNewTab":false,"secondaryActionButtonNoFollow":false,"displayActions":true,"displaySecondaryActionButton":false,"outlined":true,"cornerRadius":8},{"contentLayout":"text-under-media","title":"Title goes here","displayTitle":true,"secondaryText":"Secondary text","displaySecondaryText":true,"imageSourceUrl":"","isImageEditMode":false,"displayImage":true,"supportingText":"Supporting text","displaySupportingText":true,"primaryActionButtonLabel":"Button text","primaryActionButtonUrl":"","primaryActionButtonNewTab":false,"primaryActionButtonNoFollow":false,"secondaryActionButtonLabel":"Button text","secondaryActionButtonUrl":"","secondaryActionButtonNewTab":false,"secondaryActionButtonNoFollow":false,"displayActions":true,"displaySecondaryActionButton":false,"outlined":true,"cornerRadius":8}],"gutter":{"desktop":24,"tablet":16,"mobile":10},"cornerRadius":8,"outlined":true} -->
				<div class="wp-block-material-cards-collection alignwide" id="block-material-cards-collection-2"><div class="mdc-layout-grid layout-grid"><div class="mdc-layout-grid__inner"><div class="card-container mdc-layout-grid__cell--span-6"><div class="mdc-card material-design-card mdc-card--outlined" style="border-radius:8px"><div class="mdc-card__primary-action material-design-card__primary-action mdc-ripple-upgraded" tabindex="0"><div tabindex="0" class="mdc-card__media mdc-card__media--16-9 material-design-card__media material-design-card-with-text-under-media" style="background-image:url()"></div><div class="material-design-card__primary"><h2 class="material-design-card__title title-large">Title goes here</h2><h3 class="material-design-card__secondary-text body-medium">Secondary text</h3></div><div class="material-design-card__supporting-text material-design-card__supporting-text_text-under-media body-medium">Supporting text</div></div><div class="mdc-card__actions"><div class="mdc-card__action-buttons"><a href="#" class="mdc-button mdc-card__action mdc-card__action--button"><div class="mdc-button__ripple"></div><span class="mdc-button__label">Button text</span></a></div></div></div></div><div class="card-container mdc-layout-grid__cell--span-6"><div class="mdc-card material-design-card mdc-card--outlined" style="border-radius:8px"><div class="mdc-card__primary-action material-design-card__primary-action mdc-ripple-upgraded" tabindex="0"><div tabindex="0" class="mdc-card__media mdc-card__media--16-9 material-design-card__media material-design-card-with-text-under-media" style="background-image:url()"></div><div class="material-design-card__primary"><h2 class="material-design-card__title title-medium">Title goes here</h2><h3 class="material-design-card__secondary-text body-medium">Secondary text</h3></div><div class="material-design-card__supporting-text material-design-card__supporting-text_text-under-media body-medium">Supporting text</div></div><div class="mdc-card__actions"><div class="mdc-card__action-buttons"><a href="#" class="mdc-button mdc-card__action mdc-card__action--button"><div class="mdc-button__ripple"></div><span class="mdc-button__label">Button text</span></a></div></div></div></div></div></div></div>
				<!-- /wp:material/cards-collection -->

				<!-- wp:material/tab-bar {"forceUpdate":false,"tabs":[{"label":"Tab 1","content":[{"clientId":"e94ec7ee-937c-4f21-a06a-38da3da2e52c","name":"material/image-list","isValid":true,"attributes":{"images":[{"id":261,"url":"http://example.com/image1.png","alt":"","link":"http://localhost:8088/?attachment_id=261","caption":"","selected":false},{"id":260,"url":"http://example.com/image3.png","alt":"","link":"http://localhost:8088/?attachment_id=260","caption":"","selected":false},{"id":259,"url":"http://example.com/image2.png","alt":"","link":"http://localhost:8088/?attachment_id=259","caption":"","selected":false},{"id":258,"url":"http://example.com/image4.png","alt":"","link":"http://localhost:8088/?attachment_id=258","caption":"","selected":false},{"id":257,"url":"http://example.com/image5.png","alt":"","link":"http://localhost:8088/?attachment_id=257","caption":"","selected":false},{"id":256,"url":"http://example.com/image6.png","alt":"","link":"http://localhost:8088/?attachment_id=256","caption":"","selected":false},{"id":5,"url":"http://example.com/image7.png","alt":"","link":"http://localhost:8088/?attachment_id=5","caption":"","selected":false}],"style":"masonry","columns":2,"gutter":{"desktop":24,"tablet":16,"mobile":16},"displayCaptions":true,"textProtection":true,"linkTo":"media","cornerRadius":4,"id":"block-material-image-list-10"},"innerBlocks":[]}]},{"label":"Tab 2","content":[{"clientId":"e09ca06b-a7ad-4f9c-a3e3-55b61c821397","name":"material/contact-form","isValid":true,"attributes":{"emailTo":"admin@admin.local","subject":"This e-mail was sent from a contact form on Material Theming","confirmationMessage":"Your request has been successfully submitted","outlined":true,"fullWidth":true},"innerBlocks":[{"clientId":"8585c3e1-5589-44c3-ac63-1efe6cc554a6","name":"material/name-input-field","isValid":true,"attributes":{"inputType":"text","inputRole":"name","label":"Name","isRequired":true,"outlined":true,"fullWidth":true,"displayLabel":true,"id":"material-design-name-1"},"innerBlocks":[]},{"clientId":"6e3fdd90-60ea-4b13-a7ad-8b8b1e894a5e","name":"material/email-input-field","isValid":true,"attributes":{"inputType":"email","inputRole":"email","label":"Email","isRequired":true,"outlined":true,"fullWidth":true,"displayLabel":true,"id":"material-design-email-3"},"innerBlocks":[]},{"clientId":"01b78109-af15-4bee-97ae-7fe9c1ff7a53","name":"material/website-input-field","isValid":true,"attributes":{"inputType":"url","inputRole":"website","label":"Website","isRequired":false,"outlined":true,"fullWidth":true,"displayLabel":true,"id":"material-design-website-5"},"innerBlocks":[]},{"clientId":"a3f92d5d-7ec3-4799-a0b6-45c3dc221e7f","name":"material/message-input-field","isValid":true,"attributes":{"label":"Message","inputRole":"message","isRequired":true,"outlined":true,"fullWidth":true,"displayLabel":true,"id":"material-design-message-1"},"innerBlocks":[]},{"clientId":"10847ef6-fe53-4987-925b-e97524fe8c15","name":"material/button","isValid":true,"attributes":{"label":"Submit","type":"text","style":"unelevated","iconPosition":"leading","url":"","rel":"","isSubmit":true,"icon":"spa","cornerRadius":4},"innerBlocks":[]}]}]}]} -->
				<div class="wp-block-material-tab-bar mdc-tab-bar-container"><div class="mdc-tab-bar" role="tablist"><div class="mdc-tab-scroller"><div class="mdc-tab-scroller__scroll-area mdc-tab-scroller__scroll-area--scroll"><div class="mdc-tab-scroller__scroll-content"><div role="tab" tabindex="0" class="mdc-tab tab mdc-tab--active"><span class="mdc-tab__content"><span class="mdc-tab__text-label tab__label-field"><span role="tab" tabindex="0">Tab 1</span></span></span><span class="mdc-tab-indicator mdc-tab-indicator--active"><span class="mdc-tab-indicator__content mdc-tab-indicator__content--underline"></span></span><span class="mdc-tab__ripple"></span></div><div role="tab" tabindex="0" class="mdc-tab tab"><span class="mdc-tab__content"><span class="mdc-tab__text-label tab__label-field"><span role="tab" tabindex="0">Tab 2</span></span></span><span class="mdc-tab-indicator"><span class="mdc-tab-indicator__content mdc-tab-indicator__content--underline"></span></span><span class="mdc-tab__ripple"></span></div></div></div></div></div><div><div class="mdc-tab-content body-large mdc-tab-content--active"><div class="wp-block-material-image-list" id="block-material-image-list-10"><ul class="mdc-image-list mdc-image-list--masonry mdc-image-list--with-text-protection"><li class="mdc-image-list__item" role="presentation"><a class="mdc-image-list__item-wrap" href="http://example.com/image1.png"><img class="mdc-image-list__image" alt="" src="http://example.com/image1.png" data-id="261" data-link="http://localhost:8088/?attachment_id=261"/></a></li><li class="mdc-image-list__item" role="presentation"><a class="mdc-image-list__item-wrap" href="http://example.com/image3.png"><img class="mdc-image-list__image" alt="" src="http://example.com/image3.png" data-id="260" data-link="http://localhost:8088/?attachment_id=260"/></a></li><li class="mdc-image-list__item" role="presentation"><a class="mdc-image-list__item-wrap" href="http://example.com/image2.png"><img class="mdc-image-list__image" alt="" src="http://example.com/image2.png" data-id="259" data-link="http://localhost:8088/?attachment_id=259"/></a></li><li class="mdc-image-list__item" role="presentation"><a class="mdc-image-list__item-wrap" href="http://example.com/image4.png"><img class="mdc-image-list__image" alt="" src="http://example.com/image4.png" data-id="258" data-link="http://localhost:8088/?attachment_id=258"/></a></li><li class="mdc-image-list__item" role="presentation"><a class="mdc-image-list__item-wrap" href="http://example.com/image5.png"><img class="mdc-image-list__image" alt="" src="http://example.com/image5.png" data-id="257" data-link="http://localhost:8088/?attachment_id=257"/></a></li><li class="mdc-image-list__item" role="presentation"><a class="mdc-image-list__item-wrap" href="http://example.com/image6.png"><img class="mdc-image-list__image" alt="" src="http://example.com/image6.png" data-id="256" data-link="http://localhost:8088/?attachment_id=256"/></a></li><li class="mdc-image-list__item" role="presentation"><a class="mdc-image-list__item-wrap" href="http://example.com/image7.png"><img class="mdc-image-list__image" alt="" src="http://example.com/image7.png" data-id="5" data-link="http://localhost:8088/?attachment_id=5"/></a></li></ul></div></div><div class="mdc-tab-content body-large"><div class="wp-block-material-contact-form"><!-- wp:material/name-input-field {"id":"material-design-name-1","outlined":true} -->
				<div class="mdc-text-field-container"><div class="mdc-text-field mdc-text-field--outlined mdc-text-field--custom-full"><input id="material-design-name-1" name="material-design-name-1" type="text" required class="mdc-text-field__input" aria-labelledby="label-material-design-name-1" data-form="contact" data-meta="name" data-label="Name"/><div class="mdc-notched-outline"><div class="mdc-notched-outline__leading"></div><div class="mdc-notched-outline__notch"><label for="material-design-name-1" class="mdc-floating-label" id="label-material-design-name-1">Name</label></div><div class="mdc-notched-outline__trailing"></div></div></div></div>
				<!-- /wp:material/name-input-field -->
				<!-- wp:material/email-input-field {"id":"material-design-email-3","outlined":true} -->
				<div class="mdc-text-field-container"><div class="mdc-text-field mdc-text-field--outlined mdc-text-field--custom-full"><input id="material-design-email-3" name="material-design-email-3" type="email" required class="mdc-text-field__input" aria-labelledby="label-material-design-email-3" data-form="contact" data-meta="email" data-label="Email"/><div class="mdc-notched-outline"><div class="mdc-notched-outline__leading"></div><div class="mdc-notched-outline__notch"><label for="material-design-email-3" class="mdc-floating-label" id="label-material-design-email-3">Email</label></div><div class="mdc-notched-outline__trailing"></div></div></div></div>
				<!-- /wp:material/email-input-field -->
				<!-- wp:material/website-input-field {"id":"material-design-website-5","outlined":true} -->
				<div class="mdc-text-field-container mdc-text-field-container--not-required"><div class="mdc-text-field mdc-text-field--outlined mdc-text-field--custom-full"><input id="material-design-website-5" name="material-design-website-5" type="url" class="mdc-text-field__input" aria-labelledby="label-material-design-website-5" data-form="contact" data-meta="website" data-label="Website"/><div class="mdc-notched-outline"><div class="mdc-notched-outline__leading"></div><div class="mdc-notched-outline__notch"><label for="material-design-website-5" class="mdc-floating-label" id="label-material-design-website-5">Website</label></div><div class="mdc-notched-outline__trailing"></div></div></div></div>
				<!-- /wp:material/website-input-field -->
				<!-- wp:material/message-input-field {"id":"material-design-message-1"} -->
				<div class="mdc-text-field-container"><div class="mdc-text-field mdc-text-field--outlined mdc-text-field--textarea mdc-text-field--custom-full"><span class="mdc-text-field__ripple"></span><textarea id="material-design-message-1" name="material-design-message-1" class="mdc-text-field__input" rows="8" aria-labelledby="label-material-design-message-1" data-form="contact" data-meta="message" data-label="Message" required></textarea><div class="mdc-notched-outline"><div class="mdc-notched-outline__leading"></div><div class="mdc-notched-outline__notch"><label for="material-design-message-1" class="mdc-floating-label" id="label-material-design-message-1">Message</label></div><span class="mdc-notched-outline__trailing"></span></div></div></div>
				<!-- /wp:material/message-input-field -->
				<!-- wp:material/button {"label":"Submit","style":"unelevated","cornerRadius":4,"icon":"spa","isSubmit":true} -->
				<div class="wp-block-material-button"><button class="mdc-button mdc-button--unelevated" style="border-radius:4px" type="submit"><i class="material-icons mdc-button__icon"></i><div class="mdc-button__ripple"></div><span class="mdc-button__label">Submit</span></button></div>
				<!-- /wp:material/button --></div></div></div></div>
				<!-- /wp:material/tab-bar -->
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

		$this->assertContains( '#block-material-image-list-10 .mdc-image-list__item-wrap', $styles[0] );
		$this->assertContains( '#block-material-image-list-10 .mdc-image-list__image', $styles[0] );
		$this->assertContains( '#block-material-image-list-10 .mdc-image-list__supporting', $styles[0] );
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
