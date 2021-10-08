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
 * Base class to allow sharing functionality between blocks listing posts
 * such as Recent Posts and Hand-picked posts blocks.
 *
 * @package MaterialDesign
 */

namespace MaterialDesign\Plugin\Blocks;

use MaterialDesign\Plugin\Module_Base;
use MaterialDesign\Plugin\Plugin;

/**
 * Posts_List_Block class.
 */
class Card_Block extends Module_Base {

	/**
	 * Block name.
	 *
	 * @var string
	 */
	public $block_name;

	const GLOBAL_CARD_CLASS = 'mdc-card--global-override';

	/**
	 * Constructor.
	 *
	 * @access public
	 *
	 * @param Plugin $plugin     Plugin instance.
	 * @param string $block_name Name of the block.
	 */
	public function __construct( Plugin $plugin, $block_name ) {
		$this->block_name = $block_name;
		parent::__construct( $plugin );
	}

	/**
	 * Init hooks.
	 */
	public function init() {
		add_filter( "render_block_{$this->block_name}", [ $this, 'handle_global_card_override' ] );
	}

	/**
	 * Override global card class based on settings.
	 *
	 * @param string $content HTML content of block.
	 *
	 * @return string
	 */
	public function handle_global_card_override( $content ) {
		$has_global_class = strpos( $content, self::GLOBAL_CARD_CLASS ) !== false;
		if ( $has_global_class ) {
			$global_card_style = $this->plugin->block_types->get_global_styles( 'card_style' );
			$replace_string    = '';
			if ( $global_card_style === 'outlined' ) {
				$replace_string = 'mdc-card--outlined';
			}
			$content = str_replace( self::GLOBAL_CARD_CLASS, $replace_string, $content );
		}

		return $content;
	}
}
