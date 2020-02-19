/**
 * External dependencies
 */
import { useCallback } from 'react';

/**
 * Internal dependencies
 */
import './style.css';
import IconPicker from '../../components/icon-picker';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { InspectorControls } from '@wordpress/block-editor';
import { PanelBody, PanelRow, ToggleControl } from '@wordpress/components';

/**
 * Material button edit component.
 */
export default function ButtonEdit( { attributes, setAttributes } ) {
	const { linkTarget, icon, label } = attributes;

	const setIcon = useCallback( newIcon => setAttributes( { icon: newIcon } ) );
	const blurOnEnter = useCallback(
		event => event.key === 'Enter' && event.currentTarget.blur()
	);
	const setLabel = useCallback( event =>
		setAttributes( { label: event.currentTarget.textContent } )
	);

	return (
		<>
			<InspectorControls>
				<PanelBody
					title={ __( 'Icon', 'material-theme-builder' ) }
					initialOpen={ true }
				>
					<IconPicker currentIcon={ icon } pickHandler={ setIcon } />
				</PanelBody>
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

			<div className="mdc-button mdc-button--raised">
				<span
					className="mdc-button__label button-label"
					role="textbox"
					tabIndex={ 0 }
					contentEditable
					onBlur={ setLabel }
					onKeyPress={ blurOnEnter }
				>
					{ label ?? 'BUTTON TEXT' }
				</span>
			</div>
		</>
	);
}
