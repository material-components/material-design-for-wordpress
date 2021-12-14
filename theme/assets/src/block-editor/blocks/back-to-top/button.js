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
 * Back to top button.
 *
 * @param {Object} props
 * @param {Object} props.props props to button html element.
 * @return {JSX.Element} Block edit.
 */
const Button = ( { props: p } ) => {
	const props = { ...p };
	props.className = classname( props.className, 'back-to-top mdc-button' );
	return (
		<button
			{ ...props }
			aria-label={ __( 'Back to top', 'material-design-google' ) }
			id={ 'back-to-top' }
		>
			<div className="mdc-button__ripple"></div>
			<i className="material-icons mdc-icon-button__icon">expand_less</i>
		</button>
	);
};

export default Button;
