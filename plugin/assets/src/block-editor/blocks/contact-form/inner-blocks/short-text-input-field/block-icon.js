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
 * Block Icon component.
 *
 * @return {Function} Function returning the HTML markup for the component.
 */
const BlockIcon = () => (
	<svg xmlns="http://www.w3.org/2000/svg" height="24" width="24">
		<path fill="none" d="M0 0h24v24H0z" />
		<path d="M4 9h16v2H4V9zm0 4h10v2H4v-2z" />
	</svg>
);

export default BlockIcon;
