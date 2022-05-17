<?php
/**
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @package MaterialDesign
 */

$block      = $args['block'];
$content    = $args['content'];
$attributes = $args['attributes'];
$page_key   = isset( $block->context['queryId'] ) ? 'query-' . $block->context['queryId'] . '-page' : 'query-page';
/**
 * Copied from core without nonce verification.
 */
$page_number        = empty( $_GET[ $page_key ] ) ? 1 : (int) $_GET[ $page_key ]; // phpcs:ignore WordPress.Security.NonceVerification.Recommended
$default_label      = __( 'Previous', 'material-design' );
$label              = isset( $attributes['label'] ) && ! empty( $attributes['label'] ) ? $attributes['label'] : $default_label;
$content            = '';
$url                = '';
$wrapper_attributes = get_block_wrapper_attributes();

// Check if the pagination is for Query that inherits the global context
// and handle appropriately.
if ( isset( $block->context['query']['inherit'] ) && $block->context['query']['inherit'] ) {
	global $wp_query;
	$url = previous_posts( false );
	// Force in loop to show disabled state, as previous_posts returns empty when on first page.
	$url               = $url ? $url : '#';
	$query_page_number = (int) get_query_var( 'paged' );
	$page_number       = $query_page_number > 0 ? $query_page_number : $page_number;
} else {
	$url = add_query_arg( $page_key, $page_number - 1 );
}

$is_disabled = 1 === $page_number;

if ( ! empty( $url ) ) :
	$screen_reader = sprintf(
	/* translators: available page description. */
		esc_html__( '%s page', 'material-design' ),
		esc_html( $label )
	);
	$inner_content             = sprintf(
		'<span class="material-icons" aria-hidden="true">chevron_left</span>
	<span class="screen-reader-text">%s</span>',
		$screen_reader
	);
	$inner_content_with_anchor = $is_disabled ? $inner_content : sprintf(
		'<a href="%s" class="mdc-ripple-surface">%s</a>',
		esc_url( $url ),
		$inner_content
	);
	$content                   = sprintf(
		'<li %s>%s</li>',
		$wrapper_attributes,
		$inner_content_with_anchor
	);
	?>
	<?php
	echo wp_kses_post( $content );
endif;
