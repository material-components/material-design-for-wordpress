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
 * Template for displaying card header.
 *
 * @package MaterialDesign
 */

defined( 'ABSPATH' ) || exit;

$attributes = isset( $attributes ) ? $attributes : [];
$post_date  = isset( $attributes['displayPostDate'] ) ? $attributes['displayPostDate'] : true;
?>

<div class="single-post-card__primary">
	<h2 class="single-post-card__title mdc-typography mdc-typography--headline6">
		<div><?php echo esc_html( get_the_title() ); ?></div>
	</h2>

	<?php if ( ! empty( $post_date ) ) : ?>
		<h3 class="single-post-card__subtitle mdc-typography mdc-typography--subtitle2">
			<time>
			<?php echo esc_html( get_the_date() ); ?>
			</time>
		</h3>
	<?php endif; ?>
</div> <!-- single-post-card__primary -->
