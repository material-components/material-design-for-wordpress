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
import classNames from 'classnames';

/**
 * WordPress dependencies
 */
import { URLInput } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';
import { LEFT, RIGHT, BACKSPACE, DELETE } from '@wordpress/keycodes';

/**
 * Internal dependencies
 */
import Image from './image';

/**
 * Gallery component.
 *
 * @param {Object} props - Component props.
 * @param {Array} props.images - List of images in the gallery.
 * @param {string} props.style - Layout style of the gallery.
 * @param {number} props.columns - Columns in the gallery.
 * @param {Object} props.gutter - Column gutter for various devices.
 * @param {number} props.cornerRadius - Corner radius.
 * @param {boolean} props.displayCaptions - Display/hide captions.
 * @param {boolean} props.textProtection - Display/hide captions with text protection.
 * @param {number} props.selectedImage - Current selected image.
 * @param {string} props.linkTo - Image should link to.
 * @param {Function} props.onRemove - Callback when an image is removed.
 * @param {Function} props.onMove - Callback when an image is moved.
 * @param {Function} props.onSelect - Callback when an image is selected.
 * @param {Function} props.onLinkChange - Callback when linkTo is changed.
 * @param {boolean} props.isSaveContext - Is this `Save` context.
 *
 * @return {Function} A functional component.
 */
const Gallery = ( {
	images,
	style,
	columns,
	gutter,
	cornerRadius,
	displayCaptions,
	textProtection,
	selectedImage,
	linkTo,
	onRemove,
	onMove,
	onSelect,
	onLinkChange,
	isSaveContext = false,
} ) => {
	const desktopGutter = gutter.desktop || 0;
	let Tag = 'a';
	let tagProps = {};
	let wrapStyles = {},
		itemStyles = {},
		anchorStyles = {},
		captionStyles = {};

	// Generate styles only if we are not in the save context.
	if ( ! isSaveContext ) {
		if ( 'masonry' === style ) {
			wrapStyles = {
				columnCount: columns,
				columnGap: `${ desktopGutter }px`,
			};

			anchorStyles = {
				marginBottom: `${ desktopGutter }px`,
			};
		} else {
			itemStyles = {
				width: `calc(100% / ${ columns } - ${ desktopGutter + 1 / columns }px)`,
				margin: `${ desktopGutter / 2 }px`,
			};
		}

		captionStyles = {
			borderBottomLeftRadius: `${ cornerRadius }px`,
			borderBottomRightRadius: `${ cornerRadius }px`,
		};
	}

	/**
	 * Interprets keydown event intent to remove or move an image.
	 *
	 * @param {KeyboardEvent} event keydown event.
	 * @param {number} imageId Id of the Image.
	 */
	const onKeyDown = ( event, imageId ) => {
		const { keyCode } = event;

		switch ( keyCode ) {
			case LEFT:
				event.preventDefault();
				onMove( imageId, 'left' );
				break;
			case RIGHT:
				event.preventDefault();
				onMove( imageId, 'right' );
				break;
			case BACKSPACE:
			case DELETE:
				event.preventDefault();
				onRemove( imageId );
				break;
		}
	};

	if ( 'none' === linkTo || ! isSaveContext ) {
		Tag = 'div';
	}

	return (
		<ul
			className={ classNames( 'mdc-image-list', {
				'mdc-image-list--masonry': 'masonry' === style,
				'mdc-image-list--with-text-protection': textProtection,
			} ) }
			style={ wrapStyles }
		>
			{ images.map( ( image, i ) => {
				let href = image.link;

				if ( 'media' === linkTo ) {
					href = image.url;
				}

				if ( 'none' !== linkTo && isSaveContext ) {
					tagProps = { href };
				}

				return (
					<li
						key={ i }
						className="mdc-image-list__item"
						style={ itemStyles }
						role="presentation"
						onClick={ () => onSelect( image.id ) }
						onKeyDown={ event => onKeyDown( event, image.id ) }
					>
						<Tag
							className={ classNames( 'mdc-image-list__item-wrap', {
								'is-selected': ! isSaveContext && selectedImage === image.id,
							} ) }
							style={ anchorStyles }
							{ ...tagProps }
						>
							{ 'masonry' !== style ? (
								<div className="mdc-image-list__image-aspect-container">
									<Image
										{ ...image }
										cornerRadius={ cornerRadius }
										isSaveContext={ isSaveContext }
									/>
								</div>
							) : (
								<Image
									{ ...image }
									cornerRadius={ cornerRadius }
									isSaveContext={ isSaveContext }
								/>
							) }

							{ displayCaptions && '' !== image.caption && (
								<div
									className="mdc-image-list__supporting"
									style={ captionStyles }
								>
									<span className="mdc-image-list__label">
										{ image.caption }
									</span>
								</div>
							) }

							{ ! isSaveContext && (
								<>
									<div className="move-image">
										<button
											title={ __( 'Move left', 'material-design' ) }
											onClick={ () => onMove( image.id, 'left' ) }
										>
											<i className="material-icons">arrow_left</i>
										</button>
										<button
											title={ __( 'Move right', 'material-design' ) }
											onClick={ () => onMove( image.id, 'right' ) }
										>
											<i className="material-icons">arrow_right</i>
										</button>
									</div>

									<div className="remove-image">
										<button
											title={ __( 'Remove image', 'material-design' ) }
											onClick={ () => onRemove( image.id ) }
										>
											<i className="material-icons">close</i>
										</button>
									</div>

									{ 'custom' === linkTo && (
										<div className="custom-url">
											<i className="material-icons">link</i>
											<URLInput
												value={ image.link }
												onChange={ link => onLinkChange( image.id, link ) }
											/>
											<i className="material-icons">keyboard_return</i>
										</div>
									) }
								</>
							) }
						</Tag>
					</li>
				);
			} ) }
		</ul>
	);
};

export default Gallery;
