/**
 * Internal dependencies
 */
import './style.css';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { createBlock } from '@wordpress/blocks';
import { dispatch, select } from '@wordpress/data';
import { useCallback } from '@wordpress/components';
import { InnerBlocks } from '@wordpress/block-editor';

/**
 * Material button edit component.
 */
export default function TabBarEdit( { clientId } ) {
	const addTabHandler = useCallback( () => {
		const innerCount = select( 'core/editor' ).getBlocksByClientId(
			clientId
		)[ 0 ].innerBlocks.length;

		dispatch( 'core/editor' ).insertBlock(
			createBlock( 'material/tab-item', {
				label: `${ __( 'Tab ', 'material-theme-builder' ) } ${ innerCount +
					1 }`,
			} ),
			innerCount,
			clientId
		);
	} );

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
							template={ [
								[
									'material/tab-item',
									{ label: __( 'Tab 1', 'material-theme-builder' ) },
								],
								[
									'material/tab-item',
									{ label: __( 'Tab 2', 'material-theme-builder' ) },
								],
							] }
						/>
						<button
							style={ {
								alignSelf: 'flex-end',
								marginBottom: '30px',
								marginLeft: '30px',
								padding: '4px 6px',
								backgroundColor: '#F4F5F6',
								fontSize: '13px',
								border: '1px solid #639EC7',
								borderRadius: '2px',
								color: '#639EC7',
								cursor: 'pointer',
							} }
							onClick={ addTabHandler }
						>
							<i
								className="material-icons"
								style={ { verticalAlign: 'middle' } }
							>
								add
							</i>
							<span>{ __( 'New Tab', 'material-theme-builder' ) }</span>
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}
