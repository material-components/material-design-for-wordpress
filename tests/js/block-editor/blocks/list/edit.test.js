/**
 * External dependencies
 */
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import { registerStore } from '@wordpress/data';

/**
 * Internal dependencies
 */
import Edit from '../../../../../assets/src/block-editor/blocks/list/edit';

// Mock wp.data.
jest.mock( '@wordpress/data', () => ( {
	select: jest.fn( store => {
		switch ( store ) {
			case 'core/block-editor':
				return {
					getBlock: () => ( {
						clientId: 'LIST_BLOCK',
						name: 'material/list',
						isValid: true,
						originalContent: '',
						attributes: '',
						innerBlocks: [],
					} ),
				};
		}
	} ),
} ) );

// Mock the <InspectorControls> component only, so that the other components in this package behave as usual.
jest.mock( '@wordpress/block-editor', () => {
	const original = require.requireActual( '@wordpress/block-editor' );
	return {
		...original,
		InspectorControls: ( { children } ) => children,
	};
} );

registerStore( 'core', {
	reducer: jest.fn(),
	selectors: { getEntityRecords: () => {} },
} );

/**
 * Shallow render the component.
 *
 * @param {Object} props - Component props.
 * @return {Function} A functional component.
 */
const setup = props => {
	return render( <Edit { ...props } /> );
};

const baseProps = {
	attributes: {
		style: 'basic',
		leadingIconsEnabled: false,
		trailingIconsEnabled: false,
	},
};

describe( 'Edit', () => {
	it( 'matches snapshot with basic style', () => {
		const wrapper = setup( { ...baseProps } );
		expect( wrapper ).toMatchSnapshot();
	} );
} );
