/**
 * Internal dependencies
 */
import {
	name,
	settings,
} from '../../../../../assets/src/block-editor/blocks/tab-bar';

describe( 'blocks: material/tab-bar', () => {
	describe( 'name', () => {
		it( 'should equal material/tab-bar', () => {
			expect( name ).toStrictEqual( 'material/tab-bar' );
		} );
	} );

	describe( 'settings', () => {
		it( 'title should equal Image List', () => {
			expect( settings.title ).toStrictEqual( 'Tab Bar' );
		} );

		it( 'category should equal material', () => {
			expect( settings.category ).toStrictEqual( 'material' );
		} );
	} );
} );