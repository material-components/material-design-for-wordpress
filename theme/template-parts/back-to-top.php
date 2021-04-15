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
 * Back to Top partial
 *
 * @package MaterialDesign
 */

$is_hidden = get_theme_mod( 'hide_back_to_top' );

if ( ! empty( $is_hidden ) ) {
	return;
}
?>

<div class="back-to-top mdc-layout-grid__cell mdc-layout-grid__cell--span-6">
	<button id="back-to-top" class="mdc-button" aria-label="<?php esc_attr_e( 'Back to Top', 'material-design-google' ); ?>">
		<div class="mdc-button__ripple"></div>
		<i class="material-icons mdc-icon-button__icon">expand_less</i>
	</button>
</div>
