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

const Chips = ( { radius } ) => (
	<div>
		<h4 className="mdc-typography--headline4" style={ { margin: 0 } }>
			{ __( 'Chips', 'material-design' ) }
		</h4>
		<IconButtonLink href="https://material.io/components/chips"></IconButtonLink>
		<p>
			{ __(
				'Chips are compact elements that represent an input, attribute, or action.',
				'material-design'
			) }
		</p>
		<div className="mdc-chip-set" role="grid">
			<div
				className="mdc-chip"
				role="row"
				style={ { borderRadius: `${ radius }px` } }
			>
				<div className="mdc-chip__ripple"></div>
				<span role="gridcell">
					<span role="button" tabIndex="0" className="mdc-chip__primary-action">
						<span className="mdc-chip__text">
							{ __( 'Chip One', 'material-design' ) }
						</span>
					</span>
				</span>
			</div>
			<div
				className="mdc-chip"
				role="row"
				style={ { borderRadius: `${ radius }px` } }
			>
				<div className="mdc-chip__ripple"></div>
				<span role="gridcell">
					<span
						role="button"
						tabIndex="-1"
						className="mdc-chip__primary-action"
					>
						<span className="mdc-chip__text">
							{ __( 'Chip Two', 'material-design' ) }
						</span>
					</span>
				</span>
			</div>
		</div>
	</div>
);

export default Chips;
