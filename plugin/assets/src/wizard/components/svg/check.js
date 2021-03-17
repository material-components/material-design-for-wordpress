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

/* istanbul ignore file */
/**
 * _Completed_ SVG icon
 */
export const Check = () => {
	return (
		<svg width="21" height="21" fill="none" xmlns="http://www.w3.org/2000/svg">
			<mask
				id="a"
				maskUnits="userSpaceOnUse"
				x="3"
				y="5"
				width="16"
				height="12"
			>
				<path
					d="M8.313 13.82l-3.475-3.474-1.184 1.175 4.659 4.658 10-10-1.175-1.175-8.825 8.817z"
					fill="#fff"
				/>
			</mask>
			<g mask="url(#a)">
				<path fill="#fff" d="M.983.592h20v20h-20z" />
			</g>
		</svg>
	);
};
