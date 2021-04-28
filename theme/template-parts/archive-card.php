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
 * Archive card layout
 *
 * @package MaterialDesign
 */

$columns = get_theme_mod( 'archive_width', 'normal' ) === 'normal' ? 2 : 3;

?>

<div class="archive-cards masonry-grid-theme layout-masonry-<?php echo esc_attr( $columns ); ?>">
	<?php
	/* Start the Loop */
	while ( have_posts() ) :
		the_post();

		/*
		* Include the Post-Type-specific template for the content.
		* If you want to override this in a child theme, then include a file
		* called content-___.php (where ___ is the Post Type name) and that will be used instead.
		*/
		get_template_part( 'template-parts/content', get_post_type() );

	endwhile;
	?>
</div>
