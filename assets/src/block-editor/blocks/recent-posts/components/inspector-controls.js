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

import styleOptions from '../styles';

/**
 * Module Constants
 */
const CATEGORIES_LIST_QUERY = {
	per_page: 100, // @todo: Implement lookup of categories using auto complete field.
};

const MIN_NUMBER_OF_POSTS = 1;
const MAX_NUMBER_OF_POSTS = 12;

const MIN_POSTS_COLUMNS = 2;
const MAX_POSTS_COLUMNS = 4;

const MIN_POST_CONTENT_LENGTH = 10;
const MAX_POST_CONTENT_LENGTH = 30;

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
	}, [] );

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
		categories,
	} = attributes;

	return (
		<InspectorControls>
			<PanelBody title={ __( 'Styles', 'material-theme-builder' ) }>
				<ImageRadioControl
					selected={ style }
					options={ styleOptions }
					onChange={ setter( 'style' ) }
				/>
			</PanelBody>
			<PanelBody title={ __( 'Content', 'material-theme-builder' ) }>
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
							options={ [
								{
									label: __( 'Text above media', 'material-theme-builder' ),
									value: 'text-above-media',
								},
								{
									label: __( 'Text over media', 'material-theme-builder' ),
									value: 'text-over-media',
								},
								{
									label: __( 'Text under media', 'material-theme-builder' ),
									value: 'text-under-media',
								},
							] }
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

			<PanelBody title={ __( 'Post meta settings', 'material-theme-builder' ) }>
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
					label={ __( 'Featured Image', 'material-theme-builder' ) }
					checked={ displayFeaturedImage }
					onChange={ setter( 'displayFeaturedImage' ) }
				/>

				<ToggleControl
					label={ __( 'Comments Count', 'material-theme-builder' ) }
					checked={ displayCommentsCount }
					onChange={ setter( 'displayCommentsCount' ) }
				/>
				<ToggleControl
					label={ __( 'Post Author', 'material-theme-builder' ) }
					checked={ displayPostAuthor }
					onChange={ setter( 'displayPostAuthor' ) }
				/>
			</PanelBody>

			<PanelBody title={ __( 'Filtering', 'material-theme-builder' ) }>
				<QueryControls
					categoriesList={ categoriesList }
					selectedCategoryId={ categories }
					onCategoryChange={ setter( 'categories', value =>
						'' !== value ? value : undefined
					) }
				/>
			</PanelBody>
		</InspectorControls>
	);
};

export default RecentPostsInspectorControls;
