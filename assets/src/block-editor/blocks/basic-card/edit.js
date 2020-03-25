/**
 * WordPress dependencies
 */
import { InnerBlocks, InspectorControls } from '@wordpress/block-editor';

/**
 * Internal dependencies
 */
import './stlye.css';
import './editor.css';

/**
 * Allowed blocks.
 *
 * @type {string[]}
 */
const ALLOWED_BLOCKS = [ 'material/card-primary', 'material/card-actions' ];

/**
 * Inner block template.
 *
 * @type {string[][]}
 */
const TEMPLATE = [ [ 'material/card-primary' ], [ 'material/card-actions' ] ];

/**
 * Card Edit component.
 *
 * @param {Object} props - Component props.
 *
 * @return {Function} Function returning the HTML markup for the component.
 */
const Edit = props => {
	const { className } = props;

	return (
		<>
			<InspectorControls { ...props } />
			<div className={ className }>
				<div className="mdc-card basic-card">
					<InnerBlocks
						allowedBlocks={ ALLOWED_BLOCKS }
						template={ TEMPLATE }
						templateLock={ 'all' }
					/>
				</div>
			</div>
		</>
	);
};

export default Edit;
