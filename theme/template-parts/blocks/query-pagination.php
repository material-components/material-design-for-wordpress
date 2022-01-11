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
 * Query Pagination block markup
 */
$content    = $args['content'];
$attributes = get_block_wrapper_attributes();

if ( empty( trim( $content ) ) ) {
	return;
}

$attributes = str_replace( 'class="', 'class="mdc-page-navigation ', $attributes );
?>

<?php
/**
 * Esc_attr breaks the markup.
 * Turns the closing " into &quote;
 */
?>
<ul <?php echo $attributes; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>>
	<li>
		<?php echo wp_kses_post( $content ); ?>
	</li>
</ul>