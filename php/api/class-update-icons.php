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
 * Class Google Material API .
 *
 * @package MaterialDesign
 */

namespace MaterialDesign\Plugin\Api;

use Exception;
use stdClass;
use function MaterialDesign\Plugin\get_plugin_instance;

/**
 * Class Update_Icons
 *
 * @package MaterialDesign\Plugin\Api
 */
class Update_Icons extends API_Base {

	const TRANSIENT = 'google-icons-json';

	/**
	 * URL for holding the codepoints data
	 *
	 * @var string $local_codepoints
	 */
	public $local_codepoints;

	/**
	 * Whether to force loading from HTTP.
	 *
	 * @var bool
	 */
	public $force_http;

	/**
	 * Update_Icons constructor.
	 *
	 * @param bool $force_http Whether to force loading from HTTP.
	 */
	public function __construct( $force_http = false ) {
		parent::__construct();

		$this->force_http       = (bool) $force_http;
		$this->endpoint         = 'https://raw.githubusercontent.com/google/material-design-icons/master/font/MaterialIcons-Regular.codepoints';
		$this->local_file_path  = get_plugin_instance()->dir_path . '/assets/fonts/icons.json';
		$this->local_codepoints = get_plugin_instance()->dir_path . '/assets/fonts/icons.codepoints';
	}

	/**
	 * Retrieves codepoint icons from local file store or URL, depending on presence of transient
	 *
	 * @return false|\stdClass|string
	 */
	public function get_icons() {

		$new = null;

		if ( false === get_transient( self::TRANSIENT ) || true === $this->force_http ) {
			try {
				$codepoints = $this->get_http_response();
				$new        = $this->parse_codepoints( $codepoints );

				set_transient( self::TRANSIENT, time(), DAY_IN_SECONDS );
			} catch ( Exception $e ) {
				return false;
			}
		} else {
			$new = file_get_contents( get_plugin_instance()->dir_path . '/assets/fonts/google-fonts.json' );
			$new = json_decode( $new );
		}

		$new->data = $new->icons;
		unset( $new->icons );

		return $new;
	}

	/**
	 * Parses the codepoint data into expected JSON format
	 *
	 * @param string $codepoints Raw data from github.
	 *
	 * @return \stdClass
	 */
	public function parse_codepoints( $codepoints ) {
		$lines = explode( "\n", $codepoints );

		$icons        = new \stdClass();
		$icons->icons = [];

		foreach ( $lines as $line ) {
			$parts = explode( ' ', $line );
			if ( ! is_array( $parts ) || 2 !== count( $parts ) ) {
				continue;
			}

			$icon = (object) [
				'id'   => $parts[1],
				'name' => $parts[0],
			];

			$icons->icons[ $parts[1] ] = $icon;
		}

		if ( ! empty( $icons ) ) {
			$icons = (object) $icons;

			file_put_contents( $this->local_file_path, wp_json_encode( $icons ) ); //phpcs:ignore WordPressVIPMinimum.Functions.RestrictedFunctions.file_ops_file_put_contents
		}

		return $icons;
	}

	/**
	 * Get codepoints data from github and write to local store
	 *
	 * @return false|mixed|string
	 */
	public function get_http_response() {
		$codepoints =
			file_get_contents( $this->endpoint ); //phpcs:ignore WordPressVIPMinimum.Functions.RestrictedFunctions.wp_remote_get_wp_remote_get, WordPressVIPMinimum.Performance.FetchingRemoteData.FileGetContentsUnknown
		if ( empty( $codepoints ) ) {
			return false;
		}

		file_put_contents( $this->local_codepoints, $codepoints ); //phpcs:ignore WordPressVIPMinimum.Functions.RestrictedFunctions.file_ops_file_put_contents

		return $codepoints;
	}
}
