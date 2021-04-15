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
 * Class Walker_Comment.
 *
 * Included for compatibility.
 * When available, use the plugin
 *
 * @package MaterialDesign
 */

namespace MaterialDesign\Theme;

/**
 * Walker_Comment.
 */
class Walker_Comment extends \Walker_Comment {
	/**
	 * Outputs a comment in the HTML5 format and uses material classes.
	 *
	 * @since 1.0.0
	 *
	 * @see wp_list_comments()
	 *
	 * @param WP_Comment $comment Comment to display.
	 * @param int        $depth   Depth of the current comment.
	 * @param array      $args    An array of arguments.
	 */
	protected function html5_comment( $comment, $depth, $args ) {
		$tag = ( 'div' === $args['style'] ) ? 'div' : 'li';

		$commenter = wp_get_current_commenter();
		if ( $commenter['comment_author_email'] ) {
			$moderation_note = __( 'Your comment is awaiting moderation.', 'material-design-google' );
		} else {
			$moderation_note = __( 'Your comment is awaiting moderation. This is a preview, your comment will be visible after it has been approved.', 'material-design-google' );
		}

		?>
		<<?php echo $tag; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
			id="comment-<?php comment_ID(); ?>" <?php comment_class( $this->has_children ? 'parent' : '', $comment ); ?>>
			<article id="div-comment-<?php comment_ID(); ?>" class="comment-body">
				<div class="comment-author-avatar">
					<?php if ( 0 !== absint( $args['avatar_size'] ) ) : ?>
						<?php echo get_avatar( $comment, $args['avatar_size'] ); ?>
					<?php endif; ?>
				</div><!-- .comment-author-avatar -->

				<div class="comment-content">
					<h3 class="comment-author vcard mdc-typography--body1">
						<?php echo get_comment_author_link( $comment ); ?>
					</h3>

					<div class="comment-meta mdc-typography--body2">
						<time datetime="<?php comment_time( 'c' ); ?>">
							<?php
								printf(
									/* translators: 1: Comment date, 2: Comment time. */
									esc_html__( '%1$s at %2$s', 'material-design-google' ),
									esc_html( get_comment_date( '', $comment ) ),
									esc_html( get_comment_time() )
								);
							?>
						</time>
						<?php edit_comment_link( __( 'Edit', 'material-design-google' ), '<span class="edit-link">', '</span>' ); ?>
					</div><!-- .comment-meta -->

					<?php if ( 0 === absint( $comment->comment_approved ) ) : ?>
						<em class="comment-awaiting-moderation mdc-typography--caption">
							<?php echo esc_html( $moderation_note ); ?>
						</em>
					<?php endif; ?>

					<div class="comment-content">
						<?php comment_text(); ?>
					</div><!-- .comment-content -->

					<?php
					comment_reply_link(
						array_merge(
							$args,
							array(
								'add_below' => 'div-comment',
								'depth'     => $depth,
								'max_depth' => $args['max_depth'],
								'before'    => '<div class="reply">',
								'after'     => '</div>',
							)
						)
					);
					?>

				</div> <!-- .comment-content -->
			</article><!-- .comment-body -->
		<?php
	}
}
