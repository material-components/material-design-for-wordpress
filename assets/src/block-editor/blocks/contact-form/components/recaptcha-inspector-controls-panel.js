/* global mtb, jQuery */

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
import { useEffect, useRef, useState } from '@wordpress/element';

const genericErrorMessage = __(
	'An unknown error occurred. Please try again later.',
	'material-theme-builder'
);

/**
 * Recaptcha Inspector Controls Panel component.
 *
 * @return {Function} Function returning the HTML markup for the component.
 */
const RecaptchaInspectorControlsPanel = () => {
	const defaultNotice = {
		show: false,
		type: 'error',
		message: genericErrorMessage,
	};

	const [ siteKey, setSiteKey ] = useState( '' );
	const [ clientSecret, setClientSecret ] = useState( '' );
	const [ isDisabled, setIsDisabled ] = useState( false );
	const [ notice, setNotice ] = useState( defaultNotice );

	const isInitialFetch = useRef( true );
	useEffect(
		() => {
			if ( isInitialFetch.current ) {
				const newNotice = { ...defaultNotice };

				sendAjaxRequest( {
					action: 'get',
				} )
					.then( response => {
						if (
							! response.hasOwnProperty( 'success' ) ||
							! response.success
						) {
							newNotice.show = true;
							newNotice.type = 'error';
							newNotice.message =
								response.hasOwnProperty( 'data' ) &&
								response.data.hasOwnProperty( 'message' )
									? response.data.message
									: genericErrorMessage;
							setNotice( newNotice );
							return;
						}

						if (
							response.hasOwnProperty( 'data' ) &&
							response.data.hasOwnProperty( 'mtb_recaptcha_site_key' )
						) {
							setSiteKey( response.data.mtb_recaptcha_site_key );
							if (
								response.data.hasOwnProperty( 'mtb_recaptcha_client_secret' )
							) {
								setClientSecret( response.data.mtb_recaptcha_client_secret );
							}
						}
					} )
					.catch( () => {
						newNotice.show = true;
						newNotice.type = 'error';
						setNotice( newNotice );
					} )
					.finally( () => {
						setIsDisabled( false );
					} );

				isInitialFetch.current = false;
			}
		}, // eslint-disable-next-line react-hooks/exhaustive-deps
		[]
	);

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

		const ajaxData = {
			action,
		};

		if ( action === 'save' ) {
			ajaxData.site_key = siteKey;
			ajaxData.client_secret = clientSecret;
		}

		sendAjaxRequest( ajaxData )
			.then( response => {
				newNotice.show = true;
				if ( ! response.hasOwnProperty( 'success' ) || ! response.success ) {
					newNotice.type = 'error';
					newNotice.message =
						response.hasOwnProperty( 'data' ) &&
						response.data.hasOwnProperty( 'message' )
							? response.data.message
							: genericErrorMessage;
				}

				newNotice.type = 'success';
				newNotice.message = __(
					'Saved successfully',
					'material-theme-builder'
				);
			} )
			.catch( () => {
				newNotice.show = true;
				newNotice.type = 'error';
			} )
			.finally( () => {
				setNotice( newNotice );
				if ( action === 'clear' ) {
					setSiteKey( '' );
					setClientSecret( '' );
				}
				setIsDisabled( false );
			} );
	};

	/**
	 * Send ajax request.
	 *
	 * @param {Object} data Data to send along the ajax request.
	 *
	 * @return {Promise<jQuery>} Promise
	 */
	const sendAjaxRequest = async data => {
		return jQuery.ajax( {
			url: mtb.ajax_url,
			dataType: 'json',
			type: 'POST',
			data: {
				action: 'mtb_manage_recaptcha_api_credentials',
				nonce: mtb.recaptcha_ajax_nonce_action,
				data: JSON.stringify( data ),
			},
		} );
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
