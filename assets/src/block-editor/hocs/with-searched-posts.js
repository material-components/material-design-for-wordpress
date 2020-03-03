/**
 * External dependencies
 */
import { Component } from '@wordpress/element';
import { debounce } from 'lodash';
import { createHigherOrderComponent } from '@wordpress/compose';
import { getPosts } from '../utils/api';

/**
 * Internal dependencies
 */
import { formatError } from '../utils/error';

/**
 * A higher order component that enhances the provided component with posts
 * from a search query.
 *
 * @param {Function} OriginalComponent Component being wrapped.
 */
const withSearchedPosts = createHigherOrderComponent( OriginalComponent => {
	/**
	 * A Component wrapping the passed in component.
	 *
	 * @class WrappedComponent
	 * @augments {Component}
	 */
	class WrappedComponent extends Component {
		constructor() {
			super( ...arguments );
			this.state = {
				list: [],
				loading: true,
			};
			this.setError = this.setError.bind( this );
			this.debouncedOnSearch = debounce( this.onSearch.bind( this ), 400 );
		}

		componentDidMount() {
			const { selected } = this.props;
			getPosts( { selected } )
				.then( list => {
					this.setState( { list, loading: false } );
				} )
				.catch( this.setError );
		}

		componentWillUnmount() {
			this.debouncedOnSearch.cancel();
		}

		onSearch( search ) {
			const { selected } = this.props;

			getPosts( { selected, search } )
				.then( list => {
					this.setState( { list, loading: false } );
				} )
				.catch( this.setError );
		}

		async setError( e ) {
			const error = await formatError( e );

			this.setState( { list: [], loading: false, error } );
		}

		render() {
			const { error, list, loading } = this.state;
			const transformedList = list.map( ( { id, title } ) => {
				return { id, name: title.rendered };
			} );
			return (
				<OriginalComponent
					{ ...this.props }
					error={ error }
					posts={ transformedList }
					isLoading={ loading }
					onSearch={ search => {
						this.setState( { loading: true } );
						this.debouncedOnSearch( search );
					} }
				/>
			);
		}
	}

	return WrappedComponent;
}, 'withSearchedPosts' );

export default withSearchedPosts;
