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
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import getConfig from '../../utils/get-config';

/**
 * A Higher Order Component used to set the default attribute of a block
 * from global customizer settings.
 *
 * @param {WPComponent} WrappedComponent The wrapped component.
 *
 * @return {WPComponent} Component with an attribute.id prop.
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
						materialDesignDefaults.blocks[ blockName ][ attributeName ]
				) {
					/**
					 * If the value is undefined, set it to customizer value.
					 */
					return materialDesignDefaults.blocks[ blockName ][ attributeName ];
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
 * A Higher Order Component used to set the default attribute of a
 * color control from global customizer settings.
 *
 * @param {WPComponent} WrappedComponent The wrapped component.
 *
 * @return {WPComponent} Component with an attribute.id prop.
 */
export const withGlobalColorDefault = createHigherOrderComponent(
	WrappedComponent => {
		return props => {
			const materialDesignDefaults = getConfig( 'defaults' );

			const { globalPropName, value } = props;

			// If empty set value to global default.
			const newValue = getColor( globalPropName, value );

			// Determine the color props to use.
			let primayColorProp = 'primary_color',
				secondaryColorProp = 'secondary_color';

			// If the control is a text color, use the text color props.
			if ( globalPropName.toLowerCase().includes( 'text' ) ) {
				primayColorProp = 'on_primary_color';
				secondaryColorProp = 'on_secondary_color';
			}

			let colors = [
				{
					color: materialDesignDefaults.colors[ primayColorProp ],
					name: __( 'Primary', 'material-design' ),
				},
				{
					color: materialDesignDefaults.colors[ secondaryColorProp ],
					name: __( 'Secondary', 'material-design' ),
				},
			];

			// If both primary and secondary colors at same, show only one color.
			if (
				materialDesignDefaults.colors[ primayColorProp ] ===
				materialDesignDefaults.colors[ secondaryColorProp ]
			) {
				colors = colors.slice( 0, 1 );
			}

			return (
				<WrappedComponent
					{ ...omit( props, [ 'globalPropName' ] ) }
					{ ...{
						value: newValue,
						colors,
					} }
				/>
			);
		};
	},
	'withGlobalColorDefault'
);

/**
 * Get the color value,
 * if not set, get it from global defaults.
 *
 * @param {string} globalPropName Global color prop name.
 * @param {string} value Value set for the color.
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
