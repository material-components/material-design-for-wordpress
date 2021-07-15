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
import { useState, useCallback } from '@wordpress/element';
import { RichTextToolbarButton } from '@wordpress/block-editor';

/**
 * Internal dependencies
 */
import InlineIconUI from './inline';
import { icon as barIcon } from './icon';
import './style.css';

const name = 'material/inline-icon';
const title = __( 'Inline icon', 'material-design' );

function Edit( { value, onChange, contentRef, isActive, onFocus } ) {
	const [ isAddingIcon, setIsAddingIcon ] = useState( false );

	const enableIsAddingIcon = useCallback( () => setIsAddingIcon( true ), [
		setIsAddingIcon,
	] );

	const stopAddingIcon = () => {
		setIsAddingIcon( false );
		onFocus();
	};

	return (
		<>
			<RichTextToolbarButton
				icon={ barIcon }
				title="Inline icon"
				onClick={ enableIsAddingIcon }
			/>
			{ ( isAddingIcon || isActive ) && (
				<InlineIconUI
					isAddingIcon={ isAddingIcon }
					stopAddingIcon={ stopAddingIcon }
					isActive={ isActive }
					value={ value }
					onChange={ onChange }
					contentRef={ contentRef }
				/>
			) }
		</>
	);
}

export const icon = {
	name,
	title,
	keywords: [ __( 'icon', 'material-design' ) ],
	tagName: 'span',
	className: 'material-icons',
	edit: Edit,
};
