/**
 * External dependencies
 */
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';

/**
 * Internal dependencies
 */
import CardActionButton from '../../../../../../assets/src/block-editor/blocks/card/components/card-action-button';

/**
 * Render the component.
 *
 * @param {Object} props - Component props.
 * @return {Function} A functional component.
 */
const setup = props => {
	return render( <CardActionButton { ...props } /> );
};

const baseProps = {
	label: 'Test Button',
	onChangeLabel: jest.fn(),
	url: 'http://www.google.com',
	onChangeUrl: jest.fn(),
	newTab: true,
	onChangeNewTab: jest.fn(),
	noFollow: true,
	onChangeNoFollow: jest.fn(),
	disableSuggestions: false,
	onPopupClose: jest.fn(),
	onPopupFocusOutside: jest.fn(),
	isFocused: false,
	isEditMode: false,
};

describe( 'CardActionButton', () => {
	it( 'matches snapshot when the edit mode if disabled but a url is provided as well as the newTab and noFollow settings are enabled', () => {
		const wrapper = setup( baseProps );
		expect( wrapper ).toMatchSnapshot();
	} );

	it( 'matches snapshot when the edit mode if disabled but now url is provided', () => {
		const props = { ...baseProps };
		props.url = '';
		const wrapper = setup( props );
		expect( wrapper ).toMatchSnapshot();
	} );

	it( 'matches snapshot when the edit mode if enabled', () => {
		const props = { ...baseProps };
		props.isEditMode = true;
		const wrapper = setup( props );
		expect( wrapper ).toMatchSnapshot();
	} );
} );
