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
 * Custom widget functions
 *
 * @package MaterialDesign
 */

namespace MaterialDesign\Theme\Widgets;

use MaterialDesign\Theme\Menu_Drawer_Walker;

/**
 * Attach hooks
 *
 * @return void
 */
function setup() {
	add_action( 'widgets_init', __NAMESPACE__ . '\replace_default_widgets' );

	add_filter( 'widget_archives_args', __NAMESPACE__ . '\build_archive' );
	add_filter( 'wp_list_categories', __NAMESPACE__ . '\add_class_tax_list' );
	add_filter( 'widget_nav_menu_args', __NAMESPACE__ . '\menu_widget_args' );
	add_filter( 'wp_list_pages', __NAMESPACE__ . '\add_list_item_class' );
}

/**
 * Define widgets to replace
 *
 * @return array Supported widgets
 */
function get_supported_widgets() {
	return [
		'WP_Widget_Archives',
		'WP_Widget_Categories',
		'WP_Widget_Meta',
		'WP_Widget_Pages',
		'WP_Widget_Recent_Comments',
		'WP_Widget_Recent_Posts',
		'WP_Widget_RSS',
	];
}

/**
 * Remove default widgets and replace with our versions
 *
 * @return void
 */
function replace_default_widgets() {
	foreach ( get_supported_widgets() as $widget ) {
		unregister_widget( $widget );

		register_widget( __NAMESPACE__ . "\\{$widget}" );
	}
}

/**
 * Replace container of archive's items
 *
 * @param  array $args Default arguments.
 * @return array Updated arguments
 */
function build_archive( $args ) {
	$new_args = [
		'format' => 'custom',
		'before' => '<li class="mdc-list-item"><span class="mdc-list-item__text">',
		'after'  => '</span></li>',
	];

	$args = wp_parse_args( $new_args, $args );

	return $args;
}

/**
 * Adds material classes to a taxonomy list
 *
 * @param  string $output Generated list markup.
 * @return string Updated list markup
 */
function add_class_tax_list( $output ) {
	$output = str_replace( '<li class="cat-item', '<li class="mdc-list-item cat-item', $output );

	return $output;
}

/**
 * Give drawer treatment to nav menu widget
 *
 * @param  array $args Widget's arguments.
 * @return array Widget's arguments plus drawer menu treatment
 */
function menu_widget_args( $args ) {
	$menu_args = [
		'walker'     => new Menu_Drawer_Walker(),
		'container'  => '',
		'items_wrap' => '%3$s',
	];

	return wp_parse_args( $menu_args, $args );
}

/**
 * Add MDC class to items
 *
 * @param  string $html Widget output.
 * @return string Modified output
 */
function add_list_item_class( $html ) {
	$html = str_replace( '<li class="page_item', '<li class="mdc-list-item page_item', $html );

	return $html;
}
