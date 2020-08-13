/**
 * Internal dependencies
 */
import {
	name,
	settings,
	metadata,
} from '../../../../../assets/src/block-editor/blocks/list';

describe( 'blocks: material/list', () => {
	describe( 'name', () => {
		it( 'should equal material/list', () => {
			expect( name ).toStrictEqual( 'material/list' );
		} );
	} );

	describe( 'settings', () => {
		it( 'title should equal List (Material)', () => {
			expect( settings.title ).toStrictEqual( 'List (Material)' );
		} );

		it( 'category should equal material', () => {
			expect( metadata.category ).toStrictEqual( 'material' );
		} );

		it( 'should define attributes', () => {
			expect( metadata.attributes ).toBeDefined();
		} );

		it( 'should define style attribute', () => {
			expect( metadata.attributes.style ).toBeDefined();
		} );

		it( 'should define iconPosition attribute', () => {
			expect( metadata.attributes.iconPosition ).toBeDefined();
		} );

		it( 'should define iconSize attribute', () => {
			expect( metadata.attributes.iconSize ).toBeDefined();
		} );

		it( 'should define items attribute', () => {
			expect( metadata.attributes.items ).toBeDefined();
		} );
	} );
} );
