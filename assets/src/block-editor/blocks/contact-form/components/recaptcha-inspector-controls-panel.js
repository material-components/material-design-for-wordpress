/* global mtb, fetch, FormData */
/* istanbul ignore file */

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import {
	Button,
	ExternalLink,
	Notice,
	PanelBody,
	TextControl,
} from '@wordpress/components';
import { useState } from '@wordpress/element';

/**
 * Recaptcha Inspector Controls Panel component.
 *
 * @return {Function} Function returning the HTML markup for the component.
 */
const RecaptchaInspectorControlsPanel = () => {
	const defaultNotice = {
		show: false,
		type: 'error',
		message: __( 'An unknown error has occurred', 'material-theme-builder' ),
	};

	const [ siteKey, setSiteKey ] = useState( mtb.recaptcha_site_key );
	const [ isDisabled, setIsDisabled ] = useState( false );
	const [ clientSecret, setClientSecret ] = useState(
		mtb.recaptcha_client_secret
	);
	const [ notice, setNotice ] = useState( defaultNotice );

	/**
	 * Handle the site key change event.
	 *
	 * @param {string} value Site key value.
	 */
	const onChangeSiteKey = value => {
		setSiteKey( value );
	};

	/**
	 * Handle the client secret change event.
	 *
	 * @param {string} value Site key value.
	 */
	const onChangeClientSecret = value => {
		setClientSecret( value );
	};

	/**
	 * Manage the credentials actions.
	 *
	 * @param {string} action - Action.
	 */
	const manageCredentials = action => {
		setNotice( defaultNotice );
		setIsDisabled( true );
		const newNotice = { ...defaultNotice };

		if ( ( siteKey === '' || clientSecret === '' ) && action === 'save' ) {
			newNotice.show = true;
			newNotice.message = __(
				'The Site Key or Client Secret cannot be empty',
				'material-theme-builder'
			);
			setNotice( newNotice );
			setIsDisabled( false );
			return false;
		}

		sendCredentialsToBackend( {
			action,
			site_key: siteKey,
			client_secret: clientSecret,
		} )
			.then( data => {
				newNotice.show = true;
				if ( data.hasOwnProperty( 'success' ) && data.success ) {
					newNotice.type = 'success';
					newNotice.message = __(
						'Saved successfully',
						'material-theme-builder'
					);
				}
			} )
			.catch( () => {
				newNotice.show = false;
			} )
			.finally( () => {
				setNotice( newNotice );
				if ( action === 'clear' ) {
					setSiteKey( '' );
					setClientSecret( '' );
				}
				mtb.recaptcha_site_key = siteKey;
				mtb.recaptcha_client_secret = clientSecret;
				setIsDisabled( false );
			} );
	};

	/**
	 * Send credentials to backend.
	 *
	 * @param {Object} data Data.
	 *
	 * @return {Promise<any>} Promise
	 */
	const sendCredentialsToBackend = async data => {
		const form = new FormData();
		form.append( 'action', 'mtb_manage_recaptcha_api_credentials' );
		form.append( 'nonce', mtb.recaptcha_ajax_nonce_action );
		form.append( 'data', JSON.stringify( data ) );

		const response = await fetch( mtb.ajax_url, {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
			},
			body: new URLSearchParams( form ),
		} );
		return await response.json();
	};

	/**
	 * Handle the notice close event.
	 */
	const onNoticeRemove = () => {
		setNotice( defaultNotice );
	};

	return (
		<PanelBody
			title={ __( 'Google reCAPTCHA v3', 'material-theme-builder' ) }
			initialOpen={ true }
		>
			<p>
				{ __(
					'Add your reCAPTCHA site and secret keys to protect your form from spam.',
					'material-theme-builder'
				) }
			</p>

			<ExternalLink href="https://g.co/recaptcha/v3">
				{ __( 'Generate keys', 'material-theme-builder' ) }
			</ExternalLink>
			<ExternalLink href="https://developers.google.com/recaptcha/docs/v3">
				{ __( 'Documentation', 'material-theme-builder' ) }
			</ExternalLink>
			<br />
			<br />
			<TextControl
				label={ __( 'Site Key', 'material-theme-builder' ) }
				value={ siteKey }
				onChange={ onChangeSiteKey }
				disabled={ isDisabled }
			/>
			<TextControl
				label={ __( 'Client Secret', 'material-theme-builder' ) }
				value={ clientSecret }
				onChange={ onChangeClientSecret }
				disabled={ isDisabled }
			/>

			<p>
				<i className="material-icons tab-add__icon">warning</i>
				{ __(
					'Google reCAPTCHA will only work and be rendered on the frontend',
					'material-theme-builder'
				) }
			</p>
			<br />
			<Button
				style={ { marginRight: 20 } }
				className="save-button"
				isPrimary
				onClick={ () => manageCredentials( 'save' ) }
				disabled={ isDisabled }
			>
				{ __( 'Save', 'material-theme-builder' ) }
			</Button>
			<Button
				isPrimary
				className="clear-button"
				onClick={ () => manageCredentials( 'clear' ) }
				disabled={ isDisabled }
			>
				{ __( 'Clear', 'material-theme-builder' ) }
			</Button>
			<br />
			<br />
			{ notice.show && (
				<Notice
					className="contact-form-notice"
					status={ notice.type }
					onRemove={ onNoticeRemove }
				>
					{ notice.message }
				</Notice>
			) }
		</PanelBody>
	);
};

export default RecaptchaInspectorControlsPanel;
