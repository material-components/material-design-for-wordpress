/**
 * External dependencies
 */
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';

/**
 * Internal dependencies
 */
import Edit from '../../../../../assets/src/block-editor/blocks/buttons/edit';

// Mock the <InnerBlocks> component only, so that the other components in this package behave as usual.
jest.mock( '@wordpress/block-editor', () => {
	const original = require.requireActual( '@wordpress/block-editor' );

	return {
		...original,
		InnerBlocks: () => {
			const innerBlocks = [
				{
					id: 'button-1',
					name: 'material/button',
				},
			];

			return (
				<>
					{ innerBlocks.map( block => (
						<div key={ block.id }> { JSON.stringify( block ) } </div>
					) ) }
				</>
			);
		},
	};
} );

/**
 * Render the component.
 *
 * @param {Object} props - Component props.
 * @return {Function} A functional component.
 */
const setup = props => {
	return render( <Edit { ...props } /> );
};

describe( 'blocks: material/buttons: Edit', () => {
	afterEach( () => {
		jest.clearAllMocks();
	} );

	it( 'matches snapshot', () => {
		const wrapper = setup();
		expect( wrapper ).toMatchSnapshot();
	} );
} );
