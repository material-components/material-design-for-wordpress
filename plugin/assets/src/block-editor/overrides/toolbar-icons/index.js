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
import { __ } from '@wordpress/i18n';
import { useCallback, useState } from '@wordpress/element';
import { useAnchorRef, registerFormatType } from '@wordpress/rich-text';
import { RichTextToolbarButton } from '@wordpress/block-editor';
import { Popover } from '@wordpress/components';

/**
 * Internal dependencies
 */
import barIcon from './components/block-icon';
import { getConfig, getIconName } from '../../utils';
import IconPicker from '../../components/icon-picker';
import genericAttributesSetter from '../../utils/generic-attributes-setter';

const inlineIcon = ( {
	value,
	onChange,
	isActive,
	setAttributes,
	contentRef,
} ) => {
	// console.log( 'useAnchorRef', useAnchorRef );

	const setter = genericAttributesSetter( setAttributes );
	const [ isAddingIcon, setIsAddingIcon ] = useState( false );
	const enableIsAddingIcon = useCallback( () => setIsAddingIcon( true ), [
		setIsAddingIcon,
	] );
	const setIcon = icon => {
		console.log( icon );
	};

	// const settings = {};
	const anchorRef = useAnchorRef( { ref: contentRef, value } );
	let icon = 'spa';
	icon = getIconName( icon );
	// console.log(icon);
	return (
		<>
			<RichTextToolbarButton
				icon={ barIcon }
				title="inline icon"
				onClick={ enableIsAddingIcon }
			/>
			{ isAddingIcon && (
				<Popover
					// value={ value }
					// onClose={ onClose }
					className="components-inline-color-popover"
					anchorRef={ anchorRef }
				>
					<IconPicker
						currentIcon={ icon }
						onChange={ setIcon }
						contentRef={ contentRef }
					/>
				</Popover>
			) }
		</>
	);
};

registerFormatType( 'material/inline-icon', {
	title: 'inline icon',
	tagName: 'icons',
	className: null,
	edit: inlineIcon,
} );
