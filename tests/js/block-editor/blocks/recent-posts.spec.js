/**
 * Internal dependencies
 */
import {
	name,
	settings,
} from '../../../../assets/src/block-editor/blocks/recent-posts';
// import PostsControl from "../../../../assets/src/block-editor/components/posts-control";

// Mock PostsControl component as not relevant in this test and failing to pass tests
// due to the SearchListControl WooCommerce component.
jest.mock(
	'../../../../assets/src/block-editor/components/posts-control/index.js',
	() => {
		const PostsControl = () => <div />;
		return PostsControl;
	}
);

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
