<?php
/**
 * The template for displaying posts in grid or list layout.
 *
 * @package MaterialThemeBuilder
 */

defined( 'ABSPATH' ) || exit;

$attributes     = isset( $attributes ) ? $attributes : [];
$class_name     = isset( $attributes['className'] ) ? $attributes['className'] : '';
$style          = isset( $attributes['style'] ) ? $attributes['style'] : 'grid';
$columns        = absint( isset( $attributes['columns'] ) ? $attributes['columns'] : 3 );
$outlined       = isset( $attributes['outlined'] ) ? $attributes['outlined'] : false;
$post_date      = isset( $attributes['displayPostDate'] ) ? $attributes['displayPostDate'] : false;
$post_content   = isset( $attributes['displayPostContent'] ) ? $attributes['displayPostContent'] : false;
$content_length = isset( $attributes['postContentLength'] ) ? $attributes['postContentLength'] : 50;
$featured_image = isset( $attributes['displayFeaturedImage'] ) ? $attributes['displayFeaturedImage'] : false;
$comments_count = isset( $attributes['displayCommentsCount'] ) ? $attributes['displayCommentsCount'] : false;
$post_author    = isset( $attributes['displayPostAuthor'] ) ? $attributes['displayPostAuthor'] : false;

if ( ! empty( $featured_image ) ) {
	$featured_image = get_the_post_thumbnail_url();
}

// Determine column span.
$column_span = 'grid' === $style ? floor( 12 / $columns ) : 12;

// Determine image type.
$image_type = 'grid' === $style ? '16-9' : 'square';
?>

<div class="mdc-layout-grid layout-<?php echo esc_attr( implode( ' ', [ $style, $class_name ] ) ); ?>">
	<div class="mdc-layout-grid__inner">
		<?php if ( ! empty( $posts_query ) && $posts_query->have_posts() ) : ?>

			<?php 
			while ( $posts_query->have_posts() ) :
				$posts_query->the_post(); 
				?>

				<div class="mdc-layout-grid__cell--span-<?php echo esc_attr( $column_span ); ?>">
					<div class="single-post-card single-post-card__<?php echo esc_attr( $style ); ?> single-post-basic-with-header mdc-card <?php echo esc_attr( $outlined ? 'mdc-card--outlined' : '' ); ?>">

						<div class="mdc-card__primary-action single-post-card__primary-action">

							<?php 
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

							<div class="single-post-card__primary">
								<h2 class="single-post-card__title mdc-typography mdc-typography--headline6">
									<?php echo esc_html( get_the_title() ); ?>
								</h2>

								<?php if ( ! empty( $post_date ) ) : ?>
									<h3 class="single-post-card__subtitle mdc-typography mdc-typography--subtitle2">
										<time>
										<?php echo esc_html( get_the_date() ); ?>
										</time>
									</h3>
								<?php endif; ?>

							</div> <!-- single-post-card__title -->
						</div> <!-- mdc-card__primary-action -->

						<?php if ( ! empty( $post_content ) ) : ?>
							<div class="single-post-card__secondary mdc-typography mdc-typography--body2">
								<p>
									<?php echo wp_kses_post( wp_trim_words( get_the_excerpt(), $content_length, ' [&hellip;]' ) ); ?>
								</p>
							</div> <!-- single-post-card__secondary -->
						<?php endif; ?>

						<?php if ( ! empty( $comments_count ) || ! empty( $post_author ) ) : ?>
							<div class="mdc-card__actions">
								<div class="mdc-card__action-buttons">
									<?php if ( ! empty( $post_author ) ) : ?>
										<button class="mdc-button">
											<i
												class="material-icons mdc-button__icon"
												aria-hidden="true"
											>
												face
											</i>
											<span class="mdc-button__label">
												<?php echo esc_html( get_the_author() ); ?>
											</span>
										</button>
									<?php endif; ?>

									<?php if ( ! empty( $comments_count ) ) : ?>
										<button class="mdc-button">
											<i
												class="material-icons mdc-button__icon"
												aria-hidden="true"
											>
												comment
											</i>
											<span class="mdc-button__label">
												<?php echo esc_html( wp_count_comments( get_the_ID() )->approved ); ?>
												<?php echo esc_html__( 'comments', 'material-theme-builder' ); ?>
											</span>
										</button>
									<?php endif; ?>
								</div> <!-- mdc-card__action-buttons -->
							</div> <!-- mdc-card__actions -->
						<?php endif; ?>

					</div> <!-- single-post-card -->
				</div> <!-- mdc-layout-grid__cell--span-12 -->

			<?php endwhile; ?>

		<?php endif; ?>
	</div>
</div>
