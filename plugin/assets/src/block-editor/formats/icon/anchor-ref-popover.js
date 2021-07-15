/**
 * WordPress dependencies
 */
import { useAnchorRef } from '@wordpress/rich-text';
import { Popover } from '@wordpress/components';

/**
 * Internal dependencies
 */
import { icon as settings } from './index';
import IconPicker from '../../components/icon-picker';

const AnchorRefPopover = ( {
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

export default AnchorRefPopover;
