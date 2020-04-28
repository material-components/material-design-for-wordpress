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
