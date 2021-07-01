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
import {
	insert,
	create,
	applyFormat,
	registerFormatType,
} from '@wordpress/rich-text';
import { RichTextToolbarButton } from '@wordpress/block-editor';

/**
 * Internal dependencies
 */
import barIcon from './components/block-icon';
import { getIconName } from '../../utils';
import InlineIconUI from './components/inline';
import './style.css';

const name = 'material/inline-icon';
const title = __( 'Inline icon', 'material-design' );

export const icon = {
	title,
	keywords: [ __( 'icon', 'material-design' ) ],
	object: true,
	tagName: 'span',
	className: 'material-icons',
	attributes: {
		className: 'class',
	},
	edit: InlineIcon,
};

function InlineIcon( props ) {
	const {
		value,
		onChange,
		// isActive,
		// setAttributes,
		contentRef,
		isActive,
		activeAttributes,
		onFocus,
	} = props;
	const [ isAddingIcon, setIsAddingIcon ] = useState( false );

	//console.log( props );

	const enableIsAddingIcon = useCallback( () => setIsAddingIcon( true ), [
		setIsAddingIcon,
	] );

	const stopAddingIcon = () => {
		setIsAddingIcon( false );
		onFocus();
	};

	const setIcon = iconVal => {
		const toInsert = applyFormat(
			create( { text: iconVal } ),
			{
				type: name,
				attributes: {
					className: 'material-icons',
				},
			},
			0,
			iconVal.length
		);

		onChange( insert( value, toInsert ) );

		setIsAddingIcon( false );
	};

	return (
		<>
			<RichTextToolbarButton
				icon={ barIcon }
				title="inline icon"
				onClick={ enableIsAddingIcon }
			/>
			{ ( isAddingIcon || isActive ) && (
				<InlineIconUI
					isAddingIcon={ isAddingIcon }
					stopAddingIcon={ stopAddingIcon }
					isActive={ isActive }
					activeAttributes={ activeAttributes }
					value={ value }
					onChange={ setIcon }
					contentRef={ contentRef }
				/>
			) }
		</>
	);
}

registerFormatType( name, icon );
