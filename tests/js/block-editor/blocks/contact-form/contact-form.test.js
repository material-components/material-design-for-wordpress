/**
 * Internal dependencies
 */
import {
	name,
	settings,
} from '../../../../../assets/src/block-editor/blocks/contact-form';
import BlockIcon from '../../../../../assets/src/block-editor/blocks/contact-form/components/block-icon';
import Edit from '../../../../../assets/src/block-editor/blocks/contact-form/edit';
import Save from '../../../../../assets/src/block-editor/blocks/contact-form/save';

describe( 'blocks: material/contact-form', () => {
	describe( 'name', () => {
		it( 'should equal material/contact-form', () => {
			expect( name ).toStrictEqual( 'material/contact-form' );
		} );
	} );

	describe( 'title settings', () => {
		it( 'should equal Contact Form', () => {
			expect( settings.title ).toStrictEqual( 'Contact Form' );
		} );
	} );

	describe( 'description settings', () => {
		it( 'should equal `A simple way to get feedback from folks visiting your site.`', () => {
			expect( settings.description ).toStrictEqual(
				'A simple way to get feedback from folks visiting your site.'
			);
		} );
	} );

	describe( 'category settings', () => {
		it( 'should equal material', () => {
			expect( settings.category ).toStrictEqual( 'material' );
		} );
	} );

	describe( 'icon settings', () => {
		it( 'should be equal to the BlockIcon component', () => {
			expect( settings.icon ).toStrictEqual( BlockIcon );
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
