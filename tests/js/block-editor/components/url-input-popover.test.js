/**
 * External dependencies
 */
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';

/**
 * Internal dependencies
 */
import UrlInputPopover from '../../../../assets/src/block-editor/components/url-input-popover';
import CardImageEdit from '../../../../assets/src/block-editor/blocks/card/components/card-image-edit';

/**
 * Render the component.
 *
 * @param {Object} props - Component props.
 * @return {Function} A functional component.
 */
const setup = props => {
	return render( <UrlInputPopover { ...props } /> );
};

/**
 * Render the component in a shallow mode using enzyme.
 *
 * @param {Object} props - Component props.
 * @return {Function} A functional component.
 */
const setupShallow = props => {
	return shallow( <CardImageEdit { ...props } /> );
};

/**
 * Render the component in a mount mode using enzyme.
 *
 * @param {Object} props - Component props.
 * @return {Function} A functional component.
 */
const setupMount = props => {
	return mount( <CardImageEdit { ...props } /> );
};

const baseProps = {
	onFocusOutside: jest.fn(),
	value: 'http://test.loc',
	onChange: jest.fn(),
	newTab: true,
	noFollow: true,
	onChangeNewTab: jest.fn(),
	onChangeNoFollow: jest.fn(),
	onPopupClose: jest.fn(),
	disableSuggestions: true,
};

describe( 'UrlInputPopover', () => {
	it( 'matches snapshot', () => {
		const wrapper = setup( baseProps );
		expect( wrapper ).toMatchSnapshot();
	} );

	it( 'matches snapshot when missing some handlers', () => {
		const props = { ...baseProps };
		delete props.onChange;
		delete props.onChangeNewTab;
		delete props.onChangeNoFollow;
		const wrapper = setup( props );
		expect( wrapper ).toMatchSnapshot();
	} );
} );
