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
import { __ } from '@wordpress/i18n';
import { dateI18n, format } from '@wordpress/date';
import { RawHTML } from '@wordpress/element';

/**
 * Card Header component.
 *
 * @param {Object} props - Component props.
 * @param {string} props.titleTrimmed - Post title trimmed.
 * @param {boolean} props.displayPostDate - Whether or not to display the post date field.
 * @param {Object} props.post - Post data.
 * @param {string} props.dateFormat - Date format.
 *
 * @return {Function} A functional component.
 */
const CardHeader = ( { titleTrimmed, displayPostDate, post, dateFormat } ) => (
	<div className="single-post-card__primary">
		<h2 className="single-post-card__title mdc-typography mdc-typography--headline6">
			{ titleTrimmed ? (
				<RawHTML>{ titleTrimmed }</RawHTML>
			) : (
				__( '(no title)', 'material-design' )
			) }
		</h2>
		{ displayPostDate && (
			<h3 className="single-post-card__subtitle mdc-typography mdc-typography--subtitle2">
				<time dateTime={ format( 'Y-m-d h:i:s', post.date_gmt ) }>
					{ dateI18n( dateFormat, post.date_gmt ) }
				</time>
			</h3>
		) }
	</div>
);

export default CardHeader;
