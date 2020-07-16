/**
 * WordPress dependencies
 */
import { RangeControl } from '@wordpress/components';

/**
 * Internal dependencies
 */
import { withGlobalDefault } from '../with-global-default';

const withAttributeName = ( WrappedComponent, attributeName ) => props => (
	<WrappedComponent { ...props } attributeName={ attributeName } />
);

const GlobalShapeSize = props => {
	return <RangeControl { ...props } />;
};

export default withAttributeName(
	withGlobalDefault( GlobalShapeSize ),
	'cornerRadius'
);
