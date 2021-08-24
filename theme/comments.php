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
 * The template for displaying comments
 *
 * This is the template that displays the area of the page that contains both the current comments
 * and the comment form.
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package MaterialDesign
 */

/*
 * If the current post is protected by a password and
 * the visitor has not yet entered the password we will
 * return early without loading the comments.
 */
if ( post_password_required() ) {
	return;
}

$commenter = wp_get_current_commenter();
$style     = get_theme_mod( 'comment_fields_style', 'outlined' );

$classes  = 'outlined' === $style ? 'mdc-text-field--outlined mdc-text-field--no-label' : 'mdc-text-field--filled';
$req      = get_option( 'require_name_email' );
$html_req = ( $req ? " required='required'" : '' );

$outlined_label = '<span class="mdc-notched-outline">
	<span class="mdc-notched-outline__leading"></span>
	<span class="mdc-notched-outline__notch">
	<span class="mdc-floating-label" id="%s">%s</span>
	</span>
	<span class="mdc-notched-outline__trailing"></span>
</span>';
$filled_label   = '<span class="mdc-floating-label" id="%s">%s</span>
				<span class="mdc-line-ripple"></span>';

$args = [
	'title_reply'        => __( 'Leave a comment', 'material-design-google' ),
	'title_reply_before' => '<h2 id="reply-title" class="comment-reply-title mdc-typography--headline4">',
	'title_reply_after'  => '</h2>',
	'fields'             => [
		'author' => sprintf(
			'<div class="mdc-layout-grid__cell--span-6 mdc-layout-grid__cell--span-12-tablet">
				<div class="mdc-text-field %s comment-field">
					<input id="author" name="author" class="mdc-text-field__input" aria-labelledby="author-label" value="%s" %s />
					%s
				</div>
			</div>',
			$classes,
			esc_attr( $commenter['comment_author'] ),
			$html_req,
			sprintf(
				'outlined' === $style ? $outlined_label : $filled_label,
				'author-label',
				esc_html__( 'Name', 'material-design-google' )
			)
		),
		'email'  => sprintf(
			'<div class="mdc-layout-grid__cell--span-6 mdc-layout-grid__cell--span-12-tablet">
				<div class="mdc-text-field %s comment-field">
					<input id="email" name="email" type="email" class="mdc-text-field__input" aria-labelledby="email-label" value="%s" %s />
					%s
				</div>
			</div>',
			$classes,
			esc_attr( $commenter['comment_author_email'] ),
			$html_req,
			sprintf(
				'outlined' === $style ? $outlined_label : $filled_label,
				'email-label',
				esc_html__( 'Email', 'material-design-google' )
			)
		),
		'url'    => sprintf(
			'<div class="mdc-layout-grid__cell--span-12">
				<div class="mdc-text-field %s comment-field">
					<input id="url" name="url" type="url" class="mdc-text-field__input" aria-labelledby="url-label" value="%s" />
					%s
				</div>
			</div>',
			$classes,
			esc_attr( $commenter['comment_author_url'] ),
			sprintf(
				'outlined' === $style ? $outlined_label : $filled_label,
				'url-label',
				esc_html__( 'Website', 'material-design-google' )
			)
		),
	],
	'comment_field'      => sprintf(
		'<div class="mdc-text-field mdc-text-field--textarea %s comment-field">
			<textarea id="comment" name="comment" class="mdc-text-field__input" aria-labelledby="comment-label" required></textarea>
			%s
		</div>',
		$classes,
		sprintf(
			'outlined' === $style ? $outlined_label : $filled_label,
			'comment-label',
			esc_html__( 'Comment', 'material-design-google' )
		)
	),
	'submit_button'      => '<button id="%2$s" class="mdc-button mdc-button--raised mdc-ripple-upgraded %3$s" type="submit"><span class="mdc-button__ripple"></span><span class="mdc-button__label">%4$s</span></button>',
];

if ( has_action( 'set_comment_cookies', 'wp_set_comment_cookies' ) && get_option( 'show_comments_cookies_opt_in' ) ) {
	$consent = empty( $commenter['comment_author_email'] ) ? '' : 'checked="checked"';

	$args['fields']['cookies'] = sprintf(
		'<div class="mdc-layout-grid__cell--span-12">
			<div class="mdc-form-field">
				<div class="mdc-checkbox">
					<input type="checkbox"
						class="mdc-checkbox__native-control"
						id="wp-comment-cookies-consent"
						name="wp-comment-cookies-consent"
						%s
					/>
					<div class="mdc-checkbox__background">
					<svg class="mdc-checkbox__checkmark"
						viewBox="0 0 24 24">
						<path class="mdc-checkbox__checkmark-path"
							fill="none"
							d="M1.73,12.91 8.1,19.28 22.79,4.59"/>
					</svg>
					<div class="mdc-checkbox__mixedmark"></div>
					</div>
					<div class="mdc-checkbox__ripple"></div>
				</div>
				<label for="wp-comment-cookies-consent">%s</label>
			</div>
		</div>',
		$consent,
		esc_html__( 'Save my name, email, and website in this browser for the next time I comment.', 'material-design-google' )
	);
}

?>

<div id="comments" class="comments-area section-inner">

	<?php
	// You can start editing here -- including this comment!
	if ( have_comments() ) :
		$count = get_comments_number();
		?>
		<h2 class="comments-title mdc-typography--headline4">
			<?php esc_html_e( 'Join the conversation', 'material-design-google' ); ?>
		</h2><!-- .comments-title -->
		<div class="comments-title-count">
			<span class="material-icons">comment</span>
			<span class="comment-count"><?php echo esc_html( $count ); ?> <?php echo esc_html( _n( 'comment', 'comments', $count, 'material-design-google' ) ); ?></span>
		</div><!-- .comments-title -->

		<?php the_comments_navigation(); ?>

		<ul class="comment-list">
			<?php
			wp_list_comments(
				array(
					'style'       => 'ul',
					'avatar_size' => 60,
					'walker'      => new MaterialDesign\Theme\Walker_Comment(),
				)
			);
			?>
		</ul><!-- .comment-list -->

		<?php
		the_comments_navigation();

		// If comments are closed and there are comments, let's leave a little note, shall we?
		if ( ! comments_open() ) :
			?>
			<p class="no-comments"><?php esc_html_e( 'Comments are closed.', 'material-design-google' ); ?></p>
			<?php
		endif;

	endif; // Check for have_comments().

	comment_form( $args );
	?>

</div><!-- #comments -->
