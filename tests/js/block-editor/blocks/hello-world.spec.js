/**
 * External dependencies
 */
import { render } from '@testing-library/react';

/**
 * Internal dependencies
 */
import {
	Edit,
	Save,
} from '../../../../assets/src/block-editor/blocks/hello-world';

describe( 'blocks: material/hello-world', () => {
	describe( 'Edit', () => {
		it( 'should equal Hello Editor', () => {
			render( <Edit /> );
			expect( document.querySelector( 'h2' ).textContent ).toStrictEqual(
				'Hello Editor'
			);
		} );
	} );

	describe( 'Save', () => {
		it( 'should equal Hello Website', () => {
			render( <Save /> );
			expect( document.querySelector( 'h2' ).textContent ).toStrictEqual(
				'Hello Website'
			);
		} );
	} );
} );
