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
import { useMemo } from '@wordpress/element';
import { getRectangleFromRange } from '@wordpress/dom';
import { URLPopover } from '@wordpress/block-editor';

/**
 * Internal dependencies
 */
import IconPicker from '../../components/icon-picker';

const NotAnchorRefPopover = ( {
	isAddingIcon,
	onIconChange,
	contentRef,
	...props
} ) => {
	const anchorRect = useMemo( () => {
		// eslint-disable-next-line @wordpress/no-global-get-selection
		const selection = window.getSelection();
		const range =
			selection.rangeCount > 0 ? selection.getRangeAt( 0 ) : null;

		if ( ! range ) {
			return;
		}

		if ( isAddingIcon ) {
			return getRectangleFromRange( range );
		}

		let element = range.startContainer;

		element = element.nextElementSibling || element;

		while ( element.nodeType !== window.Node.ELEMENT_NODE ) {
			element = element.parentNode;
		}

		const closest = element.closest( 'span' );

		if ( closest ) {
			return closest.getBoundingClientRect();
		}
	}, [ isAddingIcon ] );

	if ( ! anchorRect ) {
		return null;
	}

	return (
		<URLPopover
			className="components-inline-icon-popover"
			anchorRect={ anchorRect }
			{ ...props }
		>
			<IconPicker
				currentIcon={ null }
				onChange={ onIconChange }
				contentRef={ contentRef }
			/>
		</URLPopover>
	);
};

export default NotAnchorRefPopover;
