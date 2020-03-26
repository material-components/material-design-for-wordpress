/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { Placeholder, Button } from '@wordpress/components';
import { useCallback } from '@wordpress/element';

/**
 * Internal dependencies
 */
import BlockIcon from './block-icon';
import PostsControl from '../../../components/posts-control';
import genericAttributesSetter from '../../../utils/generic-attributes-setter';

/**
 * Posts Picker component.
 *
 * @param {Object} props - Component props.
 * @param {Object} props.attributes - Block attributes.
 * @param {Function} props.debouncedSpeak - Function to debounce the call to the Speak method for accessibility purpose.
 * @param {Function} props.setAttributes - Function to set block attributes value.
 *
 * @return {Function} A functional component.
 */
const PostsPicker = ( { attributes, debouncedSpeak, setAttributes } ) => {
	const setter = useCallback( genericAttributesSetter( setAttributes ) );

	const onDone = () => {
		setAttributes( { editMode: false } );
		debouncedSpeak(
			__( 'Showing Hand-picked Posts block preview.', 'material-theme-builder' )
		);
	};

	return (
		<Placeholder
			icon={ <BlockIcon /> }
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
					onChange={ setter( 'posts', ( value = [] ) => {
						/* istanbul ignore next */
						return value.map( ( { id } ) => id );
					} ) }
				/>
				<Button isPrimary onClick={ onDone }>
					{ __( 'Done', 'material-theme-builder' ) }
				</Button>
			</div>
		</Placeholder>
	);
};

export default PostsPicker;
