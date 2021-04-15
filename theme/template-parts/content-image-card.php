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

if ( has_post_thumbnail() ) {
	$thumbnail = get_the_post_thumbnail_url();
} else {
	$thumbnail = get_template_directory_uri() . '/assets/images/placeholder.png';
}
?>

<li class="mdc-image-list__item">
	<a href="<?php the_permalink(); ?>">
		<img class="mdc-image-list__image" src="<?php echo esc_url( $thumbnail ); ?>" alt="">
		<div class="mdc-image-list__supporting">
			<?php the_title(); ?>
		</div>
	</a>
</li>
