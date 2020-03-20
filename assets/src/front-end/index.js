/* global addEventListener */
/* istanbul ignore file */

/**
 * External dependencies
 */
import { MDCRipple } from '@material/ripple';
import { MDCTabBar } from '@material/tab-bar';

/**
 * Internal dependencies
 */
import '../block-editor/blocks/hello-world/save.css';

const initButtons = () => {
	const buttons = document.querySelectorAll( '.mdc-button' );
	const iconButtons = document.querySelectorAll( '.mdc-icon-button' );

	buttons.forEach( button => new MDCRipple( button ) );
	iconButtons.forEach( button => ( new MDCRipple( button ).unbounded = true ) );
};

const initTabBar = () => {
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

addEventListener( 'DOMContentLoaded', () => {
	initButtons();
	initTabBar();
} );
