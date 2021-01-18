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
 * Class Admin Updates
 *
 * @package MaterialDesign
 */

namespace MaterialDesign\Plugin\Admin;

use MaterialDesign\Plugin\Api\Update_Fonts;
use MaterialDesign\Plugin\Api\Update_Icons;

/**
 * Class Admin_Updates
 *
 * @package MaterialDesign\Plugin\Admin
 */
class Admin_Updates {

	/**
	 * Hooks and stuff
	 */
	public function init() {
		global $pagenow;
		if ( 'customize.php' !== $pagenow ) {
			return false;
		}

		add_action( 'admin_init', [ $this, 'run_updates' ], 9999 );
	}

	/**
	 * Callback for updaters.
	 *
	 * @hook admin_init
	 */
	public function run_updates() {
		$this->update_fonts();
		$this->update_fonts();
	}

	/**
	 * Runs the Font Updater but bails if transient exists.
	 *
	 * @return bool
	 */
	public function update_fonts() {

		$expired = get_transient( Update_Fonts::TRANSIENT );
		if ( false !== $expired ) {
			return false;
		}

		$fonts = new Update_Fonts( false );
		$fonts->get_fonts();

		return true;
	}

	/**
	 * Runs the Icon Updater but bails if transient is exists.
	 *
	 * @return bool
	 */
	public function update_icons() {

		$expired = get_transient( Update_Icons::TRANSIENT );
		if ( false !== $expired ) {
			return false;
		}

		$icons = new Update_Icons( false );
		$icons->get_icons();

		return true;
	}
}
