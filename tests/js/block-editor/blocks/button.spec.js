/**
 * External dependencies
 */
import { render } from '@testing-library/react';

/**
 * Internal dependencies
 */
import {
	name,
	settings,
} from '../../../../assets/src/block-editor/blocks/button';

describe( 'blocks: material/button', () => {
	describe( 'name', () => {
		it( 'should equal material/button', () => {
			expect( name ).toStrictEqual( 'material/button' );
		} );
	} );

	describe( 'Save', () => {
		it( 'should equal Button Text', () => {
			render( <settings.save /> );
			expect( document.querySelector( 'Button' ).textContent ).toStrictEqual(
				'Button Text'
			);
		} );
	} );
} );
