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

use MaterialDesign\Plugin\Updates\Update_Fonts;
use MaterialDesign\Plugin\Updates\Update_Icons;

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
	 *
	 * @return bool Whether the updates happened successful.
	 * @throws \Exception Exception.
	 */
	public function run_updates() {
		$success = $this->update_fonts( true );
		$success = $this->update_icons( true );

		return $success;
	}

	/**
	 * Runs the Font Updater but bails if transient exists.
	 *
	 * @param bool $write_response Whether to write output to file.
	 *
	 * @return bool
	 * @throws \Exception Exception.
	 */
	public function update_fonts( $write_response = true ) {
		$fonts = new Update_Fonts( false );
		$fonts->update( $write_response );

		return true;
	}

	/**
	 * Runs the Icon Updater but bails if transient is exists.
	 *
	 * @param bool $write_response Whether to write output to file.
	 *
	 * @return bool
	 */
	public function update_icons( $write_response = true ) {
		$icons = new Update_Icons( false );
		$icons->update( $write_response );

		return true;
	}
}
