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

const Checkboxes = () => (
	<div>
		<h4 className="mdc-typography--headline4" style={ { margin: 0 } }>
			{ __( 'Checkboxes', 'material-design' ) }
		</h4>
		<IconButtonLink href="https://material.io/develop/web/components/input-controls/checkboxes"></IconButtonLink>
		<p>
			{ __(
				'Checkboxes allow the user to select one or more items from a set.',
				'material-design'
			) }
		</p>
		<div className="mdc-checkbox">
			<input type="checkbox" className="mdc-checkbox__native-control" />
			<div className="mdc-checkbox__background">
				<svg className="mdc-checkbox__checkmark" viewBox="0 0 24 24">
					<path
						className="mdc-checkbox__checkmark-path"
						fill="none"
						d="M1.73,12.91 8.1,19.28 22.79,4.59"
					/>
				</svg>
				<div className="mdc-checkbox__mixedmark"></div>
			</div>
			<div className="mdc-checkbox__ripple"></div>
		</div>
		<div className="mdc-checkbox">
			<input type="checkbox" className="mdc-checkbox__native-control" />
			<div className="mdc-checkbox__background">
				<svg className="mdc-checkbox__checkmark" viewBox="0 0 24 24">
					<path
						className="mdc-checkbox__checkmark-path"
						fill="none"
						d="M1.73,12.91 8.1,19.28 22.79,4.59"
					/>
				</svg>
				<div className="mdc-checkbox__mixedmark"></div>
			</div>
			<div className="mdc-checkbox__ripple"></div>
		</div>
		<div className="mdc-checkbox">
			<input type="checkbox" className="mdc-checkbox__native-control" />
			<div className="mdc-checkbox__background">
				<svg className="mdc-checkbox__checkmark" viewBox="0 0 24 24">
					<path
						className="mdc-checkbox__checkmark-path"
						fill="none"
						d="M1.73,12.91 8.1,19.28 22.79,4.59"
					/>
				</svg>
				<div className="mdc-checkbox__mixedmark"></div>
			</div>
			<div className="mdc-checkbox__ripple"></div>
		</div>
		<div className="mdc-checkbox">
			<input type="checkbox" className="mdc-checkbox__native-control" />
			<div className="mdc-checkbox__background">
				<svg className="mdc-checkbox__checkmark" viewBox="0 0 24 24">
					<path
						className="mdc-checkbox__checkmark-path"
						fill="none"
						d="M1.73,12.91 8.1,19.28 22.79,4.59"
					/>
				</svg>
				<div className="mdc-checkbox__mixedmark"></div>
			</div>
			<div className="mdc-checkbox__ripple"></div>
		</div>
	</div>
);

export default Checkboxes;
