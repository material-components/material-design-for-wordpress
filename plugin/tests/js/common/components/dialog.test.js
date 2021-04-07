/**
 * Copyright 2021 Google LLC
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
import Dialog from '../../../../assets/src/common/components/dialog';

/**
 * Render the component.
 *
 * @param {Object} props - Component props
 * @return {Function} A functional component.
 */
const setup = props => {
	return render( <Dialog { ...props } /> );
};

const baseProps = {
	open: true,
	title: '<h3>Dialog Title</h3>',
	content: '<p>Dialog Content</p>',
	actions: '<button>Save</button>',
};

describe( 'Common Components: Dialog', () => {
	it( 'should match snapshot', () => {
		const wrapper = setup( baseProps );
		expect( wrapper ).toMatchSnapshot();
	} );

	it( 'should match snapshot when dialog is not open', () => {
		const wrapper = setup( { ...baseProps, ...{ open: false } } );
		expect( wrapper ).toMatchSnapshot();
	} );
} );
