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
 * WordPress dependencies
 */
import { __experimentalGetSettings } from '@wordpress/date';

/**
 * Internal dependencies
 */
import VerticalCardLayout from './vertical-card-layout';
import HorizontalCardLayout from './horizontal-card-layout';

/**
 * Single Post component.
 *
 * @param {Object} props - Component props.
 * @param {Object} props.post - Post data.
 * @param {string} props.style - Card layout style.
 * @param {Object} props.attributes - Block attributes.
 *
 * @return {Function} A functional component.
 */
const SinglePost = ( { post, style, attributes } ) => {
	const titleTrimmed = post.title.rendered.trim();
	let excerpt = post.excerpt.rendered;

	const excerptElement = document.createElement( 'div' );
	excerptElement.innerHTML = excerpt;
	excerpt = excerptElement.textContent || excerptElement.innerText || '';

	const imageSourceUrl = post.featuredImageSourceUrl;
	const dateFormat = __experimentalGetSettings().formats.date;

	const styleProps = {
		post,
		titleTrimmed,
		excerpt,
		imageSourceUrl,
		dateFormat,
		...attributes,
	};

	return (
		<>
			{ style === 'grid' && <VerticalCardLayout { ...styleProps } /> }
			{ style === 'list' && <HorizontalCardLayout { ...styleProps } /> }
			{ style === 'masonry' && <VerticalCardLayout { ...styleProps } /> }
		</>
	);
};

export default SinglePost;
