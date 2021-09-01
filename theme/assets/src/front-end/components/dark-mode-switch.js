const body = document.body;
const ICONS = {
	DARK_MODE: 'dark_mode',
	LIGHT_MODE: 'light_mode',
};
let switcher;
let switcherIcon;
let darkModeEnabled = false;

const maybeToggleDarkMode = event => {
	event.preventDefault();

	const { target } = event;

	if ( ! target ) {
		return;
	}

	darkModeEnabled = ! darkModeEnabled;

	if ( darkModeEnabled ) {
		body.setAttribute( 'data-color-scheme', 'dark' );
		switcherIcon.textContent = ICONS.LIGHT_MODE;
	} else {
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

	testMediaQuery( mediaQuery );

	switcher.addEventListener( 'click', maybeToggleDarkMode );

	if (
		window.materialDesign.darkModeStatus &&
		'active' === window.materialDesign.darkModeStatus
	) {
		maybeToggleDarkMode( { preventDefault: () => {}, target: true } );
	}
};
