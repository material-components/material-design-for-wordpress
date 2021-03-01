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
 * Template for outputting the contact form email.
 *
 * @package MaterialDesign
 */

defined( 'ABSPATH' ) || exit;

$fields      = isset( $fields ) ? $fields : [];
$pre_message = isset( $pre_message ) ? $pre_message : __( 'The following data has been submitted:', 'material-design' );
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
