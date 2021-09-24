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
import CardStylesPanel from '../../../../../assets/src/block-editor/components/card-styles-panel';

/**
 * Render the component.
 *
 * @param {Object} props - Component props.
 * @return {Function} A functional component.
 */
const setup = props => {
	return render( <CardStylesPanel { ...props } /> );
};

const baseProps = {
	style: 'masonry',
	columns: 4,
	allowIndividualStyleOverride: false,
	showAllowIndividualStyleOverride: false,
	showColumns: true,
	minColumns: 2,
	maxColumns: 4,
	contentLayout: 'text-over-media',
	showContentLayout: true,
	gutter: 16,
	showGutter: true,
	cornerRadius: 4,
	showCornerRadius: false,
	minRoundedCornersRadius: 0,
	maxRoundedCornersRadius: 24,
	outlined: true,
	showOutlined: true,
	setter: jest.fn(),
};

describe( 'CardStylesPanel', () => {
	afterEach( () => {
		jest.clearAllMocks();
	} );

	it( 'matches snapshot', () => {
		const wrapper = setup( baseProps );
		expect( wrapper ).toMatchSnapshot();
	} );

	it( 'matches snapshot when overrides are enabled', () => {
		const props = { ...baseProps };
		baseProps.showAllowIndividualStyleOverride = true;
		baseProps.allowIndividualStyleOverride = true;
		const wrapper = setup( props );
		expect( wrapper ).toMatchSnapshot();
	} );
} );
