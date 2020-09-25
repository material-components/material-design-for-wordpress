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
 * Internal dependencies
 */
import { formatError } from '../../../../assets/src/block-editor/utils/error';

describe( 'error: formatError', () => {
	afterEach( () => {
		jest.clearAllMocks();
	} );

	it( 'should return the correct error object', async () => {
		const errorObj = {
			json: () => {
				return {
					type: 'general',
					message: 'Test Error message',
				};
			},
		};

		await formatError( errorObj ).then( formattedError => {
			expect( formattedError ).toStrictEqual( {
				type: 'general',
				message: 'Test Error message',
			} );
		} );
	} );

	it( 'should return the correct error object when an exception is thrown', async () => {
		const mockFn = jest.fn();
		mockFn.mockImplementation( () => {
			throw new Error( 'A thrown error' );
		} );
		const errorObj = {
			json: mockFn,
		};

		await formatError( errorObj ).then( formattedError => {
			expect( formattedError ).toStrictEqual( {
				type: 'general',
				message: 'A thrown error',
			} );
		} );
	} );
} );
