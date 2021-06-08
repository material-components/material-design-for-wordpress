<?php
/**
 * Copyright 2021 Google LLC
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
 * Bootstraps custom block patterns.
 *
 * @package MaterialDesign
 */

namespace MaterialDesign\Plugin;

/**
 * Block patterns class.
 */
class Block_Patterns {

	/**
	 * Plugin instance.
	 *
	 * @var Plugin
	 */
	public $plugin;

	/**
	 * Block_Type constructor.
	 *
	 * @param Plugin $plugin Instance of the plugin abstraction.
	 */
	public function __construct( Plugin $plugin ) {
		$this->plugin = $plugin;
	}

	/**
	 * Initiate the class.
	 */
	public function init() {
		add_action( 'init', [ $this, 'register' ] );
	}

	/**
	 * Register material design custom block patterns.
	 */
	public function register() {
		if ( ! function_exists( 'register_block_pattern' ) ) {
			return;
		}

		if ( function_exists( 'register_block_pattern_category' ) ) {
			$this->register_category();
		}

		$path = $this->plugin->dir_path . '/php/block-patterns/';

		/**
		 * Register the patterns.
		 */
		$patterns = [
			'call-to-action',
			'call-to-action-benefits',
			'contact-form',
			'features-list',
			'logos',
			'media-grid',
			'single-feature',
			'call-to-action-features',
			'numbers',
			'highlights',
			'single-feature-extended',
			'hero-section',
			'pricing',
			'hero-section-image',
			'latest-posts',
		];

		foreach ( $patterns as $pattern ) {
			register_block_pattern(
				'material/' . $pattern,
				require $path . $pattern . '.php'
			);
		}
	}

	/**
	 * Add custom material block pattern category.
	 */
	public function register_category() {
		register_block_pattern_category(
			'material',
			[
				'label' => __( 'Material Design', 'material-design' ),
			]
		);
	}
}
