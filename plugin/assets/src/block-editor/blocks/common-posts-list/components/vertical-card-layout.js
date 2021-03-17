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
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
import { RawHTML } from '@wordpress/element';

/**
 * Internal dependencies
 */
import CardImage from './card-image';
import CardHeader from './card-header';
import CardActions from './card-actions';

/**
 * Horizontal Card Layout component.
 *
 * @param {Object} props - Component props.
 * @param {string} props.excerpt - Post excerpt.
 * @param {string} props.imageSourceUrl - Image source URL.
 * @param {string} props.contentLayout - Content layout ('text-above-media', 'text-over-media' or text-under-media).
 * @param {boolean} props.outlined - Whether or not the card has an outlined style.
 * @param {boolean} props.displayPostContent - Whether or not to display the post content.
 * @param {number} props.postContentLength - Post content length.
 * @param {boolean} props.displayFeaturedImage - Whether or not to display the featured image.
 * @param {boolean} props.displayCommentsCount - Whether or not to display the comments count field.
 * @param {boolean} props.displayPostAuthor - Whether or not to display the post author field.
 *
 * @return {Function} A functional component.
 */
const VerticalCardLayout = props => {
	const {
		excerpt,
		imageSourceUrl,
		contentLayout,
		outlined,
		displayPostContent,
		postContentLength,
		displayFeaturedImage,
		displayCommentsCount,
		displayPostAuthor,
	} = props;

	const cardImageProps = { type: '16-9', ...props };

	return (
		<div
			className={ classnames(
				'mdc-card',
				{ 'mdc-card--outlined': outlined },
				'single-post-card',
				'single-post-basic'
			) }
		>
			<div
				className="mdc-card__primary-action single-post-card__primary-action mdc-ripple-upgraded"
				tabIndex={ 0 }
			>
				{ contentLayout === 'text-above-media' && <CardHeader { ...props } /> }

				{ contentLayout === 'text-over-media' &&
					displayFeaturedImage &&
					! imageSourceUrl && <CardHeader { ...props } /> }

				{ contentLayout === 'text-over-media' && ! displayFeaturedImage && (
					<CardHeader { ...props } />
				) }

				{ displayFeaturedImage && imageSourceUrl && (
					<CardImage { ...cardImageProps } />
				) }
				{ contentLayout === 'text-under-media' && <CardHeader { ...props } /> }
				{ displayPostContent && (
					<div
						className={ classnames(
							'single-post-card__secondary',
							`single-post-card__secondary-${ contentLayout }`,
							'mdc-typography',
							'mdc-typography--body2'
						) }
					>
						<RawHTML key="html">
							{ postContentLength < excerpt.trim().split( ' ' ).length
								? excerpt
										.trim()
										.split( ' ', postContentLength )
										.join( ' ' ) + ' ...'
								: excerpt
										.trim()
										.split( ' ', postContentLength )
										.join( ' ' ) }
						</RawHTML>
					</div>
				) }
			</div>
			{ ( displayPostAuthor || displayCommentsCount ) && (
				<CardActions { ...props } />
			) }
		</div>
	);
};

export default VerticalCardLayout;
