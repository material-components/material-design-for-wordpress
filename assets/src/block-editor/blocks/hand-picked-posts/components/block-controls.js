/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { Toolbar } from '@wordpress/components';
import { BlockControls } from '@wordpress/block-editor';

/**
 * Block Controls component.
 *
 * @param {Object} props - Component props.
 * @param {Object} props.attributes - Block attributes.
 * @param {Function} props.setAttributes - Function to set block attributes value.
 *
 * @return {Function} A functional component.
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
