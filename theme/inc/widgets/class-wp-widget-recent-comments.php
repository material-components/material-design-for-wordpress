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
 * Widget API: WP_Widget_Recent_Comments class
 *
 * @package WordPress
 * @subpackage Widgets
 * @since 4.4.0
 */

namespace MaterialDesign\Theme\Widgets;

/**
 * Override default widget with our own markup
 */
class WP_Widget_Recent_Comments extends \WP_Widget_Recent_Comments {
	/**
	 * Outputs the content for the current Recent Comments widget instance.
	 *
	 * @since 2.8.0
	 *
	 * @param array $args     Display arguments including 'before_title', 'after_title',
	 *                        'before_widget', and 'after_widget'.
	 * @param array $instance Settings for the current Recent Comments widget instance.
	 */
	public function widget( $args, $instance ) {
		if ( ! isset( $args['widget_id'] ) ) {
			$args['widget_id'] = $this->id;
		}

		$output = '';

		$title = ( ! empty( $instance['title'] ) ) ? $instance['title'] : esc_html__( 'Recent Comments', 'material-design-google' );

		/** This filter is documented in wp-includes/widgets/class-wp-widget-pages.php */
		$title = apply_filters( 'widget_title', $title, $instance, $this->id_base );

		$number = ( ! empty( $instance['number'] ) ) ? absint( $instance['number'] ) : 5;
		if ( ! $number ) {
			$number = 5;
		}

		/**
		 * Filters the arguments for the Recent Comments widget.
		 *
		 * @since 3.4.0
		 * @since 4.9.0 Added the `$instance` parameter.
		 *
		 * @see WP_Comment_Query::query() for information on accepted arguments.
		 *
		 * @param array $comment_args An array of arguments used to retrieve the recent comments.
		 * @param array $instance     Array of settings for the current widget.
		 */
		$comments = get_comments(
			apply_filters(
				'widget_comments_args',
				array(
					'number'      => $number,
					'status'      => 'approve',
					'post_status' => 'publish',
				),
				$instance
			)
		);

		$output .= $args['before_widget'];
		if ( $title ) {
			$output .= $args['before_title'] . $title . $args['after_title'];
		}

		$output .= '<ul id="recentcomments" class="mdc-list">';
		if ( is_array( $comments ) && $comments ) {
			// Prime cache for associated posts. (Prime post term cache if we need it for permalinks.).
			$post_ids = array_unique( wp_list_pluck( $comments, 'comment_post_ID' ) );
			_prime_post_caches( $post_ids, strpos( get_option( 'permalink_structure' ), '%category%' ), false );

			foreach ( (array) $comments as $comment ) {
				$output .= '<li class="mdc-list-item recentcomments">';
				$output .= sprintf(
					/* translators: Comments widget. 1: Comment author, 2: Post link. */
					esc_html_x( '%1$s on %2$s', 'widgets', 'material-design-google' ),
					'<span class="comment-author-link">' . get_comment_author_link( $comment ) . '</span>',
					'<a href="' . esc_url( get_comment_link( $comment ) ) . '">' . get_the_title( $comment->comment_post_ID ) . '</a>'
				);
				$output .= '</li>';
			}
		}
		$output .= '</ul>';
		$output .= $args['after_widget'];

		echo wp_kses_post( $output );
	}
}
