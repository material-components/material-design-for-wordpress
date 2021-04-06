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
 * API Abstract Class
 *
 * @package MaterialDesign
 */

namespace MaterialDesign\Plugin\Updates;

/**
 * Class Updates_API_Base
 *
 * @package MaterialDesign\Plugin\Updates
 */
abstract class Updates_API_Base {

	/**
	 * Override this in a child class. This is the remote URL to retrieve data from
	 *
	 * @var $endpoint
	 */
	protected $endpoint;

	/**
	 * Override this in a child class. This is the local file storage location to store response results in.
	 *
	 * @var $local_file_path
	 */
	protected $local_file_path;

	/**
	 * Updates_API_Base constructor.
	 */
	public function __construct() {
		$this->endpoint        = null;
		$this->local_file_path = null;
	}

	/**
	 * Child class must provide this method
	 *
	 * @return mixed
	 */
	abstract public function get_http_response();

	/**
	 * Child class must provide this method
	 *
	 * @param boolean $write_response Shoud write the reponse to file.
	 * @return mixed
	 */
	abstract public function update( $write_response );

	/**
	 * Wrapper function to accommodate tests.
	 *
	 * @param string $filename         See native.
	 * @param false  $use_include_path See native.
	 * @param null   $context          See native.
	 * @param int    $offset           See native.
	 * @param null   $length           See native.
	 *
	 * @return false|string
	 */
	public function file_get_contents( $filename, $use_include_path = false, $context = null, $offset = 0, $length = null ) {
		return apply_filters( 'material_design_file_get_contents', file_get_contents( $filename, $use_include_path, $context, $offset, $length ) ); //phpcs:ignore WordPressVIPMinimum.Performance.FetchingRemoteData.FileGetContentsUnknown
	}

	/**
	 * Determine if check for auto-updates should happen.
	 *
	 * @return boolean
	 */
	public function should_check_for_updates() {
		$expired = get_transient( static::TRANSIENT );

		if ( false !== $expired ) {
			return false;
		}

		// Check if auto-update is enabled.
		return static::is_auto_update_enabled();
	}

	/**
	 * Determine if auto-update is enabled.
	 *
	 * @return boolean
	 */
	public function is_auto_update_enabled() {
		return ! empty( get_option( static::AUTO_UPDATE_SLUG, false ) );
	}
}
