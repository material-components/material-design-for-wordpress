<?php
/**
 * Template for displaying card header.
 *
 * @package MaterialThemeBuilder
 */

defined( 'ABSPATH' ) || exit;

$attributes = isset( $attributes ) ? $attributes : [];
$post_date  = isset( $attributes['displayPostDate'] ) ? $attributes['displayPostDate'] : false;
?>

<h2 class="single-post-card__title mdc-typography mdc-typography--headline6">
	<?php echo esc_html( get_the_title() ); ?>
</h2>

<?php if ( ! empty( $post_date ) ) : ?>
	<h3 class="single-post-card__subtitle mdc-typography mdc-typography--subtitle2">
		<time>
		<?php echo esc_html( get_the_date() ); ?>
		</time>
	</h3>
<?php endif; ?>
