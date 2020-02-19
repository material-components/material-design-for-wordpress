/**
 * Internal dependencies
 */
import './style.css';
import IconPicker from '../../components/icon-picker';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { useCallback } from '@wordpress/element';
import { InspectorControls } from '@wordpress/block-editor';
import {
	PanelBody,
	PanelRow,
	ToggleControl,
	TextControl,
} from '@wordpress/components';

const NEW_TAB_REL = 'noreferrer noopener';

// const URLPicker = ( {
// 	url,
// 	isSelected,
// 	setAttributes,
// 	opensInNewTab,
// 	onToggleOpenInNewTab,
// } ) => {
// 	return isSelected ? (
// 		<LinkControl
// 			className="wp-block-navigation-link__inline-link-input"
// 			value={ { url, opensInNewTab } }
// 			onChange={ ( { url: newURL = '', opensInNewTab: newOpensInNewTab } ) => {
// 				setAttributes( { url: newURL } );

// 				if ( opensInNewTab !== newOpensInNewTab ) {
// 					onToggleOpenInNewTab( newOpensInNewTab );
// 				}
// 			} }
// 		/>
// 	) : null;
// };

/**
 * Material button edit component.
 */
const ButtonEdit = ( { attributes, setAttributes, isSelected, className } ) => {
	const { linkTarget, icon, label, url, rel } = attributes;

	const setIcon = useCallback( newIcon => setAttributes( { icon: newIcon } ) );
	const blurOnEnter = useCallback(
		event => event.key === 'Enter' && event.currentTarget.blur()
	);
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
				<div className="mdc-button mdc-button--raised">
					<span
						className="mdc-button__label button-label"
						role="textbox"
						tabIndex={ 0 }
						contentEditable
						suppressContentEditableWarning
						onBlur={ setLabel }
						onKeyPress={ blurOnEnter }
					>
						{ label ?? __( 'BUTTON TEXT', 'material-theme-builder' ) }
					</span>
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
					title={ __( 'Icon', 'material-theme-builder' ) }
					initialOpen={ true }
				>
					<IconPicker currentIcon={ icon } pickHandler={ setIcon } />
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
