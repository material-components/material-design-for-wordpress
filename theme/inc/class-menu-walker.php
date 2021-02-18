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
 * Custom menu walker
 * Adds Material Button to menu links
 *
 * @package MaterialDesign
 */

namespace MaterialDesign\Theme;

/**
 * Menu_Walker class
 */
class Menu_Walker extends \Walker {
	/**
	 * DB fields to use.
	 *
	 * @var array
	 */
	public $db_fields = array(
		'parent' => 'menu_item_parent',
		'id'     => 'db_id',
	);

	/**
	 * Add necessary classes to menu items
	 *
	 * @param string $output Used to append additional content (passed by reference).
	 * @param object $item   The data object.
	 * @param int    $depth  Depth of the item.
	 * @param array  $args   An array of additional arguments.
	 * @param int    $id     ID of the current item.
	 */
	public function start_el( &$output, $item, $depth = 0, $args = array(), $id = 0 ) {
		$output .= sprintf(
			'<a href="%1$s" %2$s>%3$s</a>',
			esc_url( $item->url ),
			( in_array( 'current-menu-item', $item->classes, true ) ) ? ' class="mdc-tab mdc-tab--active" aria-selected="true"' : ' class="mdc-tab"',
			$this->build_markup( $item )
		);
	}

	/**
	 * Add necessary markup to build tab
	 *
	 * @param  object $item The data object.
	 * @return string Markup to display
	 */
	private function build_markup( $item ) {
		$is_active = in_array( 'current-menu-item', $item->classes, true );

		ob_start();
		?>
		<span class="mdc-tab__content">
			<span class="mdc-tab__text-label"><?php echo esc_html( $item->title ); ?></span>
		</span>

		<span
			class="mdc-tab-indicator
			<?php
			if ( $is_active ) {
				echo 'mdc-tab-indicator--active';
			}
			?>
		">
			<span class="mdc-tab-indicator__content mdc-tab-indicator__content--underline"></span>
		</span>
		<span class="mdc-tab__ripple"></span>
		<?php

		return ob_get_clean();
	}
}
