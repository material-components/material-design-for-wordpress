/* istanbul ignore file */
/* global jQuery, mtbOnboarding */

( $ => {
	const initNotificationActions = () => {
		let requesting = false;

		$( '.material-notice-container a' ).on( 'click', event => {
			const $target = $( event.target ),
				className = $target.attr( 'class' ),
				action = ( className || '' ).replace( 'material-theme-', '' );

			if ( 'activate' !== action && 'install' !== action ) {
				return;
			}

			event.preventDefault();

			if ( requesting ) {
				return;
			}

			requesting = true;

			const span = $( '<span/>' );
			span.attr( 'class', 'spinner is-active' );
			$target.append( span );

			const ajaxArgs = {
				url: `${ mtbOnboarding.restUrl }${ action }-theme`,
				method: 'POST',
				beforeSend: xhr => {
					xhr.setRequestHeader( 'X-WP-Nonce', mtbOnboarding.nonce );
				},
			};
			const request = $.ajax( ajaxArgs );

			request.done( () => {
				if ( 'install' === action ) {
					ajaxArgs.url = `${ mtbOnboarding.restUrl }activate-theme`;
					const activationRequest = $.ajax( ajaxArgs );

					activationRequest.done(
						() => ( window.location.href = mtbOnboarding.redirect )
					);
					activationRequest.fail( error => console.error( error ) );
				} else {
					window.location.href = mtbOnboarding.redirect;
				}
			} );
			request.fail( error => console.error( error ) );
		} );
	};

	$( document ).ready( initNotificationActions );
} )( jQuery );
