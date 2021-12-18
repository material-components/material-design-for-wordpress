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
 * Search dynamic block markup.
 */
$search_label_id = uniqid( 'search-label-' );

?>
<form role="search" method="get" action="<?php esc_url( home_url( '/' ) ); ?>">
	<label class="mdc-text-field mdc-text-field--outlined mdc-text-field--with-trailing-icon">
		<input class="mdc-text-field__input" type="text" aria-labelledby="<?php echo esc_attr( $search_label_id ); ?>"
			name="s" value="<?php echo get_search_query(); ?>" />
		<i class="material-icons mdc-text-field__icon mdc-text-field__icon--trailing" tabindex="0"
			role="button">search</i>
		<div class="mdc-notched-outline mdc-notched-outline--upgraded mdc-notched-outline--notched">
			<div class="mdc-notched-outline__leading"></div>
			<div class="mdc-notched-outline__notch">
			<span class="mdc-floating-label mdc-floating-label--float-above"
					id="<?php esc_attr( $search_label_id ); ?>">
				<?php echo esc_html__( 'Search', 'material-design-google' ); ?>
			</span>
			</div>
			<div class="mdc-notched-outline__trailing"></div>
		</div>
	</label>
</form>
