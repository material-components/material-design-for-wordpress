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
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { InspectorControls } from '@wordpress/block-editor';
import {
	PanelBody,
	RangeControl,
	ToggleControl,
	QueryControls,
} from '@wordpress/components';

/**
 * Internal dependencies
 */
import genericAttributesSetter from '../../../utils/generic-attributes-setter';
import CardStylesPanel from '../../../components/card-styles-panel';
import PostsControl from '../../../components/posts-control';
import PostsOrderbyControl from '../../../components/post-order-by-control';

const MIN_NUMBER_OF_POSTS = 1;
const MAX_NUMBER_OF_POSTS = 12;

const MIN_POST_CONTENT_LENGTH = 10;
const MAX_POST_CONTENT_LENGTH = 30;

/**
 * Common Posts List Inspector Controls component.
 *
 * @param {Object} props - Component props.
 * @param {Object} props.attributes - Block attributes.
 * @param {Function} props.setAttributes - Function to set block attributes value.
 * @param {string} props.name - Block name.
 *
 * @return {Function} A functional component.
 */
const CommonPostsListInspectorControls = ( {
	attributes,
	setAttributes,
	name,
} ) => {
	const setter = genericAttributesSetter( setAttributes );

	const {
		style,
		contentLayout,
		columns,
		postsToShow,
		outlined,
		displayPostDate,
		displayPostContent,
		postContentLength,
		displayFeaturedImage,
		displayCommentsCount,
		displayPostAuthor,
		category,
		categoriesList,
		posts,
		orderby,
	} = attributes;

	return (
		<InspectorControls>
			<CardStylesPanel
				style={ style }
				columns={ columns }
				contentLayout={ contentLayout }
				outlined={ outlined }
				setter={ setter }
			/>
			{ name !== 'material/hand-picked-posts' && (
				<PanelBody
					title={ __( 'Content', 'material-design' ) }
					initialOpen={ true }
				>
					<RangeControl
						label={ __( 'Number of posts', 'material-design' ) }
						value={ postsToShow }
						onChange={ setter( 'postsToShow' ) }
						min={ MIN_NUMBER_OF_POSTS }
						max={ MAX_NUMBER_OF_POSTS }
					/>
				</PanelBody>
			) }
			<PanelBody
				title={ __( 'Post meta settings', 'material-design' ) }
				initialOpen={ true }
			>
				<ToggleControl
					label={ __( 'Post date', 'material-design' ) }
					checked={ displayPostDate }
					onChange={ setter( 'displayPostDate' ) }
				/>
				<ToggleControl
					label={ __( 'Post excerpt', 'material-design' ) }
					checked={ displayPostContent }
					onChange={ setter( 'displayPostContent' ) }
				/>
				{ displayPostContent && (
					<RangeControl
						label={ __(
							'Max number of words in post excerpt',
							'material-design'
						) }
						value={ postContentLength }
						onChange={ setter( 'postContentLength' ) }
						min={ MIN_POST_CONTENT_LENGTH }
						max={ MAX_POST_CONTENT_LENGTH }
					/>
				) }
				<ToggleControl
					label={ __( 'Featured image', 'material-design' ) }
					checked={ displayFeaturedImage }
					onChange={ setter( 'displayFeaturedImage' ) }
				/>

				<ToggleControl
					label={ __( 'Comments count', 'material-design' ) }
					checked={ displayCommentsCount }
					onChange={ setter( 'displayCommentsCount' ) }
				/>
				<ToggleControl
					label={ __( 'Post author', 'material-design' ) }
					checked={ displayPostAuthor }
					onChange={ setter( 'displayPostAuthor' ) }
				/>
			</PanelBody>

			{ name === 'material/recent-posts' && (
				<PanelBody title={ __( 'Filtering', 'material-design' ) }>
					<QueryControls
						categoriesList={ categoriesList }
						selectedCategoryId={ category }
						onCategoryChange={ setter( 'category', value =>
							'' !== value ? value : undefined
						) }
					/>
				</PanelBody>
			) }
			{ name === 'material/hand-picked-posts' && (
				<>
					<PanelBody
						title={ __( 'Order By', 'material-design' ) }
						initialOpen={ true }
					>
						<PostsOrderbyControl
							onChange={ setter( 'orderby', value =>
								'' !== value ? value : 'date'
							) }
							value={ orderby }
						/>
					</PanelBody>
					<PanelBody
						title={ __( 'Posts', 'material-design' ) }
						initialOpen={ false }
					>
						<PostsControl
							selected={ posts }
							onChange={ setter( 'posts', ( value = [] ) =>
								value.map( ( { id } ) => id )
							) }
						/>
					</PanelBody>
				</>
			) }
		</InspectorControls>
	);
};

export default CommonPostsListInspectorControls;
