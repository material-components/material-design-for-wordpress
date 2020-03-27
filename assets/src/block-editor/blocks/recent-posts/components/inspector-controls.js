/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { InspectorControls } from '@wordpress/block-editor';
import { useState, useEffect, useCallback } from '@wordpress/element';
import {
	PanelBody,
	RangeControl,
	ToggleControl,
	QueryControls,
	RadioControl,
} from '@wordpress/components';
import apiFetch from '@wordpress/api-fetch';
import { addQueryArgs } from '@wordpress/url';

/**
 * Internal dependencies
 */
import ImageRadioControl from '../../../components/image-radio-control';
import genericAttributesSetter from '../../../utils/generic-attributes-setter';
import {
	CATEGORIES_LIST_QUERY,
	MIN_NUMBER_OF_POSTS,
	MAX_NUMBER_OF_POSTS,
	MIN_POSTS_COLUMNS,
	MAX_POSTS_COLUMNS,
	MIN_POST_CONTENT_LENGTH,
	MAX_POST_CONTENT_LENGTH,
	RECENT_POSTS_STYLES,
	CONTENT_LAYOUTS,
} from '../options';

/**
 * Recent Posts Inspector Controls component.
 *
 * @param {Object} props - Component props.
 * @param {Object} props.attributes - Block attributes.
 * @param {Function} props.setAttributes - Function to set block attributes value.
 *
 * @return {Function} A functional component.
 */
const RecentPostsInspectorControls = ( { attributes, setAttributes } ) => {
	const setter = useCallback( genericAttributesSetter( setAttributes ) );

	const [ categoriesList, setCategoriesList ] = useState( [] );
	const [ isStillMounted, setStillMounted ] = useState( true );

	useEffect( () => {
		setStillMounted( true );
		apiFetch( {
			path: addQueryArgs( `/wp/v2/categories`, CATEGORIES_LIST_QUERY ),
		} )
			.then( fetchedCategoriesList => {
				if ( isStillMounted ) {
					setCategoriesList( fetchedCategoriesList );
				}
			} )
			.catch( () => {
				if ( isStillMounted ) {
					setCategoriesList( [] );
				}
			} );

		return () => {
			setStillMounted( false );
		};
	}, [ isStillMounted ] );

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
				<RangeControl
					label={ __( 'Number of posts', 'material-theme-builder' ) }
					value={ postsToShow }
					onChange={ setter( 'postsToShow' ) }
					min={ MIN_NUMBER_OF_POSTS }
					max={ MAX_NUMBER_OF_POSTS }
				/>
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

			<PanelBody
				title={ __( 'Filtering', 'material-theme-builder' ) }
				initialOpen={ true }
			>
				<QueryControls
					categoriesList={ categoriesList }
					selectedCategoryId={ category }
					onCategoryChange={ setter( 'category', value =>
						'' !== value ? value : undefined
					) }
				/>
			</PanelBody>
		</InspectorControls>
	);
};

export default RecentPostsInspectorControls;
