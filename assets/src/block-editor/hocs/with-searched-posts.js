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
import { debounce } from 'lodash';

/**
 * WordPress dependencies
 */
import { useState, useEffect, useCallback } from '@wordpress/element';
import { createHigherOrderComponent } from '@wordpress/compose';

/**
 * Internal dependencies
 */
import { formatError } from '../utils/error';
import { getPosts } from '../utils/api';

/**
 * A higher order component that enhances the provided component with posts
 * from a search query.
 *
 * This has been heavily inspired from https://github.com/woocommerce/woocommerce-gutenberg-products-block/blob/master/assets/js/hocs/with-searched-products.js
 * and the Wrapped Component has been re-written as a functional component.
 *
 * @param {Function} OriginalComponent Component being wrapped.
 */
const withSearchedPosts = createHigherOrderComponent( OriginalComponent => {
	/**
	 * A Component wrapping the passed in component.
	 *
	 * @class WrappedComponent
	 * @param {Object} props - Component props.
	 * @param {Array} props.selected - Selected Posts Ids
	 */
	const WrappedComponent = props => {
		const [ list, setList ] = useState( [] );
		const [ loading, setLoading ] = useState( true );
		const [ error, setErrorState ] = useState();
		const { selected } = props;

		/**
		 * Fetch Posts.
		 *
		 * @param {Object} args Arguments
		 *
		 * @return {Promise<void>} Promise
		 */
		const fetchPosts = useCallback(
			async args => {
				try {
					const fetchedList = await getPosts( args );
					setList( fetchedList );
					setLoading( false );
				} catch ( e ) {
					await setError( e );
				}
			},
			[ setList, setLoading ]
		);

		/**
		 * On search handler.
		 *
		 * @param {string} search - Search
		 */
		const onSearch = search => {
			fetchPosts( { selected, search } );
		};

		/**
		 * Set error handler.
		 *
		 * @param {Object} e - Error
		 */
		const setError = async e => {
			const formattedError = await formatError( e );
			setList( [] );
			setLoading( false );
			setErrorState( formattedError );
		};

		const debouncedOnSearch = debounce( onSearch, 400 );

		const transformedList = list.map( ( { id, title } ) => {
			return { id, name: title.rendered };
		} );

		useEffect(
			() => {
				fetchPosts( { selected } );

				return () => {
					debouncedOnSearch.cancel();
				};
			},
			// Important debouncedOnSearch SHOULD NOT be in the dependencies list as it will
			// create an endless loop fetching the post. Also no other dependencies should be added
			// fetchPosts should be fired only after the component has mounted.
			// eslint-disable-next-line react-hooks/exhaustive-deps
			[]
		);

		return (
			<OriginalComponent
				{ ...props }
				error={ error }
				posts={ transformedList }
				isLoading={ loading }
				onSearch={ search => {
					setLoading( true );
					debouncedOnSearch( search );
				} }
			/>
		);
	};

	return WrappedComponent;
}, 'withSearchedPosts' );

export default withSearchedPosts;
