/**
 * Copyright 2022 Google LLC
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
 * Search bar button.
 *
 * @param {Object} props
 * @param {Object} props.props props to button html element.
 * @return {JSX.Element} Block edit.
 */
const Button = ( { props: p } ) => {
	const props = { ...p };
	props.className = classname(
		props.className,
		'material-icons mdc-top-app-bar__navigation-icon mdc-icon-button search__button mdc-ripple-upgraded--unbounded mdc-ripple-upgraded'
	);

	return (
		<button
			{ ...props }
			aria-label={ __( 'Search', 'material-design-google' ) }
		>
			<span className="mdc-button__ripple"></span>
			search
		</button>
	);
};

export default Button;
