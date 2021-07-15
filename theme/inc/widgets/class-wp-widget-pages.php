<?php
/**
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
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
 * Widget API: WP_Widget_Pages class
 *
 * @package WordPress
 * @subpackage Widgets
 * @since 4.4.0
 */

namespace MaterialDesign\Theme\Widgets;

/**
 * Override default widget with our own markup
 */
class WP_Widget_Pages extends \WP_Widget_Pages {
	/**
	 * Outputs the content for the current Pages widget instance.
	 *
	 * @since 2.8.0
	 *
	 * @param array $args     Display arguments including 'before_title', 'after_title',
	 *                        'before_widget', and 'after_widget'.
	 * @param array $instance Settings for the current Pages widget instance.
	 */
	public function widget( $args, $instance ) {
		$title = ! empty( $instance['title'] ) ? $instance['title'] : esc_html__( 'Pages', 'material-design-google' );

		/**
		 * Filters the widget title.
		 *
		 * @since 2.6.0
		 *
		 * @param string $title    The widget title. Default 'Pages'.
		 * @param array  $instance Array of settings for the current widget.
		 * @param mixed  $id_base  The widget ID.
		 */
		$title = apply_filters( 'widget_title', $title, $instance, $this->id_base );

		$sortby = empty( $instance['sortby'] ) ? 'menu_order' : $instance['sortby'];

		if ( 'menu_order' === $sortby ) {
			$sortby = 'menu_order, post_title';
		}

		/**
		 * Filters the arguments for the Pages widget.
		 *
		 * @since 2.8.0
		 * @since 4.9.0 Added the `$instance` parameter.
		 *
		 * @see wp_list_pages()
		 *
		 * @param array $args     An array of arguments to retrieve the pages list.
		 * @param array $instance Array of settings for the current widget.
		 */
		$out = wp_list_pages(
			apply_filters(
				'widget_pages_args',
				array(
					'title_li'    => '',
					'echo'        => 0,
					'sort_column' => $sortby,
				),
				$instance
			)
		);

		if ( ! empty( $out ) ) {
			echo wp_kses_post( $args['before_widget'] );
			if ( $title ) {
				echo wp_kses_post( $args['before_title'] . $title . $args['after_title'] );
			}
			?>
		<ul class="mdc-list">
			<?php echo wp_kses_post( $out ); ?>
		</ul>
			<?php
			echo wp_kses_post( $args['after_widget'] );
		}
	}
}
