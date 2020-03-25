/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
import { InnerBlocks } from '@wordpress/block-editor';

/**
 * Internal dependencies
 */
import InspectorControls from './components/inspector-controls';
import './editor.css';

/**
 * Allowed blocks.
 *
 * @type {string[]}
 */
const ALLOWED_BLOCKS = [ 'material/card' ];

/**
 * Inner block template.
 *
 * @type {string[][]}
 */
const TEMPLATE = [ [ 'material/card' ] ];
/**
 * Card Collections Edit component.
 *
 * @param {Object} props - Component props.
 *
 * @return {Function} Function returning the HTML markup for the component.
 */
const Edit = props => {
	const { attributes, className } = props;
	const { style, columns } = attributes;

	return (
		<>
			<InspectorControls { ...props } />
			<div className={ className }>
				{ ( style === 'grid' || style === 'list' ) && (
					<div className={ `mdc-layout-grid layout-${ style }` }>
						<div className="mdc-layout-grid__inner">
							<InnerBlocks
								allowedBlocks={ ALLOWED_BLOCKS }
								template={ TEMPLATE }
							/>
						</div>
					</div>
				) }

				{ style === 'masonry' && (
					<div className={ `masonry-grid layout-${ style }` }>
						<div
							className={ classnames(
								'masonry-grid_column',
								`layout-masonry-${ columns }`
							) }
						>
							<InnerBlocks
								allowedBlocks={ ALLOWED_BLOCKS }
								template={ TEMPLATE }
							/>
						</div>
					</div>
				) }
			</div>
		</>
	);
};

export default Edit;
