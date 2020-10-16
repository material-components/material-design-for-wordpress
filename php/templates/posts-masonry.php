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
 * Template for displaying posts in grid or list layout.
 *
 * @package MaterialDesign
 */

use MaterialDesign\Plugin\Template;

defined( 'ABSPATH' ) || exit;

$attributes = isset( $attributes ) ? $attributes : [];
$class_name = isset( $attributes['className'] ) ? $attributes['className'] : '';
$columns    = absint( isset( $attributes['columns'] ) ? $attributes['columns'] : 3 );
?>

<div class="masonry-grid <?php echo esc_attr( Template::classnames( [ "layout-masonry-$columns", $class_name ] ) ); ?>">
	<?php if ( ! empty( $posts_query ) && $posts_query->have_posts() ) : ?>

		<?php
		// Divide posts into columns for masonry layout.
		$i            = 0;
		$column_items = [];
		while ( $posts_query->have_posts() ) :
			$posts_query->the_post();

			// Buffer the post template output.
			ob_start();
			?>

			<?php
			Template::get_template(
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

		<?php // Build the output by combining all the generated columns with the column markup. ?>
		<div class="masonry-grid_column">
			<?php echo implode( "</div>\n<div class='masonry-grid_column'>", $column_items ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
		</div>

		<?php // reset the main query loop. ?>
		<?php wp_reset_postdata(); ?>

	<?php endif; ?>
</div>
