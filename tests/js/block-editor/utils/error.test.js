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
