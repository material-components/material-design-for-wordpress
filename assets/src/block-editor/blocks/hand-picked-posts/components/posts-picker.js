/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { Placeholder, Button } from '@wordpress/components';

/**
 * Internal dependencies
 */
import WidgetsIcon from './widgets-icon';
import PostsControl from '../../../components/posts-control';

/**
 * Posts Picker component.
 *
 * @return {Function} Function returning the HTML markup for the component.
 */
const PostsPicker = ( { attributes, debouncedSpeak, setAttributes } ) => {
	const onDone = () => {
		setAttributes( { editMode: false } );
		debouncedSpeak(
			__( 'Showing Hand-picked Posts block preview.', 'material-theme-builder' )
		);
	};

	return (
		<Placeholder
			icon={ <WidgetsIcon /> }
			label={ __( 'Hand-picked Posts', 'material-theme-builder' ) }
			className="mtb-block-products-grid mtb-block-handpicked-posts"
		>
			{ __(
				'Display a selection of hand-picked posts.',
				'material-theme-builder'
			) }
			<div className="mtb-block-handpicked-posts__selection">
				<PostsControl
					selected={ attributes.posts }
					onChange={ ( value = [] ) => {
						const ids = value.map( ( { id } ) => id );
						setAttributes( { posts: ids } );
					} }
				/>
				<Button isDefault onClick={ onDone }>
					{ __( 'Done', 'material-theme-builder' ) }
				</Button>
			</div>
		</Placeholder>
	);
};

export default PostsPicker;
