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
 * Template part for displaying posts
 *
 * @link    https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package MaterialDesign
 */
$block         = isset( $args['block'] ) ? $args['block'] : [];
$attributes    = isset( $args['attributes'] ) ? $args['attributes'] : [];
$content       = isset( $args['content'] ) ? $args['content'] : [];
$show_comments = $attributes['showComments'];
$show_author   = $attributes['showAuthor'];
$show_excerpt  = $attributes['showExcerpt'];
$show_date     = $attributes['showDate'];
$is_edit       = $attributes['isEditMode'];
$classes       = get_theme_mod( 'archive_outlined', false ) ? 'mdc-card--outlined' : '';

if ( empty( $block ) || ! isset( $block->context['postId'] ) ) {
	return '';
}
$post_ID   = $block->context['postId']; // phpcs:ignore WordPress.WP.GlobalVariablesOverride.Prohibited
$post      = get_post( $post_ID ); // phpcs:ignore WordPress.WP.GlobalVariablesOverride.Prohibited
$post_link = $is_edit ? '#link-to-' . $post_ID : get_the_permalink( $post );
?>
	<div class="post-card__container">
		<div id="<?php echo esc_attr( $post_ID ); ?>" <?php post_class( "mdc-card post-card $classes" ); ?>>
			<a class="mdc-card__link" href="<?php echo esc_url( $post_link ); ?>">
				<div class="mdc-card__primary-action post-card__primary-action">
					<?php if ( has_post_thumbnail( $post ) ) : ?>
						<div class="mdc-card__media mdc-card__media--16-9 post-card__media">
							<?php echo get_the_post_thumbnail( $post ); ?>
						</div>
					<?php endif; ?>
					<div class="post-card__primary">
						<?php if ( is_sticky( $post_ID ) ) : ?>
							<h2
								class="post-card__title mdc-typography mdc-typography--headline6"
								aria-label="
							<?php
								printf(
								/* translators: Post title */
									esc_attr__( 'Sticky post: %s', 'material-design-google' ),
									esc_attr( get_the_title( $post ) )
								);
							?>
							"
							>
								<i class="material-icons" aria-hidden="true">push_pin</i>
								<?php echo esc_html( get_the_title( $post ) ); ?>
							</h2>
						<?php else : ?>
							<h2 class="post-card__title mdc-typography mdc-typography--headline6">
								<?php echo esc_html( get_the_title( $post ) ); ?>
							</h2>
						<?php endif; ?>

						<?php if ( ! empty( $show_date ) ) : ?>
							<time
								class="post-card__subtitle mdc-typography mdc-typography--subtitle2"><?php echo esc_html( get_the_time( 'F j, Y', $post ) ); ?></time>
						<?php endif; ?>
					</div>
					<?php if ( ! empty( $show_excerpt ) ) : ?>
						<div
							class="post-card__secondary mdc-typography mdc-typography--body2"><?php get_the_excerpt( $post ); ?></div>
					<?php endif; ?>
				</div>
			</a>
			<?php if ( ! empty( $show_author ) || ! empty( $show_comments ) ) : ?>
				<div class="mdc-card__actions">
					<div class="mdc-card__action-buttons">
						<?php if ( ! empty( $show_author ) ) : ?>
							<a
								class="mdc-button mdc-card__action mdc-card__action--button"
								href="<?php echo esc_url( $is_edit ? '#author-link' : get_author_posts_url( get_the_author_meta( 'ID', $post->post_author ) ) ); ?>"
								aria-label="
								<?php
								printf(
								/* translators: 1: author name. */
									esc_attr__(
										'Author: %s',
										'material-design-google'
									),
									esc_attr( get_the_author_meta( 'display_name', $post->post_author ) )
								);
								?>
							"
							>
								<span class="mdc-button__ripple"></span>
								<?php echo get_avatar( get_the_author_meta( 'ID', $post->post_author ), 18 ); ?>
								<?php echo esc_html( apply_filters( 'the_author', get_the_author_meta( 'display_name', $post->post_author ) ) ); ?>
							</a>
						<?php endif; ?>

						<?php if ( ! empty( $show_comments ) && ( comments_open( $post_ID ) || ( 0 < get_comments_number( $post_ID ) ) ) ) : ?>
							<a href="<?php echo esc_url( $is_edit ? '#comment-link' : get_comments_link( $post_ID ) ); ?>" class="mdc-button mdc-card__action mdc-card__action--button">
								<span class="mdc-button__ripple"></span>
								<i class="material-icons mdc-button__icon" aria-hidden="true">comment</i>
								<?php
								echo esc_html(
									sprintf(
									/* translators: 1: comment count. */
										_nx( // phpcs:disable
											'One Comment', // phpcs:disable
											'%s Comments',
											get_comments_number( $post_ID ),
											'comments title',
											'material-design-google'
										),
										number_format_i18n( get_comments_number( $post_ID ) )
									)
								);
								?>
							</a>
						<?php endif; ?>
					</div>
				</div>
			<?php endif; ?>
		</div>
	</div>
