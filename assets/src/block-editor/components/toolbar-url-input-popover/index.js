/**
 * WordPress dependencies
 */
import {
	KeyboardShortcuts,
	Popover,
	ToolbarButton,
	ToolbarGroup,
} from '@wordpress/components';
import { useState } from '@wordpress/element';
import { rawShortcut, displayShortcut } from '@wordpress/keycodes';
import {
	BlockControls,
	__experimentalLinkControl as LinkControl,
} from '@wordpress/block-editor';
import { link, linkOff } from '@wordpress/icons';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import UrlInputPopover from '../url-input-popover';

const ToolbarUrlInputPopover = ( {
	isSelected,
	url,
	setURL,
	opensInNewTab,
	onChangeNewTab,
} ) => {
	const [ isURLPickerOpen, setIsURLPickerOpen ] = useState( false );
	const urlIsSet = !! url;
	const urlIsSetandSelected = urlIsSet && isSelected;

	const openLinkControl = () => {
		setIsURLPickerOpen( true );
	};
	const unlinkButton = () => {
		setURL( undefined );
		setIsURLPickerOpen( false );
	};

	const onChange = ( {
		url: newURL = '',
		opensInNewTab: newOpensInNewTab,
	} ) => {
		setURL( newURL );

		if ( opensInNewTab !== newOpensInNewTab ) {
			onChangeNewTab( newOpensInNewTab );
		}
	};

	let linkControl;

	if ( 'undefined' !== typeof LinkControl ) {
		linkControl = isURLPickerOpen && (
			<Popover
				position="bottom center"
				onClose={ () => setIsURLPickerOpen( false ) }
			>
				<LinkControl
					className="wp-block-navigation-link__inline-link-input"
					value={ { url, opensInNewTab } }
					onChange={ onChange }
				/>
			</Popover>
		);
	} else {
		linkControl = isURLPickerOpen && (
			<UrlInputPopover
				value={ url }
				onChange={ setURL }
				newTab={ opensInNewTab }
				onChangeNewTab={ onChangeNewTab }
				showNoFollow={ false }
				onPopupClose={ () => setIsURLPickerOpen( false ) }
				onFocusOutside={ () => setIsURLPickerOpen( false ) }
			/>
		);
	}

	return (
		<>
			<BlockControls>
				<ToolbarGroup>
					<ToolbarButton
						name="link"
						icon={ link }
						title={ __( 'Link', 'material-theme-builder' ) }
						shortcut={ displayShortcut.primary( 'k' ) }
						onClick={ openLinkControl }
					/>
					{ urlIsSetandSelected && (
						<ToolbarButton
							name="link"
							icon={ linkOff }
							title={ __( 'Unlink', 'material-theme-builder' ) }
							shortcut={ displayShortcut.primaryShift( 'k' ) }
							onClick={ unlinkButton }
							isActive={ true }
						/>
					) }
				</ToolbarGroup>
			</BlockControls>
			{ isSelected && (
				<KeyboardShortcuts
					bindGlobal
					shortcuts={ {
						[ rawShortcut.primary( 'k' ) ]: openLinkControl,
						[ rawShortcut.primaryShift( 'k' ) ]: unlinkButton,
					} }
				/>
			) }
			{ linkControl }
		</>
	);
};

export default ToolbarUrlInputPopover;
