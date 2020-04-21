/* global mtbBlockDefaults */
/**
 * WordPress dependencies
 */
import { createHigherOrderComponent } from '@wordpress/compose';
import { useEffect, useState } from '@wordpress/element';

/**
 * Maybe use material data table edit component.
 *
 * @param {WPElement} element    Block save result.
 * @param {WPBlock}   blockType  Block type definition.
 * @param {Object}    attributes Block attributes.
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
						 * If the attribute is not set, set it to customizer value.
						 */
						if (
							mtbBlockDefaults[ name ][ attributeName ] &&
							! attributes[ attributeName ]
						) {
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
