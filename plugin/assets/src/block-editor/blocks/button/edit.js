/**
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

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
import { getConfig, getIconName } from '../../utils';
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
	icon = getIconName( icon );

	if ( 'icon' === type ) {
		return (
			<button
				className="material-icons mdc-icon-button"
				style={ { ...( textColor ? { color: textColor } : {} ) } }
			>
				{ icon }
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
				<i className="material-icons mdc-button__icon">{ icon }</i>
			) }
			<RichText
				value={ label }
				placeholder={ __( 'Add text...', 'material-design' ) }
				withoutInteractiveFormatting
				allowedFormats={ [] }
				onChange={ setter( 'label' ) }
				className="material-block-button__link"
				identifier="text"
			/>
			{ icon && iconPosition === 'trailing' && (
				<i className="material-icons mdc-button__icon">{ icon }</i>
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
			setAttributes( { icon: 'spa' } );
		}
	}, [ icon, iconPosition ] ); // eslint-disable-line

	useEffect( () => {
		if ( isSubmitButton ) {
			setAttributes( { isSubmit: true } );
		}
	}, [ isSubmitButton ] ); // eslint-disable-line

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
			setAttributes( { icon: 'spa' } );
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
					title={ __( 'Styles', 'material-design' ) }
					initialOpen={ true }
				>
					<ImageRadioControl
						selected={ type }
						options={ BUTTON_TYPES }
						onChange={ switchType }
					/>

					{ type === 'text' && (
						<>
							<span>{ __( 'Variations', 'material-design' ) }</span>
							<ButtonGroup
								buttons={ BUTTON_STYLES }
								current={ style }
								onClick={ setter( 'style' ) }
							/>
						</>
					) }
				</PanelBody>
				<PanelBody
					title={ __( 'Icon', 'material-design' ) }
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
					title={ __( 'Colors', 'material-design' ) }
					initialOpen={ true }
				>
					<div className="components-base-control">
						{ __(
							'Overrides will only apply to this button. Change Primary Color in ',
							'material-design'
						) }
						<a
							href={ getConfig( 'customizerUrls' ).colors }
							target="_blank"
							rel="noreferrer noopener"
						>
							{ __( 'Material Design Options', 'material-design' ) }
						</a>
						{ __( ' to update all buttons.', 'material-design' ) }
					</div>

					{ hasBg( style ) && type === 'text' && (
						<GlobalColor
							label={ __( 'Container Color', 'material-design' ) }
							value={ backgroundColor }
							onChange={ setter( 'backgroundColor' ) }
							globalPropName={
								hasBg( style ) ? 'primary_color' : 'on_primary_color'
							}
						/>
					) }
					<GlobalColor
						label={ __( 'Text and icons Color', 'material-design' ) }
						value={ textColor }
						onChange={ setter( 'textColor' ) }
						globalPropName={
							hasBg( style ) ? 'on_primary_color' : 'primary_color'
						}
					/>

					{ hasBg( style ) && type === 'text' && (
						<GlobalColorContrastChecker
							textColor={ textColor }
							backgroundColor={ backgroundColor }
							textProp="on_primary_color"
							backgroundProp="primary_color"
						/>
					) }
				</PanelBody>
				{ type === 'text' && (
					<PanelBody
						title={ __( 'Corner Styles', 'material-design' ) }
						initialOpen={ true }
					>
						{ style !== 'text' ? (
							<>
								<div className="components-base-control">
									{ __(
										'Overrides will only apply to this button. Change Button corner styles in ',
										'material-design'
									) }
									<a
										href={ getConfig( 'customizerUrls' ).shape }
										target="_blank"
										rel="noreferrer noopener"
									>
										{ __( 'Material Design Options', 'material-design' ) }
									</a>
									{ __( ' to update all buttons.', 'material-design' ) }
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
									'material-design'
								) }
							</p>
						) }
					</PanelBody>
				) }
				{ ! isSubmit && (
					<PanelBody
						title={ __( 'Link Settings', 'material-design' ) }
						initialOpen={ true }
					>
						<ToggleControl
							label={ __( 'Open in new tab', 'material-design' ) }
							onChange={ onToggleOpenInNewTab }
							checked={ linkTarget === '_blank' }
						/>
						<TextControl
							value={ rel }
							label={ __( 'Link rel', 'material-design' ) }
							onChange={ setter( 'rel' ) }
						/>
					</PanelBody>
				) }
			</InspectorControls>
		</>
	);
};

export default withSelect( ( select, { clientId } ) => {
	const { getBlock, getBlockParentsByBlockName, getBlockRootClientId } = select(
		'core/block-editor'
	);
	let isSubmitButton = false;

	if ( 'undefined' === typeof getBlockParentsByBlockName ) {
		let parentId = getBlockRootClientId( clientId );

		while ( parentId ) {
			const parentBlock = getBlock( clientId );

			if ( parentBlock && parentBlock.name === ContactFormBlockName ) {
				isSubmitButton = true;
				break;
			}

			parentId = getBlockRootClientId( parentId );
		}
	} else {
		isSubmitButton =
			getBlockParentsByBlockName( clientId, ContactFormBlockName ).length > 0;
	}

	return {
		isSubmitButton,
	};
} )( ButtonEdit );
