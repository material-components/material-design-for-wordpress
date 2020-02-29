/* global addEventListener */

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
	const buttons = document.querySelectorAll(
		'.mdc-button, .mdc-card__primary-action'
	);

	for ( const button of buttons ) {
		new MDCRipple( button );
	}
};

const initTabBar = () => {
	new MDCTabBar( document.querySelector( '.mdc-tab-bar' ) );
	const tabs = document.querySelectorAll( '.mdc-tab' );

	for ( const tab of tabs ) {
		new MDCRipple( tab );
	}
};

addEventListener( 'DOMContentLoaded', () => {
	initButtons();
	initTabBar();
} );
