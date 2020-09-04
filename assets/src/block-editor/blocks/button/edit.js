/**
 * External dependencies
 */
import classNames from 'classnames';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { useEffect } from '@wordpress/element';

import { InspectorControls, RichText } from '@wordpress/block-editor';
import { PanelBody, ToggleControl, TextControl } from '@wordpress/components';
import { withSelect } from '@wordpress/data';

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
import GlobalShapeSize from '../../components/global-shape-size';
import GlobalColor, {
	GlobalColorContrastChecker,
} from '../../components/global-color';
import ToolbarUrlInputPopover from '../../components/toolbar-url-input-popover';
import genericAttributesSetter from '../../utils/generic-attributes-setter';
import { name as ContactFormBlockName } from '../contact-form';
import { name as ButtonBlockName } from './index';
import getConfig from '../../utils/get-config';

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
		isSubmit,
	},
	setAttributes,
	isSelected,
	className,
	isSubmitButton,
} ) => {
	const setter = genericAttributesSetter( setAttributes );

	useEffect( () => {
		if ( iconPosition !== 'none' && ! icon ) {
			setAttributes( { icon: findIcon( 'favorite' ) } );
		}
	}, [ icon, iconPosition ] );

	useEffect( () => {
		if ( isSubmitButton ) {
			setAttributes( { isSubmit: true } );
		}
	}, [ isSubmitButton ] );

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
					<div className="components-base-control">
						{ __(
							'Overrides will only apply to this button. Change Primary Color in ',
							'material-theme-builder'
						) }
						<a
							href={ getConfig( 'customizerUrls' ).colors }
							target="_blank"
							rel="noreferrer noopener"
						>
							{ __( 'Material Theme Options', 'material-theme-builder' ) }
						</a>
						{ __( ' to update all buttons.', 'material-theme-builder' ) }
					</div>

					{ hasBg( style ) && type === 'text' && (
						<GlobalColor
							label={ __( 'Container Color', 'material-theme-builder' ) }
							value={ backgroundColor }
							onChange={ setter( 'backgroundColor' ) }
							globalPropName={
								hasBg( style ) ? 'primary_color' : 'primary_text_color'
							}
						/>
					) }
					<GlobalColor
						label={ __( 'Text and icons Color', 'material-theme-builder' ) }
						value={ textColor }
						onChange={ setter( 'textColor' ) }
						globalPropName={
							hasBg( style ) ? 'primary_text_color' : 'primary_color'
						}
					/>

					{ hasBg( style ) && type === 'text' && (
						<GlobalColorContrastChecker
							textColor={ textColor }
							backgroundColor={ backgroundColor }
							textProp="primary_text_color"
							backgroundProp="primary_color"
						/>
					) }
				</PanelBody>
				{ type === 'text' && (
					<PanelBody
						title={ __( 'Corner Styles', 'material-theme-builder' ) }
						initialOpen={ true }
					>
						{ style !== 'text' ? (
							<>
								<div className="components-base-control">
									{ __(
										'Overrides will only apply to this button. Change Button corner styles in ',
										'material-theme-builder'
									) }
									<a
										href={ getConfig( 'customizerUrls' ).shape }
										target="_blank"
										rel="noreferrer noopener"
									>
										{ __( 'Material Theme Options', 'material-theme-builder' ) }
									</a>
									{ __( ' to update all buttons.', 'material-theme-builder' ) }
								</div>
								<GlobalShapeSize
									value={ cornerRadius }
									onChange={ setter( 'cornerRadius' ) }
									min={ 0 }
									max={ 20 }
									blockName={ ButtonBlockName }
								/>
							</>
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

export default withSelect( ( select, { clientId } ) => {
	const { getBlockParentsByBlockName } = select( 'core/block-editor' );

	return {
		isSubmitButton:
			getBlockParentsByBlockName( clientId, ContactFormBlockName ).length > 0,
	};
} )( ButtonEdit );
