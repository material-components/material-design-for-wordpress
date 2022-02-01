<?php
/**
 * Copyright 2022 Google LLC
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
 * Image list layout
 */

$block      = isset( $args['block'] ) ? $args['block'] : [];
$attributes = isset( $args['attributes'] ) ? $args['attributes'] : [];
$is_edit    = $attributes['isEditMode'];
$post_ID    = $block->context['postId']; // phpcs:ignore WordPress.WP.GlobalVariablesOverride.Prohibited
$post_link  = $is_edit ? '#link-to-' . $post_ID : get_the_permalink( $post );
if ( has_post_thumbnail( $post_ID ) ) {
	$thumbnail = get_the_post_thumbnail_url( $post_ID );
} else {
	$thumbnail = get_template_directory_uri() . '/assets/images/placeholder.png';
}
$wrapper_attributes = get_block_wrapper_attributes();
?>
<div <?php echo $wrapper_attributes; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>>
	<a href="<?php echo esc_url( $post_link ); ?>">
		<img class="mdc-image-list__image" src="<?php echo esc_url( $thumbnail ); ?>" alt="">
		<div class="mdc-image-list__supporting">
			<?php echo esc_html( get_the_title( $post_ID ) ); ?>
		</div>
	</a>
</div>
