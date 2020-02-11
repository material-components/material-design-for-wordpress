import { add } from '../../../assets/src/block-editor/';

describe( 'ensure setup works', () => {
	it( 'should be equal when adding two numbers', () => {
		expect( add( 1, 2 ) ).toStrictEqual( 3 );
	} );
} );
