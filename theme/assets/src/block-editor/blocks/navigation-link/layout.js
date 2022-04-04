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
 * Markup for link in tab bar.
 *
 * @param {Object}      props          - Component props
 * @param {JSX.Element} props.children - Component
 *
 * @return {JSX.Element} Link
 */
export const TabLink = props => (
	<>
		<span className="mdc-tab__content">
			<span className="mdc-tab__text-label">{ props.children }</span>
		</span>

		<span className="mdc-tab-indicator">
			<span className="mdc-tab-indicator__content mdc-tab-indicator__content--underline"></span>
		</span>
	</>
);

/**
 * Markup for link in drawer.
 *
 * @param {Object}      props          - Component props
 * @param {JSX.Element} props.children - Component
 *
 * @return {JSX.Element} Link
 */
export const DrawerLink = props => (
	<>
		<span className="mdc-list-item__text">{ props.children }</span>
	</>
);
