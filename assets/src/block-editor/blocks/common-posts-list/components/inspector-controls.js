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
					title={ __( 'Content', 'material-theme-builder' ) }
					initialOpen={ true }
				>
					<RangeControl
						label={ __( 'Number of posts', 'material-theme-builder' ) }
						value={ postsToShow }
						onChange={ setter( 'postsToShow' ) }
						min={ MIN_NUMBER_OF_POSTS }
						max={ MAX_NUMBER_OF_POSTS }
					/>
				</PanelBody>
			) }
			<PanelBody
				title={ __( 'Post meta settings', 'material-theme-builder' ) }
				initialOpen={ true }
			>
				<ToggleControl
					label={ __( 'Post date', 'material-theme-builder' ) }
					checked={ displayPostDate }
					onChange={ setter( 'displayPostDate' ) }
				/>
				<ToggleControl
					label={ __( 'Post content', 'material-theme-builder' ) }
					checked={ displayPostContent }
					onChange={ setter( 'displayPostContent' ) }
				/>
				{ displayPostContent && (
					<RangeControl
						label={ __(
							'Max number of words in post content',
							'material-theme-builder'
						) }
						value={ postContentLength }
						onChange={ setter( 'postContentLength' ) }
						min={ MIN_POST_CONTENT_LENGTH }
						max={ MAX_POST_CONTENT_LENGTH }
					/>
				) }
				<ToggleControl
					label={ __( 'Featured image', 'material-theme-builder' ) }
					checked={ displayFeaturedImage }
					onChange={ setter( 'displayFeaturedImage' ) }
				/>

				<ToggleControl
					label={ __( 'Comments count', 'material-theme-builder' ) }
					checked={ displayCommentsCount }
					onChange={ setter( 'displayCommentsCount' ) }
				/>
				<ToggleControl
					label={ __( 'Post author', 'material-theme-builder' ) }
					checked={ displayPostAuthor }
					onChange={ setter( 'displayPostAuthor' ) }
				/>
			</PanelBody>

			{ name === 'material/recent-posts' && (
				<PanelBody title={ __( 'Filtering', 'material-theme-builder' ) }>
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
						title={ __( 'Order By', 'material-theme-builder' ) }
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
						title={ __( 'Posts', 'material-theme-builder' ) }
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
