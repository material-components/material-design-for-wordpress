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
 * Template for displaying card content.
 *
 * @package MaterialDesign
 */

defined( 'ABSPATH' ) || exit;

$attributes     = isset( $attributes ) ? $attributes : [];
$show_content   = isset( $attributes['displayPostContent'] ) ? $attributes['displayPostContent'] : true;
$content_length = isset( $attributes['postContentLength'] ) ? $attributes['postContentLength'] : 20;
$layout         = isset( $attributes['contentLayout'] ) ? $attributes['contentLayout'] : 'text-above-media';
$class_name     = "single-post-card__secondary-{$layout}";
$post_content   = wp_trim_words( get_the_excerpt(), $content_length, ' [&hellip;]' );

if ( ! empty( $show_content ) && ! empty( $post_content ) ) : ?>
	<div class="single-post-card__secondary mdc-typography mdc-typography--body2 <?php echo esc_attr( $class_name ); ?>">
		<p>
			<?php echo wp_kses_post( $post_content ); ?>
		</p>
	</div> <!-- single-post-card__secondary -->
<?php endif; ?>
