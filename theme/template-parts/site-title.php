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
 * The site title template
 *
 * @package MaterialDesign
 */

$hide_site_title = get_theme_mod( 'header_title_display', false );

if ( $hide_site_title ) {
	return;
}

if ( is_front_page() && is_home() ) :
	?>
	<div class="site-title__wrapper">
		<div class="site-title__row">
			<h1 class="site-title mdc-typography mdc-typography--headline6">
				<a href="<?php echo esc_url( home_url( '/' ) ); ?>" rel="home"><?php bloginfo( 'name' ); ?></a>
			</h1>

			<button type="button" class="mdc-icon-button mdc-drawer__close">
				<span class="mdc-button__ripple"></span>
				<i class="material-icons mdc-button__icon" aria-hidden="true">close</i>
				<span class="screen-reader-text"><?php esc_html_e( 'Close drawer', 'material-design-google' ); ?></span>
			</button>
		</div>
		<div class="site-tagline mdc-typography--subtitle1"><?php bloginfo( 'description' ); ?></div>
	</div>
	<?php
else :
	?>
	<div class="site-title__wrapper">
		<div class="site-title__row">
			<div class="site-title mdc-typography mdc-typography--headline6">
				<a href="<?php echo esc_url( home_url( '/' ) ); ?>" rel="home"><?php bloginfo( 'name' ); ?></a>
			</div>

			<button type="button" class="mdc-icon-button mdc-drawer__close">
				<span class="mdc-button__ripple"></span>
				<i class="material-icons mdc-button__icon" aria-hidden="true">close</i>
				<span class="screen-reader-text"><?php esc_html_e( 'Close drawer', 'material-design-google' ); ?></span>
			</button>
		</div>
		<div class="site-tagline mdc-typography--subtitle1"><?php bloginfo( 'description' ); ?></div>
	</div>
	<?php
endif;
