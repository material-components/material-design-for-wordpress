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
import { createHigherOrderComponent, withInstanceId } from '@wordpress/compose';
import { useEffect } from '@wordpress/element';

/**
 * A Higher Order Component used to be set a unique `id` property based on component.
 *
 * @param {WPComponent} WrappedComponent The wrapped component.
 *
 * @return {WPComponent} Component with an attribute.id prop.
 */
export const withId = createHigherOrderComponent( WrappedComponent => {
	return withInstanceId( props => {
		const {
			attributes: { id },
			setAttributes,
			instanceId,
		} = props;

		// Set component id if it's empty.
		useEffect( () => {
			if ( ! id ) {
				const name = (
					props.name ||
					WrappedComponent.displayName ||
					WrappedComponent.name
				).replace( /\//g, '-' );
				setAttributes( {
					id: `block-${ name }-${ instanceId }`,
				} );
			}
		}, [ id, instanceId, props.name, setAttributes ] );

		return <WrappedComponent { ...props } id={ id } />;
	} );
}, 'withId' );
