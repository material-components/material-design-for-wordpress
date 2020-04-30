<?php
/**
 * Template for outputting the contact form email.
 *
 * @package MaterialThemeBuilder
 */

defined( 'ABSPATH' ) || exit;

$fields      = isset( $fields ) ? $fields : [];
$pre_message = isset( $pre_message ) ? $pre_message : __( 'The following data has been submitted:', 'material-theme-builder' );
?>
<div>
	<br/>
	<?php echo esc_html( $pre_message ); ?>
	<br/>
	<br/>
	<?php
	foreach ( $fields as $field ) {
		echo sprintf( '%s: %s<br/>', esc_html( $field['label'] ), esc_html( $field['value'] ) );
	}
	?>
</div>
