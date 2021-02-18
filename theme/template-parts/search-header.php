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
 * Search form partial inside header
 *
 * @package MaterialDesign
 */

$search_id = uniqid( 'search-' );
?>

<form class="search-form" action="<?php echo esc_url( home_url( '/' ) ); ?>" method="get" id="<?php echo esc_attr( $search_id ); ?>"">
	<div class="mdc-text-field mdc-text-field--fullwidth mdc-text-field--no-label">
		<div class="mdc-text-field__ripple"></div>
		<input
			class="mdc-text-field__input"
			placeholder="<?php esc_attr_e( 'Search the site', 'material-design-google' ); ?>"
			aria-label="<?php esc_attr_e( 'Search', 'material-design-google' ); ?>"
			type="search"
			name="s"
		>
	</div>
	<button class="mdc-button mdc-button--unelevated button__search" type="submit">
		<span class="mdc-button__ripple"></span>
		<span class="mdc-button__label"><?php esc_html_e( 'Search', 'material-design-google' ); ?></span>
	</button>
	<button class="material-icons mdc-top-app-bar__navigation-icon mdc-icon-button mdc-button--unelevated button__back" type="button" aria-label="<?php esc_attr_e( 'Exit search form', 'material-design-google' ); ?>">
		<span class="mdc-button__ripple"></span>
		<i class="material-icons mdc-button__icon" aria-hidden="true">close</i>
	</button>
</form>
