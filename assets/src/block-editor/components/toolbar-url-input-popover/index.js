/**
 * WordPress dependencies
 */
import {
	KeyboardShortcuts,
	ToolbarButton,
	ToolbarGroup,
} from '@wordpress/components';
import { useState } from '@wordpress/element';
import { rawShortcut, displayShortcut } from '@wordpress/keycodes';
import { BlockControls } from '@wordpress/block-editor';
import { link } from '@wordpress/icons';
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
	const openLinkControl = () => {
		setIsURLPickerOpen( true );
	};
	const linkControl = isURLPickerOpen && (
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
	return (
		<>
			<BlockControls>
				<ToolbarGroup>
					<ToolbarButton
						name="link"
						icon={ link }
						title={ __( 'Link' ) }
						shortcut={ displayShortcut.primary( 'k' ) }
						onClick={ openLinkControl }
					/>
				</ToolbarGroup>
			</BlockControls>
			{ isSelected && (
				<KeyboardShortcuts
					bindGlobal
					shortcuts={ {
						[ rawShortcut.primary( 'k' ) ]: openLinkControl,
					} }
				/>
			) }
			{ linkControl }
		</>
	);
};

export default ToolbarUrlInputPopover;
