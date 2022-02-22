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
		add_filter( 'block_type_metadata_settings', [ $this, 'override_next_post_link' ], 10, 2 );
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

	/**
	 * Override the next post link markup.
	 *
	 * @param array $settings Block register arguments.
	 * @param array $metadata Block.json attributes.
	 *
	 * @return array
	 */
	public function override_next_post_link( $settings, $metadata ) {
		if ( $metadata['name'] !== 'core/post-navigation-link' ) {
			return $settings;
		}

		$settings['render_callback'] = [ $this, 'render_post_navigation_links' ];

		return $settings;
	}

	/**
	 * Override the `core/post-navigation-link` block on the server.
	 *
	 * Override to handle next → icon after the post title instead of before.
	 *
	 * @see render_block_core_post_navigation_link Search for 'override' comment in below function to know customisation.
	 *
	 * @param array  $attributes Block attributes.
	 * @param string $content    Block default content.
	 *
	 * @return string Returns the next or previous post link that is adjacent to the current post.
	 */
	public function render_post_navigation_links( $attributes, $content ) {
		if ( ! is_singular() ) {
			return '';
		}

		// Get the navigation type to show the proper link. Available options are `next|previous`.
		$navigation_type = isset( $attributes['type'] ) ? $attributes['type'] : 'next';
		// Allow only `next` and `previous` in `$navigation_type`.
		if ( ! in_array( $navigation_type, [ 'next', 'previous' ], true ) ) {
			return '';
		}
		$classes = "post-navigation-link-$navigation_type";
		if ( isset( $attributes['textAlign'] ) ) {
			$classes .= " has-text-align-{$attributes['textAlign']}";
		}
		$wrapper_attributes = get_block_wrapper_attributes( [ 'class' => $classes ] );
		// Set default values.
		$format = '%link';
		$link   = 'next' === $navigation_type ? _x( 'Next', 'label for next post link', 'material-design-google' ) : _x( 'Previous', 'label for previous post link', 'material-design-google' );
		$label  = '';

		// If a custom label is provided, make this a link.
		// `$label` is used to prepend the provided label, if we want to show the page title as well.
		if ( isset( $attributes['label'] ) && ! empty( $attributes['label'] ) ) {
			$label = "{$attributes['label']}";
			$link  = $label;
		}

		// If we want to also show the page title, make the page title a link and prepend the label.
		if ( isset( $attributes['showTitle'] ) && $attributes['showTitle'] ) {
			/*
			 * If the label link option is not enabled but there is a custom label,
			 * display the custom label as text before the linked title.
			 */
			if ( ! $attributes['linkLabel'] ) {
				if ( $label ) {
					$format = '<span class="post-navigation-link__label">' . wp_kses_post( $label ) . '</span> %link';
				}
				$link = '%title';
			} elseif ( isset( $attributes['linkLabel'] ) && $attributes['linkLabel'] ) {
				// If the label link option is enabled and there is a custom label, display it before the title.
				if ( $label ) {
					$link = '<span class="post-navigation-link__label">' . wp_kses_post( $label ) . '</span> <span class="post-navigation-link__title">%title</span>';
					// Override-starts.
					if ( 'next' === $navigation_type ) {
						$link = '<span class="post-navigation-link__title">%title</span> <span class="post-navigation-link__label">' . wp_kses_post( $label ) . '</span>';
					}
					// Override-ends.
				} else {
					/*
					 * If the label link option is enabled and there is no custom label,
					 * add a colon between the label and the post title.
					 */
					$label = 'next' === $navigation_type ? _x( 'Next:', 'label before the title of the next post', 'material-design-google' ) : _x( 'Previous:', 'label before the title of the previous post', 'material-design-google' );
					$link  = sprintf(
						'<span class="post-navigation-link__label">%1$s</span> <span class="post-navigation-link__title">%2$s</span>',
						wp_kses_post( $label ),
						'%title'
					);
				}
			}
		}

		// The dynamic portion of the function name, `$navigation_type`,
		// refers to the type of adjacency, 'next' or 'previous'.
		$get_link_function = "get_{$navigation_type}_post_link";
		$content           = $get_link_function( $format, $link );

		return sprintf(
			'<div %1$s>%2$s</div>',
			$wrapper_attributes,
			$content
		);
	}

}
