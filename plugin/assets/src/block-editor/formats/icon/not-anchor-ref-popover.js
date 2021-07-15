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
