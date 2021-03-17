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
 * Functions which enhance the theme by hooking into WordPress
 *
 * @package MaterialDesign
 */

/**
 * Adds custom classes to the array of body classes.
 *
 * @param array $classes Classes for the body element.
 * @return array
 */
function material_design_theme_body_classes( $classes ) {
	// Adds a class of hfeed to non-singular pages.
	if ( ! is_singular() ) {
		$classes[] = 'hfeed';
	}

	// Adds a class of no-sidebar when there is no sidebar present.
	if ( ! is_active_sidebar( 'sidebar-1' ) ) {
		$classes[] = 'no-sidebar';
	}

	return $classes;
}
add_filter( 'body_class', 'material_design_theme_body_classes' );

/**
 * Add a pingback url auto-discovery header for single posts, pages, or attachments.
 */
function material_design_theme_pingback_header() {
	if ( is_singular() && pings_open() ) {
		printf( '<link rel="pingback" href="%s">', esc_url( get_bloginfo( 'pingback_url' ) ) );
	}
}
add_action( 'wp_head', 'material_design_theme_pingback_header' );

/**
 * Filters the comment reply link.
 *
 * @param string  $link    The HTML markup for the comment reply link.
 * @param array   $args    An array of arguments overriding the defaults.
 * @param object  $comment The object of the comment being replied.
 * @param WP_Post $post    The WP_Post object.
 */
function material_design_theme_comment_reply_link( $link, $args, $comment, $post ) {
	$data_attributes = array(
		'commentid'      => $comment->comment_ID,
		'postid'         => $post->ID,
		'belowelement'   => $args['add_below'] . '-' . $comment->comment_ID,
		'respondelement' => $args['respond_id'],
	);

	$data_attribute_string = '';

	foreach ( $data_attributes as $name => $value ) {
		$data_attribute_string .= " data-${name}=\"" . esc_attr( $value ) . '"';
	}

	$data_attribute_string = trim( $data_attribute_string );

	$link = sprintf(
		"<a rel='nofollow' class='comment-reply-link mdc-button' href='%s' %s aria-label='%s'> <span class='mdc-button__ripple'></span> %s</a>",
		esc_url(
			add_query_arg(
				array(
					'replytocom'      => $comment->comment_ID,
					'unapproved'      => false,
					'moderation-hash' => false,
				),
				get_permalink( $post->ID )
			)
		) . '#' . $args['respond_id'],
		$data_attribute_string,
		esc_attr( sprintf( $args['reply_to_text'], $comment->comment_author ) ),
		$args['reply_text']
	);

	return $args['before'] . $link . $args['after'];
}
add_filter( 'comment_reply_link', 'material_design_theme_comment_reply_link', 10, 4 );

/**
 * Wrap comment fields in Material layout class.
 *
 * @return void
 */
function material_design_theme_comment_form_before_fields() {
	?>
	<div class="mdc-layout-grid__inner">
	<?php
}
add_action( 'comment_form_before_fields', 'material_design_theme_comment_form_before_fields' );

/**
 * Wrap comment fields in Material layout class.
 *
 * @return void
 */
function material_design_theme_comment_form_after_fields() {
	?>
	</div> <!-- .mdc-layout-grid__inner -->
	<?php
}
add_action( 'comment_form_after_fields', 'material_design_theme_comment_form_after_fields' );
