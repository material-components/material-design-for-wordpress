/**
 * Internal dependencies
 */
import {
	name,
	settings,
} from '../../../../../assets/src/block-editor/blocks/data-table';

describe( 'blocks: material/data-table', () => {
	describe( 'name', () => {
		it( 'should equal material/data-table', () => {
			expect( name ).toStrictEqual( 'material/data-table' );
		} );
	} );

	describe( 'settings', () => {
		it( 'title should equal Data Table (Material)', () => {
			expect( settings.title ).toStrictEqual( 'Data Table (Material)' );
		} );

		it( 'category should equal material', () => {
			expect( settings.category ).toStrictEqual( 'material' );
		} );
	} );
} );
