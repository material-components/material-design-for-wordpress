/**
 * External dependencies
 */
import classNames from 'classnames';
import { capitalize } from 'lodash';

/**
 * WordPress dependencies
 */
import { __, sprintf } from '@wordpress/i18n';
import { useEffect } from '@wordpress/element';

import {
	ContrastChecker,
	InspectorControls,
	RichText,
} from '@wordpress/block-editor';
import {
	PanelBody,
	ToggleControl,
	TextControl,
	RangeControl,
} from '@wordpress/components';

/**
 * Internal dependencies
 */
import './style.css';
import hasBg from './utils/has-bg';
import findIcon from '../../utils/find-icon';
import IconPicker from '../../components/icon-picker';
import ButtonGroup from '../../components/button-group';
import ImageRadioControl from '../../components/image-radio-control';
import { BUTTON_STYLES, ICON_POSITIONS, BUTTON_TYPES } from './options';
import { withGlobalDefaults } from '../../components/with-global-defaults';
import MaterialColorPalette from '../../components/material-color-palette';
import ToolbarUrlInputPopover from '../../components/toolbar-url-input-popover';
import genericAttributesSetter from '../../utils/generic-attributes-setter';

/**
 * Small component which either renders an icon button or a text button.
 */
const MdcButton = ( {
	type,
	backgroundColor,
	style,
	textColor,
	cornerRadius,
	icon,
	iconPosition,
	label,
	setter,
} ) => {
	if ( 'icon' === type ) {
		return (
			<button
				className="material-icons mdc-icon-button"
				style={ { ...( textColor ? { color: textColor } : {} ) } }
			>
				{ String.fromCharCode( icon?.hex ) }
			</button>
		);
	}

	return (
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
			{ icon && ( iconPosition === 'leading' || type === 'icon' ) && (
				<i className="material-icons mdc-button__icon">
					{ String.fromCharCode( icon?.hex ) }
				</i>
			) }
			<RichText
				value={ label }
				placeholder={ __( 'Add text...', 'material-theme-builder' ) }
				withoutInteractiveFormatting
				allowedFormats={ [] }
				onChange={ setter( 'label' ) }
				className="material-block-button__link"
				identifier="text"
			/>
			{ icon && iconPosition === 'trailing' && (
				<i className="material-icons mdc-button__icon">
					{ String.fromCharCode( icon?.hex ) }
				</i>
			) }
		</div>
	);
};

/**
 * Material button edit component.
 */
const ButtonEdit = ( {
	attributes: {
		url,
		rel,
		icon,
		type,
		label,
		style,
		textColor,
		linkTarget,
		cornerRadius,
		iconPosition,
		backgroundColor,
		isSubmit = false,
	},
	setAttributes,
	isSelected,
	className,
} ) => {
	const setter = genericAttributesSetter( setAttributes );

	useEffect( () => {
		if ( iconPosition !== 'none' && ! icon ) {
			setAttributes( { icon: findIcon( 'favorite' ) } );
		}
	}, [ icon, iconPosition, setAttributes ] );

	/**
	 * Sets ref and linkTarget when the toggle is touched.
	 *
	 * @param {boolean} value Whether the toggle is on or off.
	 */
	const onToggleOpenInNewTab = value => {
		const newLinkTarget = value ? '_blank' : '';

		let updatedRel = rel;
		if ( newLinkTarget && ! rel ) {
			updatedRel = 'noreferrer noopener';
		} else if ( ! newLinkTarget && rel === 'noreferrer noopener' ) {
			updatedRel = '';
		}

		setAttributes( {
			linkTarget: newLinkTarget,
			rel: updatedRel,
		} );
	};

	/**
	 * Set the type of the button: icon or text.
	 *
	 * @param {string} newType The new type of the button.
	 */
	const switchType = newType => {
		if ( 'icon' === newType && ! icon ) {
			setAttributes( { icon: { name: 'favorite', hex: 59517 } } );
		}

		setAttributes( { type: newType } );
	};

	return (
		<>
			<div className={ className }>
				<MdcButton
					{ ...{
						type,
						backgroundColor,
						style,
						textColor,
						cornerRadius,
						icon,
						iconPosition,
						label,
						setter,
					} }
				/>

				{ isSelected && (
					<ToolbarUrlInputPopover
						url={ url }
						setURL={ setter( 'url' ) }
						isSelected={ true }
						opensInNewTab={ linkTarget === '_blank' }
						onChangeNewTab={ onToggleOpenInNewTab }
					/>
				) }
			</div>

			<InspectorControls>
				<PanelBody
					title={ __( 'Styles', 'material-theme-builder' ) }
					initialOpen={ true }
				>
					<ImageRadioControl
						selected={ type }
						options={ BUTTON_TYPES }
						onChange={ switchType }
					/>

					<ToggleControl
						label={ __( 'Is a submit button?', 'material-theme-builder' ) }
						onChange={ setter( 'isSubmit' ) }
						checked={ isSubmit }
					/>
					{ type === 'text' && (
						<>
							<span>{ __( 'Container', 'material-theme-builder' ) }</span>
							<ButtonGroup
								buttons={ BUTTON_STYLES }
								current={ style }
								onClick={ setter( 'style' ) }
							/>
						</>
					) }
				</PanelBody>
				<PanelBody
					title={ __( 'Icon', 'material-theme-builder' ) }
					initialOpen={ true }
				>
					{ type !== 'icon' && (
						<ButtonGroup
							buttons={ ICON_POSITIONS }
							current={ iconPosition }
							onClick={ setter( 'iconPosition' ) }
						/>
					) }

					{ ( iconPosition !== 'none' || type === 'icon' ) && (
						<IconPicker currentIcon={ icon } onChange={ setter( 'icon' ) } />
					) }
				</PanelBody>
				<PanelBody
					title={ __( 'Colors', 'material-theme-builder' ) }
					initialOpen={ true }
				>
					{ hasBg( style ) && type === 'text' && (
						<MaterialColorPalette
							label={ __( 'Background Color', 'material-theme-builder' ) }
							value={ backgroundColor }
							onChange={ setter( 'backgroundColor' ) }
						/>
					) }
					<MaterialColorPalette
						label={ sprintf(
							__( '%s Color', 'material-theme-builder' ),
							capitalize( type )
						) }
						value={ textColor }
						onChange={ setter( 'textColor' ) }
					/>

					{ hasBg( style ) && type === 'text' && (
						<ContrastChecker
							textColor={ textColor }
							backgroundColor={ backgroundColor }
						/>
					) }
				</PanelBody>
				{ type === 'text' && (
					<PanelBody
						title={ __( 'Rounded Corners', 'material-theme-builder' ) }
						initialOpen={ true }
					>
						{ style !== 'text' ? (
							<RangeControl
								value={ cornerRadius }
								onChange={ setter( 'cornerRadius' ) }
								min={ 0 }
								max={ 20 }
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
				) }
				{ ! isSubmit && (
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
				) }
			</InspectorControls>
		</>
	);
};

export default withGlobalDefaults( ButtonEdit );
