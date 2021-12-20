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
import { render, fireEvent } from '@testing-library/react';
import { act } from 'react-dom/test-utils';

/**
 * Internal dependencies
 */
import RecaptchaInspectorControlsPanel from '../../../../../../assets/src/block-editor/blocks/contact-form/components/recaptcha-inspector-controls-panel';

/**
 * Render the component.
 *
 * @param {Object} props - Component props.
 * @return {Function} A functional component.
 */
const setup = props => {
	return render( <RecaptchaInspectorControlsPanel { ...props } /> );
};

const baseProps = {};

describe( 'RecaptchaInspectorControlsPanel', () => {
	let getData = 0;

	const ajax = jest.fn( args => {
		const response = {
			success: true,
		};
		const data = JSON.parse( args.data.data );

		if ( 'get' === data.action && getData < 2 ) {
			getData++;
			response.data = {
				material_design_recaptcha_client_secret:
					'CLIENT_SECRET_FROM_AJAX',
				material_design_recaptcha_site_key: 'SITE_KEY_FROM_AJAX',
			};
		}

		return response;
	} );

	beforeAll( () => {
		global.materialDesign = {
			ajax_url: 'http://example.com/',
			recaptcha_ajax_nonce_action: 'CAPTCHA_NONCE',
		};
		global.jQuery = {
			ajax,
		};
	} );

	afterEach( () => {
		jest.restoreAllMocks();
		jest.clearAllMocks();
	} );

	it( 'matches snapshot', () => {
		const wrapper = setup( baseProps );
		expect( wrapper ).toMatchSnapshot();
	} );

	it( 'gets credentials by invoking ajax request', async () => {
		let inputs;

		await act( async () => {
			const props = { ...baseProps };
			const { container } = setup( props );
			inputs = container.querySelectorAll(
				'.components-text-control__input'
			);
		} );

		expect( ajax ).toHaveBeenCalledTimes( 1 );
		expect( ajax.mock.calls[ 0 ][ 0 ].data.data ).toContain( '"get"' );

		expect( inputs[ 0 ].value ).toStrictEqual( 'SITE_KEY_FROM_AJAX' );
		expect( inputs[ 1 ].value ).toStrictEqual( 'CLIENT_SECRET_FROM_AJAX' );
	} );

	it( "updates the site key and client secret in state when it's changed", () => {
		const setValue = jest.fn();
		const useStateSpy = jest.spyOn( React, 'useState' );
		useStateSpy.mockImplementation( initialValue => [
			initialValue,
			setValue,
		] );

		const props = { ...baseProps };
		const { container } = setup( props );
		const inputs = container.querySelectorAll(
			'.components-text-control__input'
		);

		act( () => {
			let mockEvent = {
				target: { value: 'SITE_KEY' },
			};
			fireEvent.change( inputs[ 0 ], mockEvent );

			mockEvent = {
				target: { value: 'CLIENT_SECRET' },
			};
			fireEvent.change( inputs[ 1 ], mockEvent );
		} );
		expect( setValue.mock.calls[ 1 ][ 0 ] ).toStrictEqual( 'SITE_KEY' );
		expect( setValue.mock.calls[ 2 ][ 0 ] ).toStrictEqual(
			'CLIENT_SECRET'
		);
	} );

	it( 'saves credentials by invoking ajax request', async () => {
		const props = { ...baseProps };
		const { container } = setup( props );

		const inputs = container.querySelectorAll(
			'.components-text-control__input'
		);

		await act( async () => {
			let mockEvent = {
				target: { value: 'SITE_KEY' },
			};
			await fireEvent.change( inputs[ 0 ], mockEvent );

			mockEvent = {
				target: { value: 'CLIENT_SECRET' },
			};
			await fireEvent.change( inputs[ 1 ], mockEvent );

			const saveBtn = container.querySelector( '.save-button' );
			await fireEvent.click( saveBtn );
		} );

		expect( ajax ).toHaveBeenCalledTimes( 2 );
		expect( ajax.mock.calls[ 0 ][ 0 ].data.data ).toContain( '"get"' );
		expect( ajax.mock.calls[ 1 ][ 0 ].data.data ).toContain( '"save"' );
		expect( ajax.mock.calls[ 1 ][ 0 ].data.data ).toContain( '"SITE_KEY"' );
		expect( ajax.mock.calls[ 1 ][ 0 ].data.data ).toContain(
			'"CLIENT_SECRET"'
		);
	} );

	it( 'does not save credentials if key and secret are not provided', async () => {
		const props = { ...baseProps };
		const { container } = setup( props );

		const inputs = container.querySelectorAll(
			'.components-text-control__input'
		);

		await act( async () => {
			let mockEvent = {
				target: { value: '' },
			};
			await fireEvent.change( inputs[ 0 ], mockEvent );

			mockEvent = {
				target: { value: '' },
			};
			await fireEvent.change( inputs[ 1 ], mockEvent );

			const saveBtn = container.querySelector( '.save-button' );
			await fireEvent.click( saveBtn );
		} );

		expect( ajax ).toHaveBeenCalledTimes( 1 );
	} );

	it( 'clears credentials by invoking ajax request', async () => {
		const props = { ...baseProps };
		const { container } = setup( props );

		const inputs = container.querySelectorAll(
			'.components-text-control__input'
		);

		await act( async () => {
			let mockEvent = {
				target: { value: 'SITE_KEY' },
			};
			await fireEvent.change( inputs[ 0 ], mockEvent );

			mockEvent = {
				target: { value: 'CLIENT_SECRET' },
			};
			await fireEvent.change( inputs[ 1 ], mockEvent );

			const saveBtn = container.querySelector( '.clear-button' );
			await fireEvent.click( saveBtn );
		} );

		expect( ajax ).toHaveBeenCalledTimes( 2 );
		expect( ajax.mock.calls[ 0 ][ 0 ].data.data ).toContain( '"get"' );
		expect( ajax.mock.calls[ 1 ][ 0 ].data.data ).toContain( '"clear"' );
	} );
} );
