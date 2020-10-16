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
$style      = isset( $attributes['style'] ) ? $attributes['style'] : 'masonry';
?>

<div class="mdc-layout-grid <?php echo esc_attr( Template::classnames( [ "layout-$style", $class_name ] ) ); ?>">
	<div class="mdc-layout-grid__inner">
		<?php if ( ! empty( $posts_query ) && $posts_query->have_posts() ) : ?>

			<?php
			while ( $posts_query->have_posts() ) :
				$posts_query->the_post();
				?>

				<?php
				Template::get_template(
					'partials/single-post.php',
					[
						'attributes' => $attributes,
					]
				);
				?>

			<?php endwhile; ?>

			<?php // reset the main query loop. ?>
			<?php wp_reset_postdata(); ?>

		<?php endif; ?>
	</div>
</div>
