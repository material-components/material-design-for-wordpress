/* global jQuery */
/* eslint-disable jsx-a11y/anchor-is-valid */

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { useState } from '@wordpress/element';

/**
 * Internal dependencies
 */
import getConfig from '../../../block-editor/utils/get-config';

const ThemePrompt = ( { status } ) => {
	const [ dismissed, setDismissed ] = useState( status === 'ok' );
	const [ requesting, setRequesting ] = useState( false );

	const title =
		status === 'install'
			? __( 'Install Material Theme', 'material-theme-builder' )
			: __( 'Activate Material Theme', 'material-theme-builder' );

	const message =
		status === 'install'
			? __(
					'Install and activate Material Theme for full site customization.',
					'material-theme-builder'
			  )
			: __(
					'Activate Material Theme for full site customization.',
					'material-theme-builder'
			  );

	const cta =
		status === 'install'
			? __( 'Install Material Theme', 'material-theme-builder' )
			: __( 'Activate Material Theme', 'material-theme-builder' );

	const dismiss = () => {
		setDismissed( true );
		window.localStorage.setItem( 'themeInstallerDismissed', '1' );
	};

	if ( dismissed || status === 'ok' ) {
		return null;
	}

	const apiRequest = event => {
		event.preventDefault();

		setRequesting( true );

		const ajaxArgs = {
			url: `${ getConfig( 'restUrl' ) }${ status }-theme`,
			method: 'POST',
			beforeSend: xhr => {
				xhr.setRequestHeader( 'X-WP-Nonce', getConfig( 'themeNonce' ) );
			},
		};
		const request = jQuery.ajax( ajaxArgs );
		const onFail = error => {
			console.error( error );
			setRequesting( false );
		};

		request.done( () => {
			if ( 'install' === status ) {
				ajaxArgs.url = `${ getConfig( 'restUrl' ) }activate-theme`;
				const activationRequest = jQuery.ajax( ajaxArgs );

				activationRequest.done( () => window.location.reload() );
				activationRequest.fail( onFail );
			} else {
				window.location.reload();
			}
		} );
		request.fail( onFail );
	};

	return (
		<>
			<button
				type="button"
				className="customize-help-toggle dashicons dashicons-dismiss"
				aria-expanded="false"
				onClick={ dismiss }
			>
				<span className="screen-reader-text">
					{ __( 'Dismiss', 'material-theme-builder' ) }
				</span>
			</button>
			<div className="accordion-section-title theme-installer-panel">
				<h3>{ title }</h3>
				<p className="customize-action">{ message }</p>
				<button
					className="button"
					onClick={ apiRequest }
					disabled={ requesting }
				>
					{ cta }
					{ requesting && <span className="spinner is-active"></span> }
				</button>
			</div>
			<ul className="accordion-sub-container control-panel-content"></ul>
		</>
	);
};

export default ThemePrompt;
