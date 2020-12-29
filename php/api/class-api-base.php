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

namespace MaterialDesign\Plugin\Api;

/**
 * Class API_Base
 *
 * @package MaterialDesign\Plugin\Api
 */
abstract class API_Base {

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
	 * API_Base constructor.
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
}
