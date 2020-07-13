/* global mtbBlockDefaults */

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
export const withGlobalDefaults = createHigherOrderComponent(
	WrappedComponent => {
		return props => {
			const { attributes, name } = props;

			// Set attribute values to global defaults.
			const newAttributes = useMemo( () => {
				const defaults = {};

				if (
					name &&
					'object' === typeof mtbBlockDefaults &&
					mtbBlockDefaults.hasOwnProperty( name )
				) {
					Object.keys( mtbBlockDefaults[ name ] ).forEach( attributeName => {
						/**
						 * If the attribute is undefined, set it to customizer value.
						 */
						if ( 'undefined' === typeof attributes[ attributeName ] ) {
							defaults[ attributeName ] =
								mtbBlockDefaults[ name ][ attributeName ];
						}
					} );

					return { ...attributes, ...defaults };
				}
			}, [ name, attributes ] );

			return (
				<WrappedComponent { ...props } { ...{ attributes: newAttributes } } />
			);
		};
	},
	'withGlobalDefaults'
);
