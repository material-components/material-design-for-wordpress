/**
 * WordPress dependencies
 */
import { Spinner, Placeholder } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import InspectorControls from './inspector-controls';

/**
 * No Posts component.
 *
 * @param {Object} props
 * @param {Object} props.attributes - Block attributes.
 * @param {Function} props.setAttributes - Function to set block attributes value.
 * @param {Object} props.recentPosts - Posts.
 *
 * @return {Function} Function returning the HTML markup for the component.
 */
const NoPosts = ( { attributes, setAttributes, recentPosts } ) => (
	<>
		<InspectorControls
			attributes={ attributes }
			setAttributes={ setAttributes }
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
