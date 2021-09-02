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
 * Frontend class.
 *
 * @package MaterialDesign
 */

namespace MaterialDesign\Plugin;

use MaterialDesign\Plugin\Module_Base;

/**
 * Frontend class.
 */
class Frontend extends Module_Base {

	/**
	 * Initiate the class and hooks.
	 */
	public function init() {
		add_action( 'wp_head', [ $this, 'plugin_version_meta_tag' ] );
	}

	/**
	 * Add material plugin meta version tag.
	 *
	 * @return void
	 */
	public function plugin_version_meta_tag() {
		printf( '<meta name="material-design-plugin" content="v%s" />', esc_attr( $this->plugin->version() ) );
	}

}
