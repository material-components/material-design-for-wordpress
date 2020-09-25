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
import { formatError } from '../../../assets/src/block-editor/utils/error';

describe( 'error: formatError', () => {
	it( 'should return a formatted error message from a complex error from a Json function', async () => {
		await formatError( {
			json: () => {
				return {
					message: 'Test error message',
				};
			},
		} ).then( error => {
			expect( error ).toStrictEqual( {
				message: 'Test error message',
				type: 'api',
			} );
		} );
	} );

	it( 'should return a formatted error from a simple error', async () => {
		await formatError( {
			message: 'Another test error message',
			type: 'testType',
		} ).then( error => {
			expect( error ).toStrictEqual( {
				message: 'Another test error message',
				type: 'testType',
			} );
		} );
	} );
} );
