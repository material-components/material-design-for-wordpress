/**
 * External dependencies
 */
import classNames from 'classnames';

/**
 * Internal dependencies
 */
import IconPicker from '../../../components/icon-picker';
import ButtonGroup from '../../../components/button-group';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { InspectorControls } from '@wordpress/block-editor';
import { /*Toolbar*/ PanelBody } from '@wordpress/components';
// import { BlockControls } from '@wordpress/block-editor';

export const ICON_POSITIONS = [
	{
		label: __( 'None', 'material-theme-builder' ),
		value: 'none',
	},
	{
		label: __( 'Leading', 'material-theme-builder' ),
		value: 'leading',
	},
	{
		label: __( 'Trailing', 'material-theme-builder' ),
		value: 'trailing',
	},
];

export const name = 'tab-item';

export const settings = {
	title: __( 'Tab Item', 'material-theme-builder' ),
	category: 'material',
	icon: <i className="material-icons">tab</i>,
	parent: [ 'material/tab-bar' ],
	attributes: {
		label: {
			type: 'string',
			default: 'Tab',
		},
		content: {
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
	supports: {
		inserter: false,
		alignWide: false,
	},
	edit( {
		attributes: { label, iconPosition, icon },
		setAttributes,
		isSelected,
	} ) {
		return (
			<>
				<div
					className={ classNames( 'mdc-tab', {
						'mdc-tab--active': isSelected,
					} ) }
				>
					<span className="mdc-tab__content">
						{ icon && iconPosition === 'leading' && (
							<i className="material-icons mdc-tab__icon">
								{ String.fromCharCode( icon?.hex ) }
							</i>
						) }
						<span className="mdc-tab__text-label">
							<span
								role="textbox"
								tabIndex={ 0 }
								contentEditable
								suppressContentEditableWarning
								onBlur={ e =>
									setAttributes( { label: e.currentTarget.textContent } )
								}
								onKeyPress={ event =>
									event.key === 'Enter' && event.currentTarget.blur()
								}
								style={ { cursor: 'text' } }
							>
								{ label }
							</span>
						</span>
						{ icon && iconPosition === 'trailing' && (
							<i className="material-icons mdc-tab__icon">
								{ String.fromCharCode( icon?.hex ) }
							</i>
						) }
					</span>
					<span className="mdc-tab-indicator mdc-tab-indicator--active">
						<span className="mdc-tab-indicator__content mdc-tab-indicator__content--underline"></span>
					</span>
				</div>

				<InspectorControls>
					<PanelBody
						title={ __( 'Icon', 'material-theme-builder' ) }
						initialOpen={ true }
					>
						<ButtonGroup
							buttons={ ICON_POSITIONS }
							current={ iconPosition }
							onClick={ val => setAttributes( { iconPosition: val } ) }
						/>

						{ iconPosition !== 'none' && (
							<IconPicker
								currentIcon={ icon }
								onChange={ val => setAttributes( { icon: val } ) }
							/>
						) }
					</PanelBody>
				</InspectorControls>
			</>
		);
	},
};
