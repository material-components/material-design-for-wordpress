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

/**
 * Internal dependencies
 */
import IconButtonLink from '../common/icon-button-link';

const Fields = ( { radius } ) => (
	<div>
		<h4 className="mdc-typography--headline4" style={ { margin: 0 } }>
			{ __( 'Text fields', 'material-design' ) }
		</h4>
		<IconButtonLink href="https://material.io/components/text-fields"></IconButtonLink>
		<p>
			{ __( 'Text fields let users enter and edit text.', 'material-design' ) }
		</p>
		<div style={ { display: 'flex' } }>
			<div
				className="mdc-text-field mdc-text-field--with-leading-icon"
				style={ {
					borderTopLeftRadius: `${ radius }px`,
					borderTopRightRadius: `${ radius }px`,
				} }
			>
				<i className="material-icons mdc-text-field__icon mdc-text-field__icon--leading">
					account_circle
				</i>
				<input className="mdc-text-field__input" id="text-field-hero-input" />
				<div className="mdc-line-ripple"></div>
				<label htmlFor="text-field-hero-input" className="mdc-floating-label">
					{ __( 'First name', 'material-design' ) }
				</label>
			</div>

			<div
				className="mdc-text-field mdc-text-field--outlined mdc-text-field--with-leading-icon mdc-text-field--with-trailing-icon"
				style={ { marginLeft: '10px' } }
			>
				<i className="material-icons mdc-text-field__icon mdc-text-field__icon--leading">
					account_circle
				</i>
				<i className="material-icons mdc-text-field__icon mdc-text-field__icon--trailing">
					close
				</i>
				<input className="mdc-text-field__input" type="text" />
				<div className="mdc-notched-outline">
					<div
						className="mdc-notched-outline__leading"
						style={ {
							borderRadius: `${ radius }px 0 0 ${ radius }px`,
							minWidth: `${ radius }px`,
						} }
					></div>
					<div className="mdc-notched-outline__notch">
						<label htmlFor="outlined-textfield" className="mdc-floating-label">
							{ __( 'Last name', 'material-design' ) }
						</label>
					</div>
					<div
						className="mdc-notched-outline__trailing"
						style={ {
							borderRadius: `0 ${ radius }px ${ radius }px 0`,
							minWidth: `${ radius }px`,
						} }
					></div>
				</div>
			</div>
		</div>
	</div>
);

export default Fields;
