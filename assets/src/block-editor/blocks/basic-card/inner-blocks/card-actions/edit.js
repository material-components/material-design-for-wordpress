/**
 * WordPress dependencies.
 */
import { InnerBlocks } from '@wordpress/block-editor';

/**
 * Internal dependencies.
 */
import './editor.css';

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

/**
 * Card Actions Edit component.
 *
 * @param {Object} props - Component props.
 *
 * @return {Function} Function returning the HTML markup for the component.
 */
const Edit = ( { className } ) => (
	<div className={ className }>
		<div className="mdc-card__actions">
			<div className="mdc-card__action-buttons">
				<InnerBlocks
					allowedBlocks={ ALLOWED_BLOCKS }
					template={ TEMPLATE }
					templateLock={ false }
				/>
			</div>
		</div>
	</div>
);

export default Edit;
