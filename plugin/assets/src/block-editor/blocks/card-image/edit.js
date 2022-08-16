/**
 * Copyright 2020 Google LLC
 *
 * Licensed uder the Apache License, Version 2.0 (the "License");
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
/**
 * WordPress dependencies
 */
// eslint-disable-next-line import/no-unresolved
import { useEntityProp, store as coreStore } from '@wordpress/core-data';
import { useBlockProps } from '@wordpress/block-editor';
import { useSelect } from '@wordpress/data';

/**
 * Internal dependencies
 */
import { getConfig } from '../../utils';

function getMediaSourceUrlBySizeSlug( media, slug ) {
	return (
		media?.media_details?.sizes?.[ slug ]?.source_url || media?.source_url
	);
}

/**
 * Edit.
 *
 * @param {Object}                                         props
 * @param {{postType:string,postId:number,queryId:number}} props.context
 * @return {JSX.Element} Block edit.
 */
const Edit = ( { context } ) => {
	const { postId, postType: postTypeSlug } = context;

	const preventAnchorLink = e => {
		e.preventDefault();
		return false;
	};

	const fallbackImage = getConfig( 'fallBackImageCard' );
	const [ featuredImage ] = useEntityProp(
		'postType',
		postTypeSlug,
		'featured_media',
		postId
	);

	const { media } = useSelect(
		select => {
			const { getMedia } = select( coreStore );
			return {
				media:
					featuredImage &&
					getMedia( featuredImage, {
						context: 'view',
					} ),
			};
		},
		[ featuredImage, postTypeSlug ]
	);

	const [ , , fullTitle ] = useEntityProp(
		'postType',
		postTypeSlug,
		'title',
		postId
	);
	const imageUrl = getMediaSourceUrlBySizeSlug( media, 'post-thumbnail' );

	return (
		<div { ...useBlockProps() }>
			{ /* eslint-disable-next-line jsx-a11y/anchor-is-valid */ }
			<a href="#" onClick={ preventAnchorLink }>
				<img
					className="mdc-image-list__image"
					src={ imageUrl || fallbackImage }
					alt={ media?.alt_text }
				/>
				<div
					className="mdc-image-list__supporting"
					dangerouslySetInnerHTML={ { __html: fullTitle?.rendered } }
				/>
			</a>
		</div>
	);
};

export default Edit;
