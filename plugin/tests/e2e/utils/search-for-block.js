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

/* global page */

/**
 * Internal dependencies
 */
import { openGlobalBlockInserter } from '@wordpress/e2e-test-utils';

/**
 * Search for block in the global inserter
 *
 * @param {string} searchTerm The text to search for.
 */
export async function searchForBlock( searchTerm ) {
	await openGlobalBlockInserter();
	await page.keyboard.type( searchTerm );
}
