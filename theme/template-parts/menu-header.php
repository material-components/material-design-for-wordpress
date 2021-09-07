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
 * Template part for displaying top app bar
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package MaterialDesign
 */

use MaterialDesign\Theme\Menu_Walker;

$has_search       = get_theme_mod( 'header_search_display', true );
$layout           = get_theme_mod( 'header_bar_layout', 'standard' );
$material_options = get_option( 'material_design' );
$style_settings   = isset( $material_options['style_settings'] ) ? json_decode( $material_options['style_settings'], true ) : [];
$current_style    = ! empty( $material_options['style'] ) ? $material_options['style'] : 'baseline';
$has_dark_mode    = ! empty( $style_settings[ $current_style ] ) && ! empty( $style_settings[ $current_style ]['switcher'] ) ? $style_settings[ $current_style ]['switcher'] : false;
$class            = ( 'fixed' === $layout ) ? 'mdc-top-app-bar--fixed' : '';
$class           .= ( $has_dark_mode ) ? ' top-app-bar--has-dark-mode' : '';
?>

<div class="mdc-top-app-bar top-app-bar <?php echo $class; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>">
	<div class="mdc-top-app-bar__row top-app-bar__header">
		<section class="mdc-top-app-bar__section mdc-top-app-bar__section--align-start">
			<button class="material-icons mdc-top-app-bar__navigation-icon mdc-icon-button top-app-bar__menu-trigger">menu</button>

			<?php if ( has_custom_logo() ) : ?>
				<div class="logo">
					<?php the_custom_logo(); ?>
				</div>
			<?php endif; ?>
			<span class="mdc-top-app-bar__title top-app-bar__title">
				<?php get_template_part( 'template-parts/site-title' ); ?>
			</span>
		</section>
		<section class="mdc-top-app-bar__section mdc-top-app-bar__section--align-end top-app-bar__menu" role="toolbar">
			<?php if ( ! empty( $has_search ) ) : ?>
				<button class="material-icons mdc-top-app-bar__navigation-icon mdc-icon-button search__button" aria-label="<?php esc_attr_e( 'Search', 'material-design-google' ); ?>">
					<span class="mdc-button__ripple"></span>
					search
				</button>
			<?php endif; ?>

			<button class="material-icons mdc-top-app-bar__navigation-icon mdc-icon-button dark-mode__button" aria-label="<?php esc_attr_e( 'Toggle Dark Mode', 'material-design-google' ); ?>">
				<span class="mdc-button__ripple"></span>
				<span class="dark-mode__icon">dark_mode</span>
			</button>
		</section>
	</div>

	<div class="mdc-top-app-bar__row top-app-bar__search">
		<?php
		get_template_part( 'template-parts/search', 'header' );
		?>
	</div>

	<?php get_template_part( 'template-parts/menu', 'tabs' ); ?>
</div>
