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

const makeFit = () => {
	document
		.querySelectorAll( 'iframe, object, video' )
		.forEach( function ( video ) {
			const container = video.parentNode;

			// Skip videos we want to ignore.
			if (
				video.classList.contains( 'intrinsic-ignore' ) ||
				video.parentNode.classList.contains( 'intrinsic-ignore' )
			) {
				return true;
			}

			if ( ! video.dataset.origwidth ) {
				// Get the video element proportions.
				video.setAttribute( 'data-origwidth', video.width );
				video.setAttribute( 'data-origheight', video.height );
			}

			const iTargetWidth = container.offsetWidth;

			// Get ratio from proportions.
			const ratio = iTargetWidth / video.dataset.origwidth;

			// Scale based on ratio, thus retaining proportions.
			video.style.width = iTargetWidth + 'px';
			video.style.height = video.dataset.origheight * ratio + 'px';
		} );
};

export const embedsInit = () => {
	makeFit();

	window.addEventListener( 'resize', makeFit );
};
