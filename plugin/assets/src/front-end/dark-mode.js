const body = document.body;

const maybeToggleDarkMode = event => {
	if ( event.matches ) {
		body.setAttribute( 'data-color-scheme', 'dark' );
	} else {
		body.removeAttribute( 'data-color-scheme' );
	}
};

export const initDarkMode = () => {
	if ( ! body ) {
		return;
	}

	const prefersDarkMode = window.matchMedia( '(prefers-color-scheme: dark)' );

	prefersDarkMode.addEventListener( 'change', maybeToggleDarkMode );

	maybeToggleDarkMode( prefersDarkMode );
};
