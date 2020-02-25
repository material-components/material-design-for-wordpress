<?php
/**
 * Template for displaying single post.
 *
 * @package MaterialThemeBuilder
 */

use MaterialThemeBuilder\Template;

defined( 'ABSPATH' ) || exit;

$attributes = isset( $attributes ) ? $attributes : [];
$style      = isset( $attributes['style'] ) ? $attributes['style'] : 'grid';
$columns    = absint( isset( $attributes['columns'] ) ? $attributes['columns'] : 3 );
$outlined   = isset( $attributes['outlined'] ) ? $attributes['outlined'] : false;

// Determine column span.
$column_span = 'grid' === $style ? floor( 12 / $columns ) : 12;
$class_names = Template::classnames(
	[
		"single-post-card__$style",
		'mdc-card--outlined' => $outlined,
	]
);
?>

<div class="mdc-layout-grid__cell--span-<?php echo esc_attr( $column_span ); ?>">
	<div class="single-post-card single-post-basic mdc-card <?php echo esc_attr( $class_names ); ?>">

		<div class="mdc-card__primary-action single-post-card__primary-action">
			<?php
				Template::get_template(
					'partials/card-image.php',
					[
						'attributes' => $attributes,
					]
				);
				?>

			<div class="single-post-card__primary">
				<?php
					Template::get_template(
						'partials/card-header.php',
						[
							'attributes' => $attributes,
						]
					);
					?>
			</div> <!-- single-post-card__primary -->

		</div> <!-- mdc-card__primary-action -->

		<?php
		if ( 'list' !== $style ) {
			Template::get_template(
				'partials/card-content.php',
				[
					'attributes' => $attributes,
				]
			);
		}
		?>

		<?php
			Template::get_template(
				'partials/card-actions.php',
				[
					'attributes' => $attributes,
				]
			);
			?>

	</div> <!-- single-post-card -->
</div> <!-- mdc-layout-grid__cell--span-12 -->
