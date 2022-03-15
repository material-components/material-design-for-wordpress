/**
 * Copyright 2022 Google LLC
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

const Drawer = () => {
	return (
		<aside className="mdc-drawer material-drawer mdc-drawer--modal">

			<div className="mdc-drawer__header">
				drawer
			</div>
			<div className="mdc-drawer__content">
				<nav className="mdc-list mdc-drawer__list" role="listbox">

				</nav>
			</div>
		</aside>
	);
};

export default Drawer;
