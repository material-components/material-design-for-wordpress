/**
 * Internal dependencies
 */
import {
	name,
	settings,
} from '../../../../../assets/src/block-editor/blocks/image-list';

describe( 'blocks: material/image-list', () => {
	describe( 'name', () => {
		it( 'should equal material/image-list', () => {
			expect( name ).toStrictEqual( 'material/image-list' );
		} );
	} );

	describe( 'settings', () => {
		it( 'title should equal Gallery (Material)', () => {
			expect( settings.title ).toStrictEqual( 'Gallery (Material)' );
		} );

		it( 'category should equal material', () => {
			expect( settings.category ).toStrictEqual( 'material' );
		} );
	} );
} );
