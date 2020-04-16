/* global mtb */
/* istanbul ignore file */

/**
 * Internal dependencies
 */
import { registerBlocks } from './helpers';
import './blocks/data-table/hooks';

/**
 * Register the blocks.
 */
registerBlocks( require.context( './blocks', true, /(?<!test\/)index\.js$/ ) );

wp.domReady( function() {
	// Allow contact form block only for admin or editor.
	if ( mtb.allow_contact_form_block === false ) {
		wp.blocks.unregisterBlockType( 'material/contact-form' );
	}
} );
