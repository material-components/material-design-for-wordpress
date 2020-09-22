/**
 * External dependencies
 */
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import { cloneDeep } from 'lodash';
import { mount, shallow } from 'enzyme';
import React from 'react';

/**
 * Internal dependencies
 */
import Edit from '../../../../../assets/src/block-editor/blocks/cards-collection/edit';

jest.mock(
	'../../../../../assets/src/block-editor/components/with-id',
	() => ( {
		withId: Component => Component,
	} )
);

/**
 * Render the component.
 *
 * @param {Object} props - Component props.
 * @return {Function} A functional component.
 */
const setup = props => {
	return render( <Edit { ...props } /> );
};

/**
 * Render the component in a shallow mode using enzyme.
 *
 * @param {Object} props - Component props.
 * @return {Function} A functional component.
 */
const setupShallow = props => {
	return shallow( <Edit { ...props } /> );
};

/**
 * Render the component in a mount mode using enzyme.
 *
 * @param {Object} props - Component props.
 * @return {Function} A functional component.
 */
const setupMount = props => {
	return mount( <Edit { ...props } /> );
};

const firstCardProps = {
	contentLayout: 'text-under-media',
	title: 'Title #1 goes here',
	displayTitle: true,
	secondaryText: 'Secondary text #1',
	displaySecondaryText: true,
	imageSourceUrl: '',
	isImageEditMode: false,
	displayImage: true,
	supportingText: 'Supporting text #1',
	displaySupportingText: true,
	primaryActionButtonLabel: 'Button text #1-1',
	primaryActionButtonUrl: '',
	primaryActionButtonNewTab: false,
	primaryActionButtonNoFollow: false,
	secondaryActionButtonLabel: 'Button text #1-2',
	secondaryActionButtonUrl: '',
	secondaryActionButtonNewTab: false,
	secondaryActionButtonNoFollow: false,
	displayActions: true,
	displaySecondaryActionButton: false,
	outlined: false,
	cornerRadius: undefined,
};

const secondCardProps = {
	contentLayout: 'text-under-media',
	title: 'Title #2 goes here',
	displayTitle: true,
	secondaryText: 'Secondary text #2',
	displaySecondaryText: true,
	imageSourceUrl: '',
	isImageEditMode: false,
	displayImage: true,
	supportingText: 'Supporting text #2',
	displaySupportingText: true,
	primaryActionButtonLabel: 'Button text #2-1',
	primaryActionButtonUrl: '',
	primaryActionButtonNewTab: false,
	primaryActionButtonNoFollow: false,
	secondaryActionButtonLabel: 'Button text #2-2',
	secondaryActionButtonUrl: '',
	secondaryActionButtonNewTab: false,
	secondaryActionButtonNoFollow: false,
	displayActions: true,
	displaySecondaryActionButton: false,
	outlined: false,
	cornerRadius: undefined,
};

const thirdCardProps = {
	contentLayout: 'text-under-media',
	title: 'Title #3 goes here',
	displayTitle: true,
	secondaryText: 'Secondary text #3',
	displaySecondaryText: true,
	imageSourceUrl: '',
	isImageEditMode: false,
	displayImage: true,
	supportingText: 'Supporting text #3',
	displaySupportingText: true,
	primaryActionButtonLabel: 'Button text #3-1',
	primaryActionButtonUrl: '',
	primaryActionButtonNewTab: false,
	primaryActionButtonNoFollow: false,
	secondaryActionButtonLabel: 'Button text #3-2',
	secondaryActionButtonUrl: '',
	secondaryActionButtonNewTab: false,
	secondaryActionButtonNoFollow: false,
	displayActions: true,
	displaySecondaryActionButton: false,
	outlined: false,
	cornerRadius: undefined,
};

const baseProps = {
	attributes: {
		style: 'masonry',
		columns: 4,
		gutter: 16,
		cardsProps: [
			{ ...firstCardProps },
			{ ...secondCardProps },
			{ ...thirdCardProps },
		],
		numberOfCards: 3,
		contentLayout: 'text-under-media',
		cornerRadius: 4,
		outlined: true,
		displayTitle: true,
		displaySecondaryText: true,
		displayImage: true,
		displaySupportingText: true,
		displayActions: true,
		displaySecondaryActionButton: true,
		id: 'block-material-cards-collection-0',
	},
	setAttributes: jest.fn(),
	className: 'test',
	name: 'material/cards-collection',
};

describe( 'blocks: material/cards-collection: Edit', () => {
	afterEach( () => {
		jest.clearAllMocks();
	} );

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

	it( 'updates the card container class when the the card container is focused', () => {
		const props = cloneDeep( baseProps );
		const wrapper = setupMount( props );
		wrapper
			.find( '.card-container' )
			.at( 0 )
			.simulate( 'focus' );
		expect(
			wrapper
				.find( '.card-container' )
				.at( 0 )
				.hasClass( 'card-container-focused' )
		).toBe( true );
	} );

	it( 'updates the cards props when the second card is move left', () => {
		const props = cloneDeep( baseProps );
		const wrapper = setupMount( props );
		wrapper
			.find( '.card-container' )
			.at( 1 )
			.simulate( 'focus' );

		wrapper.find( 'button.mtb-card-move-button-left-up' ).simulate( 'click' );
		//
		expect( props.setAttributes ).toHaveBeenCalledWith( {
			cardsProps: [
				{ ...secondCardProps },
				{ ...firstCardProps },
				{ ...thirdCardProps },
			],
		} );
	} );

	it( 'updates the cards props when the second card is move right', () => {
		const props = cloneDeep( baseProps );
		const wrapper = setupMount( props );
		wrapper
			.find( '.card-container' )
			.at( 1 )
			.simulate( 'focus' );

		wrapper
			.find( 'button.mtb-card-move-button-right-down' )
			.simulate( 'click' );

		expect( props.setAttributes ).toHaveBeenCalledWith( {
			cardsProps: [
				{ ...firstCardProps },
				{ ...thirdCardProps },
				{ ...secondCardProps },
			],
		} );
	} );

	it( 'updates the cards props and the number of cards props when the second card is removed', () => {
		const props = cloneDeep( baseProps );
		const wrapper = setupMount( props );
		wrapper
			.find( '.card-container' )
			.at( 1 )
			.simulate( 'focus' );

		wrapper.find( 'button.mtb-card-close-button' ).simulate( 'click' );

		expect( props.setAttributes ).toHaveBeenCalledWith( {
			cardsProps: [ { ...firstCardProps }, { ...thirdCardProps } ],
			numberOfCards: 2,
		} );
	} );

	it( 'updates the cards props when the number of cards is being increased by 1', () => {
		const props = cloneDeep( baseProps );
		const wrapper = setupMount( props );
		const newAttributes = cloneDeep( baseProps.attributes );
		newAttributes.numberOfCards = 4;
		wrapper.setProps( { attributes: newAttributes } );

		expect( props.setAttributes ).toHaveBeenCalledWith( {
			cardsProps: [
				{ ...firstCardProps },
				{ ...secondCardProps },
				{ ...thirdCardProps },
				{
					contentLayout: 'text-under-media',
					cornerRadius: undefined,
					displayActions: true,
					displayImage: true,
					displaySecondaryActionButton: false,
					displaySecondaryText: true,
					displaySupportingText: true,
					displayTitle: true,
					imageSourceUrl: '',
					isImageEditMode: false,
					outlined: false,
					primaryActionButtonLabel: '',
					primaryActionButtonNewTab: false,
					primaryActionButtonNoFollow: false,
					primaryActionButtonUrl: '',
					secondaryActionButtonLabel: '',
					secondaryActionButtonNewTab: false,
					secondaryActionButtonNoFollow: false,
					secondaryActionButtonUrl: '',
				},
			],
		} );
	} );

	it( 'removes one card from the ui is being decreased by 1', () => {
		const props = cloneDeep( baseProps );
		const wrapper = setupMount( props );
		const newAttributes = cloneDeep( baseProps.attributes );
		newAttributes.numberOfCards = 2;
		wrapper.setProps( { attributes: newAttributes } );
		wrapper.update();
		expect( wrapper ).toMatchSnapshot();
	} );

	it( 'updates the cards props when the a prop is being updated', () => {
		jest.spyOn( React, 'useEffect' ).mockImplementation( f => f() );
		const props = cloneDeep( baseProps );
		const wrapper = setupShallow( props );
		const newAttributes = cloneDeep( baseProps.attributes );
		newAttributes.columns = 3;
		wrapper.setProps( { attributes: newAttributes } );
		expect( props.setAttributes ).toHaveBeenCalledTimes( 1 );
	} );
} );
