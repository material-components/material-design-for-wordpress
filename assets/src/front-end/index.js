/* global addEventListener */

/**
 * External dependencies
 */
import { MDCRipple } from '@material/ripple';

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

addEventListener( 'DOMContentLoaded', () => {
	initButtons();
} );
