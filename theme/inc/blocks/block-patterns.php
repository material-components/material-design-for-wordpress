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
 * Material design google: Block Patterns
 */

/**
 * Registers block patterns and categories.
 *
 * @return void
 */
function material_design_google_register_block_patterns() {
	$block_pattern_categories = [
		'material' => [ 'label' => __( 'Material', 'material-design-google' ) ],
	];

	/**
	 * Filters the theme block pattern categories.
	 *
	 * @param array[] $block_pattern_categories An associative array of block pattern categories, keyed by category name.
	 */
	$block_pattern_categories = apply_filters( 'material_design_google_block_pattern_categories', $block_pattern_categories );

	foreach ( $block_pattern_categories as $name => $properties ) {
		if ( ! WP_Block_Pattern_Categories_Registry::get_instance()->is_registered( $name ) ) {
			register_block_pattern_category( $name, $properties );
		}
	}

	$block_patterns = [
		'material-card',
		'material-card-image',
	];

	/**
	 * Filters the theme block patterns.
	 *
	 * @param array $block_patterns List of block patterns by name.
	 */
	$block_patterns = apply_filters( 'material_design_google_block_patterns', $block_patterns );

	foreach ( $block_patterns as $block_pattern ) {
		$pattern_file = get_theme_file_path( '/inc/blocks/patterns/' . $block_pattern . '.php' );

		register_block_pattern(
			'material/' . $block_pattern,
			require $pattern_file
		);
	}
}

add_action( 'init', 'material_design_google_register_block_patterns', 9 );
