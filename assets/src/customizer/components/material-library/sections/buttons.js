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
import { RippleColor } from '../styles';
import IconButtonLink from '../common/icon-button-link';

const Buttons = ( { radius, iconStyle, primaryColor } ) => (
	<div>
		<h4 className="mdc-typography--headline4" style={ { margin: 0 } }>
			{ __( 'Buttons', 'material-design' ) }
		</h4>
		<IconButtonLink href="https://material.io/components/buttons"></IconButtonLink>
		<p>
			{ __(
				'Buttons allow users to take actions, and make choices, with a single tap.',
				'material-design'
			) }
		</p>
		<div className="mdc-button-wrap">
			<button className="mdc-button">
				<div
					className="mdc-button__ripple"
					style={ { borderRadius: `${ radius }px` } }
				></div>
				<span className="mdc-button__label">
					{ __( 'Text Button', 'material-design' ) }
				</span>
			</button>
			<button
				className="mdc-button mdc-button--outlined"
				style={ { borderRadius: `${ radius }px` } }
			>
				<RippleColor primaryColor={ primaryColor }>
					<div
						className="mdc-button__ripple"
						style={ { borderRadius: `${ radius }px` } }
					></div>
				</RippleColor>
				<span className="mdc-button__label">
					{ __( 'Outlined Button', 'material-design' ) }
				</span>
			</button>
			<button
				className="mdc-button mdc-button--raised"
				style={ { borderRadius: `${ radius }px` } }
			>
				<div className="mdc-button__ripple"></div>
				<span className="mdc-button__label">
					{ __( 'Raised Button', 'material-design' ) }
				</span>
			</button>
			<button
				className="mdc-button mdc-button--unelevated"
				style={ { borderRadius: `${ radius }px` } }
			>
				<div className="mdc-button__ripple"></div>
				<span className="mdc-button__label">
					{ __( 'Unelevated Button', 'material-design' ) }
				</span>
			</button>
			<button className="mdc-icon-button" style={ { marginTop: '55px' } }>
				<i className={ `${ iconStyle } mdc-icon-button__icon` }>
					account_circle
				</i>
			</button>
		</div>
	</div>
);

export default Buttons;
