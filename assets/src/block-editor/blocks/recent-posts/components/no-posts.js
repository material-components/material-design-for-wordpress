/**
 * WordPress dependencies
 */
import { Spinner, Placeholder } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import InspectorControls from './inspector-controls';

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
