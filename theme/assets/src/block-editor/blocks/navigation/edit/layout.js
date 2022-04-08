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
 * Top App Bar Menu
 *
 * @param {Object} props            - Component props
 * @param {Array}  [props.children] - Menu Items
 *
 * @return {JSX.Element} Menu
 */
export const TopAppBar = props => (
	<div className="mdc-tab-scroller">
		<div className="mdc-tab-scroller__scroll-area">
			<div className="mdc-tab-scroller__scroll-content">
				{ props.children }
			</div>
		</div>
	</div>
);

/**
 * Drawer Menu
 *
 * @param {Object} props            - Component props
 * @param {Array}  [props.children] - Menu Items
 *
 * @return {JSX.Element} Menu
 */
export const DrawerMenu = props => (
	<nav className="mdc-list mdc-drawer__list">{ props.children }</nav>
);
