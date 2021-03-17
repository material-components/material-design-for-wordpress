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
 * Internal dependencies
 */
import CardImage from './card-image';
import CardHeader from './card-header';
import CardActions from './card-actions';

/**
 * Horizontal Card Layout component.
 *
 * @param {Object} props - Component props.
 * @param {string} props.imageSourceUrl - Image source URL.
 * @param {boolean} props.outlined - Whether or not the card has an outlined style.
 * @param {boolean} props.displayFeaturedImage - Whether or not to display the featured image.
 * @param {boolean} props.displayCommentsCount - Whether or not to display the comments count field.
 * @param {boolean} props.displayPostAuthor - Whether or not to display the post author field.
 * @param {Object} props.post - Post data.
 * @param {string} props.dateFormat - Date format.
 *
 * @return {Function} A functional component.
 */
const HorizontalCardLayout = props => {
	const {
		imageSourceUrl,
		outlined,
		displayFeaturedImage,
		displayCommentsCount,
		displayPostAuthor,
	} = props;

	return (
		<div
			className={ classnames(
				'mdc-card',
				{ 'mdc-card--outlined': outlined },
				'single-post-card',
				'single-post-card__list',
				'single-post-basic'
			) }
		>
			<div
				className="mdc-card__primary-action single-post-card__primary-action"
				tabIndex={ 0 }
			>
				{ displayFeaturedImage && imageSourceUrl && (
					<CardImage imageSourceUrl={ imageSourceUrl } type="square" />
				) }
				<CardHeader { ...props } />
			</div>
			{ ( displayPostAuthor || displayCommentsCount ) && (
				<CardActions { ...props } />
			) }
		</div>
	);
};

export default HorizontalCardLayout;
