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
 * Class WP-CLI Command to update Fonts from Google Fonts API.
 *
 * @package MaterialDesign
 */

namespace MaterialDesign\Plugin\Cli;

use Exception;
use MaterialDesign\Plugin\Api\Update_Fonts;
use stdClass;

/**
 * Class Fonts
 *
 * @package MaterialDesign\Plugin\Cli
 */
class Fonts extends \WP_CLI_Command /*phpcs:ignore WordPressVIPMinimum.Classes.RestrictedExtendClasses.wp_cli*/ {

	/**
	 * Registers command with WP-CLI
	 *
	 * @throws Exception Generic Exception.
	 */
	public function register() {

		\WP_CLI::add_command(
			'material ' . $this->command(),
			[ $this, 'run_command' ],
			[
				'shortdesc' => $this->description(),
				'synopsis'  => $this->arguments(),
			]
		);
	}

	/**
	 * Registers the command description
	 *
	 * @return string
	 */
	public function description() {
		return __( 'Retrieves and stores fonts from the Google Fonts API', 'material-design' );
	}

	/**
	 * Registers parameters for the command
	 *
	 * @return array[]
	 */
	public function arguments() {
		return [
			[
				'type'        => 'optional',
				'name'        => 'api-key',
				'optional'    => true,
				'description' => $this->description(),
			],
		];
	}

	/**
	 * Registers the command name e.g. `wp material fonts-update`
	 */
	public function command() {
		return 'fonts-update';
	}

	/**
	 * Executes the command
	 *
	 * @param array $args Positional Arguments.
	 * @param array $assoc_args Associative Arguments.
	 *
	 * @throws Exception Generic Exception.
	 */
	public function run_command( $args, $assoc_args ) {
		$google_fonts = new Update_Fonts();
		$data         = $google_fonts->get_fonts();

		if ( ! empty( $data ) ) {
			\WP_CLI::success( __( 'Fonts have been updated.', 'material-design' ) );
		} else {
			\WP_CLI::error( __( 'Fonts were not updated.', 'material-design' ) );
		}
	}
}
