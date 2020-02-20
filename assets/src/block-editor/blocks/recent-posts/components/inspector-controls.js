/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { InspectorControls } from '@wordpress/block-editor';
import { useState, useEffect } from '@wordpress/element';

import {
	PanelBody,
	RangeControl,
	ToggleControl,
	QueryControls,
} from '@wordpress/components';
import apiFetch from '@wordpress/api-fetch';
import { addQueryArgs } from '@wordpress/url';

/**
 * Internal dependencies
 */
import ImageRadioControl from '../../../components/image-radio-control';
import HorizontalStyleIcon from './horizontal-style-icon';
import StackedStyleIcon from './stacked-style-icon';

/**
 * Module Constants
 */
const CATEGORIES_LIST_QUERY = {
	per_page: 100, // @todo: Implement lookup of categories using auto complete field.
};

const MAX_NUMBER_OF_POSTS = 12;

const MAX_POSTS_COLUMNS = 4;

/**
 * Recent Posts Inspector Controls
 *
 * @param props
 */
export default props => {
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
	}, [] );

	useEffect( () => {
		return () => {
			setStillMounted( false );
		};
	}, [] );

	const { attributes, setAttributes } = props;

	const {
		style,
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

	const styleOptions = [
		{
			label: __( 'Vertical', 'material-theme-builder' ),
			value: 'vertical',
			src: StackedStyleIcon,
		},
		{
			label: __( 'Horizontal', 'material-theme-builder' ),
			value: 'horizontal',
			src: HorizontalStyleIcon,
		},
	];

	return (
		<InspectorControls>
			<PanelBody title={ __( 'Styles', 'material-theme-builder' ) }>
				<ImageRadioControl
					selected={ style }
					options={ styleOptions }
					onChange={ value => setAttributes( { style: value } ) }
				/>
			</PanelBody>
			<PanelBody title={ __( 'Content', 'material-theme-builder' ) }>
				{ style === 'vertical' && (
					<RangeControl
						label={ __( 'Columns', 'material-theme-builder' ) }
						value={ columns }
						onChange={ value => setAttributes( { columns: value } ) }
						min={ 2 }
						max={ MAX_POSTS_COLUMNS }
					/>
				) }
				<RangeControl
					label={ __( 'Number of posts', 'material-theme-builder' ) }
					value={ postsToShow }
					onChange={ value => setAttributes( { postsToShow: value } ) }
					min={ 1 }
					max={ MAX_NUMBER_OF_POSTS }
				/>
				<ToggleControl
					label={ __( 'Outlined', 'material-theme-builder' ) }
					checked={ outlined }
					onChange={ value => setAttributes( { outlined: value } ) }
				/>
			</PanelBody>

			<PanelBody title={ __( 'Post meta settings', 'material-theme-builder' ) }>
				<ToggleControl
					label={ __( 'Post date', 'material-theme-builder' ) }
					checked={ displayPostDate }
					onChange={ value => setAttributes( { displayPostDate: value } ) }
				/>
				<ToggleControl
					label={ __( 'Post content', 'material-theme-builder' ) }
					checked={ displayPostContent }
					onChange={ value => setAttributes( { displayPostContent: value } ) }
				/>
				{ displayPostContent && (
					<RangeControl
						label={ __( 'Max number of words in excerpt' ) }
						value={ postContentLength }
						onChange={ value => setAttributes( { postContentLength: value } ) }
						min={ 10 }
						max={ 100 }
					/>
				) }
				<ToggleControl
					label={ __( 'Featured Image', 'material-theme-builder' ) }
					checked={ displayFeaturedImage }
					onChange={ value => setAttributes( { displayFeaturedImage: value } ) }
				/>
				<ToggleControl
					label={ __( 'Comments Count', 'material-theme-builder' ) }
					checked={ displayCommentsCount }
					onChange={ value => setAttributes( { displayCommentsCount: value } ) }
				/>
				<ToggleControl
					label={ __( 'Post Author', 'material-theme-builder' ) }
					checked={ displayPostAuthor }
					onChange={ value => setAttributes( { displayPostAuthor: value } ) }
				/>
			</PanelBody>

			<PanelBody title={ __( 'Filtering', 'material-theme-builder' ) }>
				<QueryControls
					categoriesList={ categoriesList }
					selectedCategoryId={ categories }
					onCategoryChange={ value =>
						setAttributes( {
							categories: '' !== value ? value : undefined,
						} )
					}
				/>
			</PanelBody>
		</InspectorControls>
	);
};
