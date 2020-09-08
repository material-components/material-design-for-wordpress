/**
 * External dependencies
 */
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';

/**
 * Internal dependencies
 */
import Save from '../../../../../assets/src/block-editor/blocks/buttons/save';

// Mock the <InnerBlocks> component only, so that the other components in this package behave as usual.
jest.mock( '@wordpress/block-editor', () => {
	const original = require.requireActual( '@wordpress/block-editor' );

	return {
		...original,
		InnerBlocks: {
			Content: () => {
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
		},
	};
} );

/**
 * Render the component.
 *
 * @return {Function} A functional component.
 */
const setup = () => {
	return render( <Save /> );
};

describe( 'blocks: material/buttons: Save', () => {
	it( 'matches snapshot', () => {
		const wrapper = setup();
		expect( wrapper ).toMatchSnapshot();
	} );
} );
