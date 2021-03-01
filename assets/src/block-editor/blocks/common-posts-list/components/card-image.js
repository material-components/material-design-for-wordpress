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
import CardHeader from './card-header';

/**
 * Card Image component.
 *
 * @param {Object} props - Component props.
 * @param {string} props.imageSourceUrl - Image source URL.
 * @param {string} props.type - Media type ('16-9' or 'square').
 * @param {string} props.contentLayout - Content layout ('text-above-media', 'text-over-media' or text-under-media).
 *
 * @return {Function} A functional component.
 */
const CardImage = props => {
	const { imageSourceUrl, type, contentLayout } = props;

	return (
		<div
			className={ classnames(
				'mdc-card__media',
				`mdc-card__media--${ type }`,
				'single-post-card__media',
				{ [ `single-post-card-with-${ contentLayout }` ]: contentLayout }
			) }
			style={ { backgroundImage: `url(${ imageSourceUrl })` } }
		>
			{ contentLayout === 'text-over-media' && (
				<div className="mdc-card__media-content">
					<CardHeader { ...props } />
				</div>
			) }
		</div>
	);
};

export default CardImage;
