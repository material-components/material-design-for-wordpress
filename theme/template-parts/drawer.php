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
 * Template part for displaying menu drawer
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package MaterialDesign
 */

use MaterialDesign\Theme\Menu_Drawer_Walker;
?>

<aside class="mdc-drawer material-drawer mdc-drawer--modal">
	<div class="mdc-drawer__header">
		<?php if ( has_custom_logo() ) : ?>
			<div class="logo">
				<?php the_custom_logo(); ?>
			</div>
		<?php endif; ?>

		<div class="mdc-drawer__title">
			<?php get_template_part( 'template-parts/site-title' ); ?>
		</div>
	</div>
	<div class="mdc-drawer__content">
		<?php get_search_form(); ?>

		<nav class="mdc-list mdc-drawer__list" role="listbox">
			<?php
			wp_nav_menu(
				array(
					'theme_location' => 'menu-2',
					'menu_id'        => 'secondary-menu',
					'walker'         => new Menu_Drawer_Walker(),
					'container'      => '',
					'items_wrap'     => '%3$s',
				)
			);
			?>
		</nav>
	</div>
</aside>

<div class="mdc-drawer-scrim"></div>
