/**
 * WordPress dependencies
 */
import { Spinner, Placeholder } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

/**
 * No Posts component. This component also serves to show a spinner while fetching the recent posts data.
 *
 * @param {Object} props - Component props.
 * @param {string} props.name - Component name.
 * @param {Array} props.postsToDisplay - Posts.
 *
 * @return {Function} A functional component.
 */
const NoPosts = ( { name, postsToDisplay } ) => {
	let placeholderLabel = __( 'Recent Posts', 'material-theme-builder' );

	if ( name === 'material/hand-picked-posts' ) {
		placeholderLabel = __( 'Curated Post Collection', 'material-theme-builder' );
	}

	return (
		<>
			<Placeholder icon={ 'sticky' } label={ placeholderLabel }>
				{ ! Array.isArray( postsToDisplay ) ? (
					<Spinner />
				) : (
					__( 'No posts found.', 'material-theme-builder' )
				) }
			</Placeholder>
		</>
	);
};

export default NoPosts;
