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
import { Popover } from '@wordpress/components';
import { getRectangleFromRange } from '@wordpress/dom';
import { useMemo } from '@wordpress/element';
import { URLPopover } from '@wordpress/block-editor';

/**
 * Internal dependencies
 */
import { icon as settings } from './index';
import IconPicker from '../../components/icon-picker';

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
				attributes: {
					className: 'material-icons',
				},
			},
			newLocal,
			iconVal.length
		);

		onChange( insert( value, toInsert ) );

		stopAddingIcon();
	};

	return 'undefined' !== typeof useAnchorRef ? (
		<AnchorRectPopover
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
	)
}

const AnchorRectPopover = ( {
	contentRef,
	value,
	stopAddingIcon,
	onIconChange,
} ) => {
	const anchorRef = useAnchorRef( { ref: contentRef, value, settings } );

	return (
		<Popover
			anchorRef={ anchorRef }
			focusOnMount={ false }
			onClose={ stopAddingIcon }
			position="bottom center"
			className="components-inline-icon-popover"
		>
			<IconPicker
				currentIcon={ null }
				onChange={ onIconChange }
				contentRef={ contentRef }
			/>
		</Popover>
	);
};

const NotAnchorRefPopover = ( {
	isAddingIcon,
	onIconChange,
	contentRef,
	...props
} ) => {
	const anchorRect = useMemo( () => {
		const selection = window.getSelection();
		const range = selection.rangeCount > 0 ? selection.getRangeAt( 0 ) : null;

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
			anchorRect={ anchorRect } { ...props }
			className="components-inline-icon-popover"
		>
			<IconPicker
				currentIcon={ null }
				onChange={ onIconChange }
				contentRef={ contentRef }
			/>
		</URLPopover>
	);
};

export default InlineIconUI;
