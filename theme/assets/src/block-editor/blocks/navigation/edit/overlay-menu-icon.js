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
import { SVG, Rect } from '@wordpress/primitives';

/**
 * Icon
 *
 * @return {JSX.Element} Icon
 */
export default function OverlayMenuIcon() {
	return (
		<SVG
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 24 24"
			width="24"
			height="24"
			aria-hidden="true"
			focusable="false"
		>
			<Rect x="4" y="7.5" width="16" height="1.5" />
			<Rect x="4" y="15" width="16" height="1.5" />
		</SVG>
	);
}
