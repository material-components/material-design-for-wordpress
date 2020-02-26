/* global addEventListener */
import { MDCRipple } from '@material/ripple';

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
