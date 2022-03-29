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
 * Template part for displaying navigation.
 */

$block      = isset( $args['block'] ) ? $args['block'] : [];
$attributes = isset( $args['attributes'] ) ? $args['attributes'] : [];
$content    = isset( $args['content'] ) ? $args['content'] : [];
// Flag used to indicate whether the rendered output is considered to be
// a fallback (i.e. the block has no menu associated with it).
$is_fallback = false;

$inner_blocks = $block->inner_blocks;

var_dump( $attributes );

// Ensure that blocks saved with the legacy ref attribute name (navigationMenuId) continue to render.
if ( array_key_exists( 'navigationMenuId', $attributes ) ) {
	$attributes['ref'] = $attributes['navigationMenuId'];
}

// If:
// - the gutenberg plugin is active
// - `__unstableLocation` is defined
// - we have menu items at the defined location
// - we don't have a relationship to a `wp_navigation` Post (via `ref`).
// ...then create inner blocks from the classic menu assigned to that location.
if (
	defined( 'IS_GUTENBERG_PLUGIN' ) && IS_GUTENBERG_PLUGIN &&
	array_key_exists( '__unstableLocation', $attributes ) &&
	! array_key_exists( 'ref', $attributes ) &&
	! empty( block_core_navigation_get_menu_items_at_location( $attributes['__unstableLocation'] ) )
) {
	$menu_items = block_core_navigation_get_menu_items_at_location( $attributes['__unstableLocation'] );
	if ( empty( $menu_items ) ) {
		return '';
	}

	$menu_items_by_parent_id = block_core_navigation_sort_menu_items_by_parent_id( $menu_items );
	$parsed_blocks           = block_core_navigation_parse_blocks_from_menu_items( $menu_items_by_parent_id[0], $menu_items_by_parent_id );
	$inner_blocks            = new WP_Block_List( $parsed_blocks, $attributes );
}

// Load inner blocks from the navigation post.
if ( array_key_exists( 'ref', $attributes ) ) {
	$navigation_post = get_post( $attributes['ref'] );
	if ( ! isset( $navigation_post ) ) {
		return '';
	}

	$parsed_blocks = parse_blocks( $navigation_post->post_content );

	// 'parse_blocks' includes a null block with '\n\n' as the content when
	// it encounters whitespace. This code strips it.
	$compacted_blocks = block_core_navigation_filter_out_empty_blocks( $parsed_blocks );

	// TODO - this uses the full navigation block attributes for the
	// context which could be refined.
	$inner_blocks = new WP_Block_List( $compacted_blocks, $attributes );
}

// If there are no inner blocks then fallback to rendering an appropriate fallback.
if ( empty( $inner_blocks ) ) {
	$is_fallback = true; // indicate we are rendering the fallback.

	$fallback_blocks = block_core_navigation_get_fallback_blocks();

	// Fallback my have been filtered so do basic test for validity.
	if ( empty( $fallback_blocks ) || ! is_array( $fallback_blocks ) ) {
		return '';
	}

	$inner_blocks = new WP_Block_List( $fallback_blocks, $attributes );

}

$layout_justification = [
	'left'          => 'items-justified-left',
	'right'         => 'items-justified-right',
	'center'        => 'items-justified-center',
	'space-between' => 'items-justified-space-between',
];

// Restore legacy classnames for submenu positioning.
$layout_class = '';
if ( isset( $attributes['layout']['justifyContent'] ) ) {
	$layout_class .= $layout_justification[ $attributes['layout']['justifyContent'] ];
}
if ( isset( $attributes['layout']['orientation'] ) && 'vertical' === $attributes['layout']['orientation'] ) {
	$layout_class .= ' is-vertical';
}
if ( isset( $attributes['layout']['flexWrap'] ) && 'nowrap' === $attributes['layout']['flexWrap'] ) {
	$layout_class .= ' no-wrap';
}

$colors     = block_core_navigation_build_css_colors( $attributes );
$font_sizes = block_core_navigation_build_css_font_sizes( $attributes );
$classes    = array_merge(
	$colors['css_classes'],
	$font_sizes['css_classes'],
	$layout_class ? [ $layout_class ] : [],
	$is_fallback ? [ 'is-fallback' ] : []
);

$inner_blocks_html = '';
$is_list_open      = false;
foreach ( $inner_blocks as $inner_block ) {
	if ( ( 'material/navigation-link' === $inner_block->name || 'core/navigation-link' === $inner_block->name || 'core/home-link' === $inner_block->name || 'core/site-title' === $inner_block->name || 'core/site-logo' === $inner_block->name || 'core/navigation-submenu' === $inner_block->name ) && ! $is_list_open ) {
		$is_list_open = true;
	}
	if ( 'material/navigation-link' !== $inner_block->name && 'core/navigation-link' !== $inner_block->name && 'core/home-link' !== $inner_block->name && 'core/site-title' !== $inner_block->name && 'core/site-logo' !== $inner_block->name && 'core/navigation-submenu' !== $inner_block->name && $is_list_open ) {
		$is_list_open = false;
	}
	if ( 'core/site-title' === $inner_block->name || 'core/site-logo' === $inner_block->name ) {
		$inner_blocks_html .= '<li class="wp-block-navigation-item">' . $inner_block->render() . '</li>';
	} else {
		$inner_blocks_html .= $inner_block->render();
	}
}

if ( $is_list_open ) {
	$inner_blocks_html .= '</ul>';
}

$block_styles = isset( $attributes['styles'] ) ? $attributes['styles'] : '';

$wrapper_attributes = get_block_wrapper_attributes(
	[
		'class' => implode( ' ', $classes ),
		'style' => $block_styles . $colors['inline_styles'] . $font_sizes['inline_styles'],
	]
);

$modal_unique_id = uniqid();

$is_hidden_by_default = isset( $attributes['overlayMenu'] ) && 'always' === $attributes['overlayMenu'];

$responsive_container_classes = [
	'wp-block-navigation__responsive-container',
	$is_hidden_by_default ? 'hidden-by-default' : '',
	implode( ' ', $colors['overlay_css_classes'] ),
];
$open_button_classes          = [
	'wp-block-navigation__responsive-container-open',
	$is_hidden_by_default ? 'always-shown' : '',
];

$toggle_button_icon        = '<svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><rect x="4" y="7.5" width="16" height="1.5" /><rect x="4" y="15" width="16" height="1.5" /></svg>';
$should_display_icon_label = isset( $attributes['hasIcon'] ) && true === $attributes['hasIcon'];
$toggle_button_content     = $should_display_icon_label ? $toggle_button_icon : 'Menu';

$responsive_container_markup = sprintf(
	'<button aria-haspopup="true" aria-label="%3$s" class="%6$s" data-micromodal-trigger="modal-%1$s">%9$s</button>
		<div class="%5$s" style="%7$s" id="modal-%1$s">
			<div class="wp-block-navigation__responsive-close" tabindex="-1" data-micromodal-close>
				<div class="wp-block-navigation__responsive-dialog" aria-label="%8$s">
						<button aria-label="%4$s" data-micromodal-close class="wp-block-navigation__responsive-container-close"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" aria-hidden="true" focusable="false"><path d="M13 11.8l6.1-6.3-1-1-6.1 6.2-6.1-6.2-1 1 6.1 6.3-6.5 6.7 1 1 6.5-6.6 6.5 6.6 1-1z"></path></svg></button>
					<div class="wp-block-navigation__responsive-container-content" id="modal-%1$s-content">
						%2$s
					</div>
				</div>
			</div>
		</div>',
	esc_attr( $modal_unique_id ),
	$inner_blocks_html,
	__( 'Open menu', 'material-design-google' ), // Open button label.
	__( 'Close menu', 'material-design-google' ), // Close button label.
	esc_attr( implode( ' ', $responsive_container_classes ) ),
	esc_attr( implode( ' ', $open_button_classes ) ),
	safecss_filter_attr( $colors['overlay_inline_styles'] ),
	__( 'Menu', 'material-design-google' ),
	$toggle_button_content
);
?>

<div class="mdc-tab-bar tab-bar">
	<div class="mdc-tab-scroller">
		<div class="mdc-tab-scroller__scroll-area">
			<div class="mdc-tab-scroller__scroll-content">
				<?php echo $inner_blocks_html; // phpcs:ignore ?>
			</div>
		</div>
	</div>
</div>
