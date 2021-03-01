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
import { addQueryArgs } from '@wordpress/url';
import apiFetch from '@wordpress/api-fetch';
import { flatten, uniqBy } from 'lodash';
import { ENDPOINTS } from '../constants';

/**
 * Get post query requests.
 *
 * @param {Object} request A query object with the list of selected posts and search term.
 * @param {Array} request.selected Currently selected posts.
 * @param {string} request.search Search string.
 * @param {Array} request.queryArgs Query args to pass in.
 */
const getPostsRequests = ( { selected = [], search = '', queryArgs = [] } ) => {
	const defaultArgs = {
		per_page: 100,
		status: 'publish',
		search,
		orderby: 'title',
		order: 'asc',
	};

	const requests = [
		addQueryArgs( ENDPOINTS.posts, { ...defaultArgs, ...queryArgs } ),
	];

	// If there are a lot of posts, we might not get all selected posts in the first page.
	if ( selected.length ) {
		requests.push(
			addQueryArgs( ENDPOINTS.posts, {
				status: 'publish',
				include: selected,
			} )
		);
	}

	return requests;
};

/**
 * Get a promise that resolves to a list of posts from the API.
 *
 * @param {Object} request A query object with the list of selected posts and search term.
 * @param {Array} request.selected Currently selected posts.
 * @param {string} request.search Search string.
 * @param {Array} request.queryArgs Query args to pass in.
 */
export const getPosts = ( { selected = [], search = '', queryArgs = [] } ) => {
	const requests = getPostsRequests( { selected, search, queryArgs } );

	return Promise.all( requests.map( path => apiFetch( { path } ) ) )
		.then( data => {
			const posts = uniqBy( flatten( data ), 'id' );
			return posts.map( post => ( {
				...post,
				parent: 0,
			} ) );
		} )
		.catch( e => {
			throw e;
		} );
};
