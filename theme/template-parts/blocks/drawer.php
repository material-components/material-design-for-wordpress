<?php
/**
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @package MaterialDesign
 */

$block        = isset( $args['block'] ) ? $args['block'] : [];
$attributes   = isset( $args['attributes'] ) ? $args['attributes'] : [];
$content      = isset( $args['content'] ) ? $args['content'] : [];
$inner_blocks = ! empty( $block->inner_blocks ) ? $block->inner_blocks : [];

?>

<div class="wp-block-material-drawer">
	<aside class="mdc-drawer material-drawer mdc-drawer--modal wp-block-material-drawer">
		<?php
		foreach ( $inner_blocks as $inner_block ) {
			echo $inner_block->render(); // phpcs:ignore
		}
		?>
	</aside>

	<div class="mdc-drawer-scrim"></div>
</div>
