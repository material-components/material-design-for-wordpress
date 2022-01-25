/**
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * External dependencies
 */
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import { shallow } from 'enzyme';

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

/**
 * Render the component in a shallow mode using enzyme.
 *
 * @param {Object} props - Component props.
 * @return {Function} A functional component.
 */
const setupShallow = props => {
	return shallow( <CardActionsEdit { ...props } /> );
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
	afterEach( () => {
		jest.clearAllMocks();
	} );

	it( 'matches snapshot when showing only the primary button', () => {
		const wrapper = setup( baseProps );
		expect( wrapper ).toMatchSnapshot();
	} );

	it( 'matches snapshot when showing the primary and secondary buttons', () => {
		const props = { ...baseProps };
		props.displaySecondaryActionButton = true;
		const wrapper = setup( props );
		expect( wrapper ).toMatchSnapshot();
	} );

	it( 'updates the primary action button label prop when the label is changed', () => {
		const wrapper = setupShallow( baseProps );

		wrapper.find( 'CardActionButton' ).first().prop( 'onChangeLabel' )(
			'Test label'
		);

		expect( baseProps.setter ).toHaveBeenCalledWith(
			'primaryActionButtonLabel',
			'Test label',
			0
		);
	} );

	it( 'updates the secondary action button label prop when the label is changed', () => {
		const props = { ...baseProps };
		props.displaySecondaryActionButton = true;
		const wrapper = setupShallow( props );

		wrapper.find( 'CardActionButton' ).last().prop( 'onChangeLabel' )(
			'Test label'
		);

		expect( props.setter ).toHaveBeenCalledWith(
			'secondaryActionButtonLabel',
			'Test label',
			0
		);
	} );

	it( 'updates the primary action button url prop when the url is changed', () => {
		const wrapper = setupShallow( baseProps );

		wrapper.find( 'CardActionButton' ).first().prop( 'onChangeUrl' )(
			'http:/new-test-url.loc'
		);

		expect( baseProps.setter ).toHaveBeenCalledWith(
			'primaryActionButtonUrl',
			'http:/new-test-url.loc',
			0
		);
	} );

	it( 'updates the secondary action button url prop when the url is changed', () => {
		const props = { ...baseProps };
		props.displaySecondaryActionButton = true;
		const wrapper = setupShallow( props );

		wrapper.find( 'CardActionButton' ).last().prop( 'onChangeUrl' )(
			'http:/new-test-url.loc'
		);

		expect( props.setter ).toHaveBeenCalledWith(
			'secondaryActionButtonUrl',
			'http:/new-test-url.loc',
			0
		);
	} );

	it( 'updates the primary action button new tab prop when the new tab toggle is changed', () => {
		const wrapper = setupShallow( baseProps );

		wrapper.find( 'CardActionButton' ).first().prop( 'onChangeNewTab' )(
			false
		);

		expect( baseProps.setter ).toHaveBeenCalledWith(
			'primaryActionButtonNewTab',
			false,
			0
		);
	} );

	it( 'updates the secondary action button new tab prop when the new tab toggle is changed', () => {
		const props = { ...baseProps };
		props.displaySecondaryActionButton = true;
		const wrapper = setupShallow( props );

		wrapper.find( 'CardActionButton' ).last().prop( 'onChangeNewTab' )(
			false
		);

		expect( props.setter ).toHaveBeenCalledWith(
			'secondaryActionButtonNewTab',
			false,
			0
		);
	} );

	it( 'updates the primary action button no follow prop when the no follow toggle is changed', () => {
		const wrapper = setupShallow( baseProps );

		wrapper.find( 'CardActionButton' ).first().prop( 'onChangeNoFollow' )(
			false
		);

		expect( baseProps.setter ).toHaveBeenCalledWith(
			'primaryActionButtonNoFollow',
			false,
			0
		);
	} );

	it( 'updates the secondary action button no follow prop when the no follow toggle is changed', () => {
		const props = { ...baseProps };
		props.displaySecondaryActionButton = true;
		const wrapper = setupShallow( props );

		wrapper.find( 'CardActionButton' ).last().prop( 'onChangeNoFollow' )(
			false
		);

		expect( props.setter ).toHaveBeenCalledWith(
			'secondaryActionButtonNoFollow',
			false,
			0
		);
	} );

	it( 'set the primary action button isFocused prop to false when the primary action button popup is closed', () => {
		const wrapper = setupShallow( baseProps );

		wrapper.find( 'CardActionButton' ).first().prop( 'onPopupClose' )();

		expect(
			wrapper.find( 'CardActionButton' ).first().prop( 'isFocused' )
		).toStrictEqual( false );
	} );

	it( 'set the secondary action button isFocused prop to false when the secondary action button popup is closed', () => {
		const props = { ...baseProps };
		props.displaySecondaryActionButton = true;
		const wrapper = setupShallow( props );

		wrapper.find( 'CardActionButton' ).last().prop( 'onPopupClose' )();

		expect(
			wrapper.find( 'CardActionButton' ).last().prop( 'isFocused' )
		).toStrictEqual( false );
	} );

	it( 'set the primary action button isFocused prop to false when the primary action button popup is getting blurred', () => {
		const wrapper = setupShallow( baseProps );

		wrapper
			.find( 'CardActionButton' )
			.first()
			.prop( 'onPopupFocusOutside' )();

		expect(
			wrapper.find( 'CardActionButton' ).first().prop( 'isFocused' )
		).toStrictEqual( false );
	} );

	it( 'set the secondary action button isFocused prop to false when the secondary action button popup is getting blurred', () => {
		const props = { ...baseProps };
		props.displaySecondaryActionButton = true;
		const wrapper = setupShallow( props );

		wrapper
			.find( 'CardActionButton' )
			.last()
			.prop( 'onPopupFocusOutside' )();

		expect(
			wrapper.find( 'CardActionButton' ).last().prop( 'isFocused' )
		).toStrictEqual( false );
	} );

	it( 'set the primary action button isFocused prop to true when the primary action button container is getting focused', () => {
		const wrapper = setupShallow( baseProps );

		wrapper
			.find( '.mdc-card__action-button-container' )
			.first()
			.simulate( 'focus' );

		expect(
			wrapper.find( 'CardActionButton' ).first().prop( 'isFocused' )
		).toStrictEqual( true );
	} );

	it( 'set the secondary action button isFocused prop to true when the secondary action button container is getting focused', () => {
		const props = { ...baseProps };
		props.displaySecondaryActionButton = true;
		const wrapper = setupShallow( props );

		wrapper
			.find( '.mdc-card__action-button-container' )
			.last()
			.simulate( 'focus' );

		expect(
			wrapper.find( 'CardActionButton' ).last().prop( 'isFocused' )
		).toStrictEqual( true );
	} );
} );
