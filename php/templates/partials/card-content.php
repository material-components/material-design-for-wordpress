<?php
/**
 * Template for displaying card content.
 *
 * @package MaterialThemeBuilder
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
