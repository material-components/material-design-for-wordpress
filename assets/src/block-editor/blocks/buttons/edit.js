/**
 * Wordpress dependencies
 */
import { InnerBlocks } from '@wordpress/block-editor';

/**
 * Internal dependencies
 */
import './style.css';
import metadata from '../button/block.json';

const { name } = metadata;

const ALLOWED_BLOCKS = [ name ];
const BUTTONS_TEMPLATE = [ [ name ] ];

const Edit = () => {
	return (
		<div className="wp-block-material-buttons">
			<InnerBlocks
				allowedBlocks={ ALLOWED_BLOCKS }
				template={ BUTTONS_TEMPLATE }
				orientation="horizontal"
			/>
		</div>
	);
};

export default Edit;
