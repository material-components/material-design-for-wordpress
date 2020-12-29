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
import { some, find, findIndex, get, pick, map } from 'lodash';
import classNames from 'classnames';

/**
 * WordPress dependencies
 */
import { InspectorControls, MediaPlaceholder } from '@wordpress/block-editor';
import {
	PanelBody,
	RangeControl,
	SelectControl,
	ToggleControl,
	withNotices,
} from '@wordpress/components';
import { compose } from '@wordpress/compose';
import { useCallback, useEffect, useState } from '@wordpress/element';
import { withSelect } from '@wordpress/data';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import { withId } from '../../components/with-id';
import GlobalShapeSize from '../../components/global-shape-size';
import {
	GridIcon,
	MasonryIcon,
} from '../common-posts-list/components/style-icons';
import ImageRadioControl from '../../components/image-radio-control';
import genericAttributesSetter from '../../utils/generic-attributes-setter';
import Gallery from './components/gallery';
import getConfig from '../../utils/get-config';
import './style.css';
import { name as ImageListBlockName } from './index';

const STYLES = [
	{
		label: __( 'Masonry', 'material-design' ),
		value: 'masonry',
		src: MasonryIcon,
	},
	{
		label: __( 'Grid', 'material-design' ),
		value: 'grid',
		src: GridIcon,
	},
];

const GUTTER_DEVICES = [
	{
		name: 'desktop',
		label: __( 'Desktop', 'material-design' ),
		icon: 'computer',
	},
	{
		name: 'tablet',
		label: __( 'Tablet', 'material-design' ),
		icon: 'tablet',
	},
	{
		name: 'mobile',
		label: __( 'Phone', 'material-design' ),
		icon: 'smartphone',
	},
];

export const pickRelevantMediaFiles = ( image, sizeSlug = 'large' ) => {
	const imageProps = pick( image, [ 'alt', 'id', 'link', 'caption' ] );
	imageProps.url =
		get( image, [ 'sizes', sizeSlug, 'url' ] ) ||
		get( image, [ 'media_details', 'sizes', sizeSlug, 'source_url' ] ) ||
		image.url;
	const fullUrl =
		get( image, [ 'sizes', 'full', 'url' ] ) ||
		get( image, [ 'media_details', 'sizes', 'full', 'source_url' ] );
	if ( fullUrl ) {
		imageProps.fullUrl = fullUrl;
	}
	return imageProps;
};

/**
 * Image List Edit component.
 *
 * @param {Object} props - Component props.
 * @param {Array} props.attributes.images - List of images in the gallery.
 * @param {string} props.attributes.style - Layout style of the gallery.
 * @param {number} props.attributes.columns - Columns in the gallery.
 * @param {Object} props.attributes.gutter - Column gutter for various devices.
 * @param {number} props.attributes.cornerRadius - Corner radius.
 * @param {boolean} props.attributes.displayCaptions - Display/hide captions.
 * @param {boolean} props.attributes.textProtection - Display/hide captions with text protection.
 * @param {string} props.attributes.linkTo - Image should link to.
 * @param {string} props.className - Class name for the block.
 * @param {boolean} props.isSelected - Determine if the block is selected.
 * @param {*} props.noticeUI - Null or NoticeUI component.
 * @param {Object} props.noticeOperations - Object with methods to show/remove notices.
 * @param {Function} props.onFocus - Callback when focused.
 * @param {Function} props.setAttributes - Callback to update block attributes.
 *
 * @return {Function} A functional component.
 */
const ImageListEdit = ( {
	attributes: {
		images,
		style,
		columns,
		gutter,
		cornerRadius,
		displayCaptions,
		textProtection,
		linkTo,
	},
	className,
	isSelected,
	noticeUI,
	noticeOperations,
	onFocus,
	setAttributes: origSetAttributes,
	useCaptions,
} ) => {
	/**
	 * When images are set, ensure the ids attribute is set.
	 */
	const setAttributes = useCallback(
		attributes => {
			if ( attributes.images ) {
				attributes = {
					...attributes,
					// Unlike images[ n ].id which is a string, always ensure the
					// ids array contains numbers as per its attribute type.
					ids: map( attributes.images, ( { id } ) => parseInt( id, 10 ) ),
				};
			}

			origSetAttributes( attributes );
		},
		[ origSetAttributes ]
	);

	const [ selectedImage, setSelectedImage ] = useState( 0 );
	const [ gutterDevice, setGutterDevice ] = useState( 'desktop' );

	// If `isSelected` is updated unselect images in the gallery.
	useEffect( () => {
		setSelectedImage( 0 );
	}, [ isSelected ] );

	const hasImages = !! images.length;
	const hasImagesWithId = hasImages && some( images, ( { id } ) => id );

	const setter = useCallback( genericAttributesSetter( setAttributes ) );

	// Set the gutter for selected device.
	const setGutter = useCallback(
		newGutter => {
			setAttributes( {
				gutter: { ...gutter, ...{ [ gutterDevice ]: newGutter } },
			} );
		},
		[ gutter, gutterDevice, setAttributes ]
	);

	// Get the caption for an image.
	const getCaption = id => {
		const item = find( useCaptions, image => Number( id ) === image.id );

		if ( item && item.hasOwnProperty( 'caption' ) ) {
			return item.caption.raw;
		}

		return '';
	};

	// Pick required image props.
	const selectImages = newImages => {
		setAttributes( {
			images: newImages.map( image => ( {
				...pickRelevantMediaFiles( image ),
				caption: image.caption,
				selected: false,
			} ) ),
		} );
	};

	// Remove an image from the gallery.
	const removeImage = useCallback(
		id => {
			setAttributes( { images: images.filter( image => id !== image.id ) } );
		},
		[ images, setAttributes ]
	);

	// Move an image in the gallery.
	const moveImage = useCallback(
		( id, dir = 'left' ) => {
			const newImages = [ ...images ],
				index = findIndex( newImages, image => id === image.id ),
				moveTo = 'left' === dir ? index - 1 : index + 1;

			if ( -1 !== index && -1 < moveTo ) {
				const image = newImages.splice( index, 1 );
				newImages.splice( moveTo, 0, image.pop() );

				setAttributes( { images: newImages } );
			}
		},
		[ images, setAttributes ]
	);

	/**
	 * Update image link.
	 *
	 * @param {number} id Image attachment ID.
	 * @param {string} link Link the image should point to.
	 */
	const updateImageLink = ( id, link ) => {
		const newImages = [ ...images ],
			index = findIndex( newImages, image => id === image.id );

		if ( -1 !== index ) {
			newImages[ index ].link = link;
			setAttributes( { images: newImages } );
		}
	};

	/**
	 * Handle upload errors.
	 *
	 * @param {string} message Error message.
	 */
	const onUploadError = message => {
		noticeOperations.removeAllNotices();
		noticeOperations.createErrorNotice( message );
	};

	const galleryProps = {
		images: images.map( image => {
			image.caption = getCaption( image.id ) || image.caption;
			return image;
		} ),
		style,
		columns,
		gutter,
		cornerRadius,
		displayCaptions,
		textProtection,
		linkTo,
		selectedImage,
		onRemove: removeImage,
		onMove: moveImage,
		onSelect: setSelectedImage,
		onLinkChange: updateImageLink,
	};

	return (
		<>
			{ 'function' === typeof noticeUI ? noticeUI() : noticeUI }

			{ hasImages && <Gallery { ...galleryProps } /> }

			<MediaPlaceholder
				addToGallery={ hasImagesWithId }
				isAppender={ hasImages }
				className={ className }
				disableMediaButtons={ hasImages && ! isSelected }
				icon={
					! hasImages && <i className="material-icons-outlined">filter</i>
				}
				labels={ {
					title: ! hasImages && __( 'Gallery (Material)', 'material-design' ),
					instructions: __(
						'Drag images, upload new ones or select files from your library.',
						'material-design'
					),
				} }
				onSelect={ selectImages }
				accept="image/*"
				allowedTypes={ [ 'image' ] }
				multiple
				value={ hasImagesWithId ? images : undefined }
				onError={ onUploadError }
				notices={ hasImages ? undefined : noticeUI }
				onFocus={ onFocus }
			/>

			<InspectorControls>
				<PanelBody
					title={ __( 'Styles', 'material-design' ) }
					initialOpen={ true }
				>
					<ImageRadioControl
						selected={ style }
						options={ STYLES }
						onChange={ setter( 'style' ) }
					/>
				</PanelBody>
				<PanelBody
					title={ __( 'Settings', 'material-design' ) }
					initialOpen={ true }
				>
					<RangeControl
						label={ __( 'Columns', 'material-design' ) }
						value={ columns }
						onChange={ setter( 'columns' ) }
						min={ 2 }
						max={ 5 }
					/>
					<RangeControl
						label={
							<>
								{ __( 'Gutter', 'material-design' ) }
								<div className="components-base-control__label-actions">
									{ GUTTER_DEVICES.map( device => (
										<button
											key={ device.name }
											className={ classNames( '', {
												'is-selected': device.name === gutterDevice,
											} ) }
											onClick={ () => setGutterDevice( device.name ) }
											title={ device.title }
										>
											<i className="material-icons">{ device.icon }</i>
										</button>
									) ) }
								</div>
							</>
						}
						value={ gutter[ gutterDevice ] || 0 }
						onChange={ value => setGutter( value ) }
						min={ 0 }
						max={ 24 }
					/>

					<div className="components-base-control">
						<label
							className="components-base-control__label"
							htmlFor="shape-size"
						>
							{ __( 'Corner Styles', 'material-design' ) }
						</label>

						<div>
							{ __(
								'Overrides will only apply to these images. Change Image Lists corner styles in ',
								'material-design'
							) }
							<a
								href={ getConfig( 'customizerUrls' ).shape }
								target="_blank"
								rel="noreferrer noopener"
							>
								{ __( 'Material Design Options', 'material-design' ) }
							</a>
							{ __( ' to update all Image Lists.', 'material-design' ) }
						</div>

						<GlobalShapeSize
							label={ __( 'Corner Styles', 'material-design' ) }
							value={ cornerRadius }
							onChange={ setter( 'cornerRadius' ) }
							min={ 0 }
							max={ 16 }
							blockName={ ImageListBlockName }
						/>
					</div>

					<ToggleControl
						label={ __( 'Captions', 'material-design' ) }
						checked={ displayCaptions }
						onChange={ setter( 'displayCaptions' ) }
					/>
					<ToggleControl
						label={ __( 'Text Protection', 'material-design' ) }
						checked={ textProtection }
						onChange={ setter( 'textProtection' ) }
					/>
				</PanelBody>

				<PanelBody
					title={ __( 'Link Settings', 'material-design' ) }
					initialOpen={ true }
				>
					<SelectControl
						label={ __( 'Link to', 'material-design' ) }
						value={ linkTo }
						options={ [
							{
								label: __( 'Media File', 'material-design' ),
								value: 'media',
							},
							{
								label: __( 'Attachment Page', 'material-design' ),
								value: 'attachment',
							},
							{
								label: __( 'Custom URL', 'material-design' ),
								value: 'custom',
							},
							{
								label: __( 'None', 'material-design' ),
								value: 'none',
							},
						] }
						onChange={ setter( 'linkTo' ) }
					/>
				</PanelBody>
			</InspectorControls>
		</>
	);
};

export default compose( [
	withId,
	withNotices,
	withSelect( ( select, { attributes } ) => {
		let useCaptions = [];

		if (
			! attributes ||
			! attributes.images ||
			! Array.isArray( attributes.images )
		) {
			return { useCaptions };
		}

		/**
		 * Get captions from media library using REST API.
		 */
		useCaptions = select( 'core' ).getEntityRecords( 'root', 'media', {
			include: attributes.images.map( image => image.id ),
		} );

		return {
			useCaptions,
		};
	} ),
] )( ImageListEdit );
