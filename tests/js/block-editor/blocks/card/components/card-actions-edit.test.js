/**
 * External dependencies
 */
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';

/**
 * Internal dependencies
 */
import CardActionsEdit from '../../../../../../assets/src/block-editor/blocks/card/components/card-actions-edit';

/**
 * Render the component.
 *
 * @param {Object} props - Component props.
 * @return {Function} A functional component.
 */
const setup = props => {
	return render( <CardActionsEdit { ...props } /> );
};

const baseProps = {
	primaryActionButtonLabel: 'Search',
	primaryActionButtonUrl: 'http://www.google.com',
	primaryActionButtonNewTab: true,
	primaryActionButtonNoFollow: true,
	secondaryActionButtonLabel: 'Download',
	secondaryActionButtonUrl: 'http://wordpress.org',
	secondaryActionButtonNewTab: true,
	secondaryActionButtonNoFollow: true,
	displaySecondaryActionButton: false,
	cardIndex: 0,
	setter: jest.fn(),
};

describe( 'CardActionsEdit', () => {
	it( 'matches snapshot when showing only the primary button', () => {
		const wrapper = setup( baseProps );
		expect( wrapper ).toMatchSnapshot();
	} );

	it( 'matches snapshot when showing the primary and secondary buttons', () => {
		const props = { ...baseProps };
		props.displaySecondaryActionButton = true;
		const wrapper = setup( baseProps );
		expect( wrapper ).toMatchSnapshot();
	} );
} );
