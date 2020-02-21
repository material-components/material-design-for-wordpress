/**
 * Internal dependencies
 */
import InspectorControls from './inspector-controls';
import SinglePostVertical from './single-post-vertical';
import SinglePostHorizontal from './single-post-horizontal';

/**
 * External dependencies
 */
import Masonry from 'react-masonry-css';

// @todo: Refactor Material design layout.
const PostsList = ( { attributes, setAttributes, recentPosts } ) => {
	const { style, columns } = attributes;

	return (
		<>
			<InspectorControls
				attributes={ attributes }
				setAttributes={ setAttributes }
			/>

			{ style === 'vertical' && (
				<Masonry
					breakpointCols={ columns }
					className="masonry-grid"
					columnClassName="masonry-grid_column"
				>
					{ recentPosts.map( ( post, postIndex ) => {
						const props = { post, postIndex, attributes };
						return (
							<div key={ postIndex }>
								<SinglePostVertical { ...props } />
							</div>
						);
					} ) }
				</Masonry>
			) }

			{ style === 'horizontal' && (
				<div className="mdc-layout-grid">
					<div className="mdc-layout-grid__inner">
						{ recentPosts.map( ( post, postIndex ) => {
							const props = { post, postIndex, attributes };
							return (
								<div
									key={ postIndex }
									className={ `mdc-layout-grid__cell--span-12` }
								>
									<SinglePostHorizontal { ...props } />
								</div>
							);
						} ) }
					</div>
				</div>
			) }
		</>
	);
};

export default PostsList;
