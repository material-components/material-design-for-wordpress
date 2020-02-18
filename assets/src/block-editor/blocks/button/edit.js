/**
 * Internal dependencies
 */
import Button from './button';
import IconPicker from './components/icon-picker';

/**
 * WordPress dependencies
 */
import { useCallback } from 'react';
import { __ } from '@wordpress/i18n';
import { InspectorControls } from '@wordpress/block-editor';
import { PanelBody, PanelRow, ToggleControl } from '@wordpress/components';

/**
 * Material button edit component.
 */
export default function ButtonEdit( { attributes, setAttributes } ) {
	const { linkTarget, icon } = attributes;
	const setIcon = useCallback( newIcon => setAttributes( { icon: newIcon } ) );

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
				<PanelBody
					title={ __( 'Icon', 'material-theme-builder' ) }
					initialOpen={ true }
				>
					<IconPicker currentIcon={ icon } selectHandler={ setIcon } />
				</PanelBody>
			</InspectorControls>

			<>
				<Button { ...attributes }>Button Text</Button>
			</>
		</>
	);
}
