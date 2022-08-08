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

use function MaterialDesign\Plugin\get_plugin_instance;

$block              = isset( $args['block'] ) ? $args['block'] : [];
$attributes         = isset( $args['attributes'] ) ? $args['attributes'] : [];
$post_id_image_card = $block->context['postId'];
$post_link          = get_the_permalink( $post_id_image_card );
if ( has_post_thumbnail( $post_id_image_card ) ) {
	$thumbnail = get_the_post_thumbnail_url( $post_id_image_card );
} else {
	$thumbnail = get_plugin_instance()->asset_url( 'assets/images/placeholder-image-card.png' );
}
$wrapper_attributes = get_block_wrapper_attributes();
?>
<div <?php echo $wrapper_attributes; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>>
	<a href="<?php echo esc_url( $post_link ); ?>">
		<img class="mdc-image-list__image" src="<?php echo esc_url( $thumbnail ); ?>" alt="">
		<div class="mdc-image-list__supporting">
			<?php echo esc_html( get_the_title( $post_id_image_card ) ); ?>
		</div>
	</a>
</div>
