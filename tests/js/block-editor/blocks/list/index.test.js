/**
 * Internal dependencies
 */
import {
	name,
	settings,
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
			expect( settings.category ).toStrictEqual( 'material' );
		} );

		it( 'should define attributes', () => {
			expect( settings.attributes ).toBeDefined();
		} );

		it( 'should define style attribute', () => {
			expect( settings.attributes.style ).toBeDefined();
		} );

		it( 'should define iconPosition attribute', () => {
			expect( settings.attributes.iconPosition ).toBeDefined();
		} );

		it( 'should define iconSize attribute', () => {
			expect( settings.attributes.iconSize ).toBeDefined();
		} );

		it( 'should define items attribute', () => {
			expect( settings.attributes.items ).toBeDefined();
		} );
	} );
} );
