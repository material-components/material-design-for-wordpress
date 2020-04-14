/**
 * External dependencies
 */
import classNames from 'classnames';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { Button, Placeholder, Spinner } from '@wordpress/components';

/**
 * Internal dependencies
 */
import ErrorMessage from './error-message.js';
import './editor.css';
import ErrorIcon from './error-icon';

/**
 * Error placeholder component.
 *
 * The code has been lifted from https://github.com/woocommerce/woocommerce-gutenberg-products-block/blob/master/assets/js/components/error-placeholder/index.js
 *
 * @param {Object} props - Component props.
 * @param {string} props.className - Classname to add to placeholder in addition to the defaults.
 * @param {Object} props.error - The error object.
 * @param {string} props.isLoading -  Whether there is a request running, so the 'Retry' button is hidden and a spinner is shown instead.
 * @param {string} props.onRetry - Callback to retry an action..
 *
 * @return {Function} A functional component.
 */
const ErrorPlaceholder = ( { className, error, isLoading, onRetry } ) => (
	<Placeholder
		icon={ <ErrorIcon /> }
		label={ __( 'Sorry, an error occurred', 'material-theme-builder' ) }
		className={ classNames( 'mtb-block-api-error', className ) }
	>
		<ErrorMessage error={ error } />
		{ onRetry && (
			<>
				{ isLoading ? (
					<Spinner />
				) : (
					<Button isDefault onClick={ onRetry }>
						{ __( 'Retry', 'material-theme-builder' ) }
					</Button>
				) }
			</>
		) }
	</Placeholder>
);

export default ErrorPlaceholder;
