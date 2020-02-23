<?php
/**
 * Template for displaying posts in grid or list layout.
 *
 * @package MaterialThemeBuilder
 */

use function MaterialThemeBuilder\get_plugin_instance;

defined( 'ABSPATH' ) || exit;

$attributes = isset( $attributes ) ? $attributes : [];
$class_name = isset( $attributes['className'] ) ? $attributes['className'] : '';
$columns    = absint( isset( $attributes['columns'] ) ? $attributes['columns'] : 3 );
?>

<div class="masonry-grid layout-masonry-<?php echo esc_attr( $columns ); ?> <?php echo esc_attr( $class_name ); ?>">
	<?php if ( ! empty( $posts_query ) && $posts_query->have_posts() ) : ?>

		<?php
		// Split each post into a column for masonry layout.
		$i            = 0;
		$column_items = [];
		while ( $posts_query->have_posts() ) :
			$posts_query->the_post();

			// Buffer the post template output.
			ob_start();
			?>

			<?php
			get_plugin_instance()->get_template(
				'partials/single-post.php',
				[
					'attributes' => $attributes,
				]
			);
			?>

			<?php
				$col_index                   = $i % $columns;
				$column_items[ $col_index ]  = isset( $column_items[ $col_index ] ) ? $column_items[ $col_index ] : '';
				$column_items[ $col_index ] .= ob_get_clean();
				$i++;
			?>
		<?php endwhile; ?>

		<?php // Build the output by combining all the generated columns with the colum markup. ?>
		<div class="masonry-grid_column">
			<?php echo implode( "</div>\n<div class='masonry-grid_column'>", $column_items ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
		</div>

	<?php endif; ?>
</div>
