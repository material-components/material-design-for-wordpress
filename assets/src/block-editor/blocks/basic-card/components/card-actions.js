import { InnerBlocks } from '@wordpress/block-editor';

/**
 * Allowed blocks.
 *
 * @type {string[]}
 */
const ALLOWED_BLOCKS = [ 'material/button' ];

/**
 * Inner block template.
 *
 * @type {string[][]}
 */
const TEMPLATE = [ [ 'material/button' ] ];

const cardActions = () => {
	// return <InnerBlocks allowedBlocks={ ALLOWED_BLOCKS } template={ TEMPLATE } />;
	return <div>hello</div>;
};

export default cardActions;
