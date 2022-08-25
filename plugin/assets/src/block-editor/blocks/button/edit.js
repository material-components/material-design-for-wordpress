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
import { compose } from '@wordpress/compose';
import { InspectorControls, RichText } from '@wordpress/block-editor';
import { PanelBody, ToggleControl, TextControl } from '@wordpress/components';
import { withSelect } from '@wordpress/data';

/**
 * Internal dependencies
 */
import './style.css';
import {
	BUTTON_STYLES,
	ICON_POSITIONS,
	BUTTON_TYPES,
	BUTTON_SIZE,
} from './options';
import { name as ButtonBlockName } from './index';
import hasBg from './utils/has-bg';
import { getConfig, getIconName } from '../../utils';
import IconPicker from '../../components/icon-picker';
import ButtonGroup from '../../components/button-group';
import ImageRadioControl from '../../components/image-radio-control';
import { withId } from '../../components/with-id';
import GlobalShapeSize from '../../components/global-shape-size';
import ToolbarUrlInputPopover from '../../components/toolbar-url-input-popover';
import genericAttributesSetter from '../../utils/generic-attributes-setter';
import { name as ContactFormBlockName } from '../contact-form';
import { getColor } from '../../components/with-global-default';
import ColorPanel from '../../components/global-color/color-panel';

/**
 * @typedef MdcButtonProps
 *
 * @property {string}   type            - The type of button.
 * @property {string}   backgroundColor - The background color of the button.
 * @property {string}   elevationStyle  - The style of the button.
 * @property {string}   textColor       - The text color of the button.
 * @property {string}   cornerRadius    - The corner radius of the button.
 * @property {string}   icon            - The icon of the button.
 * @property {string}   iconPosition    - The position of the icon in button.
 * @property {string}   label           - The label of the button.
 * @property {Function} setter          - The setter function.
 * @property {string}   size            - The size of the button.
 */

/**
 * Small component which either renders an icon button or a text button.
 *
 * @param {MdcButtonProps} props
 *
 * @return {JSX.Element} JSX.
 */
const MdcButton = ( {
	type,
	backgroundColor,
	elevationStyle,
	textColor,
	cornerRadius,
	icon,
	iconPosition,
	label,
	setter,
	size,
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
				...( backgroundColor && hasBg( elevationStyle )
					? { backgroundColor }
					: {} ),
				...( textColor ? { color: textColor } : {} ),
				...( cornerRadius !== undefined
					? { borderRadius: `${ cornerRadius }px` }
					: {} ),
			} }
			className={ classNames( 'mdc-button label-large', {
				[ `mdc-button--${ elevationStyle }` ]: true,
				[ `is-large` ]: size === 'large',
			} ) }
		>
			{ icon && ( iconPosition === 'leading' || type === 'icon' ) && (
				<i className="material-icons mdc-button__icon">{ icon }</i>
			) }
			<RichText
				value={ label }
				placeholder={ __( 'Add text…', 'material-design' ) }
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
 * @typedef MdcButtonEditProps
 *
 * @property {string}  url             - The url of the button.
 * @property {string}  rel             - Anchor rel.
 * @property {string}  icon            - The icon of the button.
 * @property {string}  type            - Type of button.
 * @property {string}  label           - Label of button.
 * @property {string}  elevationStyle  - Style of button.
 * @property {string}  textColor       - Text color of button.
 * @property {string}  linkTarget      - Link target of button.
 * @property {string}  cornerRadius    - Corner radius of button.
 * @property {string}  iconPosition    - Icon position within button.
 * @property {string}  backgroundColor - Background color of button.
 * @property {boolean} isSubmit        - Whether the button is a submit button.
 * @property {string}  tooltip         - Tooltip of button.
 * @property {string}  size            - Size of button.
 */

/**
 * Material button edit component.
 *
 * @param {Object}             props
 * @param {MdcButtonEditProps} props.attributes
 * @param {Function}           props.setAttributes
 * @param {boolean}            props.isSelected
 * @param {string}             props.className
 * @param {boolean}            props.isSubmitButton
 * @return {JSX.Element} JSX.
 */
const ButtonEdit = ( {
	attributes: {
		url,
		rel,
		icon,
		type,
		label,
		textColor,
		linkTarget,
		cornerRadius,
		iconPosition,
		backgroundColor,
		isSubmit,
		tooltip,
		size,
		elevationStyle,
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

	useEffect( () => {
		if ( 'large' === size ) {
			setAttributes( { elevationStyle: 'filled' } );
		}
	}, [ size ] ); //eslint-disable-line react-hooks/exhaustive-deps

	const colorSettings = {
		text: {
			label: __( 'Text Color', 'material-design' ),
			colorValue: getColor( 'on_primary_color', textColor ),
			onColorChange: setter( 'textColor' ),
			gradients: [], // Disable gradients
			disableCustomGradients: true,
		},
		container: {
			label: __( 'Container Color', 'material-design' ),
			colorValue: getColor( 'primary_color', backgroundColor ),
			onColorChange: setter( 'backgroundColor' ),
			gradients: [], // Disable gradients
			disableCustomGradients: true,
			globalPropName: hasBg( elevationStyle )
				? 'on_primary_color'
				: 'primary_color',
		},
	};

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
						elevationStyle,
						textColor,
						cornerRadius,
						icon,
						iconPosition,
						label,
						setter,
						size,
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
							<span>{ __( 'Size', 'material-design' ) }</span>
							<ButtonGroup
								buttons={ BUTTON_SIZE }
								current={ size }
								onClick={ setter( 'size' ) }
							/>
						</>
					) }

					{ type === 'text' && size !== 'large' && (
						<>
							<span>
								{ __( 'Variations', 'material-design' ) }
							</span>
							<ButtonGroup
								buttons={ BUTTON_STYLES }
								current={ elevationStyle }
								onClick={ setter( 'elevationStyle' ) }
							/>
						</>
					) }

					{ type === 'icon' && (
						<>
							<TextControl
								label={ __(
									'Tooltip Text',
									'material-theme-builder'
								) }
								onChange={ setter( 'tooltip' ) }
								value={ tooltip }
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
						<IconPicker
							currentIcon={ icon }
							onChange={ setter( 'icon' ) }
						/>
					) }
				</PanelBody>

				<ColorPanel colors={ colorSettings } />

				{ type === 'text' && (
					<PanelBody
						title={ __( 'Corner Styles', 'material-design' ) }
						initialOpen={ true }
					>
						{ elevationStyle !== 'text' && size !== 'large' && (
							<>
								<div className="components-base-control">
									{ __(
										'Overrides will only apply to this button. Change Button corner styles in ',
										'material-design'
									) }
									<a
										href={
											getConfig( 'customizerUrls' ).shape
										}
										target="_blank"
										rel="noreferrer noopener"
									>
										{ __(
											'Material Design Options',
											'material-design'
										) }
									</a>
									{ __(
										' to update all buttons.',
										'material-design'
									) }
								</div>
								<GlobalShapeSize
									value={ cornerRadius }
									onChange={ setter( 'cornerRadius' ) }
									min={ 0 }
									max={ 20 }
									blockName={ ButtonBlockName }
								/>
							</>
						) }

						{ ( elevationStyle === 'text' || size === 'large' ) && (
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

export default compose( [
	withSelect( ( select, { clientId } ) => {
		const {
			getBlock,
			getBlockParentsByBlockName,
			getBlockRootClientId,
		} = select( 'core/block-editor' );
		let isSubmitButton = false;

		if ( 'undefined' === typeof getBlockParentsByBlockName ) {
			let parentId = getBlockRootClientId( clientId );

			while ( parentId ) {
				const parentBlock = getBlock( clientId );

				if (
					parentBlock &&
					parentBlock.name === ContactFormBlockName
				) {
					isSubmitButton = true;
					break;
				}

				parentId = getBlockRootClientId( parentId );
			}
		} else {
			isSubmitButton =
				getBlockParentsByBlockName( clientId, ContactFormBlockName )
					.length > 0;
		}

		return {
			isSubmitButton,
		};
	} ),
	withId,
] )( ButtonEdit );
