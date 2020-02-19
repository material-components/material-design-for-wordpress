/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { InspectorControls } from '@wordpress/block-editor';
import { Component } from '@wordpress/element';
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
	per_page: -1,
};

const MAX_NUMBER_OF_POSTS = 10;

// Since max number of post is limited to 10, no point to allow more than 10 columns
// @todo: Review the max number of columns
const MAX_POSTS_COLUMNS = 10;

/**
 * Recent Posts Inspector Controls
 */
export default class RecentPostsInspectorControls extends Component {
	constructor() {
		super( ...arguments );
		this.state = {
			categoriesList: [],
		};
	}

	componentDidMount() {
		this.isStillMounted = true;
		this.fetchRequest = apiFetch( {
			path: addQueryArgs( `/wp/v2/categories`, CATEGORIES_LIST_QUERY ),
		} )
			.then( categoriesList => {
				if ( this.isStillMounted ) {
					this.setState( { categoriesList } );
				}
			} )
			.catch( () => {
				if ( this.isStillMounted ) {
					this.setState( { categoriesList: [] } );
				}
			} );
	}

	componentWillUnmount() {
		this.isStillMounted = false;
	}

	render() {
		const { attributes, setAttributes } = this.props;

		const {
			style,
			columns,
			postsToShow,
			outlined,
			displayPostDate,
			displayPostContent,
			displayFeaturedImage,
			displayCommentsCount,
			displayPostAuthor,
			categories,
		} = attributes;

		const { categoriesList } = this.state;

		const styleOptions = [
			{
				label: __( 'Stacked', 'material-theme-builder' ),
				value: 'stacked',
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
				<PanelBody title={ __( 'Style', 'material-theme-builder' ) }>
					<ImageRadioControl
						selected={ style }
						options={ styleOptions }
						onChange={ value => setAttributes( { style: value } ) }
					/>
				</PanelBody>
				<PanelBody title={ __( 'Content', 'material-theme-builder' ) }>
					{ style === 'stacked' && (
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

				<PanelBody
					title={ __( 'Post meta settings', 'material-theme-builder' ) }
				>
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
					<ToggleControl
						label={ __( 'Featured Image', 'material-theme-builder' ) }
						checked={ displayFeaturedImage }
						onChange={ value =>
							setAttributes( { displayFeaturedImage: value } )
						}
					/>
					<ToggleControl
						label={ __( 'Comments Count', 'material-theme-builder' ) }
						checked={ displayCommentsCount }
						onChange={ value =>
							setAttributes( { displayCommentsCount: value } )
						}
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
	}
}
