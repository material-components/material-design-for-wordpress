const body = document.body;
const ICONS = {
	DARK_MODE: 'dark_mode',
	LIGHT_MODE: 'light_mode',
};
let switcher;
let darkModeEnabled = false;

const maybeToggleDarkMode = event => {
	event.preventDefault();

	const { target } = event;

	if ( ! target ) {
		return;
	}

	const switcherIcon = switcher.querySelector( '.dark-mode__icon' );
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
