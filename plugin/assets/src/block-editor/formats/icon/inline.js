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
	useAnchorRef,
	applyFormat,
	create,
	insert,
} from '@wordpress/rich-text';

/**
 * Internal dependencies
 */
import { icon as settings } from './index';
import AnchorRefPopover from './anchor-ref-popover';
import NotAnchorRefPopover from './not-anchor-ref-popover';

function InlineIconUI( {
	value,
	onChange,
	stopAddingIcon,
	contentRef,
	isAddingIcon,
} ) {
	const onIconChange = iconVal => {
		const newLocal = 0;
		const toInsert = applyFormat(
			create( { text: iconVal } ),
			{
				type: settings.name,
			},
			newLocal,
			iconVal.length
		);

		onChange( insert( value, toInsert ) );

		stopAddingIcon();
	};

	return 'undefined' !== typeof useAnchorRef ? (
		<AnchorRefPopover
			contentRef={ contentRef }
			value={ value }
			settings={ settings }
			stopAddingIcon={ stopAddingIcon }
			onIconChange={ onIconChange }
		/>
	) : (
		<NotAnchorRefPopover
			isAddingIcon={ isAddingIcon }
			value={ value }
			onIconChange={ onIconChange }
			contentRef={ contentRef }
		/>
	);
}

export default InlineIconUI;
