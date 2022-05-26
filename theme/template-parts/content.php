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
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package MaterialDesign
 */

$show_comments = get_theme_mod( 'archive_comments', true );
$show_author   = get_theme_mod( 'archive_author', true );
$show_excerpt  = get_theme_mod( 'archive_excerpt', true );
$show_date     = get_theme_mod( 'archive_date', true );
$classes       = get_theme_mod( 'archive_outlined', false ) ? 'mdc-card--outlined' : '';
?>

<div class="post-card__container">
	<div id="<?php the_ID(); ?>" <?php post_class( "mdc-card post-card $classes" ); ?>>
		<a class="mdc-card__link" href="<?php the_permalink(); ?>">
			<div class="mdc-card__primary-action post-card__primary-action">
				<?php if ( has_post_thumbnail() ) : ?>
					<div class="mdc-card__media mdc-card__media--16-9 post-card__media">
						<?php the_post_thumbnail(); ?>
					</div>
				<?php endif; ?>
				<div class="post-card__primary">
					<?php if ( is_sticky() ) : ?>
						<h2
							class="post-card__title mdc-typography mdc-typography--headline6"
							aria-label="
							<?php
								printf(
									/* translators: Post title */
									esc_attr__( 'Sticky post: %s', 'material-design-google' ),
									esc_attr( get_the_title() )
								);
							?>
							"
						>
							<i class="material-icons" aria-hidden="true">push_pin</i>
							<?php the_title(); ?>
						</h2>
					<?php else : ?>
						<?php the_title( '<h2 class="post-card__title mdc-typography mdc-typography--headline6">', '</h2>' ); ?>
					<?php endif; ?>

					<?php if ( ! empty( $show_date ) ) : ?>
						<time class="post-card__subtitle mdc-typography mdc-typography--subtitle2"><?php the_time( 'F j, Y' ); ?></time>
					<?php endif; ?>
				</div>
				<?php if ( ! empty( $show_excerpt ) ) : ?>
					<div class="post-card__secondary mdc-typography mdc-typography--body2"><?php the_excerpt(); ?></div>
				<?php endif; ?>
			</div>
		</a>
		<?php if ( ! empty( $show_author ) || ! empty( $show_comments ) ) : ?>
			<div class="mdc-card__actions">
				<div class="mdc-card__action-buttons">
					<?php if ( ! empty( $show_author ) ) : ?>
						<a
							class="mdc-button mdc-card__action mdc-card__action--button"
							href="<?php echo esc_url( get_author_posts_url( get_the_author_meta( 'ID' ) ) ); ?>"
							aria-label="
								<?php
								printf(
									/* translators: 1: author name. */
									esc_attr__(
										'Author: %s',
										'material-design-google'
									),
									esc_attr( get_the_author() )
								);
								?>
							"
						>
							<span class="mdc-button__ripple"></span>
							<?php echo get_avatar( get_the_author_meta( 'ID' ), 18 ); ?>
							<?php the_author(); ?>
						</a>
					<?php endif; ?>

					<?php if ( ! empty( $show_comments ) && ( comments_open() || ( 0 < get_comments_number() ) ) ) : ?>
						<a href="<?php comments_link(); ?>" class="mdc-button mdc-card__action mdc-card__action--button">
							<span class="mdc-button__ripple"></span>
							<i class="material-icons mdc-button__icon" aria-hidden="true">comment</i>
							<?php
							echo esc_html(
								sprintf(
									/* translators: 1: comment count. */
									_nx( // phpcs:disable
										'One Comment', // phpcs:disable
										'%s Comments',
										get_comments_number(),
										'comments title',
										'material-design-google'
									),
									number_format_i18n( get_comments_number() )
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
