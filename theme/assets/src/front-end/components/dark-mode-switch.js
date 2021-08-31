const body = document.body;
let switcher;
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
	} else {
		body.setAttribute( 'data-color-scheme', 'light' );
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
