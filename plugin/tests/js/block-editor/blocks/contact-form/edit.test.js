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
import { registerStore } from '@wordpress/data';

/**
 * Internal dependencies
 */
import Edit from '../../../../../assets/src/block-editor/blocks/contact-form/edit';

registerStore( 'core/block-editor', {
	reducer: jest.fn(),
	selectors: {
		getBlocks: () => {
			return [
				{
					attributes: {
						emailTo: 'recipient@test.loc',
						subject: 'Test contact form',
						confirmationMessage: 'The form was submitted',
						outlined: true,
						fullWidth: true,
					},
					className: 'test-class',
					setAttributes: jest.fn(),
				},
			];
		},
	},
} );

registerStore( 'core/notices', {
	reducer: jest.fn(),
	selectors: {
		getNotices: () => {
			return [
				{
					content: 'Test notice',
				},
			];
		},
	},
} );

jest.unmock( '@wordpress/data' );

// Mock the <InspectorControls> and <InnerBlocks> components only, so that the other components in this package behave as usual.
jest.mock( '@wordpress/block-editor', () => {
	const original = jest.requireActual( '@wordpress/block-editor' );

	return {
		...original,
		InspectorControls: ( { children } ) => children,
		InnerBlocks: () => {
			const innerBlocks = [
				{
					id: 'name-input-1',
					name: 'material/name-input-field',
				},
				{
					id: 'email-input-1',
					name: 'material/email-input-field',
				},
				{
					id: 'website-input-1',
					name: 'material/website-input-field',
				},
				{
					id: 'message-input-1',
					name: 'material/message-input-field',
				},
				{
					id: 'button-1',
					name: 'material/button',
					attributes: {
						label: 'Submit',
						style: 'unelevated',
						isSubmit: true,
					},
				},
			];

			return (
				<>
					{ innerBlocks.map( block => (
						<div key={ block.id }>
							{ ' ' }
							{ JSON.stringify( block ) }{ ' ' }
						</div>
					) ) }
				</>
			);
		},
	};
} );

/**
 * Render the component.
 *
 * @param {Object} props - Component props.
 * @return {Function} A functional component.
 */
const setup = props => {
	return render( <Edit { ...props } /> );
};

const baseProps = {
	attributes: {
		emailTo: 'recipient@test.loc',
		subject: 'Test contact form',
		confirmationMessage: 'The form was submitted',
		outlined: true,
		fullWidth: true,
	},
	className: 'test-class',
	setAttributes: jest.fn(),
};

describe( 'blocks: material/contact-form: Edit', () => {
	beforeAll( () => {
		global.materialDesign = {
			recaptcha_site_key: 'test-key',
			recaptcha_client_secret: 'test-secret',
			allow_contact_form_block: true,
		};
	} );

	afterEach( () => {
		jest.clearAllMocks();
		cleanup();
	} );

	it( 'matches snapshot', () => {
		const wrapper = setup( baseProps );
		expect( wrapper ).toMatchSnapshot();
	} );

	it( 'matches snapshot if the user is not authorized to use the block', () => {
		materialDesign.allow_contact_form_block = false;
		const wrapper = setup( baseProps );
		expect( wrapper ).toMatchSnapshot();
	} );
} );
