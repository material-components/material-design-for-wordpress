/**
 * External dependencies
 */
import classNames from 'classnames';

/**
 * Internal dependencies
 */
import { ICON_POSITIONS } from '../../options';
import IconPicker from '../../../../components/icon-picker';
import ButtonGroup from '../../../../components/button-group';
import genericAttributesSetter from '../../../../utils/generic-attributes-setter';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { useCallback } from '@wordpress/element';
import { PanelBody } from '@wordpress/components';
import { InspectorControls } from '@wordpress/block-editor';

const ListItemEdit = ( {
	attributes: { primaryText, secondaryText, icon, iconPosition },
	setAttributes,
	className,
} ) => {
	// eslint-disable-next-line react-hooks/rules-of-hooks
	const setter = useCallback( genericAttributesSetter( setAttributes ) );

	const handleEnterPress = e => {
		if ( e.key !== 'Enter' ) {
			return true;
		}

		if ( e.key === 'Enter' && e.shiftKey ) {
			// Create help-text line
			setter( 'secondaryText' )(
				__( 'Secondary text...', 'material-theme-builder' )
			);
		} else {
			// Create new list item
		}

		e.currentTarget.blur();
	};

	return (
		<>
			<li
				className={ classNames( 'mdc-list-item', 'list-item', className, {
					'list-item--with-secondary': secondaryText,
				} ) }
				tabIndex={ 0 }
			>
				{ icon && iconPosition === 'leading' && (
					<i className="mdc-list-item__graphic material-icons">
						{ String.fromCharCode( icon?.hex ) }
					</i>
				) }
				<span className="mdc-list-item__text list-item__text-container">
					<span
						className="mdc-list-item__primary-text list-item__text-container__text"
						role="textbox"
						tabIndex={ 0 }
						contentEditable
						suppressContentEditableWarning
						onBlur={ setter( 'primaryText', e => e.currentTarget.textContent ) }
						onKeyPress={ handleEnterPress }
					>
						{ primaryText }
					</span>

					{ secondaryText && (
						<>
							<br />
							<span
								className="mdc-list-item__secondary-text list-item__text-container__text"
								role="textbox"
								tabIndex={ 0 }
								contentEditable
								suppressContentEditableWarning
								onKeyPress={ e => e.key === 'Enter' && e.currentTarget.blur() }
								onBlur={ setter(
									'secondaryText',
									e => e.currentTarget.textContent || null
								) }
							>
								{ secondaryText }
							</span>
						</>
					) }
				</span>

				{ icon && iconPosition === 'trailing' && (
					<i className="mdc-list-item__meta material-icons">
						{ String.fromCharCode( icon?.hex ) }
					</i>
				) }
			</li>

			<InspectorControls>
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
			</InspectorControls>
		</>
	);
};

export default ListItemEdit;
