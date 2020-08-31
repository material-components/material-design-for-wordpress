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
import { getConfig } from '../../helpers';

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
			const mtbDefaults = getConfig( 'defaults' );
			const { blockName, attributeName, value } = props;

			// Set value to global defaults.
			const newValue = useMemo( () => {
				if (
					blockName &&
					attributeName &&
					'undefined' === typeof value &&
					'object' === typeof mtbDefaults &&
					'object' === typeof mtbDefaults.blocks &&
					mtbDefaults.blocks.hasOwnProperty( blockName ) &&
					'undefined' !== mtbDefaults.blocks[ blockName ][ attributeName ]
				) {
					/**
					 * If the value is undefined, set it to customizer value.
					 */
					return mtbDefaults.blocks[ blockName ][ attributeName ];
				}

				return value;
			}, [ blockName, attributeName, value, mtbDefaults ] );

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
			const mtbDefaults = getConfig( 'defaults' );

			const { globalPropName, value } = props;

			// If empty set value to global default.
			const newValue = getColor( globalPropName, value );

			// Determine the color props to use.
			let primayColorProp = 'primary_color',
				secondaryColorProp = 'secondary_color';

			// If the control is a text color, use the text color props.
			if ( globalPropName.toLowerCase().includes( 'text' ) ) {
				primayColorProp = 'primary_text_color';
				secondaryColorProp = 'secondary_text_color';
			}

			let colors = [
				{
					color: mtbDefaults.colors[ primayColorProp ],
					name: __( 'Primary', 'material-theme-builder' ),
				},
				{
					color: mtbDefaults.colors[ secondaryColorProp ],
					name: __( 'Secondary', 'material-theme-builder' ),
				},
			];

			// If both primary and secondary colors at same, show only one color.
			if (
				mtbDefaults.colors[ primayColorProp ] ===
				mtbDefaults.colors[ secondaryColorProp ]
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
	useMemo( () => { // eslint-disable-line
		const mtbDefaults = getConfig( 'defaults' );

		if (
			globalPropName &&
			'undefined' === typeof value &&
			'object' === typeof mtbDefaults &&
			'object' === typeof mtbDefaults.colors &&
			'undefined' !== mtbDefaults.colors[ globalPropName ]
		) {
			/**
			 * If the value is undefined, return the global customizer value.
			 */
			return mtbDefaults.colors[ globalPropName ];
		}

		return value;
	}, [ globalPropName, value ] );
