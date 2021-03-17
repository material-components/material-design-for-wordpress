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
import { render, cleanup } from '@testing-library/react';

/**
 * Internal dependencies
 */
import Card from '../../../../../assets/src/wizard/components/content/card';
import { StepProvider } from '../../../../../assets/src/wizard/context';

const setup = props => {
	return render(
		<StepProvider>
			<Card { ...props } />
		</StepProvider>
	);
};

describe( 'Wizard: Card', () => {
	afterEach( cleanup );

	it( 'matches snapshot', () => {
		const wrapper = setup( {
			image: 'http://example.com/image.png',
		} );
		expect( wrapper ).toMatchSnapshot();
	} );

	it( 'matches snapshot when switch is set', () => {
		const wrapper = setup( {
			image: 'http://example.com/image.png',
			switch: 'DEMO',
		} );
		expect( wrapper ).toMatchSnapshot();
	} );

	it( 'matches snapshot when imageSpan is set', () => {
		const wrapper = setup( {
			image: 'http://example.com/image.png',
			switch: 'DEMO',
			imageSpan: 6,
		} );
		expect( wrapper ).toMatchSnapshot();
	} );

	it( 'matches snapshot when contentSpan is set', () => {
		const wrapper = setup( {
			image: 'http://example.com/image.png',
			switch: 'DEMO',
			contentSpan: 6,
		} );
		expect( wrapper ).toMatchSnapshot();
	} );

	it( 'matches snapshot when children is set', () => {
		const wrapper = setup( {
			image: 'http://example.com/image.png',
			switch: 'DEMO',
			children: <div>Example content</div>,
		} );
		expect( wrapper ).toMatchSnapshot();
	} );
} );
