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
 * Template part for displaying tabs navigation
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package MaterialDesign
 */

use MaterialDesign\Theme\Menu_Walker;

if ( ! has_nav_menu( 'menu-1' ) ) {
	return;
}

?>

<div class="tab-bar__wrap">
	<div class="mdc-tab-bar tab-bar" role="tablist">
		<div class="mdc-tab-scroller">
			<div class="mdc-tab-scroller__scroll-area">
				<div class="mdc-tab-scroller__scroll-content">
					<?php
					wp_nav_menu(
						array(
							'theme_location' => 'menu-1',
							'menu_id'        => 'primary-menu',
							'walker'         => new Menu_Walker(),
							'container'      => '',
							'items_wrap'     => '%3$s',
							'depth'          => 1,
						)
					);
					?>
				</div>
			</div>
		</div>
	</div>
</div>
