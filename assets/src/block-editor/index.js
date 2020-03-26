/* istanbul ignore file */

/**
 * Internal dependencies
 */
import { registerBlocks } from './helpers';
import './blocks/data-table/filters';

/**
 * Register the blocks.
 */
registerBlocks( require.context( './blocks', true, /(?<!test\/)index\.js$/ ) );
