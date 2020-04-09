/* global addEventListener */
/* istanbul ignore file */

import {
	initButtons,
	initLists,
	initTabBar,
} from '../common/mdc-components-init';

addEventListener( 'DOMContentLoaded', () => {
	initButtons();
	initLists();
	initTabBar();
} );
