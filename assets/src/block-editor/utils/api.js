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
 * @param {string} request.selected Currently selected posts.
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
		post_type: 'post',
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
 * @param {string} request.selected Currently selected posts.
 * @param {string} request.search Search string.
 * @param {Array} request.queryArgs Query args to pass in.
 */
export const getPosts = ( { selected = [], search = '', queryArgs = [] } ) => {
	const requests = getPostsRequests( { selected, search, queryArgs } );

	return Promise.all( requests.map( path => apiFetch( { path } ) ) )
		.then( data => {
			const posts = uniqBy( flatten( data ), 'id' );
			const list = posts.map( posts => ( {
				...posts,
				parent: 0,
			} ) );
			return list;
		} )
		.catch( e => {
			throw e;
		} );
};
