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
		body.removeAttribute( 'data-color-scheme' );
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

	switcher.addEventListener( 'click', maybeToggleDarkMode );
};
