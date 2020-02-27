/**
 * Internal dependencies
 */
import './style.css';

/**
 * WordPress dependencies
 */
// import { dispatch } from '@wordpress/data';
// import { useState } from '@wordpress/element';
// import { createBlock } from '@wordpress/blocks';
import { InnerBlocks } from '@wordpress/block-editor';

/**
 * Material button edit component.
 */
export default function TabBarEdit() {
	// const [ tabCount, setTabCount ] = useState( 0 );

	// if ( tabCount === 0 ) {
	// 	dispatch( 'core/editor' ).insertBlock(
	// 		createBlock( 'material/tab-item' ),
	// 		{},
	// 		clientId
	// 	);

	// 	setTabCount( 2 );
	// }

	return (
		<div className="mdc-tab-bar" role="tablist">
			<div className="mdc-tab-scroller">
				<div className="mdc-tab-scroller__scroll-area">
					<div
						className="mdc-tab-scroller__scroll-content"
						style={ { display: 'flex' } }
					>
						<InnerBlocks
							allowedBlocks={ [ 'material/tab-item' ] }
							template={ [ [ 'material/tab-item' ], [ 'material/tab-item' ] ] }
							__experimentalCaptureToolbars={ true }
						/>
						<button style={ { alignSelf: 'flex-end' } }>
							<i className="material-icons">add</i>
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}
