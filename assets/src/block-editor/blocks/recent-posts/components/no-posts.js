/**
 * WordPress dependencies
 */
import { Spinner, Placeholder } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import InspectorControls from '../../common-posts-list/components/inspector-controls';

/**
 * No Posts component. This component also serves to show a spinner while fetching the recent posts data.
 *
 * @param {Object} props - Component props.
 * @param {Object} props.attributes - Block attributes.
 * @param {Function} props.setAttributes - Function to set block attributes value.
 * @param {string} props.name - Component name.
 * @param {Object} props.recentPosts - Posts.
 *
 * @return {Function} A functional component.
 */
const NoPosts = ( { attributes, setAttributes, name, recentPosts } ) => (
	<>
		<InspectorControls
			attributes={ attributes }
			setAttributes={ setAttributes }
			name={ name }
		/>
		<Placeholder
			icon={ 'sticky' }
			label={ __( 'Recent Posts', 'material-theme-builder' ) }
		>
			{ ! Array.isArray( recentPosts ) ? (
				<Spinner />
			) : (
				__( 'No posts found.', 'material-theme-builder' )
			) }
		</Placeholder>
	</>
);

export default NoPosts;
