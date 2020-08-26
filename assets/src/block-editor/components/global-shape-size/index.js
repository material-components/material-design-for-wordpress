/**
 * WordPress dependencies
 */
import { RangeControl } from '@wordpress/components';

/**
 * Internal dependencies
 */
import { withGlobalBlockDefault } from '../with-global-default';
import { __ } from '@wordpress/i18n';
import './style.css';

/**
 * Global shape size control, if no value is set,
 * gets the shapesize value from customizer.
 *
 * @param {Object} props
 */
const GlobalShapeSize = props => {
	const onReset = event => {
		event.preventDefault();
		if ( props.onChange ) {
			props.onChange( undefined );
		}
	};

	return (
		<div className="components-global-shape-size">
			<RangeControl { ...props } />
			<button
				type="button"
				className="components-button global-shape-size-reset is-small"
				onClick={ onReset }
			>
				{ __( 'Reset', 'material-theme-builder' ) }
			</button>
		</div>
	);
};

/**
 * Helper HOC to add a `attributeName` prop to a component.
 *
 * @param {Function} WrappedComponent Component to be wrapped.
 * @param {string} attributeName Attribute name.
 */
const withAttributeName = ( WrappedComponent, attributeName ) => props => (
	<WrappedComponent { ...props } attributeName={ attributeName } />
);

export default withAttributeName(
	withGlobalBlockDefault( GlobalShapeSize ),
	'cornerRadius'
);
