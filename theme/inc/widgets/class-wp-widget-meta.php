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
 * Widget API: WP_Widget_Meta class
 *
 * @package WordPress
 * @subpackage Widgets
 * @since 4.4.0
 */

namespace MaterialDesign\Theme\Widgets;

/**
 * Override default widget with our own markup
 */
class WP_Widget_Meta extends \WP_Widget_Meta {
	/**
	 * Outputs the content for the current Categories widget instance.
	 *
	 * @since 2.8.0
	 *
	 * @staticvar bool $first_dropdown
	 *
	 * @param array $args     Display arguments including 'before_title', 'after_title',
	 *                        'before_widget', and 'after_widget'.
	 * @param array $instance Settings for the current Categories widget instance.
	 */
	public function widget( $args, $instance ) {
		$title = ! empty( $instance['title'] ) ? $instance['title'] : esc_html__( 'Meta', 'material-design-google' );

		/** This filter is documented in wp-includes/widgets/class-wp-widget-pages.php */
		$title = apply_filters( 'widget_title', $title, $instance, $this->id_base );

		echo wp_kses_post( $args['before_widget'] );

		if ( $title ) {
			echo wp_kses_post( $args['before_title'] . $title . $args['after_title'] );
		}
		?>
			<ul class="mdc-list">
			<?php wp_register( '<li class="mdc-list-item">' ); ?>
			<li class="mdc-list-item"><?php wp_loginout(); ?></li>
			<li class="mdc-list-item"><a href="<?php echo esc_url( get_bloginfo( 'rss2_url' ) ); ?>"><?php esc_html_e( 'Entries feed', 'material-design-google' ); ?></a></li>
			<li class="mdc-list-item"><a href="<?php echo esc_url( get_bloginfo( 'comments_rss2_url' ) ); ?>"><?php esc_html_e( 'Comments feed', 'material-design-google' ); ?></a></li>
			<?php
			/**
			 * Filters the "WordPress.org" list item HTML in the Meta widget.
			 *
			 * @since 3.6.0
			 * @since 4.9.0 Added the `$instance` parameter.
			 *
			 * @param string $html     Default HTML for the WordPress.org list item.
			 * @param array  $instance Array of settings for the current widget.
			 */
			$output = apply_filters(
				'widget_meta_poweredby',
				sprintf(
					'<li class="mdc-list-item"><a href="%1$s">%2$s</a></li>',
					esc_url( esc_html__( 'https://wordpress.org/', 'material-design-google' ) ),
					esc_html__( 'WordPress.org', 'material-design-google' )
				),
				$instance
			);

			echo wp_kses_post( $output );

			wp_meta();
			?>
			</ul>
			<?php

			echo wp_kses_post( $args['after_widget'] );
	}
}
