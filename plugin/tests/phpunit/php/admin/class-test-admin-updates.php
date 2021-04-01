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
 * Tests for Onboarding_REST_Controller class.
 *
 * @package MaterialDesign
 */

namespace MaterialDesign\Plugin;

use MaterialDesign\Plugin\Admin\Admin_Updates;

/**
 * Class Test_Admin_Updates
 *
 * @package MaterialDesign\Plugin
 */
class Test_Admin_Updates extends \WP_UnitTestCase {

	/**
	 * Class instance.
	 *
	 * @var Admin_Updates
	 */
	public $admin;

	/**
	 * Setup
	 */
	public function setUp() {
		parent::setUp();

		$this->admin = new Admin_Updates();
	}

	/**
	 * Tests whether icons and fonts are updated when invoked.
	 */
	public function test_run_updates() {
		$this->assertTrue( $this->admin->run_updates( false ) );
	}
}
