/**
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * External dependencies
 */
import Masonry from 'react-masonry-css';

/**
 * Internal dependencies
 */
import SinglePost from './single-post';

/**
 * Posts List component.
 *
 * @param {Object} props - Component props.
 * @param {Object} props.attributes - Block attributes.
 * @param {Array} props.postsToDisplay - Posts.
 *
 * @return {Function} A functional component.
 */
const PostsList = ( { attributes, postsToDisplay } ) => {
	const { style, columns } = attributes;

	let columnSpan = 12;

	if ( style === 'grid' ) {
		/*
		 * This works well for the design if we have a maximum of 4 columns. It would not work
		 * so well for 5 and 7 columns for example. Something to keep in mind if the max number of columns
		 * increase above 4.
		 */
		columnSpan = Math.floor( 12 / columns );
	}

	return (
		<>
			{ ( style === 'grid' || style === 'list' ) && (
				<div className={ `mdc-layout-grid layout-${ style }` }>
					<div className="mdc-layout-grid__inner">
						{ postsToDisplay.map( ( post, postIndex ) => {
							const props = { post, style, attributes };
							return (
								<div
									key={ postIndex }
									className={ `mdc-layout-grid__cell--span-${ columnSpan }` }
								>
									<SinglePost { ...props } />
								</div>
							);
						} ) }
					</div>
				</div>
			) }

			{ style === 'masonry' && (
				<Masonry
					breakpointCols={ columns }
					className={ `masonry-grid layout-${ style }` }
					columnClassName="masonry-grid_column"
				>
					{ postsToDisplay.map( ( post, postIndex ) => {
						const props = { post, style, attributes };
						return (
							<div key={ postIndex }>
								<SinglePost { ...props } />
							</div>
						);
					} ) }
				</Masonry>
			) }
		</>
	);
};

export default PostsList;
