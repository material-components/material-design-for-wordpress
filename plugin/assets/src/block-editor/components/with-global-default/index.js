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
import { omit } from 'lodash';

/**
 * WordPress dependencies
 */
import { createHigherOrderComponent } from '@wordpress/compose';
import { useMemo } from '@wordpress/element';

/**
 * Internal dependencies
 */
import getConfig from '../../utils/get-config';

/**
 * A Higher Order Component used to set the default attribute of a block
 * from global customizer settings.
 *
 * @param {JSX.Element} WrappedComponent The wrapped component.
 *
 * @return {JSX.Element} Component with an attribute.id prop.
 */
export const withGlobalBlockDefault = createHigherOrderComponent(
	WrappedComponent => {
		return props => {
			const materialDesignDefaults = getConfig( 'defaults' );
			const { blockName, attributeName, value } = props;

			// Set value to global defaults.
			const newValue = useMemo( () => {
				if (
					blockName &&
					attributeName &&
					'undefined' === typeof value &&
					'object' === typeof materialDesignDefaults &&
					'object' === typeof materialDesignDefaults.blocks &&
					materialDesignDefaults.blocks.hasOwnProperty( blockName ) &&
					'undefined' !==
						materialDesignDefaults.blocks[ blockName ][
							attributeName
						]
				) {
					/**
					 * If the value is undefined, set it to customizer value.
					 */
					return materialDesignDefaults.blocks[ blockName ][
						attributeName
					];
				}

				return value;
			}, [ blockName, attributeName, value, materialDesignDefaults ] );

			return (
				<WrappedComponent
					{ ...omit( props, [ 'blockName', 'attributeName' ] ) }
					{ ...{ value: newValue } }
				/>
			);
		};
	},
	'withGlobalBlockDefault'
);

/**
 * Get the color value,
 * if not set, get it from global defaults.
 *
 * @param {string} globalPropName Global color prop name.
 * @param {string} value          Value set for the color.
 *
 * @return {string} Color value.
 */
export const getColor = ( globalPropName, value ) =>
	useMemo( () => {// eslint-disable-line
		const materialDesignDefaults = getConfig( 'defaults' );

		if (
			globalPropName &&
			'undefined' === typeof value &&
			'object' === typeof materialDesignDefaults &&
			'object' === typeof materialDesignDefaults.colors &&
			'undefined' !== materialDesignDefaults.colors[ globalPropName ]
		) {
			/**
			 * If the value is undefined, return the global customizer value.
			 */
			return materialDesignDefaults.colors[ globalPropName ];
		}

		return value;
	}, [ globalPropName, value ] );
