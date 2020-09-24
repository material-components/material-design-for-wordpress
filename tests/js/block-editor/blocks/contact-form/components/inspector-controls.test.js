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
import { shallow } from 'enzyme';

/**
 * Internal dependencies
 */
import FormInspectorControls from '../../../../../../assets/src/block-editor/blocks/contact-form/components/inspector-controls';

/**
 * Render the component in a shallow mode using enzyme.
 *
 * @param {Object} props - Component props.
 * @return {Function} A functional component.
 */
const setupShallow = props => {
	return shallow( <FormInspectorControls { ...props } /> );
};

const baseProps = {
	attributes: {
		emailTo: 'recipient@test.loc',
		subject: 'Test contact form',
		confirmationMessage: 'The form was submitted',
		outlined: true,
		fullWidth: true,
	},
	setter: jest.fn(),
};

describe( 'FormInspectorControls', () => {
	it( 'matches snapshot', () => {
		const wrapper = setupShallow( baseProps );
		expect( wrapper ).toMatchSnapshot();
	} );
} );
