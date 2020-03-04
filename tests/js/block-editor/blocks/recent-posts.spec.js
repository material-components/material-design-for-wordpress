/**
 * Internal dependencies
 */
import {
	name,
	settings,
} from '../../../../assets/src/block-editor/blocks/recent-posts';

describe( 'blocks: material/recent-posts', () => {
	describe( 'name', () => {
		it( 'should equal material/recent-posts', () => {
			expect( name ).toStrictEqual( 'material/recent-posts' );
		} );
	} );

	describe( 'title settings', () => {
		it( 'should equal Recent Posts', () => {
			expect( settings.title ).toStrictEqual( 'Recent Posts' );
		} );
	} );

	describe( 'description settings', () => {
		it( 'should equal Display a list of your most recent posts.', () => {
			expect( settings.description ).toStrictEqual(
				'Display a list of your most recent posts.'
			);
		} );
	} );

	describe( 'category settings', () => {
		it( 'should equal material', () => {
			expect( settings.category ).toStrictEqual( 'material' );
		} );
	} );

	describe( 'supports settings', () => {
		it( 'should have align set to true', () => {
			expect( settings.supports ).toStrictEqual( { align: true } );
		} );
	} );
} );
