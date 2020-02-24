<?php
/**
 * Template for displaying featured image in card.
 *
 * @package MaterialThemeBuilder
 */

defined( 'ABSPATH' ) || exit;

$attributes     = isset( $attributes ) ? $attributes : [];
$style          = isset( $attributes['style'] ) ? $attributes['style'] : 'grid';
$featured_image = isset( $attributes['displayFeaturedImage'] ) ? $attributes['displayFeaturedImage'] : false;

if ( ! empty( $featured_image ) ) {
	$featured_image = get_the_post_thumbnail_url();
}

// Determine image type.
$image_type = 'list' === $style ? 'square' : '16-9';

if ( ! empty( $featured_image ) ) :
	$image = get_the_post_thumbnail_url( get_the_ID(), 'full' );
	if ( ! empty( $image ) ) :
		?>
		<div
			class="mdc-card__media mdc-card__media--<?php echo esc_attr( $image_type ); ?> single-post-card__media"
			style="background-image: url(<?php echo esc_url( $image ); ?>)"
		></div> <!-- mdc-card__media -->
	<?php endif; ?>
<?php endif; ?>
