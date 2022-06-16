<?php
/**
 * Footer component
 *
 * @package MaterialDesign
 */

$footer_text = get_theme_mod( 'footer_text', '' );
?>

	<div
		id="colophon"
		class="mdc-layout-grid site-footer__inner"
	>
		<div class="mdc-layout-grid__inner">
			<div class="site-footer__copyright mdc-layout-grid__cell mdc-layout-grid__cell--span-6">
				<small class="site-footer__text mdc-typography--subtitle2"><?php echo esc_html( $footer_text ); ?></small>
			</div>

			<?php get_template_part( 'template-parts/back-to-top' ); ?>
		</div>
	</div><!-- #colophon -->
