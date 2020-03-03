<?php
/**
 * Template for displaying featured image in card.
 *
 * @package MaterialThemeBuilder
 */

use MaterialThemeBuilder\Template;

defined( 'ABSPATH' ) || exit;

$attributes     = isset( $attributes ) ? $attributes : [];
$style          = isset( $attributes['style'] ) ? $attributes['style'] : 'masonry';
$featured_image = isset( $attributes['displayFeaturedImage'] ) ? $attributes['displayFeaturedImage'] : true;
$layout         = isset( $attributes['contentLayout'] ) ? $attributes['contentLayout'] : 'text-above-media';

if ( ! empty( $featured_image ) ) {
	$featured_image = get_the_post_thumbnail_url( get_the_ID(), 'list' === $style ? 'medium' : 'large' );
}

// Determine image type.
$image_type = 'list' === $style ? 'square' : '16-9';

$class_names = [
	'mdc-card__media single-post-card__media',
	"mdc-card__media--{$image_type}",
	"single-post-card-with-{$layout}",
];

if ( ! empty( $featured_image ) ) :
	?>
	<div
		class="<?php echo esc_attr( Template::classnames( $class_names ) ); ?>"
		style="background-image: url(<?php echo esc_url( $featured_image ); ?>)"
	>
		<?php
		if ( 'text-over-media' === $layout ) { ?>
			<div class="mdc-card__media-content">
				<?php
				Template::get_template(
					'partials/card-header.php',
					[
						'attributes' => $attributes,
					]
				);
				?>
			</div> <?php
		}
		?>
	</div> <!-- mdc-card__media -->
<?php endif; ?>
