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
import { __ } from '@wordpress/i18n';
import classname from 'classnames';

/**
 * Internal dependencies
 */
import { icon as Icon } from './icon';

/**
 * Close Drawer button.
 *
 * @param {Object} props
 * @param {Object} props.props props to button html element.
 * @return {JSX.Element} Block edit.
 */
const Button = ( { props } ) => {
	props.className = classname(
		props.className,
		'mdc-icon-button mdc-drawer__close'
	);

	return (
		<button type="button" className={ props.className }>
			<span className="mdc-button__ripple"></span>

			{ props.useSvg ? (
				<Icon />
			) : (
				<i
					className="material-icons-outlined material-icons mdc-button__icon"
					aria-hidden="true"
				>
					close
				</i>
			) }

			<span className="screen-reader-text">
				{ __( 'Close drawer', 'material-design-google' ) }
			</span>
		</button>
	);
};

export default Button;