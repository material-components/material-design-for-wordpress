/**
 * External dependencies
 */
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';

/**
 * Internal dependencies
 */
import Save from '../../../../../assets/src/block-editor/blocks/contact-form/save';

// Mock the <InnerBlocks> component only, so that the other components in this package behave as usual.
jest.mock( '@wordpress/block-editor', () => {
	const original = require.requireActual( '@wordpress/block-editor' );

	return {
		...original,
		InnerBlocks: {
			Content: () => {
				const innerBlocks = [
					{
						id: 'name-input-1',
						name: 'material/name-input-field',
					},
					{
						id: 'email-input-1',
						name: 'material/email-input-field',
					},
					{
						id: 'website-input-1',
						name: 'material/website-input-field',
					},
					{
						id: 'message-input-1',
						name: 'material/message-input-field',
					},
					{
						id: 'button-1',
						name: 'material/button',
						attributes: {
							label: 'Submit',
							style: 'unelevated',
							isSubmit: true,
						},
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
 * @param {Object} props - Component props.
 * @return {Function} A functional component.
 */
const setup = props => {
	return render( <Save { ...props } /> );
};

const baseProps = {
	className: 'test-class',
};

describe( 'blocks: material/contact-form: Save', () => {
	it( 'matches snapshot', () => {
		const wrapper = setup( baseProps );
		expect( wrapper ).toMatchSnapshot();
	} );
} );
