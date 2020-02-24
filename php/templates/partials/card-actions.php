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

if ( ! empty( $comments_count ) || ! empty( $post_author ) ) : ?>
	<div class="mdc-card__actions">
		<div class="mdc-card__action-buttons">
			<?php if ( ! empty( $post_author ) ) : ?>
				<button class="mdc-button">
					<i
						class="material-icons mdc-button__icon"
						aria-hidden="true"
					>
						face
					</i>
					<span class="mdc-button__label">
						<?php echo esc_html( get_the_author() ); ?>
					</span>
				</button>
			<?php endif; ?>

			<?php if ( ! empty( $comments_count ) ) : ?>
				<button class="mdc-button">
					<i
						class="material-icons mdc-button__icon"
						aria-hidden="true"
					>
						comment
					</i>
					<span class="mdc-button__label">
						<?php echo esc_html( wp_count_comments( get_the_ID() )->approved ); ?>
						<?php echo esc_html__( 'comments', 'material-theme-builder' ); ?>
					</span>
				</button>
			<?php endif; ?>
		</div> <!-- mdc-card__action-buttons -->
	</div> <!-- mdc-card__actions -->
<?php endif; ?>
