<?php
/**
 * Template for displaying card content.
 *
 * @package MaterialThemeBuilder
 */

defined( 'ABSPATH' ) || exit;

$attributes     = isset( $attributes ) ? $attributes : [];
$post_content   = isset( $attributes['displayPostContent'] ) ? $attributes['displayPostContent'] : true;
$content_length = isset( $attributes['postContentLength'] ) ? $attributes['postContentLength'] : 20;

if ( ! empty( $post_content ) ) : ?>
	<div class="single-post-card__secondary mdc-typography mdc-typography--body2">
		<p>
			<?php echo wp_kses_post( wp_trim_words( get_the_excerpt(), $content_length, ' [&hellip;]' ) ); ?>
		</p>
	</div> <!-- single-post-card__secondary -->
<?php endif; ?>
