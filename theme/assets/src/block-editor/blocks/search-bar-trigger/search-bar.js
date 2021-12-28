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
 */

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

const SearchBar = () => {
	return (
		<>
			<div className="mdc-text-field mdc-text-field--fullwidth mdc-text-field--no-label">
				<div className="mdc-text-field__ripple"></div>
				<input
					className="mdc-text-field__input"
					placeholder={ __(
						'Search the site',
						'material-design-google'
					) }
					aria-label={ __( 'Search', 'material-design-google' ) }
					type="search"
					name="s"
				/>
			</div>

			<button
				className="mdc-button mdc-button--unelevated button__search"
				type="button"
			>
				<span className="mdc-button__ripple"></span>
				<span className="mdc-button__label">
					{ __( 'Search', 'material-design-google' ) }
				</span>
			</button>
		</>
	);
};

export default SearchBar;