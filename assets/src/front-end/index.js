/* global addEventListener */
/* istanbul ignore file */

/**
 * External dependencies
 */
import {
	initButtons,
	initLists,
	initTabBar,
	initToolTips,
} from '../common/mdc-components-init';
import { initContactForm } from './contact-form';

addEventListener( 'DOMContentLoaded', () => {
	initButtons();
	initLists();
	initTabBar();
	initContactForm();
	initToolTips();
} );
