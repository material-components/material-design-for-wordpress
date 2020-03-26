/**
 * External dependencies
 */
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';
import { shallow } from 'enzyme';

/**
 * Internal dependencies
 */
import HandPickedPostsBlockControls from '../../../../../../assets/src/block-editor/blocks/hand-picked-posts/components/block-controls';

jest.mock( '@wordpress/block-editor', () => {
	const original = require.requireActual( '@wordpress/block-editor' );
	return {
		...original,
		BlockControls: ( { children } ) => children,
	};
} );

/**
 * Shallow render the component.
 *
 * @param {Object} props - Component props.
 * @return {Function} A functional component.
 */
const setup = props => {
	return shallow( <HandPickedPostsBlockControls { ...props } /> );
};

/**
 * Full render the component.
 *
 * @param {Object} props - Component props.
 * @return {Function} A functional component.
 */
const fullRender = props => {
	return render( <HandPickedPostsBlockControls { ...props } /> );
};

describe( 'HandPickedPostsBlockControls', () => {
	beforeAll( () => {
		jest.clearAllMocks();
	} );

	it( 'matches snapshot when the edit mode is true', () => {
		const wrapper = setup( {
			attributes: { editMode: true },
		} );
		expect( wrapper ).toMatchSnapshot();
	} );

	it( 'matches snapshot when the edit mode is false', () => {
		const wrapper = setup( {
			attributes: { editMode: false },
		} );
		expect( wrapper ).toMatchSnapshot();
	} );

	it( 'invokes setAttributes with editMode', () => {
		const props = {
			attributes: { editMode: false },
			setAttributes: jest.fn(),
		};
		const { getByLabelText } = fullRender( props );

		fireEvent.click( getByLabelText( 'Edit' ) );
		expect( props.setAttributes.mock.calls[ 0 ][ 0 ].editMode ).toStrictEqual(
			true
		);
	} );
} );
