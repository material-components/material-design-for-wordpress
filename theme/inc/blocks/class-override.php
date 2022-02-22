<?php
/**
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *       http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @package MaterialDesign
 */

/**
 * Gutenberg Blocks overrides.
 */

namespace MaterialDesign\Theme\Block;

/**
 * Override the default block markup.
 *
 * @package MaterialDesign
 */
class Override {

	/**
	 * Add hooks.
	 */
	public function __construct() {
		add_filter( 'term_links-post_tag', [ $this, 'term_links' ], 10 );
	}

	/**
	 * Override the term links for the post tags.
	 *
	 * @param array $links The links.
	 *
	 * @return array
	 */
	public function term_links( $links ) {
		if ( empty( $links ) || ! is_array( $links ) ) {
			return $links;
		}
		// Append label link for tags.
		$links[0] = '<i class="material-icons mdc-button__icon" aria-hidden="true">label</i>' . $links[0];

		return $links;
	}

}
