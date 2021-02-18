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
 * Search form partial for archive, 404 pages
 *
 * @package MaterialDesign
 */

$search_id = uniqid( 'search-' );
?>

<form class="search-form" action="<?php echo esc_url( home_url( '/' ) ); ?>" method="get" id="<?php echo esc_attr( $search_id ); ?>">
	<div class="mdc-text-field mdc-text-field--outlined mdc-text-field--with-trailing-icon">
		<i class="material-icons mdc-text-field__icon mdc-text-field__icon--trailing" tabindex="0">search</i>
		<input class="mdc-text-field__input" id="text-field-hero-input" name="s">
		<div class="mdc-notched-outline">
			<div class="mdc-notched-outline__leading"></div>
			<div class="mdc-notched-outline__notch">
				<label for="text-field-hero-input" class="mdc-floating-label"><?php esc_html_e( 'Search', 'material-design-google' ); ?></label>
			</div>
			<div class="mdc-notched-outline__trailing"></div>
		</div>
	</div>

	<button class="mdc-button mdc-button--outlined" type="submit">
		<i class="material-icons mdc-button__icon">search</i>
		<span class="mdc-button__ripple"></span> <?php esc_html_e( 'Search', 'material-design-google' ); ?>
	</button>
</form>
