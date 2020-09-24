/* istanbul ignore file */

/**
 * External dependencies
 */
import { MDCList } from '@material/list';
import { MDCRipple } from '@material/ripple';

export const initLists = () => {
	const lists = document.querySelectorAll( '.mdc-list' );

	lists.forEach( list => {
		const mdcList = new MDCList( list );
		mdcList.listElements.forEach( listItemEl => new MDCRipple( listItemEl ) );
	} );
};
