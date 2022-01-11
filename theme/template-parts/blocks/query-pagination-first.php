<?php
/**
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

$block              = $args['block'];
$content            = $args['content'];
$attributes         = $args['attributes'];
$page_key           = isset( $block->context['queryId'] ) ? 'query-' . $block->context['queryId'] . '-page' : 'query-page';
$page_number        = empty( $_GET[ $page_key ] ) ? 1 : (int) $_GET[ $page_key ];
$wrapper_attributes = get_block_wrapper_attributes();
$default_label      = __( 'First', 'material-design-google' );
$label              = isset( $attributes['label'] ) && ! empty( $attributes['label'] ) ? $attributes['label'] : $default_label;
$content            = '';
$url                = '';
$wrapper_attributes = str_replace( 'class="', 'class="mdc-ripple-surface ', $wrapper_attributes );

// Check if the pagination is for Query that inherits the global context
// and handle appropriately.
if ( isset( $block->context['query']['inherit'] ) && $block->context['query']['inherit'] ) {
	$url = get_pagenum_link( 1 );
} elseif ( 1 !== $page_number ) {
	$url = add_query_arg( $page_key, 1 );
}

if ( ! empty( $url ) ) :
	ob_start();
	?>
		<a
			href="<?php echo esc_url( $url ); ?>"
			<?php
			/**
			 * Esc_attr breaks the markup.
			 * Turns the closing " into &quote;
			 */
			?>
			<?php echo $wrapper_attributes; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
		>
			<span class="material-icons" aria-hidden="true">
				first_page
			</span>
			<span class="screen-reader-text">
				<?php
					printf(
						/* translators: available page description. */
						esc_html__( '%s page', 'material-design-google' ),
						esc_html( $label )
					);
				?>
			</span>
		</a>
	<?php

	$content = ob_get_clean();

	echo wp_kses_post( $content );
endif;
