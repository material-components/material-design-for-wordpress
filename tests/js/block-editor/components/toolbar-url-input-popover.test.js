/**
 * External dependencies
 */
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';

/**
 * Internal dependencies
 */
import ToolbarUrlInputPopover from '../../../../assets/src/block-editor/components/toolbar-url-input-popover';

/**
 * Render the component.
 *
 * @param {Object} props - Component props.
 * @return {Function} A functional component.
 */
const setup = props => {
	return render( <ToolbarUrlInputPopover { ...props } /> );
};

const baseProps = {
	isSelected: true,
	url: 'http://example.com',
	setURL: jest.fn(),
	opensInNewTab: jest.fn(),
	onChangeNewTab: jest.fn(),
};

describe( 'ToolbarUrlInputPopover', () => {
	afterEach( () => {
		jest.clearAllMocks();
	} );

	it( 'matches snapshot', () => {
		const wrapper = setup( baseProps );
		expect( wrapper ).toMatchSnapshot();
	} );
} );
