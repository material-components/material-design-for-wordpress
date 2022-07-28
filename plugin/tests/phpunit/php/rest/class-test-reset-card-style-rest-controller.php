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
 * Tests for Test_Reset_Card_Style_Rest_Controller class.
 *
 * @package MaterialDesign
 */

namespace MaterialDesign\Plugin\Rest;

use MaterialDesign\Plugin\Plugin;
use WP_REST_Request;
use WP_Test_REST_Controller_Testcase;
use WP_UnitTest_Factory;
use Yoast\PHPUnitPolyfills\Polyfills\AssertStringContains;

/**
 * Tests for the Test_Reset_Card_Style_Rest_Controller class.
 */
class Test_Reset_Card_Style_Rest_Controller extends WP_Test_REST_Controller_Testcase {

	use AssertStringContains;

	/**
	 * Admin user for test.
	 *
	 * @var int
	 */
	protected static $admin_id;

	/**
	 * List of registered routes.
	 *
	 * @var array[]
	 */
	private static $routes;

	/**
	 * Create fake data before our tests run.
	 *
	 * @param WP_UnitTest_Factory $factory Helper that lets us create fake data.
	 */
	public static function wpSetUpBeforeClass( $factory ) {
		self::$admin_id = $factory->user->create(
			[ 'role' => 'administrator' ]
		);

		static::$routes = rest_get_server()->get_routes();
	}

	/**
	 * Remove fake data.
	 */
	public static function wpTearDownAfterClass() {
		self::delete_user( self::$admin_id );
	}

	/**
	 * Test get_base_path().
	 *
	 * @see Reset_Card_Style_Rest_Controller::get_base_path()
	 */
	public function test_get_base_path() {
		$plugin = new Plugin();
		$plugin->init();
		$controller = new Reset_Card_Style_Rest_Controller( $plugin );

		$this->assertContains( $this->get_route(), $controller->get_base_path() );
	}

	/**
	 * Test register_routes().
	 *
	 * @see Reset_Card_Style_Rest_Controller::register_routes()
	 */
	public function test_register_routes() {
		$this->assertArrayHasKey( $this->get_route(), static::$routes );
		$this->assertCount( 1, static::$routes[ $this->get_route() ] );
	}

	/**
	 * Test migrate_posts().
	 *
	 * @see Reset_Card_Style_Rest_Controller::migrate_posts()
	 */
	public function test_migrate_posts() {
		wp_set_current_user( self::$admin_id );
		$post_id  = $this->factory()->post->create(
			[
				'post_content' => '<!-- wp:heading {"level":3} -->
<h3>Recent post</h3>
<!-- /wp:heading -->

<!-- wp:material/recent-posts {"cardStyle":"outlined"} /-->

<!-- wp:heading {"level":3} -->
<h3>Card collection manual</h3>
<!-- /wp:heading -->

<!-- wp:material/cards-collection {"cardsProps":[{"contentLayout":"text-under-media","displayTitle":true,"displaySecondaryText":true,"imageSourceUrl":"http://localhost:8088/wp-content/uploads/2021/04/material-demo-photo-1558906217-200fade11db0.jpeg","isImageEditMode":false,"displayImage":true,"displaySupportingText":true,"primaryActionButtonLabel":"btn","primaryActionButtonUrl":"","primaryActionButtonNewTab":false,"primaryActionButtonNoFollow":false,"secondaryActionButtonLabel":"","secondaryActionButtonUrl":"","secondaryActionButtonNewTab":false,"secondaryActionButtonNoFollow":false,"displayActions":true,"displaySecondaryActionButton":false,"outlined":"global","title":"Title card","secondaryText":"Title card","supportingText":"Title card","cardStyle":"elevated"},{"contentLayout":"text-under-media","displayTitle":true,"displaySecondaryText":true,"imageSourceUrl":"http://localhost:8088/wp-content/uploads/2021/04/material-demo-photo-1558906217-021abc4ab788.jpeg","isImageEditMode":false,"displayImage":true,"displaySupportingText":true,"primaryActionButtonLabel":"btn","primaryActionButtonUrl":"","primaryActionButtonNewTab":false,"primaryActionButtonNoFollow":false,"secondaryActionButtonLabel":"","secondaryActionButtonUrl":"","secondaryActionButtonNewTab":false,"secondaryActionButtonNoFollow":false,"displayActions":true,"displaySecondaryActionButton":false,"outlined":"global","supportingText":"Title card","secondaryText":"Title card","title":"Title card","cardStyle":"elevated"}],"cardStyle":"elevated"} -->
<div class="wp-block-material-cards-collection alignwide" id="block-material-cards-collection-1"><div class="masonry-grid layout-masonry"><div style="width:50%" class="masonry-grid_column"><div class="card-container"><div class="mdc-card material-design-card"><div class="mdc-card__primary-action material-design-card__primary-action mdc-ripple-upgraded" tabindex="0"><div tabindex="0" class="mdc-card__media mdc-card__media--16-9 material-design-card__media material-design-card-with-text-under-media"><img src="http://localhost:8088/wp-content/uploads/2021/04/material-demo-photo-1558906217-200fade11db0.jpeg" alt="Title card"/></div><div class="material-design-card__primary"><h2 class="material-design-card__title title-large">Title card</h2><h3 class="material-design-card__secondary-text body-medium">Title card</h3></div><div class="material-design-card__supporting-text material-design-card__supporting-text_text-under-media body-medium">Title card</div></div><div class="mdc-card__actions"><div class="mdc-card__action-buttons"><a href="#" class="mdc-button mdc-card__action mdc-card__action--button"><div class="mdc-button__ripple"></div><span class="mdc-button__label">btn</span></a></div></div></div></div></div><div style="width:50%" class="masonry-grid_column"><div class="card-container"><div class="mdc-card material-design-card"><div class="mdc-card__primary-action material-design-card__primary-action mdc-ripple-upgraded" tabindex="0"><div tabindex="0" class="mdc-card__media mdc-card__media--16-9 material-design-card__media material-design-card-with-text-under-media"><img src="http://localhost:8088/wp-content/uploads/2021/04/material-demo-photo-1558906217-021abc4ab788.jpeg" alt="Title card"/></div><div class="material-design-card__primary"><h2 class="material-design-card__title title-medium">Title card</h2><h3 class="material-design-card__secondary-text body-medium">Title card</h3></div><div class="material-design-card__supporting-text material-design-card__supporting-text_text-under-media body-medium">Title card</div></div><div class="mdc-card__actions"><div class="mdc-card__action-buttons"><a href="#" class="mdc-button mdc-card__action mdc-card__action--button"><div class="mdc-button__ripple"></div><span class="mdc-button__label">btn</span></a></div></div></div></div></div></div></div>
<!-- /wp:material/cards-collection -->

<!-- wp:heading {"level":3} -->
<h3>Curated card collection</h3>
<!-- /wp:heading -->

<!-- wp:material/hand-picked-posts {"cardStyle":"elevated","posts":[996,826],"editMode":false} /-->

<!-- wp:heading {"level":3} -->
<h3>Card</h3>
<!-- /wp:heading -->

<!-- wp:material/card {"title":"card","secondaryText":"card","imageSourceUrl":"http://localhost:8088/wp-content/uploads/2021/04/material-demo-photo-1558906217-200fade11db0.jpeg","isImageEditMode":false,"supportingText":"card","primaryActionButtonLabel":"BTN","cardStyle":"outlined"} -->
<div class="wp-block-material-card"><div class="mdc-card mdc-card--outlined material-design-card"><div class="mdc-card__primary-action material-design-card__primary-action mdc-ripple-upgraded" tabindex="0"><div tabindex="0" class="mdc-card__media mdc-card__media--16-9 material-design-card__media material-design-card-with-text-under-media"><img src="http://localhost:8088/wp-content/uploads/2021/04/material-demo-photo-1558906217-200fade11db0.jpeg" alt="card"/></div><div class="material-design-card__primary"><h2 class="material-design-card__title title-large">card</h2><h3 class="material-design-card__secondary-text body-medium">card</h3></div><div class="material-design-card__supporting-text material-design-card__supporting-text_text-under-media body-medium">card</div></div><div class="mdc-card__actions"><div class="mdc-card__action-buttons"><a href="#" class="mdc-button mdc-card__action mdc-card__action--button"><div class="mdc-button__ripple"></div><span class="mdc-button__label">BTN</span></a></div></div></div></div>
<!-- /wp:material/card -->',
			]
		);
		$request  = new WP_REST_Request( 'POST', $this->get_route() );
		$response = rest_get_server()->dispatch( $request );
		$data     = $response->get_data();
		$this->assertArrayHasKey( 'pending', $data );
		$this->assertFalse( $data['pending'] );
		$post_after   = get_post( $post_id );
		$post_content = $post_after->post_content;
		$this->assertStringNotContainsString( '"cardStyle":"outlined"', $post_content );
		$this->assertStringNotContainsString( '"cardStyle":"elevated"', $post_content );
		$this->assertEquals( substr_count( $post_content, '"cardStyle"' ), substr_count( $post_content, '"cardStyle":"global"' ) );
	}

	/**
	 * Get reset path.
	 *
	 * @return string Route path.
	 */
	private function get_route() {
		return '/material-design/v1/migrate-global-card-style';
	}

	/**
	 * Test test_context_param().
	 */
	public function test_context_param() {
		$this->markTestSkipped( 'Method not implemented' );
	}

	/**
	 * Test test_get_items.
	 */
	public function test_get_items() {
		$this->markTestSkipped( 'Method not implemented' );
	}

	/**
	 * Test test_get_item.
	 */
	public function test_get_item() {
		$this->markTestSkipped( 'Method not implemented' );
	}

	/**
	 * Test test_create_item.
	 */
	public function test_create_item() {
		$this->markTestSkipped( 'Method not implemented' );
	}

	/**
	 * Test test_update_item.
	 */
	public function test_update_item() {
		$this->markTestSkipped( 'Method not implemented' );
	}

	/**
	 * Test test_delete_item.
	 */
	public function test_delete_item() {
		$this->markTestSkipped( 'Method not implemented' );
	}

	/**
	 * Test test_prepare_item.
	 */
	public function test_prepare_item() {
		$this->markTestSkipped( 'Method not implemented' );
	}

	/**
	 * Test test_get_item_schema.
	 */
	public function test_get_item_schema() {
		$this->markTestSkipped( 'Method not implemented' );
	}
}
