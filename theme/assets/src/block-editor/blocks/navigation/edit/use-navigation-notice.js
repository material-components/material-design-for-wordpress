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
import { useRef } from '@wordpress/element';
import { useDispatch } from '@wordpress/data';
import { store as noticeStore } from '@wordpress/notices';

/**
 * Adds a notice to navigation.
 *
 * @param {Object} props
 * @param {string} [props.name]
 * @param {string} [props.message]
 *
 * @return {Array} Notice functions
 */
function useNavigationNotice( { name, message } = {} ) {
	const noticeRef = useRef();

	const { createWarningNotice, removeNotice } = useDispatch( noticeStore );

	const showNotice = () => {
		if ( noticeRef.current ) {
			return;
		}

		noticeRef.current = name;

		createWarningNotice( message, {
			id: noticeRef.current,
			type: 'snackbar',
		} );
	};

	const hideNotice = () => {
		if ( ! noticeRef.current ) {
			return;
		}
		removeNotice( noticeRef.current );
		noticeRef.current = null;
	};

	return [ showNotice, hideNotice ];
}

export default useNavigationNotice;
