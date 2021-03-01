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
 * WordPress dependencies
 */
import {
	KeyboardShortcuts,
	Popover,
	ToolbarButton,
} from '@wordpress/components';
import { useState } from '@wordpress/element';
import { rawShortcut, displayShortcut } from '@wordpress/keycodes';
import {
	BlockControls,
	__experimentalLinkControl as LinkControl,
} from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import UrlInputPopover from '../url-input-popover';
import { ToolbarGroup } from '../polyfills';
import { link, linkOff } from './icons';

const ToolbarUrlInputPopover = ( {
	isSelected,
	url,
	setURL,
	opensInNewTab,
	onChangeNewTab,
	onFocusOutside = null,
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
				onFocusOutside={ onFocusOutside }
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
						title={ __( 'Link', 'material-design' ) }
						shortcut={ displayShortcut.primary( 'k' ) }
						onClick={ openLinkControl }
					/>
					{ urlIsSetandSelected && (
						<ToolbarButton
							name="link"
							icon={ linkOff }
							title={ __( 'Unlink', 'material-design' ) }
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
