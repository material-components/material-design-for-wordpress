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
 * Widget API: WP_Widget_Archives class
 *
 * @package WordPress
 * @subpackage Widgets
 * @since 4.4.0
 */

namespace MaterialDesign\Theme\Widgets;

/**
 * Override default widget with our own markup
 */
class WP_Widget_Archives extends \WP_Widget_Archives {
	/**
	 * Outputs the content for the current Archives widget instance.
	 *
	 * @since 2.8.0
	 *
	 * @param array $args     Display arguments including 'before_title', 'after_title',
	 *                        'before_widget', and 'after_widget'.
	 * @param array $instance Settings for the current Archives widget instance.
	 */
	public function widget( $args, $instance ) {
		$title = ! empty( $instance['title'] ) ? $instance['title'] : esc_html__( 'Archives', 'material-design-google' );

		/** This filter is documented in wp-includes/widgets/class-wp-widget-pages.php */
		$title = apply_filters( 'widget_title', $title, $instance, $this->id_base );

		$c = ! empty( $instance['count'] ) ? '1' : '0';
		$d = ! empty( $instance['dropdown'] ) ? '1' : '0';

		echo wp_kses_post( $args['before_widget'] );

		if ( $title ) {
			echo wp_kses_post( $args['before_title'] . $title . $args['after_title'] );
		}

		if ( $d ) {
			$dropdown_id = "{$this->id_base}-dropdown-{$this->number}";
			?>
		<label class="screen-reader-text" for="<?php echo esc_attr( $dropdown_id ); ?>"><?php echo esc_html( $title ); ?></label>
		<select id="<?php echo esc_attr( $dropdown_id ); ?>" name="archive-dropdown">
			<?php
			/**
			 * Filters the arguments for the Archives widget drop-down.
			 *
			 * @since 2.8.0
			 * @since 4.9.0 Added the `$instance` parameter.
			 *
			 * @see wp_get_archives()
			 *
			 * @param array $args     An array of Archives widget drop-down arguments.
			 * @param array $instance Settings for the current Archives widget instance.
			 */
			$dropdown_args = apply_filters(
				'widget_archives_dropdown_args',
				array(
					'type'            => 'monthly',
					'format'          => 'option',
					'show_post_count' => $c,
				),
				$instance
			);

			switch ( $dropdown_args['type'] ) {
				case 'yearly':
					$label = esc_html__( 'Select Year', 'material-design-google' );
					break;
				case 'monthly':
					$label = esc_html__( 'Select Month', 'material-design-google' );
					break;
				case 'daily':
					$label = esc_html__( 'Select Day', 'material-design-google' );
					break;
				case 'weekly':
					$label = esc_html__( 'Select Week', 'material-design-google' );
					break;
				default:
					$label = esc_html__( 'Select Post', 'material-design-google' );
					break;
			}

			$type_attr = current_theme_supports( 'html5', 'script' ) ? '' : ' type="text/javascript"';
			?>

			<option value=""><?php echo esc_html( $label ); ?></option>
			<?php wp_get_archives( $dropdown_args ); ?>

		</select>

		<script<?php echo esc_html( $type_attr ); ?>>
		/* <![CDATA[ */
		(function() {
			var dropdown = document.getElementById( "<?php echo esc_js( $dropdown_id ); ?>" );
			function onSelectChange() {
				if ( dropdown.options[ dropdown.selectedIndex ].value !== '' ) {
					document.location.href = this.options[ this.selectedIndex ].value;
				}
			}
			dropdown.onchange = onSelectChange;
		})();
		/* ]]> */
		</script>

		<?php } else { ?>
		<ul class="mdc-list material-widget material-widget__archives">
			<?php
			/**
			 * Filters the arguments for the Archives widget.
			 *
			 * @since 2.8.0
			 * @since 4.9.0 Added the `$instance` parameter.
			 *
			 * @see wp_get_archives()
			 *
			 * @param array $args     An array of Archives option arguments.
			 * @param array $instance Array of settings for the current widget.
			 */
			wp_get_archives(
				apply_filters(
					'widget_archives_args',
					array(
						'type'            => 'monthly',
						'show_post_count' => $c,
					),
					$instance
				)
			);
			?>
		</ul>
			<?php
		}

		echo wp_kses_post( $args['after_widget'] );
	}
}
