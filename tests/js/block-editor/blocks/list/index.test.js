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
		it( 'title should equal List', () => {
			expect( settings.title ).toStrictEqual( 'List' );
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

		it( 'should define leadingIconsEnabled attribute', () => {
			expect( settings.attributes.leadingIconsEnabled ).toBeDefined();
		} );

		it( 'should define trailingIconsEnabled attribute', () => {
			expect( settings.attributes.trailingIconsEnabled ).toBeDefined();
		} );
	} );
} );
