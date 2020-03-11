/**
 * Internal dependencies
 */
import { ICON_POSITIONS } from '../options';
import ButtonGroup from '../../../components/button-group';
import genericAttributesSetter from '../../../utils/generic-attributes-setter';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { useCallback } from '@wordpress/element';
import { PanelBody } from '@wordpress/components';
import IconPicker from '../../../components/icon-picker';
import { InspectorControls } from '@wordpress/block-editor';

const name = 'material/list-item';

const settings = {
	title: __( 'List Item', 'material-theme-builder' ),
	category: 'material',
	parent: [ 'material/list' ],
	icon: <i className="material-icons">list</i>,
	supports: { inserter: false },
	attributes: {
		primaryText: {
			type: 'string',
			default: 'List item',
		},
		secondaryText: {
			type: 'string',
		},
		iconPosition: {
			type: 'string',
			default: 'none',
		},
		icon: {
			type: 'object',
		},
	},
	edit: ( {
		attributes: { primaryText, secondaryText, icon, iconPosition },
		setAttributes,
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
					className="mdc-list-item"
					tabIndex="0"
					style={ secondaryText && { height: 'auto', paddingBottom: '10px' } }
				>
					{ icon && iconPosition === 'leading' && (
						<i className="mdc-list-item__graphic material-icons">
							{ String.fromCharCode( icon?.hex ) }
						</i>
					) }
					<span
						className="mdc-list-item__text"
						style={ { overflow: 'visible' } }
					>
						<span
							className="mdc-list-item__primary-text list-item-text"
							role="textbox"
							tabIndex={ 0 }
							contentEditable
							suppressContentEditableWarning
							onBlur={ setter(
								'primaryText',
								e => e.currentTarget.textContent
							) }
							onKeyPress={ handleEnterPress }
						>
							{ primaryText }
						</span>

						{ secondaryText && (
							<>
								<br />
								<span
									className="mdc-list-item__secondary-text list-item-text"
									role="textbox"
									tabIndex={ 0 }
									contentEditable
									suppressContentEditableWarning
									onKeyPress={ e => e.keyCode === 13 && e.currentTarget.blur() }
									onBlur={ setter(
										'secondaryText',
										e => e.currentTarget.textContent
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
	},
	save() {
		return <div></div>;
	},
};

export { name, settings };
