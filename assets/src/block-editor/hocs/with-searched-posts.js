/**
 * External dependencies
 */
import { debounce } from 'lodash';

/**
 * WordPress dependencies
 */
import { useState, useEffect } from '@wordpress/element';
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

		/**
		 * On search handler.
		 *
		 * @param {string} search - Search
		 */
		const onSearch = search => {
			const { selected } = props;

			getPosts( { selected, search } )
				.then( fetchedList => {
					setList( fetchedList );
					setLoading( false );
				} )
				.catch( setError );
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

		useEffect( () => {
			const { selected } = props;
			getPosts( { selected } )
				.then( fetchedList => {
					setList( fetchedList );
					setLoading( false );
				} )
				.catch( setError );

			debouncedOnSearch.cancel();
		}, [] );

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
