/**
 * External dependencies
 */
import classNames from 'classnames';

/**
 * Internal dependencies
 */
import './style.css';
import hasBg from './utils/has-bg';
import IconPicker from '../../components/icon-picker';
import ButtonGroup from '../../components/button-group';
import { BUTTON_STYLES, ICON_POSITIONS } from './options';
import ImageRadioControl from '../../components/image-radio-control';
import genericAttributesSetter from '../../utils/genericAttributesSetter';
import MaterialColorPalette from '../../components/material-color-palette';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { useCallback } from '@wordpress/element';
import { InspectorControls, ContrastChecker } from '@wordpress/block-editor';
import {
	PanelBody,
	ToggleControl,
	TextControl,
	RangeControl,
} from '@wordpress/components';

/**
 * Material button edit component.
 */
const ButtonEdit = ( { attributes, setAttributes, isSelected, className } ) => {
	const {
		url,
		rel,
		icon,
		label,
		style,
		textColor,
		linkTarget,
		cornerRadius,
		iconPosition,
		backgroundColor,
	} = attributes;

	const setter = useCallback( genericAttributesSetter( setAttributes ) );

	const onToggleOpenInNewTab = useCallback(
		value => {
			const newLinkTarget = value ? '_blank' : undefined;

			let updatedRel = rel;
			if ( newLinkTarget && ! rel ) {
				updatedRel = 'noreferrer noopener';
			} else if ( ! newLinkTarget && rel === 'noreferrer noopener' ) {
				updatedRel = undefined;
			}

			setAttributes( {
				linkTarget: newLinkTarget,
				rel: updatedRel,
			} );
		},
		[ rel, setAttributes ]
	);

	return (
		<>
			<div className={ className }>
				<div
					style={ {
						...( backgroundColor && hasBg( style ) ? { backgroundColor } : {} ),
						...( textColor ? { color: textColor } : {} ),
						...( cornerRadius !== undefined
							? { borderRadius: `${ cornerRadius }px` }
							: {} ),
					} }
					className={ classNames( 'mdc-button', {
						[ `mdc-button--${ style }` ]: true,
					} ) }
				>
					{ icon && iconPosition === 'leading' && (
						<i className="material-icons mdc-button__icon">
							{ String.fromCharCode( icon?.hex ) }
						</i>
					) }
					<span
						className="mdc-button__label button-label"
						role="textbox"
						tabIndex={ 0 }
						contentEditable
						suppressContentEditableWarning
						onBlur={ setter( 'label', e => e.currentTarget.textContent ) }
						onKeyPress={ event =>
							event.key === 'Enter' && event.currentTarget.blur()
						}
					>
						{ label }
					</span>
					{ icon && iconPosition === 'trailing' && (
						<i className="material-icons mdc-button__icon">
							{ String.fromCharCode( icon?.hex ) }
						</i>
					) }
				</div>

				{ isSelected && (
					<TextControl
						value={ url }
						label={ __( 'Link', 'material-theme-builder' ) }
						placeholder={ __( 'Paste your URL...', 'material-theme-builder' ) }
						onChange={ setter( 'url' ) }
						className="components-base-control wp-block-button__inline-link"
					/>
				) }
			</div>

			<InspectorControls>
				<PanelBody
					title={ __( 'Styles', 'material-theme-builder' ) }
					initialOpen={ true }
				>
					<ImageRadioControl
						selected={ style }
						options={ BUTTON_STYLES }
						onChange={ setter( 'style' ) }
					/>
				</PanelBody>
				<PanelBody
					title={ __( 'Icon', 'material-theme-builder' ) }
					initialOpen={ true }
				>
					<ButtonGroup
						buttons={ ICON_POSITIONS }
						current={ iconPosition }
						onClick={ setter( 'iconPosition' ) }
					/>

					{ iconPosition !== 'none' && (
						<IconPicker currentIcon={ icon } onChange={ setter( 'icon' ) } />
					) }
				</PanelBody>
				<PanelBody
					title={ __( 'Colors', 'material-theme-builder' ) }
					initialOpen={ true }
				>
					{ hasBg( style ) && (
						<MaterialColorPalette
							label={ __( 'Background Color', 'material-theme-builder' ) }
							value={ backgroundColor }
							onChange={ setter( 'backgroundColor' ) }
						/>
					) }
					<MaterialColorPalette
						label={ __( 'Text Color', 'material-theme-builder' ) }
						value={ textColor }
						onChange={ setter( 'textColor' ) }
					/>

					<ContrastChecker
						textColor={ textColor }
						backgroundColor={ backgroundColor }
					/>
				</PanelBody>
				<PanelBody
					title={ __( 'Rounded Corners', 'material-theme-builder' ) }
					initialOpen={ true }
				>
					{ style !== 'text' ? (
						<RangeControl
							value={ cornerRadius }
							onChange={ setter( 'cornerRadius' ) }
							min={ 0 }
							max={ 36 }
						/>
					) : (
						<p>
							{ __(
								'Current button style does not support rounded corners.',
								'material-theme-builder'
							) }
						</p>
					) }
				</PanelBody>
				<PanelBody
					title={ __( 'Link Settings', 'material-theme-builder' ) }
					initialOpen={ true }
				>
					<ToggleControl
						label={ __( 'Open in new tab', 'material-theme-builder' ) }
						onChange={ onToggleOpenInNewTab }
						checked={ linkTarget === '_blank' }
					/>
					<TextControl
						value={ rel }
						label={ __( 'Link rel', 'material-theme-builder' ) }
						onChange={ setter( 'rel' ) }
					/>
				</PanelBody>
			</InspectorControls>
		</>
	);
};

export default ButtonEdit;
