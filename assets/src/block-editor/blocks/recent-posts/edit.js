/**
 * Internal dependencies
 */
import RecentPosts from './recent-posts';

/**
 * WordPress dependencies
 */
import { InspectorControls } from '@wordpress/block-editor';
import { PanelBody, PanelRow, ToggleControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

/**
 * Material recent posts edit component.
 */
export default function RecentPostsEdit( { attributes, setAttributes } ) {
	const { linkTarget } = attributes;

	return (
		<>
			<InspectorControls>
				<PanelBody
					title={ __( 'Link Settings', 'material-theme-builder' ) }
					initialOpen={ true }
				>
					<PanelRow>
						<ToggleControl
							label={ __( 'Open in new tab', 'material-theme-builder' ) }
							checked={ linkTarget }
							onChange={ () => setAttributes( { linkTarget: ! linkTarget } ) }
						/>
					</PanelRow>
				</PanelBody>
			</InspectorControls>

			<>
				<RecentPosts { ...attributes }>Button Text</RecentPosts>
			</>
		</>
	);
}
