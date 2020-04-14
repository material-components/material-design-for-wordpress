/**
 * External dependencies
 */
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';

/**
 * Internal dependencies
 */
import CardActions from '../../../../../../assets/src/block-editor/blocks/card/components/card-actions';

/**
 * Render the component.
 *
 * @param {Object} props - Component props.
 * @return {Function} A functional component.
 */
const setup = props => {
	return render( <CardActions { ...props } /> );
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
	isEditMode: false,
};

describe( 'CardActions', () => {
	it( 'matches snapshot when the edit mode if disabled and showing only the primary button', () => {
		const wrapper = setup( baseProps );
		expect( wrapper ).toMatchSnapshot();
	} );

	it( 'matches snapshot when the edit mode if disabled and showing the primary and secondary buttons', () => {
		const props = { ...baseProps };
		props.displaySecondaryActionButton = true;
		const wrapper = setup( props );
		expect( wrapper ).toMatchSnapshot();
	} );


	it( 'matches snapshot when the edit mode if enabled and showing only the primary button', () => {
		const props = { ...baseProps };
		props.isEditMode = true;
		const wrapper = setup( props );
		expect( wrapper ).toMatchSnapshot();
	} );

	it( 'matches snapshot when the edit mode if enabled and showing the primary and secondary buttons', () => {
		const props = { ...baseProps };
		props.displaySecondaryActionButton = true;
		props.isEditMode = true;
		const wrapper = setup( props );
		expect( wrapper ).toMatchSnapshot();
	} );
} );
