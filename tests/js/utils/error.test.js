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
