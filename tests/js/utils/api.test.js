/**
 * WordPress dependencies
 */

import apiFetch from '@wordpress/api-fetch';

/**
 * Internal dependencies
 */
import { getPosts } from '../../../assets/src/block-editor/utils/api';

const sampleReducedPostsData = [
	{
		id: 1,
		status: 'publish',
		type: 'post',
		title: {
			rendered: 'Test Post 1',
		},
	},
	{
		id: 2,
		status: 'publish',
		type: 'post',
		title: {
			rendered: 'Test Post 2',
		},
	},
];

const expectedPostsData = [
	{
		id: 1,
		parent: 0,
		status: 'publish',
		type: 'post',
		title: {
			rendered: 'Test Post 1',
		},
	},
	{
		id: 2,
		parent: 0,
		status: 'publish',
		type: 'post',
		title: {
			rendered: 'Test Post 2',
		},
	},
];

jest.mock( '@wordpress/api-fetch', () => jest.fn() );
describe( 'api: getPosts', () => {
	afterEach( () => {
		jest.clearAllMocks();
	} );

	it( 'should return posts data', async () => {
		apiFetch.mockImplementation( () =>
			Promise.resolve( sampleReducedPostsData )
		);

		await getPosts( {
			selected: [ 1, 2 ],
			search: 'test',
		} ).then( fetchedList => {
			expect( fetchedList ).toStrictEqual( expectedPostsData );
		} );

		expect( apiFetch ).toHaveBeenCalledTimes( 2 );
		expect( apiFetch ).toHaveBeenCalledWith( {
			path:
				'/wp/v2/posts?per_page=100&status=publish&search=test&orderby=title&order=asc',
		} );

		expect( apiFetch ).toHaveBeenCalledWith( {
			path: '/wp/v2/posts?status=publish&include%5B0%5D=1&include%5B1%5D=2',
		} );
	} );

	it( 'should fails with an error', async () => {
		apiFetch.mockImplementation( () => Promise.reject( 'error' ) );
		await expect(
			getPosts( {
				selected: [ 1, 2 ],
				search: 'test',
			} )
		).rejects.toStrictEqual( 'error' );
	} );
} );
