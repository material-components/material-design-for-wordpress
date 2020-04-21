/**
 * WordPress dependencies
 */
import { createHigherOrderComponent, useInstanceId } from '@wordpress/compose';
import { useEffect } from '@wordpress/element';

/**
 * Maybe use material data table edit component.
 *
 * @param {WPElement} element    Block save result.
 * @param {WPBlock}   blockType  Block type definition.
 * @param {Object}    attributes Block attributes.
 */
export const withId = createHigherOrderComponent( Component => {
	return props => {
		const {
			attributes: { id },
			setAttributes,
		} = props;
		const instanceId = useInstanceId( Component );

		// Set block id if it's empty.
		useEffect( () => {
			if ( ! id ) {
				const name = ( props.name || Component.displayName ).replace(
					/\//g,
					'-'
				);
				setAttributes( {
					id: `block-${ name }-${ instanceId }`,
				} );
			}
		}, [ id, instanceId, props.name, setAttributes ] );

		return <Component { ...props } id={ id } />;
	};
}, 'withId' );
