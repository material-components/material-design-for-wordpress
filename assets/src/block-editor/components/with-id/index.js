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
