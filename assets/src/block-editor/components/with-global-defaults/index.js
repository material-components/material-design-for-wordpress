/* global mtbBlockDefaults */
/**
 * WordPress dependencies
 */
import { createHigherOrderComponent } from '@wordpress/compose';
import { useEffect, useState } from '@wordpress/element';

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
			const { attributes, setAttributes, name } = props;
			const [ areDefaultsSet, updateAreDefaultsSet ] = useState( false );

			// Set attribute values to global defaults.
			useEffect( () => {
				const defaults = {};

				if (
					! areDefaultsSet &&
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

					if ( 0 < Object.keys( defaults ).length ) {
						setAttributes( defaults );
					}

					updateAreDefaultsSet( true );
				}
			}, [
				name,
				attributes,
				setAttributes,
				areDefaultsSet,
				updateAreDefaultsSet,
			] );

			return <WrappedComponent { ...props } />;
		};
	},
	'withGlobalDefaults'
);
