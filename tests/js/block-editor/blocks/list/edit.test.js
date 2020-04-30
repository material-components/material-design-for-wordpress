/**
 * External dependencies
 */
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';

/**
 * Internal dependencies
 */
import Edit from '../../../../../assets/src/block-editor/blocks/list/edit';

// Mock the <InspectorControls>  and <InnerBlocks> components only, so that the other components in this package behave as usual.
jest.mock( '@wordpress/block-editor', () => {
	const original = require.requireActual( '@wordpress/block-editor' );
	return {
		...original,
		InspectorControls: ( { children } ) => children,
		InnerBlocks: () => {
			const innerBlocks = [
				{
					clientId: 'LIST-ITEM-1',
					name: 'material/list-item',
					attributes: {
						url: 'http://example.com',
						primaryText: 'List Item #1',
						secondaryText: 'List Item #1 secondary text',
					},
				},
				{
					clientId: 'LIST-ITEM-2',
					name: 'material/list-item',
					attributes: {
						url: 'http://example.com/item-2',
						primaryText: 'List Item #2',
						secondaryText: 'List Item #2 secondary text',
					},
				},
			];

			return innerBlocks.map( block => (
				<div key={ block.clientId }> { JSON.stringify( block ) } </div>
			) );
		},
	};
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
	clientId: 'LIST',
	attributes: {
		style: 'basic',
		leadingIconsEnabled: false,
		trailingIconsEnabled: false,
		innerBlocks: [],
	},
};

describe( 'Edit', () => {
	it( 'matches snapshot with basic style', () => {
		const wrapper = setup( { ...baseProps } );
		expect( wrapper ).toMatchSnapshot();
	} );

	it( 'matches snapshot with two-line style', () => {
		const wrapper = setup( {
			...baseProps,
			attributes: { ...baseProps.attributes, style: 'two-line' },
		} );
		expect( wrapper ).toMatchSnapshot();
	} );
} );
