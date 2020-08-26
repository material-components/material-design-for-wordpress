/**
 * Internal dependencies
 */
import {
	name,
	settings,
	metadata,
} from '../../../../../assets/src/block-editor/blocks/contact-form';
import Edit from '../../../../../assets/src/block-editor/blocks/contact-form/edit';
import Save from '../../../../../assets/src/block-editor/blocks/contact-form/save';

describe( 'blocks: material/contact-form', () => {
	describe( 'name', () => {
		it( 'should equal material/contact-form', () => {
			expect( name ).toStrictEqual( 'material/contact-form' );
		} );
	} );

	describe( 'title settings', () => {
		it( 'should equal Contact Form (Material)', () => {
			expect( settings.title ).toStrictEqual( 'Contact Form (Material)' );
		} );
	} );

	describe( 'description settings', () => {
		it( 'should equal `A simple way for people to get in contact with you.`', () => {
			expect( settings.description ).toStrictEqual(
				'A simple way for people to get in contact with you.'
			);
		} );
	} );

	describe( 'category settings', () => {
		it( 'should equal material', () => {
			expect( metadata.category ).toStrictEqual( 'material' );
		} );
	} );

	describe( 'settings attributes', () => {
		it( 'should equal material', () => {
			expect( metadata.attributes ).toBeDefined();
		} );
	} );

	describe( 'settings edit property', () => {
		it( 'should be equal to the Edit component', () => {
			expect( settings.edit ).toStrictEqual( Edit );
		} );
	} );

	describe( 'settings save property', () => {
		it( 'should be equal to the Save component', () => {
			expect( settings.save ).toStrictEqual( Save );
		} );
	} );
} );
