/* istanbul ignore file */
/* @todo Add JS tests */

/**
 * WordPress dependencies
 */
import { useState, useEffect } from '@wordpress/element';
import apiFetch from '@wordpress/api-fetch';
import { addQueryArgs } from '@wordpress/url';

/**
 * Internal dependencies
 */
import CommonPostsListInspectorControls from '../../common-posts-list/components/inspector-controls';
import { CATEGORIES_LIST_QUERY } from '../../common-posts-list/options';

/**
 * Common Posts List Inspector Controls component.
 *
 * @param {Object} props - Component props.
 * @param {Object} props.attributes - Block attributes.
 * @param {Function} props.setAttributes - Function to set block attributes value.
 * @param {string} props.name - Block name.
 *
 * @return {Function} A functional component.
 */
const InspectorControls = props => {
	const [ categoriesList, setCategoriesList ] = useState( [] );
	const [ isStillMounted, setStillMounted ] = useState( true );

	useEffect( () => {
		setStillMounted( true );
		apiFetch( {
			path: addQueryArgs( `/wp/v2/categories`, CATEGORIES_LIST_QUERY ),
		} )
			.then( fetchedCategoriesList => {
				if ( isStillMounted ) {
					setCategoriesList( fetchedCategoriesList );
				}
			} )
			.catch( () => {
				if ( isStillMounted ) {
					setCategoriesList( [] );
				}
			} );

		return () => {
			setStillMounted( false );
		};
	}, [ isStillMounted ] );

	props.attributes.categoriesList = categoriesList;

	return <CommonPostsListInspectorControls { ...props } />;
};

export default InspectorControls;
