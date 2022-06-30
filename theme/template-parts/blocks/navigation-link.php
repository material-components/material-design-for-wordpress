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
 * Template part for displaying individual navigation links.
 */

global $wp;
$block                  = isset( $args['block'] ) ? $args['block'] : [];
$attributes             = isset( $args['attributes'] ) ? $args['attributes'] : [];
$content                = isset( $args['content'] ) ? $args['content'] : [];
$navigation_link_has_id = isset( $attributes['id'] ) && is_numeric( $attributes['id'] );
$is_post_type           = isset( $attributes['kind'] ) && 'post-type' === $attributes['kind'];
$is_post_type           = $is_post_type || isset( $attributes['type'] ) && ( 'post' === $attributes['type'] || 'page' === $attributes['type'] );

// Don't render the block's subtree if it is a draft or if the ID does not exist.
if ( $is_post_type && $navigation_link_has_id ) {
	$linked_post = get_post( $attributes['id'] );
	if ( ! $linked_post || 'publish' !== $linked_post->post_status ) {
		return '';
	}
}

// Don't render the block's subtree if it has no label.
if ( empty( $attributes['label'] ) ) {
	return '';
}

$colors     = block_core_navigation_link_build_css_colors( $block->context, $attributes );
$font_sizes = block_core_navigation_link_build_css_font_sizes( $block->context );
$classes    = array_merge(
	$colors['css_classes'],
	$font_sizes['css_classes']
);

$style_attribute = ( $colors['inline_styles'] . $font_sizes['inline_styles'] );

$css_classes  = trim( implode( ' ', $classes ) );
$has_submenu  = count( $block->inner_blocks ) > 0;
$current_link = home_url( $wp->request );
// When "blog" page is current page it uses first post from query loop as the current post which gives wrong get the id.
// Hence, url check is required here to activate menu.
$is_active = ( ! empty( $attributes['id'] ) && ( get_the_ID() === $attributes['id'] ) ) || trailingslashit( $attributes['url'] ) === trailingslashit( $current_link );

$wrapper_attributes = get_block_wrapper_attributes(
	[
		'class' => $css_classes . ' wp-block-navigation-item' . ( $has_submenu ? ' has-child' : '' ) .
			( $is_active ? ' current-menu-item' : '' ),
		'style' => $style_attribute,
	]
);

if ( empty( $block->context['isInDrawer'] ) ) :
	?>

	<a
		class=" mdc-tab <?php echo $is_active ? esc_attr( 'mdc-tab--active' ) : ''; ?>"
		<?php if ( ! empty( $attributes ) ) : ?>
			href="<?php echo esc_url( $attributes['url'] ); ?>"
		<?php endif; ?>
		<?php if ( $is_active ) : ?>
			aria-selected="true"
		<?php endif; ?>
		<?php if ( ! empty( $attributes['opensInNewTab'] ) ) : ?>
			target="_blank"
		<?php endif; ?>
		<?php if ( ! empty( $attributes['rel'] ) ) : ?>
			rel="<?php echo esc_attr( $attributes['rel'] ); ?>"
		<?php elseif ( ! empty( $attributes['nofollow'] ) ) : ?>
			rel="nofollow"
		<?php endif; ?>
		<?php if ( ! empty( $attributes['title'] ) ) : ?>
			title="<?php echo esc_attr( $attributes['title'] ); ?>"
		<?php endif; ?>
	>
		<span class="mdc-tab__content">
			<span class="mdc-tab__text-label"><?php echo wp_kses_post( $attributes['label'] ); ?></span>
		</span>

		<span
			class="mdc-tab-indicator
			<?php
			if ( $is_active ) {
				echo 'mdc-tab-indicator--active';
			}
			?>
		">
			<span class="mdc-tab-indicator__content mdc-tab-indicator__content--underline"></span>
		</span>

		<span class="mdc-tab__ripple"></span>
	</a>
<?php else : ?>
	<a
		href="<?php echo esc_url( $attributes['url'] ); ?>"
		class="mdc-list-item
		<?php
		if ( $is_active ) {
			echo 'mdc-list-item--activated';
		}
		?>
	">
		<span className="mdc-list-item__text">
			<?php echo wp_kses_post( $attributes['label'] ); ?>
		</span>
	</a>
<?php endif; ?>
