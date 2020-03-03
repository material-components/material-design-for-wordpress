/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { escapeHTML } from '@wordpress/escape-html';

/**
 * Error message inner component.
 *
 * The code has been lifted from https://github.com/woocommerce/woocommerce-gutenberg-products-block/blob/master/assets/js/components/error-placeholder/error-message.js
 *
 * @param {Object} props - Component props.
 * @param {string} props.message - Error message.
 * @param {string} props.type - Error type.
 *
 * @return {Function} A functional component.
 */
const getErrorMessage = ( { message, type } ) => {
	if ( ! message ) {
		return __(
			'An unknown error occurred which prevented the block from being updated.',
			'material-theme-builder'
		);
	}

	if ( type === 'general' ) {
		return (
			<span>
				{ __( 'The following error was returned', 'material-theme-builder' ) }
				<br />
				<code>{ escapeHTML( message ) }</code>
			</span>
		);
	}

	if ( type === 'api' ) {
		return (
			<span>
				{ __(
					'The following error was returned from the API',
					'material-theme-builder'
				) }
				<br />
				<code>{ escapeHTML( message ) }</code>
			</span>
		);
	}

	return message;
};

/**
 * Error message component.
 *
 * The code has been lifted from https://github.com/woocommerce/woocommerce-gutenberg-products-block/blob/master/assets/js/components/error-placeholder/error-message.js
 *
 * @param {Object} error - The error object.
 *
 * @return {Function} A functional component.
 */
const ErrorMessage = ( { error } ) => (
	<div className="wc-block-error-message">{ getErrorMessage( error ) }</div>
);

export default ErrorMessage;
