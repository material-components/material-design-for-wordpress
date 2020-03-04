<?php
/**
 * Template for displaying card actions.
 *
 * @package MaterialThemeBuilder
 */

defined( 'ABSPATH' ) || exit;

$attributes     = isset( $attributes ) ? $attributes : [];
$comments_count = isset( $attributes['displayCommentsCount'] ) ? $attributes['displayCommentsCount'] : false;
$post_author    = isset( $attributes['displayPostAuthor'] ) ? $attributes['displayPostAuthor'] : false;

if ( ! empty( $post_author ) ) {
	$author_name = get_the_author_meta( 'display_name' );
	$author_url  = get_author_posts_url( get_the_author_meta( 'ID' ), $author_name );
}

if ( ! empty( $comments_count ) || ! empty( $post_author ) ) : ?>
	<div class="mdc-card__actions">
		<div class="mdc-card__action-buttons">
			<?php if ( ! empty( $post_author ) ) : ?>
				<a class="mdc-button post-author" href="<?php echo esc_url( $author_url ); ?>">
					<i
						class="material-icons mdc-button__icon"
						aria-hidden="true"
					>
						face
					</i>
					<span class="mdc-button__label">
						<?php echo esc_html( $author_name ); ?>
					</span>
				</a>
			<?php endif; ?>

			<?php if ( ! empty( $comments_count ) ) : ?>
				<a class="mdc-button comment-count" href="<?php esc_url( get_the_permalink() ); ?>">
					<i
						class="material-icons mdc-button__icon"
						aria-hidden="true"
					>
						comment
					</i>
					<span class="mdc-button__label">
						<?php
						$comment_count = absint( get_comments_number( get_the_ID() ) );
						if ( 0 < $comment_count ) {
							echo esc_html(
								sprintf(
									/* translators: %s: post comments count */
									_n( '%s comment', '%s comments', $comment_count, 'material-theme-builder' ),
									$comment_count
								)
							);
						} else {
							esc_html_e( 'No comments', 'material-theme-builder' );
						}
						?>
					</span>
				</a>
			<?php endif; ?>
		</div> <!-- mdc-card__action-buttons -->
	</div> <!-- mdc-card__actions -->
<?php endif; ?>
