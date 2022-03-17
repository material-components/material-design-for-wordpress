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
import { serialize } from '@wordpress/blocks';
import { store as coreStore } from '@wordpress/core-data';
import { useDispatch } from '@wordpress/data';
import { useCallback } from '@wordpress/element';

/**
 * Internal dependencies
 */
import useGenerateDefaultNavigationTitle from './use-generate-default-navigation-title';

export default function useCreateNavigationMenu( clientId ) {
	const { saveEntityRecord } = useDispatch( coreStore );
	const generateDefaultTitle = useGenerateDefaultNavigationTitle( clientId );

	// This callback uses data from the two placeholder steps and only creates
	// a new navigation menu when the user completes the final step.
	return useCallback(
		async ( title = null, blocks = [] ) => {
			if ( ! title ) {
				title = await generateDefaultTitle();
			}
			const record = {
				title,
				content: serialize( blocks ),
				status: 'publish',
			};

			return await saveEntityRecord(
				'postType',
				'wp_navigation',
				record
			);
		},
		[ serialize, saveEntityRecord ]
	);
}
