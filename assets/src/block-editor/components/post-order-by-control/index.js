/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { SelectControl } from '@wordpress/components';

/**
 * A pre-configured SelectControl for post orderby settings.
 */
const PostsOrderbyControl = ( { value, setAttributes } ) => {
	return (
		<SelectControl
			label={ __( 'Order posts by', 'material-theme-builder' ) }
			value={ value }
			options={ [
				{
					label: __( 'Newness - newest first', 'material-theme-builder' ),
					value: 'date',
				},
				{
					label: __( 'Title - alphabetical', 'material-theme-builder' ),
					value: 'title',
				},
				{
					label: __( 'Comments - most first', 'material-theme-builder' ),
					value: 'popularity',
				},
			] }
			onChange={ orderby => setAttributes( { orderby } ) }
		/>
	);
};

export default PostsOrderbyControl;
