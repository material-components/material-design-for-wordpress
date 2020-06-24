/**
 * Internal dependencies
 */
import {
	name,
	settings,
} from '../../../../../assets/src/block-editor/blocks/recent-posts';

import Edit from '../../../../../assets/src/block-editor/blocks/recent-posts/edit';

// Mock PostsControl component as not relevant in this test and failing to pass tests
// due to the SearchListControl WooCommerce component.
jest.mock(
	'../../../../../assets/src/block-editor/components/posts-control/index.js',
	() => {
		const PostsControl = () => <div />;
		return PostsControl;
	}
);

describe( 'blocks: material/recent-posts', () => {
	afterEach( () => {
		jest.clearAllMocks();
	} );

	describe( 'name', () => {
		it( 'should equal material/recent-posts', () => {
			expect( name ).toStrictEqual( 'material/recent-posts' );
		} );
	} );

	describe( 'title settings', () => {
		it( 'should equal Recent Posts (Material)', () => {
			expect( settings.title ).toStrictEqual( 'Recent Posts (Material)' );
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
		it( 'should have align supporting only wide and full alignment', () => {
			expect( settings.supports ).toStrictEqual( {
				align: [ 'wide', 'full' ],
			} );
		} );
	} );

	describe( 'edit settings', () => {
		it( 'should be equal to the Edit component', () => {
			expect( settings.edit ).toStrictEqual( Edit );
		} );
	} );
} );
