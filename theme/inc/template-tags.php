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
 * Custom template tags for this theme
 *
 * Eventually, some of the functionality here could be replaced by core features.
 *
 * @package MaterialDesign
 */

if ( ! function_exists( 'material_design_theme_posted_on' ) ) :
	/**
	 * Prints HTML with meta information for the current post-date/time.
	 */
	function material_design_theme_posted_on() {
		$time_string = '<time class="entry-date published updated" datetime="%1$s">%2$s</time>';
		if ( get_the_time( 'U' ) !== get_the_modified_time( 'U' ) ) {
			$time_string = '<time class="entry-date published" datetime="%1$s">%2$s</time><time class="updated" datetime="%3$s">%4$s</time>';
		}

		$time_string = sprintf(
			$time_string,
			esc_attr( get_the_date( DATE_W3C ) ),
			esc_html( get_the_date() ),
			esc_attr( get_the_modified_date( DATE_W3C ) ),
			esc_html( get_the_modified_date() )
		);

		$posted_on = '<a class="date mdc-typography--overline" href="' . esc_url( get_permalink() ) . '" rel="bookmark">' . $time_string . '</a>';

		echo '<span class="posted-on">' . $posted_on . '</span>'; // phpcs:ignore

		echo '<span class="separator">⌙</span>';

		$categories        = get_the_category();
		$categories_markup = [];

		if ( ! empty( $categories ) ) {
			?>
		<span class="cat-links">
			<span class="mdc-typography--overline">
				<?php foreach ( $categories as $category ) : ?>
					<?php ob_start(); ?>
					<a
						href="<?php echo esc_url( get_category_link( $category->term_id ) ); ?>"
						rel="category"
						aria-label="
						<?php
							printf(
								/* translators: Category name */
								esc_attr__( 'Category: %s', 'material-design-google' ),
								esc_attr( $category->name )
							)
						?>
						"
					>
						<?php echo esc_html( $category->name ); ?>
					</a>
					<?php $categories_markup[] = ob_get_clean(); ?>
					<?php
				endforeach;

				$categories_markup = apply_filters( 'the_category', join( ', ', $categories_markup ) );
				?>

				<?php
				echo wp_kses(
					$categories_markup,
					[
						'a' => [
							'href'       => [],
							'rel'        => [],
							'aria-label' => [],
						],
					]
				);
				?>
			</span>
		</span>
			<?php
		}
	}
endif;

if ( ! function_exists( 'material_design_theme_posted_by' ) ) :
	/**
	 * Prints HTML with meta information for the current author.
	 */
	function material_design_theme_posted_by() {
		$byline = '<span class="author vcard">' . get_avatar( get_the_author_meta( 'ID' ), 36 ) . '<a class="url fn n mdc-typography--caption" href="' . esc_url( get_author_posts_url( get_the_author_meta( 'ID' ) ) ) . '">' . esc_html( get_the_author() ) . '</a></span>';

		echo '<div class="byline"> ' . $byline . '</div>'; // phpcs:ignore

	}
endif;

if ( ! function_exists( 'material_design_theme_entry_footer' ) ) :
	/**
	 * Prints HTML with meta information for the categories, tags and comments.
	 */
	function material_design_theme_entry_footer() {
		// Hide category and tag text for pages.
		if ( 'post' === get_post_type() ) {
			$tags        = get_the_tags();
			$tags_markup = [];

			if ( ! empty( $tags ) ) {
				?>
			<span class="tags-links">
				<i class="material-icons mdc-button__icon" aria-hidden="true">label</i>

				<span class="mdc-typography--caption">
					<?php foreach ( $tags as $tag ) : ?>
						<?php ob_start(); ?>
						<a
							href="<?php echo esc_url( get_tag_link( $tag->term_id ) ); ?>"
							rel="tag"
							aria-label="
							<?php
								printf(
									/* translators: Tag name */
									esc_attr__( 'Tag: %s', 'material-design-google' ),
									esc_attr( $tag->name )
								)
							?>
							"
						>
							<?php echo esc_html( $tag->name ); ?>
						</a>
						<?php $tags_markup[] = ob_get_clean(); ?>
						<?php
					endforeach;

					$tags_markup = apply_filters( 'the_tags', join( ', ', $tags_markup ) );
					?>

					<?php
					echo wp_kses(
						$tags_markup,
						[
							'a' => [
								'href'       => [],
								'rel'        => [],
								'aria-label' => [],
							],
						]
					);
					?>
				</span>
			</span>
				<?php
			}
		}

		if ( ! is_single() && ! post_password_required() && ( comments_open() || get_comments_number() ) ) {
			echo '<span class="comments-link">';
			comments_popup_link(
				sprintf(
					wp_kses(
						/* translators: %s: post title */
						__( 'Leave a Comment<span class="screen-reader-text"> on %s</span>', 'material-design-google' ),
						array(
							'span' => array(
								'class' => array(),
							),
						)
					),
					get_the_title()
				)
			);
			echo '</span>';
		}

		edit_post_link(
			sprintf(
				wp_kses(
					/* translators: %s: Name of current post. Only visible to screen readers */
					__( 'Edit <span class="screen-reader-text">%s</span>', 'material-design-google' ),
					[
						'span' => [
							'class' => [],
						],
						'i'    => [
							'class' => [],
						],
					]
				),
				get_the_title()
			),
			'<span class="edit-link mdc-typography--caption"><i class="material-icons mdc-button__icon" aria-hidden="true">create</i>',
			'</span>'
		);
	}
endif;

if ( ! function_exists( 'material_design_theme_post_thumbnail' ) ) :
	/**
	 * Displays an optional post thumbnail.
	 *
	 * Wraps the post thumbnail in an anchor element on index views, or a div
	 * element when on single views.
	 */
	function material_design_theme_post_thumbnail() {
		if ( post_password_required() || is_attachment() || ! has_post_thumbnail() ) {
			return;
		}

		if ( is_singular() ) :
			?>

			<div class="post-thumbnail featured-image">
				<?php the_post_thumbnail(); ?>
			</div><!-- .post-thumbnail -->

		<?php else : ?>

		<a class="post-thumbnail" href="<?php the_permalink(); ?>" aria-hidden="true" tabindex="-1">
			<?php
			the_post_thumbnail(
				'post-thumbnail',
				array(
					'alt' => the_title_attribute(
						array(
							'echo' => false,
						)
					),
				)
			);
			?>
		</a>

			<?php
		endif; // End is_singular().
	}
endif;
