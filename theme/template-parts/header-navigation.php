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
 * The header navigation
 * Contains top app bar and tab bar
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package MaterialDesign
 */

?>

<div
	class="
		site__navigation
		<?php if ( has_nav_menu( 'menu-1' ) ) : ?>
			-has-tab-bar
		<?php endif; ?>
		"
	role="banner"
>
	<?php get_template_part( 'template-parts/menu', 'header' ); ?>
</div>
