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
global $material_design_plugin;

$block               = isset( $args['block'] ) ? $args['block'] : [];
$attributes          = isset( $args['attributes'] ) ? $args['attributes'] : [];
$content             = isset( $args['content'] ) ? $args['content'] : [];
$show_comments       = $attributes['showComments'];
$show_author         = $attributes['showAuthor'];
$show_excerpt        = $attributes['showExcerpt'];
$show_date           = $attributes['showDate'];
$show_featured_image = $attributes['showFeaturedImage'];
$show_post_title     = $attributes['showTitle'];
$card_style          = $attributes['cardStyle'];
$content_length      = isset( $attributes['postContentLength'] ) ? $attributes['postContentLength'] : 20;
$global_card_style   = $material_design_plugin->block_types->get_global_styles( 'card_style' );
$classes             = sprintf( 'mdc-card--%s', $card_style === 'global' ? $global_card_style : $card_style );

if ( empty( $block ) || ! isset( $block->context['postId'] ) ) {
	return '';
}
$post_id_card = $block->context['postId'];
$post_card    = get_post( $post_id_card );
$post_link    = get_the_permalink( $post_card );
$post_content = wp_trim_words( get_the_excerpt( $post_card ), $content_length, ' [&hellip;]' );
?>
	<div class="post-card__container">
		<div id="<?php echo esc_attr( $post_id_card ); ?>" <?php post_class( "mdc-card post-card $classes" ); ?>>
			<a class="mdc-card__link" href="<?php echo esc_url( $post_link ); ?>">
				<div class="mdc-card__primary-action post-card__primary-action">
					<?php if ( has_post_thumbnail( $post_card ) && $show_featured_image ) : ?>
						<div class="mdc-card__media mdc-card__media--16-9 post-card__media">
							<?php echo get_the_post_thumbnail( $post_card ); ?>
						</div>
					<?php endif; ?>
					<div class="post-card__primary">
						<?php if ( $show_post_title ) : ?>
							<?php if ( is_sticky( $post_id_card ) ) : ?>
								<h2
									class="post-card__title title-large"
									aria-label="
								<?php
									printf(
									/* translators: Post title */
										esc_attr__( 'Sticky post: %s', 'material-design' ),
										esc_attr( get_the_title( $post_card ) )
									);
								?>
								"
								>
									<i class="material-icons" aria-hidden="true">push_pin</i>
									<?php echo esc_html( get_the_title( $post_card ) ); ?>
								</h2>
							<?php else : ?>
								<h2 class="post-card__title title-large">
									<?php echo esc_html( get_the_title( $post_card ) ); ?>
								</h2>
							<?php endif; ?>
						<?php endif; ?>

						<?php if ( ! empty( $show_date ) ) : ?>
							<time
								class="post-card__subtitle label-small"><?php echo esc_html( get_the_time( 'F j, Y', $post_card ) ); ?></time>
						<?php endif; ?>
					</div>
				</div>
				<?php if ( ! empty( $show_excerpt ) && has_excerpt( $post_card ) ) : ?>
					<div
						class="post-card__secondary body-medium"><p><?php echo wp_kses_post( $post_content ); ?></p></div>
				<?php endif; ?>
			</a>
			<?php if ( ! empty( $show_author ) || ! empty( $show_comments ) ) : ?>
				<div class="mdc-card__actions">
					<div class="mdc-card__action-buttons">
						<?php if ( ! empty( $show_author ) ) : ?>
							<a
								class="mdc-button mdc-card__action mdc-card__action--button"
								href="<?php echo esc_url( get_author_posts_url( get_the_author_meta( 'ID', $post_card->post_author ) ) ); ?>"
								aria-label="
								<?php
								printf(
								/* translators: 1: author name. */
									esc_attr__(
										'Author: %s',
										'material-design'
									),
									esc_attr( get_the_author_meta( 'display_name', $post_card->post_author ) )
								);
								?>
							"
							>
								<?php echo get_avatar( get_the_author_meta( 'ID', $post_card->post_author ), 18 ); ?>
								<?php echo esc_html( apply_filters( 'the_author', get_the_author_meta( 'display_name', $post_card->post_author ) ) ); ?>
							</a>
						<?php endif; ?>

						<?php if ( ! empty( $show_comments ) && ( comments_open( $post_id_card ) || ( 0 < get_comments_number( $post_id_card ) ) ) ) : ?>
							<a href="<?php echo esc_url( get_comments_link( $post_id_card ) ); ?>" class="mdc-button mdc-card__action mdc-card__action--button">
								<i class="material-icons mdc-button__icon" aria-hidden="true">comment</i>
								<?php
								echo esc_html(
									sprintf(
									/* translators: 1: comment count. */
										_nx( // phpcs:disable
											'One Comment', // phpcs:disable
											'%s Comments',
											get_comments_number( $post_id_card ),
											'comments title',
											'material-design'
										),
										number_format_i18n( get_comments_number( $post_id_card ) )
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
