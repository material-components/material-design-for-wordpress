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
import { RangeControl } from '@wordpress/components';

/**
 * Internal dependencies
 */
import { withGlobalBlockDefault } from '../with-global-default';
import { __ } from '@wordpress/i18n';
import './style.css';

/**
 * Global shape size control, if no value is set,
 * gets the shapesize value from customizer.
 *
 * @param {Object} props
 */
const GlobalShapeSize = props => {
	const onReset = event => {
		event.preventDefault();
		if ( props.onChange ) {
			props.onChange( undefined );
		}
	};

	return (
		<div className="components-base-control components-global-shape-size">
			<RangeControl { ...props } />
			<button
				type="button"
				className="components-button global-shape-size-reset is-small"
				onClick={ onReset }
			>
				{ __( 'Reset', 'material-design' ) }
			</button>
		</div>
	);
};

/**
 * Helper HOC to add a `attributeName` prop to a component.
 *
 * @param {Function} WrappedComponent Component to be wrapped.
 * @param {string} attributeName Attribute name.
 */
const withAttributeName = ( WrappedComponent, attributeName ) => props => (
	<WrappedComponent { ...props } attributeName={ attributeName } />
);

export default withAttributeName(
	withGlobalBlockDefault( GlobalShapeSize ),
	'cornerRadius'
);
