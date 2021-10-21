/**
 * Copyright 2021 Google LLC
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
 * Switches editor mode.
 *
 * @param {string} mode String editor mode.
 */
export async function switchEditorModeTo( mode ) {
	if ( mode === 'Code' ) {
		await page.evaluate( () => {
			window.wp.data
				.dispatch( 'core/edit-post' )
				.switchEditorMode( 'text' );
		} );
	} else {
		await page.evaluate( () => {
			window.wp.data
				.dispatch( 'core/edit-post' )
				.switchEditorMode( 'visual' );
		} );
	}
}
