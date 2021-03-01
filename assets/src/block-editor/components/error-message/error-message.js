/**
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * WordPress dependencies
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
			'material-design'
		);
	}

	if ( type === 'general' ) {
		return (
			<span>
				{ __( 'The following error was returned', 'material-design' ) }
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
					'material-design'
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
