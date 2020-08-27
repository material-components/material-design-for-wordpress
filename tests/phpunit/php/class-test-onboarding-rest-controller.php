<?php
/**
 * Tests for Onboarding_REST_Controller class.
 *
 * @package MaterialThemeBuilder
 */

namespace MaterialThemeBuilder;

use MaterialThemeBuilder\Plugin;
use WP_REST_Request;
use WP_Test_REST_Controller_Testcase;
use WP_Theme;

/**
 * Stub to return specific values for `wp_get_themes`.
 *
 * @return array
 */
function wp_get_themes() {
	$return = [
		'default',
		'material-theme',
	];

	$themes = [];
	foreach ( $return as $theme ) {
		$themes[ $theme ] = new WP_Theme( $theme, $theme );
	}

	return $themes;
}

/**
 * Tests for the Rest_Controller class.
 */
class Test_Onboarding_REST_Controller extends WP_Test_REST_Controller_Testcase {
	/**
	 * Admin user for test.
	 *
	 * @var int
	 */
	protected static $admin_id;

	/**
	 * Subscriber user for test.
	 *
	 * @var int
	 */
	protected static $subscriber_id;

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
		self::$admin_id      = $factory->user->create(
			[ 'role' => 'administrator' ]
		);
		self::$subscriber_id = $factory->user->create(
			[ 'role' => 'subscriber' ]
		);

		static::$routes = rest_get_server()->get_routes();
	}

	/**
	 * Remove fake data.
	 */
	public static function wpTearDownAfterClass() {
		self::delete_user( self::$admin_id );
		self::delete_user( self::$subscriber_id );
	}

	/**
	 * Test get_rest_base_url().
	 *
	 * @see Onboarding_REST_Controller::get_rest_base_url()
	 */
	public function test_get_rest_base_url() {
		$plugin = new Plugin();
		$plugin->init();
		$controller = new Onboarding_REST_Controller( $plugin );

		$this->assertContains( $this->get_route(), $controller->get_rest_base_url() );
	}

	/**
	 * Test register_routes().
	 *
	 * @see Onboarding_REST_Controller::test_register_routes()
	 */
	public function test_register_routes() {
		$this->assertArrayHasKey( $this->get_route( '/install-theme' ), static::$routes );
		$this->assertCount( 1, static::$routes[ $this->get_route( '/install-theme' ) ] );

		$this->assertArrayHasKey( $this->get_route( '/activate-theme' ), static::$routes );
		$this->assertCount( 1, static::$routes[ $this->get_route( '/activate-theme' ) ] );

		$this->assertArrayHasKey( $this->get_route( '/install-content' ), static::$routes );
		$this->assertCount( 1, static::$routes[ $this->get_route( '/install-content' ) ] );
	}

	/**
	 * Test install_theme().
	 *
	 * @see Onboarding_REST_Controller::install_theme()
	 */
	public function test_install_theme() {
		wp_set_current_user( self::$subscriber_id );

		$request  = new WP_REST_Request( 'POST', $this->get_route( '/install-theme' ) );
		$response = rest_get_server()->dispatch( $request );
		$data     = $response->get_data();

		$this->assertEquals( 'material_rest_cannot_update', $data['code'] );
		$this->assertEquals( 403, $data['data']['status'] );

		wp_set_current_user( self::$admin_id );

		$response = rest_get_server()->dispatch( $request );
		$data     = $response->get_data();

		$this->assertEquals( 'material-theme', $data['slug'] );
		$this->assertEquals( 'material-theme', $data['name'] );
		$this->assertEquals( 'success', $data['status'] );
	}

	/**
	 * Test activate_theme().
	 *
	 * @see Onboarding_REST_Controller::activate_theme()
	 */
	public function test_activate_theme() {
		wp_set_current_user( self::$subscriber_id );

		$request  = new WP_REST_Request( 'POST', $this->get_route( '/activate-theme' ) );
		$response = rest_get_server()->dispatch( $request );
		$data     = $response->get_data();

		$this->assertEquals( 'material_rest_cannot_update', $data['code'] );
		$this->assertEquals( 403, $data['data']['status'] );

		wp_set_current_user( self::$admin_id );

		$response = rest_get_server()->dispatch( $request );
		$data     = $response->get_data();

		$this->assertEquals( 'material-theme', $data['slug'] );
		$this->assertEquals( 'material-theme', $data['name'] );
		$this->assertEquals( 'success', $data['status'] );
	}

	/**
	 * Test test_import_content().
	 *
	 * @see Importer_REST_Controller::import_content()
	 */
	public function test_import_content() {
		wp_set_current_user( self::$subscriber_id );

		$request  = new WP_REST_Request( 'POST', $this->get_route( '/install-content' ) );
		$response = rest_get_server()->dispatch( $request );
		$data     = $response->get_data();

		$this->assertEquals( 'material_rest_cannot_update', $data['code'] );
		$this->assertEquals( 403, $data['data']['status'] );

		wp_set_current_user( self::$admin_id );

		$response = rest_get_server()->dispatch( $request );
		$data     = $response->get_data();

		$this->assertEquals( 'demo-importer', $data['slug'] );
		$this->assertEquals( 'Demo Importer', $data['name'] );
		$this->assertEquals( 'success', $data['status'] );
	}

	/**
	 * Test get_item_schema().
	 *
	 * @see Importer_REST_Controller::get_item_schema()
	 */
	public function test_get_item_schema() {
		$request    = new WP_REST_Request( 'OPTIONS', $this->get_route( '/install-theme' ) );
		$response   = rest_get_server()->dispatch( $request );
		$data       = $response->get_data();
		$properties = $data['schema']['properties'];

		$this->assertEquals( 3, count( $properties ) );
		$this->assertArrayHasKey( 'slug', $properties );
		$this->assertArrayHasKey( 'name', $properties );
		$this->assertArrayHasKey( 'status', $properties );
	}

	/**
	 * Test context_param().
	 */
	public function test_context_param() {
		$this->markTestSkipped( 'Method not implemented' );
	}

	/**
	 * Test get_items().
	 */
	public function test_get_items() {
		$this->markTestSkipped( 'Method not implemented' );
	}

	/**
	 * Test get_item().
	 */
	public function test_get_item() {
		$this->markTestSkipped( 'Method not implemented' );
	}

	/**
	 * Test create_item().
	 */
	public function test_create_item() {
		$this->markTestSkipped( 'Method not implemented' );
	}

	/**
	 * Test update_item().
	 */
	public function test_update_item() {
		$this->markTestSkipped( 'Method not implemented' );
	}

	/**
	 * Test delete_item().
	 */
	public function test_delete_item() {
		$this->markTestSkipped( 'Method not implemented' );
	}

	/**
	 * Test prepare_item().
	 */
	public function test_prepare_item() {
		$this->markTestSkipped( 'Method not implemented' );
	}

	/**
	 * Generate a prefixed route path.
	 *
	 * @param string $path URL path.
	 * @return string Route path.
	 */
	private function get_route( $path = '' ) {
		return '/material-theme-builder/v1/onboarding' . "$path";
	}
}
