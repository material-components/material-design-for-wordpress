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
 * Tests for Plugin_Base.
 *
 * @package MaterialDesign
 */

namespace MaterialDesign\Plugin;

/**
 * Tests for Plugin_Base.
 */
class Test_Plugin_Base extends \WP_UnitTestCase {

	/**
	 * Plugin instance.
	 *
	 * @var Plugin
	 */
	public $plugin;

	/**
	 * Plugin basename.
	 *
	 * @var string
	 */
	public $basename;

	/**
	 * Setup.
	 *
	 * @inheritdoc
	 */
	public function setUp() {
		parent::setUp();
		$this->plugin   = get_plugin_instance();
		$base_dir       = dirname( dirname( dirname( dirname( __FILE__ ) ) ) );
		$this->basename = basename( $base_dir );

		// If the tests are run from root, include the plugin folder in basename.
		if ( 'plugin' === $this->basename ) {
			$this->basename = basename( dirname( $base_dir ) ) . '/' . $this->basename;
		}
	}

	/**
	 * Test locate_plugin.
	 *
	 * @see Plugin_Base::locate_plugin()
	 */
	public function test_locate_plugin() {
		$location = $this->plugin->locate_plugin();

		$this->assertEquals( WP_CONTENT_DIR . '/plugins/' . $this->basename, $location['dir_path'] );
		$this->assertEquals( content_url( '/plugins/' . $this->basename . '/' ), $location['dir_url'] );
	}

	/**
	 * Test relative_path.
	 *
	 * @see Plugin_Base::relative_path()
	 */
	public function test_relative_path() {
		$this->assertEquals( 'plugins/material-design', $this->plugin->relative_path( '/var/www/html/wp-content/plugins/material-design', 'wp-content', '/' ) );
		$this->assertEquals( 'themes/twentysixteen/plugins/material-design', $this->plugin->relative_path( '/var/www/html/wp-content/themes/twentysixteen/plugins/material-design', 'wp-content', '/' ) );
	}

	/**
	 * Test asset_url.
	 *
	 * @see Plugin_Base::asset_url()
	 */
	public function test_asset_url() {
		$this->assertContains( '/plugins/' . $this->basename . '/editor.js', $this->plugin->asset_url( 'editor.js' ) );
	}

	/**
	 * Tests for trigger_warning().
	 *
	 * @see Plugin_Base::trigger_warning()
	 */
	public function test_trigger_warning() {
		$obj = $this;
		// phpcs:disable
		set_error_handler(
			function( $errno, $errstr ) use ( $obj ) {
				$obj->assertEquals( 'MaterialDesign\Plugin\Plugin: Param is 0!', $errstr );
				$obj->assertEquals( \E_USER_WARNING, $errno );
			}
		);
		// phpcs:enable
		$this->plugin->trigger_warning( 'Param is 0!', \E_USER_WARNING );
		restore_error_handler();
	}

	/**
	 * Test asset_version().
	 *
	 * @see Plugin_Base::asset_version()
	 */
	public function test_asset_version() {
		$mock = $this->getMockBuilder( 'MaterialDesign\Plugin\Plugin' )
			->setMethods(
				[
					'is_debug',
					'is_script_debug',
				]
			)
			->getMock();

		$mock->method( 'is_debug' )
			->willReturn( false );

		$mock->method( 'is_script_debug' )
			->willReturn( false );

		$this->assertFalse( $mock->is_debug() );
		$this->assertFalse( $mock->is_script_debug() );
		$this->assertEquals( $mock->version(), $mock->asset_version() );

		$mock = $this->getMockBuilder( 'MaterialDesign\Plugin\Plugin' )
			->setMethods(
				[
					'is_debug',
				]
			)
			->getMock();

		$mock->method( 'is_debug' )
			->willReturn( true );

		$this->assertNotEquals( $mock->version(), $mock->asset_version() );
	}

	/**
	 * Test is_wpcom_vip_prod().
	 *
	 * @see Plugin_Base::is_wpcom_vip_prod()
	 */
	public function test_is_wpcom_vip_prod() {
		if ( ! defined( 'WPCOM_IS_VIP_ENV' ) ) {
			$this->assertFalse( $this->plugin->is_wpcom_vip_prod() );
			define( 'WPCOM_IS_VIP_ENV', true );
		}
		$this->assertEquals( \WPCOM_IS_VIP_ENV, $this->plugin->is_wpcom_vip_prod() );
	}

	/**
	 * Test is_debug().
	 *
	 * @see Plugin_Base::is_debug()
	 */
	public function test_is_debug() {
		$this->assertEquals( \WP_DEBUG, $this->plugin->is_debug() );
	}

	/**
	 * Test is_script_debug().
	 *
	 * @see Plugin_Base::is_script_debug()
	 */
	public function test_is_script_debug() {
		$this->assertEquals( \SCRIPT_DEBUG, $this->plugin->is_script_debug() );
	}

	/**
	 * Test add_doc_hooks().
	 *
	 * @see Plugin_Base::add_doc_hooks()
	 */
	public function test_add_doc_hooks() {
		$object = new Test_Doc_Hooks();

		$this->assertEquals( 10, has_action( 'init', [ $object, 'init_action' ] ) );
		$this->assertEquals( 10, has_action( 'the_content', [ $object, 'the_content_filter' ] ) );
		$object->remove_doc_hooks( $object );
	}

	/**
	 * Test add_doc_hooks().
	 *
	 * @see Plugin_Base::add_doc_hooks()
	 */
	public function test_add_doc_hooks_error() {
		$mock = $this->getMockBuilder( 'MaterialDesign\Plugin\Plugin' )
			->setMethods( [ 'is_wpcom_vip_prod' ] )
			->getMock();

		$mock->method( 'is_wpcom_vip_prod' )
			->willReturn( false );

		$this->assertFalse( $mock->is_wpcom_vip_prod() );

		$obj = $this;
		// phpcs:disable
		set_error_handler(
			function( $errno, $errstr ) use ( $obj, $mock ) {
				$obj->assertEquals( sprintf( 'The add_doc_hooks method was already called on %s. Note that the Plugin_Base constructor automatically calls this method.', get_class( $mock ) ), $errstr );
				$obj->assertEquals( \E_USER_NOTICE, $errno );
			}
		);
		// phpcs:enable
		$mock->add_doc_hooks();
		restore_error_handler();

		$mock->remove_doc_hooks();
	}

	/**
	 * Test remove_doc_hooks().
	 *
	 * @see Plugin_Base::remove_doc_hooks()
	 */
	public function test_remove_doc_hooks() {
		$object = new Test_Doc_Hooks();
		$this->assertEquals( 10, has_action( 'init', [ $object, 'init_action' ] ) );
		$this->assertEquals( 10, has_action( 'the_content', [ $object, 'the_content_filter' ] ) );

		$object->remove_doc_hooks( $object );
		$this->assertFalse( has_action( 'init', [ $object, 'init_action' ] ) );
		$this->assertFalse( has_action( 'the_content', [ $object, 'the_content_filter' ] ) );
	}

	/**
	 * Test __destruct().
	 *
	 * @see Plugin_Base::__destruct()
	 */
	public function test___destruct() {
		$object = new Test_Doc_Hooks();
		$this->assertEquals( 10, has_action( 'init', [ $object, 'init_action' ] ) );
		$this->assertEquals( 10, has_action( 'the_content', [ $object, 'the_content_filter' ] ) );

		$object->__destruct( $object );
		$this->assertFalse( has_action( 'init', [ $object, 'init_action' ] ) );
		$this->assertFalse( has_action( 'the_content', [ $object, 'the_content_filter' ] ) );
	}
}

// phpcs:disable
/**
 * Test_Doc_Hooks class.
 */
class Test_Doc_Hooks extends Plugin {

	/**
	 * Load this on the init action hook.
	 *
	 * @action init
	 */
	public function init_action() {}

	/**
	 * Load this on the the_content filter hook.
	 *
	 * @filter the_content
	 *
	 * @param string $content The content.
	 * @return string
	 */
	public function the_content_filter( $content ) {
		return $content;
	}
}
// phpcs:enable
