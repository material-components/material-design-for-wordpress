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
 * Template for displaying card actions.
 *
 * @package MaterialDesign
 */

defined( 'ABSPATH' ) || exit;

$attributes     = isset( $attributes ) ? $attributes : [];
$comments_count = isset( $attributes['displayCommentsCount'] ) ? $attributes['displayCommentsCount'] : false;
$post_author    = isset( $attributes['displayPostAuthor'] ) ? $attributes['displayPostAuthor'] : false;

if ( ! empty( $post_author ) ) {
	$author_name = get_the_author_meta( 'display_name' );
	$author_url  = get_author_posts_url( get_the_author_meta( 'ID' ) );
}

if ( ! empty( $comments_count ) || ! empty( $post_author ) ) : ?>
	<div class="mdc-card__actions">
		<div class="mdc-card__action-buttons">
			<?php if ( ! empty( $post_author ) ) : ?>
				<a class="mdc-button mdc-card__action mdc-card__action--button mdc-button__post-author" href="<?php echo esc_url( $author_url ); ?>">
					<span class="mdc-button__ripple"></span>
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
				<a class="mdc-button mdc-card__action mdc-card__action--button mdc-button__comment-count" href="<?php the_permalink(); ?>">
					<span class="mdc-button__ripple"></span>
					<i
						class="material-icons mdc-button__icon"
						aria-hidden="true"
					>
						comment
					</i>
					<span class="mdc-button__label">
						<?php echo absint( get_comments_number( get_the_ID() ) ); ?>
					</span>
				</a>
			<?php endif; ?>
		</div> <!-- mdc-card__action-buttons -->
	</div> <!-- mdc-card__actions -->
<?php endif; ?>
