/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { Toolbar } from '@wordpress/components';
import { BlockControls } from '@wordpress/block-editor';

/**
 * Block Controls component.
 *
 * @return {Function} Function returning the HTML markup for the component.
 */
const HandPickedPostsBlockControls = ( { attributes, setAttributes } ) => {
	const { editMode } = attributes;

	return (
		<BlockControls>
			<Toolbar
				controls={ [
					{
						icon: 'edit',
						title: __( 'Edit', 'material-theme=builder' ),
						onClick: () => setAttributes( { editMode: ! editMode } ),
						isActive: editMode,
					},
				] }
			/>
		</BlockControls>
	);
};

export default HandPickedPostsBlockControls;
