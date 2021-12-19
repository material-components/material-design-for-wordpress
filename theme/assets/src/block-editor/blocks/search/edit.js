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
 * External dependencies
 */
/**
 * WordPress dependencies
 */
import { useBlockProps } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';

/**
 * Edit.
 *
 * @return {JSX.Element} Block edit.
 */
const Edit = () => {
	const search = __( 'Search', 'material-design-google' );
	return (
		<div { ...useBlockProps() }>
			{ /* eslint-disable-next-line jsx-a11y/label-has-for */ }
			<label className="mdc-text-field mdc-text-field--outlined mdc-text-field--with-trailing-icon">
				<input
					className="mdc-text-field__input"
					type="text"
					aria-labelledby={ search }
					name="s"
					value=""
					disabled={ true }
				/>
				<i
					className="material-icons mdc-text-field__icon mdc-text-field__icon--trailing"
					role="button"
				>
					search
				</i>
				<div className="mdc-notched-outline mdc-notched-outline--upgraded mdc-notched-outline--notched">
					<div className="mdc-notched-outline__leading"></div>
					<div className="mdc-notched-outline__notch">
						<span className="mdc-floating-label mdc-floating-label--float-above">
							{ search }
						</span>
					</div>
					<div className="mdc-notched-outline__trailing"></div>
				</div>
			</label>
		</div>
	);
};

export default Edit;
