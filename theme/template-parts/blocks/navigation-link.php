<?php
$block               = isset( $args['block'] ) ? $args['block'] : [];
$attributes          = isset( $args['attributes'] ) ? $args['attributes'] : [];
$content             = isset( $args['content'] ) ? $args['content'] : [];

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

$colors          = block_core_navigation_link_build_css_colors( $block->context, $attributes );
$font_sizes      = block_core_navigation_link_build_css_font_sizes( $block->context );
$classes         = array_merge(
	$colors['css_classes'],
	$font_sizes['css_classes']
);
$style_attribute = ( $colors['inline_styles'] . $font_sizes['inline_styles'] );

$css_classes = trim( implode( ' ', $classes ) );
$has_submenu = count( $block->inner_blocks ) > 0;
$is_active   = ! empty( $attributes['id'] ) && ( get_the_ID() === $attributes['id'] );

$wrapper_attributes = get_block_wrapper_attributes(
	array(
		'class' => $css_classes . ' wp-block-navigation-item' . ( $has_submenu ? ' has-child' : '' ) .
			( $is_active ? ' current-menu-item' : '' ),
		'style' => $style_attribute,
	)
);
?>

	<a
		class=" mdc-tab <?php echo $is_active ? esc_attr( 'mdc-tab--active' ) : '' ?>"
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
		<?php elseif ( ! empty( $attributes['nofollow']) ) : ?>
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
