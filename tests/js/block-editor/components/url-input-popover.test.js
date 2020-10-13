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
import { fireEvent, render, act } from '@testing-library/react';

/**
 * Internal dependencies
 */
import UrlInputPopover from '../../../../assets/src/block-editor/components/url-input-popover';

/**
 * Render the component.
 *
 * @param {Object} props - Component props.
 * @return {Function} A functional component.
 */
const setup = props => {
	return render( <UrlInputPopover { ...props } /> );
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
	afterEach( () => {
		jest.clearAllMocks();
	} );

	it( 'matches snapshot', () => {
		const wrapper = setup( baseProps );
		expect( wrapper ).toMatchSnapshot();
	} );

	it( 'matches snapshot when the onChange handler is not provided', () => {
		const props = { ...baseProps };
		delete props.onChange;
		const wrapper = setup( props );
		expect( wrapper ).toMatchSnapshot();
	} );

	it( 'matches snapshot when the onChangeNewTab handler is not provided', () => {
		const props = { ...baseProps };
		delete props.onChangeNewTab;
		const wrapper = setup( props );
		expect( wrapper ).toMatchSnapshot();
	} );

	it( 'matches snapshot when the onChangeNoFollow handler is not provided', () => {
		const props = { ...baseProps };
		delete props.onChangeNoFollow;
		const wrapper = setup( props );
		expect( wrapper ).toMatchSnapshot();
	} );

	it( 'matches snapshot when the onPopupClose handler is not provided', () => {
		const props = { ...baseProps };
		delete props.onPopupClose;
		const wrapper = setup( props );
		expect( wrapper ).toMatchSnapshot();
	} );

	it( 'matches snapshot when the newTab property is set to false', () => {
		const props = { ...baseProps };
		props.newTab = false;
		const wrapper = setup( props );
		expect( wrapper ).toMatchSnapshot();
	} );

	it( 'matches snapshot when the noFollow property is set to false', () => {
		const props = { ...baseProps };
		props.noFollow = false;
		const wrapper = setup( props );
		expect( wrapper ).toMatchSnapshot();
	} );

	it( 'matches snapshot when the newTab and noFollow properties are set to false', () => {
		const props = { ...baseProps };
		props.newTab = false;
		props.noFollow = false;
		const wrapper = setup( props );
		expect( wrapper ).toMatchSnapshot();
	} );

	it( 'matches snapshot when the disableSuggestions property is set to false', () => {
		const props = { ...baseProps };
		props.disableSuggestions = false;
		const wrapper = setup( props );
		expect( wrapper ).toMatchSnapshot();
	} );

	it( 'matches snapshot all default properties are not provided', () => {
		const wrapper = setup( {} );
		expect( wrapper ).toMatchSnapshot();
	} );

	it( 'should expand to show more control when the expand button is clicked', () => {
		act( async () => {
			const { container } = setup( baseProps );
			const expandButton = container.querySelector(
				'.material-design-url-input-control__more-button'
			);

			await fireEvent.click( expandButton );
			expect(
				container.querySelector( '.material-design-url-input-popover' )
			).toHaveClass( 'material-design--show-advanced' );
		} );
	} );
} );
