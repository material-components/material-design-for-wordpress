/**
 * External dependencies
 */
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import { cloneDeep } from 'lodash';

/**
 * Internal dependencies
 */
import Save from '../../../../../assets/src/block-editor/blocks/card/save';

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
	attributes: {
		cardLayout: 'vertical',
		contentLayout: 'text-under-media',
		title: 'Test title',
		displayTitle: true,
		secondaryText: 'Test secondary text',
		displaySecondaryText: true,
		imageSourceUrl: 'http://test.loc/test.jpg',
		isImageEditMode: false,
		displayImage: true,
		supportingText: 'Test supporting text',
		displaySupportingText: true,
		primaryActionButtonLabel: 'Test button action 1',
		primaryActionButtonUrl: 'http://test.loc/hello-world',
		primaryActionButtonNewTab: true,
		primaryActionButtonNoFollow: true,
		secondaryActionButtonLabel: 'Test button action 2',
		secondaryActionButtonUrl: 'http://test.loc/hello-world-again',
		secondaryActionButtonNewTab: true,
		secondaryActionButtonNoFollow: true,
		displayActions: true,
		displaySecondaryActionButton: true,
		outlined: true,
		cornerRadius: 4,
	},
};

describe( 'blocks: material/card: Save', () => {
	it( 'matches snapshot', () => {
		const wrapper = setup( baseProps );
		expect( wrapper ).toMatchSnapshot();
	} );

	it( 'matches snapshot with a `horizontal` card layout.', () => {
		const props = cloneDeep( baseProps );
		props.attributes.cardLayout = 'horizontal';
		const wrapper = setup( props );
		expect( wrapper ).toMatchSnapshot();
	} );

	it( 'matches snapshot when props get defaults', () => {
		const props = cloneDeep( baseProps );
		delete props.attributes.cardLayout;
		const wrapper = setup( props );
		expect( wrapper ).toMatchSnapshot();
	} );
} );
