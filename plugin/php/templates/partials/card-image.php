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
 * Template for displaying featured image in card.
 *
 * @package MaterialDesign
 */

use MaterialDesign\Plugin\Template;

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
	<div class="<?php echo esc_attr( Template::classnames( $class_names ) ); ?>">
		<?php echo get_the_post_thumbnail( get_the_ID(), 'list' === $style ? 'medium' : 'large' ); ?>
		<?php
		if ( 'text-over-media' === $layout ) {
			?>
			<div class="mdc-card__media-content">
				<?php
				Template::get_template(
					'partials/card-header.php',
					[
						'attributes' => $attributes,
					]
				);
				?>
			</div>
			<?php
		}
		?>
	</div> <!-- mdc-card__media -->
<?php endif; ?>
