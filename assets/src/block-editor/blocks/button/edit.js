/**
 * External dependencies
 */
import classNames from 'classnames';

/**
 * Internal dependencies
 */
import './style.css';
import hasBg from './utils/has-bg';
import StyleBox from './components/style-box';
import IconPicker from '../../components/icon-picker';
import * as styleIcons from './components/style-icons';
import genericAttributesSet from '../../utils/genericAttributesSet';
import IconPositionButtons from './components/icon-position-buttons';
import MaterialColorPalette from '../../components/material-color-palette';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { useCallback } from '@wordpress/element';
import { InspectorControls, ContrastChecker } from '@wordpress/block-editor';
import {
	PanelBody,
	PanelRow,
	ToggleControl,
	TextControl,
} from '@wordpress/components';

const NEW_TAB_REL = 'noreferrer noopener';

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
		iconPosition,
		backgroundColor,
	} = attributes;

	const setLabel = useCallback( event =>
		setAttributes( { label: event.currentTarget.textContent } )
	);

	const onToggleOpenInNewTab = useCallback(
		value => {
			const newLinkTarget = value ? '_blank' : undefined;

			let updatedRel = rel;
			if ( newLinkTarget && ! rel ) {
				updatedRel = NEW_TAB_REL;
			} else if ( ! newLinkTarget && rel === NEW_TAB_REL ) {
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
						onBlur={ setLabel }
						onKeyPress={ event =>
							event.key === 'Enter' && event.currentTarget.blur()
						}
					>
						{ label ?? __( 'BUTTON TEXT', 'material-theme-builder' ) }
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
						onChange={ newUrl => setAttributes( { url: newUrl } ) }
						className="components-base-control wp-block-button__inline-link"
					/>
				) }
			</div>

			<InspectorControls>
				<PanelBody
					title={ __( 'Styles', 'material-theme-builder' ) }
					initialOpen={ true }
				>
					<div className="styles-container">
						{ Object.keys( styleIcons ).map( styleIcon => {
							const StyleIconComponent = styleIcons[ styleIcon ];
							const name = styleIcons[ styleIcon ].name.replace( 'Icon', '' );

							return (
								<StyleBox
									key={ styleIcon }
									label={ name }
									active={ style === name.toLowerCase() }
									handleClick={ genericAttributesSet(
										'style',
										setAttributes
									).bind( this, name.toLowerCase() ) }
								>
									<StyleIconComponent />
								</StyleBox>
							);
						} ) }
					</div>
				</PanelBody>
				<PanelBody
					title={ __( 'Icon', 'material-theme-builder' ) }
					initialOpen={ true }
				>
					<IconPositionButtons
						currentPosition={ iconPosition }
						handleClick={ genericAttributesSet(
							'iconPosition',
							setAttributes
						) }
					/>
					{ iconPosition !== 'none' && (
						<IconPicker
							currentIcon={ icon }
							onChange={ genericAttributesSet( 'icon', setAttributes ) }
						/>
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
							onChange={ genericAttributesSet(
								'backgroundColor',
								setAttributes
							) }
						/>
					) }
					<MaterialColorPalette
						label={ __( 'Text Color', 'material-theme-builder' ) }
						value={ textColor }
						onChange={ genericAttributesSet( 'textColor', setAttributes ) }
					/>

					<ContrastChecker
						{ ...{
							textColor,
							backgroundColor,
						} }
					/>
				</PanelBody>
				<PanelBody
					title={ __( 'Link Settings', 'material-theme-builder' ) }
					initialOpen={ true }
				>
					<PanelRow>
						<ToggleControl
							label={ __( 'Open in new tab', 'material-theme-builder' ) }
							onChange={ onToggleOpenInNewTab }
							checked={ linkTarget === '_blank' }
						/>
					</PanelRow>
				</PanelBody>
			</InspectorControls>
		</>
	);
};

export default ButtonEdit;
