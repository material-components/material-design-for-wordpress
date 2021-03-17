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
 * Adds Material Button to drawer menu links
 *
 * @package MaterialDesign
 */

namespace MaterialDesign\Theme;

/**
 * Menu_Drawer_Walker class
 */
class Menu_Drawer_Walker extends \Walker_Nav_Menu {
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
		$link_title = ( ! empty( $item->title ) ) ? $item->title : $item->post_title;
		$classes    = (array) $item->classes;

		$output .= sprintf(
			'<a href="%1$s" %2$s>%3$s</a>',
			esc_url( $item->url ),
			( in_array( 'current-menu-item', $classes, true ) ) ? ' class="mdc-list-item mdc-list-item--activated"' : ' class="mdc-list-item"',
			'<span class="mdc-list-item__text">' . esc_html( $link_title ) . '</span>'
		);
	}
}
