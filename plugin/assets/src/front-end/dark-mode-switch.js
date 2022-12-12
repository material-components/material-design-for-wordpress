/**
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * External dependencies
 */

import {
	argbFromHex,
	themeFromSourceColor,
	applyTheme,
} from '@material/material-color-utilities';
import { applyRgbValue } from '../helper/apply-rgb-value';

const body = document.body;
export const ICONS = {
	DARK_MODE: 'dark_mode',
	LIGHT_MODE: 'light_mode',
};
const localStorageDarkMode = window.localStorage.getItem(
	'materialDesignDarkMode'
);
let switcher;
let switcherIcon;
let darkModeEnabled = false;

const maybeToggleDarkMode = event => {
	event.preventDefault();

	const { target } = event;

	if ( ! target ) {
		return;
	}

	const color = window.materialDesign.sourceColor;
	const intColor = argbFromHex( color );
	const colorPallete = themeFromSourceColor( intColor );

	if ( darkModeEnabled ) {
		applyTheme( colorPallete, {
			target: document.body,
			dark: true,
		} );
		applyRgbValue( colorPallete, {
			target: document.body,
			dark: true,
		} );
		body.setAttribute( 'data-color-scheme', 'dark' );
		switcherIcon.textContent = ICONS.LIGHT_MODE;
	} else {
		applyTheme( colorPallete, {
			target: document.body,
			dark: false,
		} );
		applyRgbValue( colorPallete, {
			target: document.body,
			dark: false,
		} );
		body.setAttribute( 'data-color-scheme', 'light' );
		switcherIcon.textContent = ICONS.DARK_MODE;
	}
};

const testMediaQuery = event => {
	if ( event.matches ) {
		darkModeEnabled = true;
		switcherIcon.textContent = ICONS.LIGHT_MODE;
	} else {
		darkModeEnabled = false;
		switcherIcon.textContent = ICONS.DARK_MODE;
	}
};

export const initDarkModeSwitch = () => {
	if ( ! body ) {
		return;
	}

	switcher = document.querySelector( '.dark-mode__button' );

	if ( ! switcher ) {
		return;
	}

	switcherIcon = switcher.querySelector( '.dark-mode__icon' );

	const mediaQuery = window.matchMedia( '(prefers-color-scheme: dark)' );

	mediaQuery.addEventListener( 'change', testMediaQuery );

	switcher.addEventListener( 'click', event => {
		darkModeEnabled = ! darkModeEnabled;
		maybeToggleDarkMode( event );
		// @TODO: Make them expire?
		window.localStorage.setItem(
			'materialDesignDarkMode',
			JSON.stringify( darkModeEnabled )
		);
	} );

	// Bail if set by localStorage.
	if ( localStorageDarkMode ) {
		darkModeEnabled = JSON.parse( localStorageDarkMode );
		maybeToggleDarkMode( { preventDefault: () => {}, target: true } );
		return;
	}

	testMediaQuery( mediaQuery );

	if (
		window.materialDesign.darkModeStatus &&
		'active' === window.materialDesign.darkModeStatus
	) {
		darkModeEnabled = true;
		maybeToggleDarkMode( { preventDefault: () => {}, target: true } );
	}
};
