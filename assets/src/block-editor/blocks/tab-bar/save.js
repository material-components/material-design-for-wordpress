/**
 * Internal dependencies
 */
import { InnerBlocks } from '@wordpress/block-editor';

export default function TabBarSave() {
	return (
		<div className="mdc-tab-bar" role="tablist">
			<div className="mdc-tab-scroller">
				<div className="mdc-tab-scroller__scroll-area">
					<div className="mdc-tab-scroller__scroll-content">
						<InnerBlocks.Content />
					</div>
				</div>
			</div>
		</div>
	);
}
