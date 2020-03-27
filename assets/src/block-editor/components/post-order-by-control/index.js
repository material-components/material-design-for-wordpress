/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { SelectControl } from '@wordpress/components';

/**
 * A pre-configured SelectControl for post orderby settings.
 *
 * @param {Object} props - Component props.
 * @param {string} props.value - Ordering value.
 * @param {Function} props.onChange - Callback fired when the selected item changes.
 */
const PostsOrderbyControl = ( { value, onChange } ) => (
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
		onChange={ onChange }
	/>
);

export default PostsOrderbyControl;
