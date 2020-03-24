/**
 * WordPress dependencies
 */
import { InnerBlocks, InspectorControls } from '@wordpress/block-editor';

/**
 * Internal dependencies
 */
import './stlye.css';
import './editor.css';
import CardActions from './components/card-actions';

/**
 * Allowed blocks.
 *
 * @type {string[]}
 */
const ALLOWED_BLOCKS = [
	'material/card-image',
	'material/card-title',
	'material/card-secondary-text',
];

/**
 * Inner block template.
 *
 * @type {string[][]}
 */
const TEMPLATE = [
	[ 'material/card-image' ],
	[ 'material/card-title' ],
	[ 'material/card-secondary-text' ],
];

/**
 * Card Edit component.
 *
 * @param {Object} props - Component props.
 *
 * @return {Function} Function returning the HTML markup for the component.
 */
const Edit = props => {
	// const { style, columns } = props.attributes;

	return (
		<>
			<InspectorControls { ...props } />
			<div className="mdc-card basic-card">
				<div
					className="mdc-card__primary-action basic-card__primary-action mdc-ripple-upgraded"
					tabIndex={ 0 }
				>
					<InnerBlocks allowedBlocks={ ALLOWED_BLOCKS } template={ TEMPLATE } />
				</div>
				<div className="mdc-card__actions">
					<div className="mdc-card__action-buttons">
						<CardActions />
					</div>
				</div>
			</div>
		</>
	);
};

export default Edit;
