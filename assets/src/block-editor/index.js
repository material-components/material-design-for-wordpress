/* istanbul ignore file */

/**
 * WordPress dependencies
 */
import { updateCategory } from '@wordpress/blocks';

/**
 * Internal dependencies
 */
import { registerBlocks, MaterialLogo } from './helpers';
import './blocks/data-table/hooks';

/**
 * Register the blocks.
 */
registerBlocks( require.context( './blocks', true, /(?<!test\/)index\.js$/ ) );

/**
 * Update the material category icon to the material logo.
 */
updateCategory( 'material', {
	icon: () => <MaterialLogo />,
} );
