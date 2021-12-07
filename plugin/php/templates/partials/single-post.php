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
 * Template for displaying single post.
 *
 * @package MaterialDesign
 */

use MaterialDesign\Plugin\Template;
use function MaterialDesign\Plugin\get_plugin_instance;

defined( 'ABSPATH' ) || exit;

$attributes     = isset( $attributes ) ? $attributes : [];
$style          = isset( $attributes['style'] ) ? $attributes['style'] : 'masonry';
$columns        = absint( isset( $attributes['columns'] ) ? $attributes['columns'] : 3 );
$card_elevation = isset( $attributes['cardStyle'] ) && in_array( $attributes['cardStyle'], [ 'global', 'outlined', 'elevated' ], true ) ? $attributes['cardStyle'] : '';
// Handle fallback for outlined.
$card_elevation = isset( $attributes['outlined'] ) && ! $card_elevation ? $attributes['outlined'] : $card_elevation;
$layout         = isset( $attributes['contentLayout'] ) ? $attributes['contentLayout'] : 'text-above-media';
$featured_image = isset( $attributes['displayFeaturedImage'] ) ? $attributes['displayFeaturedImage'] : true;

if ( empty( $featured_image ) ) {
	$layout = 'text-above-media';
}

// Determine column span.
$column_span = 'grid' === $style ? floor( 12 / $columns ) : 12;
$card_style  = get_plugin_instance()->block_types->get_global_styles( 'card_style' );
$class_names = Template::classnames(
	[
		"single-post-card__$style",
		'mdc-card--outlined' => $card_elevation === 'outlined'
														||
														( is_bool( $card_elevation ) && $card_elevation )
														||
														( $card_elevation === 'global' && $card_style === 'outlined' ),
		'has-post-thumbnail' => $featured_image && has_post_thumbnail(),
	]
);
?>

<div class="mdc-layout-grid__cell--span-<?php echo esc_attr( $column_span ); ?>">
	<div class="single-post-card single-post-basic mdc-card <?php echo esc_attr( $class_names ); ?>">
		<a class="mdc-card__link" href="<?php the_permalink(); ?>">
			<div class="mdc-card__primary-action single-post-card__primary-action">
				<?php

				if ( 'list' !== $style && 'text-above-media' === $layout ) {
					Template::get_template(
						'partials/card-header.php',
						[
							'attributes' => $attributes,
						]
					);
				}

				Template::get_template(
					'partials/card-image.php',
					[
						'attributes' => $attributes,
					]
				);

				if ( 'list' === $style || 'text-under-media' === $layout || ( 'text-over-media' === $layout && ! has_post_thumbnail() ) ) {
					Template::get_template(
						'partials/card-header.php',
						[
							'attributes' => $attributes,
						]
					);
				}

				if ( 'list' !== $style ) {
					Template::get_template(
						'partials/card-content.php',
						[
							'attributes' => $attributes,
						]
					);
				}
				?>

			</div> <!-- mdc-card__primary-action -->
		</a> <!-- mdc-card__link -->

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
