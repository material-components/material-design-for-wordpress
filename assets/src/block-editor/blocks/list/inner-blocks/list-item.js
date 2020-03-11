/**
 * Internal dependencies
 */
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
		content: {
			type: 'string',
			default: 'List item',
		},
		icon: {
			type: 'object',
		},
	},
	edit: ( { attributes: { content, icon }, setAttributes } ) => {
		// eslint-disable-next-line react-hooks/rules-of-hooks
		const setter = useCallback( genericAttributesSetter( setAttributes ) );

		const handleEnterPress = e => {
			e.currentTarget.blur();

			if ( e.keyCode === 13 && e.shiftKey ) {
				// Create help-text line
			} else if ( e.keyCode === 13 ) {
				// Create new list item
			}

			e.preventDefault();
		};

		return (
			<>
				<li className="mdc-list-item" tabIndex="0">
					{ icon && (
						<i className="mdc-list-item__graphic material-icons">
							{ String.fromCharCode( icon?.hex ) }
						</i>
					) }
					<span
						className="mdc-list-item__text"
						role="textbox"
						tabIndex={ 0 }
						contentEditable
						suppressContentEditableWarning
						onBlur={ setter( 'content', e => e.currentTarget.textContent ) }
						onKeyPress={ handleEnterPress }
					>
						{ content }
					</span>
				</li>

				<InspectorControls>
					<PanelBody
						title={ __( 'Icon', 'material-theme-builder' ) }
						initialOpen={ true }
					>
						<IconPicker currentIcon={ icon } onChange={ setter( 'icon' ) } />
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
