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
$max_page           = isset( $block->context['query']['pages'] ) ? (int) $block->context['query']['pages'] : 0;
$wrapper_attributes = get_block_wrapper_attributes();
$default_label      = __( 'Last', 'material-design-google' );
$label              = isset( $attributes['label'] ) && ! empty( $attributes['label'] ) ? $attributes['label'] : $default_label;
$content            = '';

?>
<pre>
	<?php var_dump($block->context['queryId']); ?>
</pre>
<pre>

	<?php var_dump($block->context['query']); ?>
</pre>
<?php
// Check if the pagination is for Query that inherits the global context
// and handle appropriately.
if ( isset( $block->context['query']['inherit'] ) && $block->context['query']['inherit'] ) {
	$filter_link_attributes = function() use ( $wrapper_attributes ) {
		return $wrapper_attributes;
	};

	add_filter( 'previous_posts_link_attributes', $filter_link_attributes );

	$content = get_previous_posts_link( $label );

	remove_filter( 'previous_posts_link_attributes', $filter_link_attributes );
} elseif ( 1 !== $page_number ) {
	$wrapper_attributes = str_replace( 'class="', 'class="mdc-ripple-surface ', $wrapper_attributes );

	ob_start();
	?>
		<a
			href="<?php echo esc_url( get_pagenum_link( $max_page ) ); ?>"

			<?php
			/**
			 * Esc_attr breaks the markup.
			 * Turns the closing " into &quote;
			 */
			?>
			<?php echo $wrapper_attributes; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
		>
			<span class="material-icons" aria-hidden="true">
				last_page
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
}

echo wp_kses_post( $content );
