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
import FocusedCardControls from '../../../../../../assets/src/block-editor/blocks/cards-collection/components/focused-card-controls';

/**
 * Render the component.
 *
 * @param {Object} props - Component props.
 * @return {Function} A functional component.
 */
const setup = props => {
	return render( <FocusedCardControls { ...props } /> );
};

const baseProps = {
	cardIndex: 0,
	style: 'masonry',
	numberOfCards: 1,
	onMoveLeftOrUp: jest.fn(),
	onMoveRightOrDown: jest.fn(),
	onRemove: jest.fn(),
};

describe( 'FocusedCardControls', () => {
	afterEach( () => {
		jest.clearAllMocks();
	} );

	it( 'matches snapshot', () => {
		const wrapper = setup( baseProps );
		expect( wrapper ).toMatchSnapshot();
	} );

	it( 'matches snapshot when style prop is `list`', () => {
		const props = { ...baseProps };
		props.style = 'list';
		const wrapper = setup( props );
		expect( wrapper ).toMatchSnapshot();
	} );

	it( 'matches snapshot when number of cards is more than 1 and the card index less than the number of cards', () => {
		const props = { ...baseProps };
		props.cardIndex = 2;
		props.numberOfCards = 4;
		const wrapper = setup( props );
		expect( wrapper ).toMatchSnapshot();
	} );
} );
