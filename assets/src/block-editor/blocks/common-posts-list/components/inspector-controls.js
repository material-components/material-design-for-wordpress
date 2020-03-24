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
	RadioControl,
} from '@wordpress/components';

/**
 * Internal dependencies
 */
import ImageRadioControl from '../../../components/image-radio-control';
import genericAttributesSetter from '../../../utils/generic-attributes-setter';
import {
	MIN_NUMBER_OF_POSTS,
	MAX_NUMBER_OF_POSTS,
	MIN_POSTS_COLUMNS,
	MAX_POSTS_COLUMNS,
	MIN_POST_CONTENT_LENGTH,
	MAX_POST_CONTENT_LENGTH,
	RECENT_POSTS_STYLES,
	CONTENT_LAYOUTS,
} from '../options';

import PostsControl from '../../../components/posts-control';
import PostsOrderbyControl from '../../../components/post-order-by-control';

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
			<PanelBody
				title={ __( 'Styles', 'material-theme-builder' ) }
				initialOpen={ true }
			>
				<ImageRadioControl
					selected={ style }
					options={ RECENT_POSTS_STYLES }
					onChange={ setter( 'style' ) }
				/>
			</PanelBody>
			<PanelBody
				title={ __( 'Content', 'material-theme-builder' ) }
				initialOpen={ true }
			>
				{ ( style === 'masonry' || style === 'grid' ) && (
					<>
						<RangeControl
							label={ __( 'Columns', 'material-theme-builder' ) }
							value={ columns }
							onChange={ setter( 'columns' ) }
							min={ MIN_POSTS_COLUMNS }
							max={ MAX_POSTS_COLUMNS }
						/>
						<RadioControl
							label={ __( 'Content layout', 'material-theme-builder' ) }
							selected={ contentLayout }
							options={ CONTENT_LAYOUTS }
							onChange={ setter( 'contentLayout' ) }
						/>
					</>
				) }
				{ name !== 'material/hand-picked-posts' && (
					<RangeControl
						label={ __( 'Number of posts', 'material-theme-builder' ) }
						value={ postsToShow }
						onChange={ setter( 'postsToShow' ) }
						min={ MIN_NUMBER_OF_POSTS }
						max={ MAX_NUMBER_OF_POSTS }
					/>
				) }
				<ToggleControl
					label={ __( 'Outlined', 'material-theme-builder' ) }
					checked={ outlined }
					onChange={ setter( 'outlined' ) }
				/>
			</PanelBody>

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
							setAttributes={ setAttributes }
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
