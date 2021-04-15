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

namespace MaterialDesign\Plugin\Updates;

use Exception;
use function MaterialDesign\Plugin\get_plugin_instance;

/**
 * Class Update_Icons
 *
 * @package MaterialDesign\Plugin\Updates
 */
class Update_Icons extends Updates_API_Base {

	const TRANSIENT = 'google-icons-json';

	const LAST_UPDATED = 'google-icons-last-updated';

	const AUTO_UPDATE_SLUG = 'google-icons-auto-update';

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
	 * @param bool $write_output If false, skips writing to file.
	 *
	 * @return false|\stdClass|string
	 */
	public function get_icons( $write_output = true ) {

		$new = null;
		if ( false === get_transient( self::TRANSIENT ) || true === $this->force_http ) {
			$codepoints = $this->get_http_response();
			$new        = $this->parse_codepoints( $codepoints, $write_output );

			set_transient( self::TRANSIENT, time(), DAY_IN_SECONDS );

			// Save last updated, never expire.
			set_transient( self::LAST_UPDATED, time() );
		} else {
			$new = $this->file_get_contents( get_plugin_instance()->dir_path . '/assets/fonts/icons.json' );
			$new = json_decode( $new );
		}

		if ( empty( $new ) ) {
			return false;
		}

		$new->data = $new->icons;
		unset( $new->icons );

		return $new;
	}

	/**
	 * Parses the codepoint data into expected JSON format
	 *
	 * @param string $codepoints Raw data from github.
	 * @param bool   $write_response If false, skips writing to file.
	 *
	 * @return \stdClass
	 */
	public function parse_codepoints( $codepoints, $write_response = true ) {
		$lines = explode( "\n", $codepoints );

		$icons        = new \stdClass();
		$icons->icons = [];

		// Sometimes icons have the same name so skip. Store these names here for future processing.
		$no_dupes = [];
		foreach ( $lines as $line ) {
			$parts = explode( ' ', $line );
			if ( ! is_array( $parts ) || 2 !== count( $parts ) ) {
				continue;
			}

			if ( in_array( $parts[1], $no_dupes ) ) {
				continue;
			}
			$no_dupes[] = $parts[1];

			$icon = [
				'id'   => $parts[1],
				'name' => $parts[0],
			];

			$icons->icons[ $parts[1] ] = (object) $icon;
		}

		if ( ! empty( $icons ) ) {
			$icons = (object) $icons;

			if ( ! empty( $write_response ) ) {
				file_put_contents( $this->local_file_path, wp_json_encode( $icons ) ); //phpcs:ignore WordPressVIPMinimum.Functions.RestrictedFunctions.file_ops_file_put_contents
			}
		}

		return $icons;
	}

	/**
	 * Get codepoints data from github and write to local store
	 *
	 * @param bool $write_response If false, skips writing to file.
	 *
	 * @return false|mixed|string
	 */
	public function get_http_response( $write_response = true ) {
		$request    = function_exists( 'vip_safe_wp_remote_get' ) ? vip_safe_wp_remote_get( $this->endpoint ) : wp_remote_get( $this->endpoint ); //phpcs:ignore WordPressVIPMinimum.Functions.RestrictedFunctions.wp_remote_get_wp_remote_get, WordPressVIPMinimum.Performance.FetchingRemoteData.FileGetContentsUnknown
		$codepoints = wp_remote_retrieve_body( $request );

		if ( empty( $codepoints ) ) {
			return false;
		}

		if ( ! empty( $write_response ) ) {
			file_put_contents( $this->local_codepoints, $codepoints ); //phpcs:ignore WordPressVIPMinimum.Functions.RestrictedFunctions.file_ops_file_put_contents
		}

		return $codepoints;
	}

	/**
	 * Update icons from source.
	 *
	 * @param boolean $write_response Shoud write the reponse to file.
	 * @return mixed
	 */
	public function update( $write_response = false ) {
		if ( $this->should_check_for_updates() ) {
			return $this->get_icons( $write_response );
		}

		return false;
	}

	/**
	 * Get last updated timestamp
	 *
	 * @return int timestamp
	 */
	public static function get_last_updated() {
		return get_transient( self::LAST_UPDATED );
	}
}
