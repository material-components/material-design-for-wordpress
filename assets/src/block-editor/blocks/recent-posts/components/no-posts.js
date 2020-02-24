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
 * @param {{value: string, label: string}[]} props.imageSizeOptions - Image sizes.
 *
 * @return {Function} Function returning the HTML markup for the component.
 */
const NoPosts = ( {
	attributes,
	setAttributes,
	recentPosts,
	imageSizeOptions,
} ) => (
	<>
		<InspectorControls
			attributes={ attributes }
			setAttributes={ setAttributes }
			imageSizeOptions={ imageSizeOptions }
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
