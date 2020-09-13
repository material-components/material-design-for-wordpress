/* istanbul ignore file */

/**
 * External dependencies
 */
import { MDCList } from '@material/list';
import { MDCRipple } from '@material/ripple';
import { MDCTabBar } from '@material/tab-bar';

export const initLists = () => {
	const lists = document.querySelectorAll( '.mdc-list' );

	lists.forEach( list => {
		const mdcList = new MDCList( list );
		mdcList.listElements.forEach( listItemEl => new MDCRipple( listItemEl ) );
	} );
};

export const initTabBar = () => {
	const tabBars = document.querySelectorAll( '.mdc-tab-bar-container' );

	tabBars.forEach( tabBarContainer => {
		const tabBar = new MDCTabBar(
			tabBarContainer.querySelector( '.mdc-tab-bar' )
		);

		const contentElements = tabBarContainer.querySelectorAll(
			'.mdc-tab-content'
		);

		tabBar.listen( 'MDCTabBar:activated', event => {
			tabBarContainer
				.querySelector( '.mdc-tab-content--active' )
				.classList.remove( 'mdc-tab-content--active' );

			contentElements[ event.detail.index ].classList.add(
				'mdc-tab-content--active'
			);
		} );
	} );
};
