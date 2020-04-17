/**
 * External dependencies
 */
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import { cloneDeep } from 'lodash';

/**
 * Internal dependencies
 */
import Save from '../../../../../assets/src/block-editor/blocks/cards-collection/save';

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
		style: 'masonry',
		columns: 4,
		align: 'wide',
		gutter: 16,
		cardsProps: [
			{
				contentLayout: 'text-under-media',
				title: 'Title goes here',
				displayTitle: true,
				secondaryText: 'Secondary text',
				displaySecondaryText: true,
				imageSourceUrl: '',
				isImageEditMode: false,
				displayImage: true,
				supportingText: 'Supporting text',
				displaySupportingText: true,
				primaryActionButtonLabel: 'Button text',
				primaryActionButtonUrl: '',
				primaryActionButtonNewTab: false,
				primaryActionButtonNoFollow: false,
				secondaryActionButtonLabel: 'Button text',
				secondaryActionButtonUrl: '',
				secondaryActionButtonNewTab: false,
				secondaryActionButtonNoFollow: false,
				displayActions: true,
				displaySecondaryActionButton: false,
				outlined: false,
				cornerRadius: 4,
			},
		],
		numberOfCards: 1,
	},
	className: 'test',
};

describe( 'blocks: material/cards-collection: Save', () => {
	it( 'matches snapshot', () => {
		const wrapper = setup( baseProps );
		expect( wrapper ).toMatchSnapshot();
	} );

	it( 'matches snapshot when style props is `grid`', () => {
		const props = cloneDeep( baseProps );
		props.attributes.style = 'grid';
		const wrapper = setup( props );
		expect( wrapper ).toMatchSnapshot();
	} );

	it( 'matches snapshot when style props is `list`', () => {
		const props = cloneDeep( baseProps );
		props.attributes.style = 'list';
		const wrapper = setup( props );
		expect( wrapper ).toMatchSnapshot();
	} );
} );
