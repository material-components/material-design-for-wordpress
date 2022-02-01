<?php
/**
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *       http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @package MaterialDesign
 */

$attributes = isset( $args['attributes'] ) ? $args['attributes'] : [];

$search_query = get_search_query();

$tag_name = 'h2';

$align_class_name = empty( $attributes['textAlign'] ) ? '' : "has-text-align-{$attributes['textAlign']}";

if ( isset( $attributes['level'] ) ) {
	$tag_name = 0 === $attributes['level'] ? 'p' : 'h' . $attributes['level'];
}

$class_names = $align_class_name . ' page-title mdc-typography mdc-typography--headline' . ( isset( $attributes['level'] ) ? $attributes['level'] : '2' );

$wrapper_attributes = get_block_wrapper_attributes( [ 'class' => esc_attr( $class_names ) ] );

printf(
	'<%1$s %2$s>%3$s <span>%4$s</span></%1$s>',
	esc_html( $tag_name ),
	$wrapper_attributes, // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
	esc_html( $attributes['title'] ),
	esc_html( $search_query )
);
