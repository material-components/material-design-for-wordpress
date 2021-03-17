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
 * Class API_Base.
 *
 * @package MaterialDesign
 */

namespace MaterialDesign\Plugin\Rest;

use MaterialDesign\Plugin\Plugin;

/**
 * Class API_Base
 *
 * @package MaterialDesign\Plugin\Rest
 */
abstract class API_Base extends \WP_REST_Controller {
	/**
	 * Plugin class.
	 *
	 * @var Plugin
	 */
	public $plugin;

	/**
	 * Rest Base.
	 *
	 * @var string
	 */
	public $rest_base;

	/**
	 * Constructor.
	 *
	 * @param Plugin $plugin Instance of the plugin abstraction.
	 */
	public function __construct( $plugin ) {
		$this->plugin    = $plugin;
		$this->namespace = 'material-design/v1';
	}

	/**
	 * Initiate the class and hooks.
	 */
	public function init() {
		add_action( 'rest_api_init', [ $this, 'register_routes' ] );
	}

	/**
	 * Get the base URL for this controller.
	 *
	 * @return string
	 */
	public function get_base_path() {
		return esc_url( "/{$this->namespace}/{$this->rest_base}/" );
	}
}
