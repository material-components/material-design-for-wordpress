/**
 * Internal dependencies
 */
import {
	name,
	settings,
} from '../../../../../assets/src/block-editor/blocks/hand-picked-posts';

import BlockIcon from '../../../../../assets/src/block-editor/blocks/hand-picked-posts/components/block-icon';
import Edit from '../../../../../assets/src/block-editor/blocks/hand-picked-posts/edit';

// Mock PostsControl component as not relevant in this test and failing to pass tests
// due to the SearchListControl WooCommerce component.
jest.mock(
	'../../../../../assets/src/block-editor/components/posts-control/index.js',
	() => {
		const PostsControl = () => <div />;
		return PostsControl;
	}
);

describe( 'blocks: material/hand-picked-posts', () => {
	afterEach( () => {
		jest.clearAllMocks();
	} );

	describe( 'name', () => {
		it( 'should equal material/hand-picked-posts', () => {
			expect( name ).toStrictEqual( 'material/hand-picked-posts' );
		} );
	} );

	describe( 'title settings', () => {
		it( 'should equal Hand-picked Posts', () => {
			expect( settings.title ).toStrictEqual( 'Hand-picked Posts' );
		} );
	} );

	describe( 'description settings', () => {
		it( 'should equal Display a list of your hand-picked posts.', () => {
			expect( settings.description ).toStrictEqual(
				'Display a list of your hand-picked posts.'
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

	describe( 'icon settings', () => {
		it( 'should be equal to the BlockIcon component', () => {
			expect( settings.icon ).toStrictEqual( BlockIcon );
		} );
	} );

	describe( 'edit settings', () => {
		it( 'should be equal to the Edit component', () => {
			expect( settings.edit ).toStrictEqual( Edit );
		} );
	} );
} );
