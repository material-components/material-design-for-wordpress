/**
 * Internal dependencies
 */
import Button from './button';

/**
 * WordPress dependencies
 */
import { InspectorControls } from '@wordpress/block-editor';
import { PanelBody, PanelRow, ToggleControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

/**
 * Material button edit component.
 */
export default function ButtonEdit( { attributes, setAttributes } ) {
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
				<Button { ...attributes }>Button Text</Button>
			</>
		</>
	);
}
