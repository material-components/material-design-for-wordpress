/**
 * Internal dependencies
 */
import {
	name,
	settings,
} from '../../../../../../assets/src/block-editor/blocks/list/inner-blocks/list-item';

describe( 'blocks: material/list-item', () => {
	describe( 'name', () => {
		it( 'should equal material/list-item', () => {
			expect( name ).toStrictEqual( 'material/list-item' );
		} );
	} );

	describe( 'settings', () => {
		it( 'title should equal `List Item`', () => {
			expect( settings.title ).toStrictEqual( 'List Item' );
		} );

		it( 'category should equal material', () => {
			expect( settings.category ).toStrictEqual( 'material' );
		} );

		it( 'parent should equal material/list', () => {
			expect( settings.parent ).toStrictEqual( [ 'material/list' ] );
		} );

		it( 'should define attributes', () => {
			expect( settings.attributes ).toBeDefined();
		} );

		it( 'should define primaryText attribute', () => {
			expect( settings.attributes.primaryText ).toBeDefined();
		} );

		it( 'should define secondaryText attribute', () => {
			expect( settings.attributes.secondaryText ).toBeDefined();
		} );

		it( 'should define iconPosition attribute', () => {
			expect( settings.attributes.iconPosition ).toBeDefined();
		} );

		it( 'should define leadingIcon attribute', () => {
			expect( settings.attributes.leadingIcon ).toBeDefined();
		} );

		it( 'should define trailingIcon attribute', () => {
			expect( settings.attributes.trailingIcon ).toBeDefined();
		} );

		it( 'should define url attribute', () => {
			expect( settings.attributes.url ).toBeDefined();
		} );

		it( 'should define linkTarget attribute', () => {
			expect( settings.attributes.linkTarget ).toBeDefined();
		} );
	} );
} );
