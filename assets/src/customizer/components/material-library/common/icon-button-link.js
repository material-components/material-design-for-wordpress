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
 * Icon Buton with a clickable link
 *
 * @param {Object} props - Component props.
 * @param {string} props.href - Link for button.
 *
 * @return {Function} A functional component.
 */
const IconButtonLink = ( { href } ) => (
	<form target="_blank">
		<button className="mdc-icon-button material-icons" formAction={ href }>
			open_in_new
		</button>
	</form>
);

export default IconButtonLink;
