/**
 * External dependencies
 */
import '@testing-library/jest-dom/extend-expect';
import { render, cleanup } from '@testing-library/react';

/**
 * Internal dependencies
 */
import Edit from '../../../../../assets/src/block-editor/blocks/contact-form/edit';

// Mock the <InspectorControls> and <InnerBlocks> components only, so that the other components in this package behave as usual.
jest.mock( '@wordpress/block-editor', () => {
	const original = require.requireActual( '@wordpress/block-editor' );

	return {
		...original,
		InspectorControls: ( { children } ) => children,
		InnerBlocks: () => {
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

const baseProps = {
	attributes: {
		emailTo: 'recipient@test.loc',
		subject: 'Test contact form',
		confirmationMessage: 'The form was submitted',
		outlined: true,
		fullWidth: true,
	},
	className: 'test-class',
	setAttributes: jest.fn(),
};

describe( 'blocks: material/contact-form: Edit', () => {
	beforeAll( () => {
		global.mtb = {
			recaptcha_site_key: 'test-key',
			recaptcha_client_secret: 'test-secret',
		};
	} );

	afterEach( () => {
		jest.clearAllMocks();
		cleanup();
	} );

	it( 'matches snapshot', () => {
		const wrapper = setup( baseProps );
		expect( wrapper ).toMatchSnapshot();
	} );
} );
