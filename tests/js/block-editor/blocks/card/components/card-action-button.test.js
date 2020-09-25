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

	it( 'matches snapshot when the edit mode if enabled and the button is focused', () => {
		const props = { ...baseProps };
		props.isEditMode = true;
		props.isFocused = true;
		const wrapper = setup( props );
		expect( wrapper ).toMatchSnapshot();
	} );
} );
