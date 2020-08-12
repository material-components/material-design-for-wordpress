/* global mtbBlockDefaults */

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
 * A Higher Order Component used to set the default attribute of a block
 * from global customizer settings.
 *
 * @param {WPComponent} WrappedComponent The wrapped component.
 *
 * @return {WPComponent} Component with an attribute.id prop.
 */
export const withGlobalDefault = createHigherOrderComponent(
	WrappedComponent => {
		return props => {
			const { blockName, attributeName, value } = props;

			// Set value to global defaults.
			const newValue = useMemo( () => {
				if (
					blockName &&
					attributeName &&
					'undefined' === typeof value &&
					'object' === typeof mtbBlockDefaults &&
					mtbBlockDefaults.hasOwnProperty( blockName ) &&
					'undefined' !== mtbBlockDefaults[ blockName ][ attributeName ]
				) {
					/**
					 * If the value is undefined, set it to customizer value.
					 */
					return mtbBlockDefaults[ blockName ][ attributeName ];
				}

				return value;
			}, [ blockName, attributeName, value ] );

			return (
				<WrappedComponent
					{ ...omit( props, [ 'blockName', 'attributeName' ] ) }
					{ ...{ value: newValue } }
				/>
			);
		};
	},
	'withGlobalDefault'
);
