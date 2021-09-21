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
 * Material Design functions and definitions
 *
 * @link https://developer.wordpress.org/themes/basics/theme-functions/
 *
 * @package MaterialDesign
 */

if ( ! function_exists( 'material_design_theme_setup' ) ) :
	/**
	 * Sets up theme defaults and registers support for various WordPress features.
	 *
	 * Note that this function is hooked into the after_setup_theme hook, which
	 * runs before the init hook. The init hook is too late for some features, such
	 * as indicating support for post thumbnails.
	 */
	function material_design_theme_setup() {
		/*
		 * Make theme available for translation.
		 * Translations can be filed in the /languages/ directory.
		 * If you're building a theme based on the Material Design theme, use a find and replace
		 * to change 'material-design-google' to the name of your theme in all the template files.
		 */
		load_theme_textdomain( 'material-design-google' );

		// Add default posts and comments RSS feed links to head.
		add_theme_support( 'automatic-feed-links' );

		/*
		 * Let WordPress manage the document title.
		 * By adding theme support, we declare that this theme does not use a
		 * hard-coded <title> tag in the document head, and expect WordPress to
		 * provide it for us.
		 */
		add_theme_support( 'title-tag' );

		/*
		 * Enable support for Post Thumbnails on posts and pages.
		 *
		 * @link https://developer.wordpress.org/themes/functionality/featured-images-post-thumbnails/
		 */
		add_theme_support( 'post-thumbnails' );

		// This theme uses wp_nav_menu() in two location.
		register_nav_menus(
			[
				'menu-1' => esc_html__( 'Tabs', 'material-design-google' ),
				'menu-2' => esc_html__( 'Drawer', 'material-design-google' ),
			]
		);

		/*
		 * Switch default core markup for search form, comment form, and comments
		 * to output valid HTML5.
		 */
		add_theme_support(
			'html5',
			[
				'search-form',
				'comment-form',
				'comment-list',
				'gallery',
				'caption',
			]
		);

		// Add theme support for selective refresh for widgets.
		add_theme_support( 'customize-selective-refresh-widgets' );

		/**
		 * Add support for core custom logo.
		 *
		 * @link https://codex.wordpress.org/Theme_Logo
		 */
		add_theme_support(
			'custom-logo',
			[
				'height'      => 250,
				'width'       => 250,
				'flex-width'  => true,
				'flex-height' => true,
			]
		);

		add_theme_support( 'align-wide' );

		add_theme_support( 'editor-styles' );
		add_editor_style( 'assets/css/editor-compiled.css' );
	}
endif;
add_action( 'after_setup_theme', 'material_design_theme_setup' );

/**
 * Set the content width in pixels, based on the theme's design and stylesheet.
 *
 * Priority 0 to make it available to lower priority callbacks.
 *
 * @global int $content_width
 */
function material_design_theme_content_width() {
	// This variable is intended to be overruled from themes.
	// Open WPCS issue: {@link https://github.com/WordPress-Coding-Standards/WordPress-Coding-Standards/issues/1043}.
	// phpcs:ignore WordPress.NamingConventions.PrefixAllGlobals.NonPrefixedVariableFound
	$GLOBALS['content_width'] = apply_filters( 'material_design_theme_content_width', 700 );
}
add_action( 'after_setup_theme', 'material_design_theme_content_width', 0 );

/**
 * Register widget area.
 *
 * @link https://developer.wordpress.org/themes/functionality/sidebars/#registering-a-sidebar
 */
function material_design_theme_widgets_init() {
	register_sidebar(
		[
			'name'          => esc_html__( 'Footer Left', 'material-design-google' ),
			'id'            => 'footer',
			'description'   => esc_html__( 'Footer left area.', 'material-design-google' ),
			'before_widget' => '<section id="%1$s" class="widget %2$s">',
			'after_widget'  => '</section>',
			'before_title'  => '<h2 class="widget-title mdc-typography--headline5">',
			'after_title'   => '</h2>',
		]
	);

	register_sidebar(
		[
			'name'          => esc_html__( 'Footer Right', 'material-design-google' ),
			'id'            => 'footer-right',
			'description'   => esc_html__( 'Footer right area.', 'material-design-google' ),
			'before_widget' => '<section id="%1$s" class="widget %2$s">',
			'after_widget'  => '</section>',
			'before_title'  => '<h2 class="widget-title mdc-typography--headline5">',
			'after_title'   => '</h2>',
		]
	);
}
add_action( 'widgets_init', 'material_design_theme_widgets_init' );

/**
 * Enqueue scripts and styles.
 */
function material_design_theme_scripts() {
	$theme_version = wp_get_theme()->get( 'Version' );
	$suffix        = defined( 'SCRIPT_DEBUG' ) && SCRIPT_DEBUG ? '' : '.min';

	wp_enqueue_style( 'material-design-google-style', get_stylesheet_uri(), [], $theme_version );

	wp_enqueue_style( 'material-design-google-front-end-css', get_template_directory_uri() . "/assets/css/front-end-compiled{$suffix}.css", [ 'material-design-google-style' ], $theme_version );
	wp_style_add_data( 'material-design-google-front-end-css', 'rtl', 'replace' );

	wp_add_inline_style( 'material-design-google-style', \MaterialDesign\Theme\Customizer\get_css_vars() );

	if ( ! wp_style_is( 'material-google-fonts-cdn', 'enqueued' ) ) {
		wp_enqueue_style(
			'material-google-fonts-cdn',
			esc_url( '//fonts.googleapis.com/css?family=Roboto|Material+Icons' ),
			[],
			$theme_version
		);
	}

	wp_enqueue_script( 'material-design-google-js', get_template_directory_uri() . "/assets/js/front-end{$suffix}.js", [], $theme_version, true );

	if ( is_singular() && comments_open() && get_option( 'thread_comments' ) ) {
		wp_enqueue_script( 'comment-reply' );
	}
}
add_action( 'wp_enqueue_scripts', 'material_design_theme_scripts' );

/**
 * Determine if the Material Design plugin is installed and active.
 *
 * @return boolean
 */
function material_is_plugin_active() {
	return class_exists( '\MaterialDesign\Plugin\Plugin' );
}

/**
 * Add material theme meta version tag.
 *
 * @return void
 */
function material_theme_version_head_tag() {
	printf( '<meta name="material-design-google-theme" content="v%s" />', esc_attr( wp_get_theme()->get( 'Version' ) ) );
}

add_action( 'wp_head', 'material_theme_version_head_tag' );


/**
 * Custom template tags for this theme.
 */
require get_template_directory() . '/inc/template-tags.php';

/**
 * Functions which enhance the theme by hooking into WordPress.
 */
require get_template_directory() . '/inc/template-functions.php';

/**
 * Admin additions.
 */
require get_template_directory() . '/inc/admin.php';

/**
 * Customizer additions.
 */
require get_template_directory() . '/inc/customizer/class-more-options.php';
require get_template_directory() . '/inc/customizer.php';
require get_template_directory() . '/inc/customizer/colors.php';
require get_template_directory() . '/inc/customizer/header-footer.php';
require get_template_directory() . '/inc/customizer/layout.php';
require get_template_directory() . '/inc/customizer/menu.php';

/**
 * Custom menu walker
 */
require get_template_directory() . '/inc/class-menu-walker.php';
require get_template_directory() . '/inc/class-menu-drawer-walker.php';

/**
 * Custom comments walker
 */
require get_template_directory() . '/inc/class-walker-comment.php';

require get_template_directory() . '/inc/class-tgm-plugin-activation.php';

/**
 * Load Jetpack compatibility file.
 */
if ( defined( 'JETPACK__VERSION' ) ) {
	require get_template_directory() . '/inc/jetpack.php';
}

/**
 * Widgets
 */
require get_template_directory() . '/inc/widgets/class-wp-widget-archives.php';
require get_template_directory() . '/inc/widgets/class-wp-widget-categories.php';
require get_template_directory() . '/inc/widgets/class-wp-widget-meta.php';
require get_template_directory() . '/inc/widgets/class-wp-widget-pages.php';
require get_template_directory() . '/inc/widgets/class-wp-widget-recent-comments.php';
require get_template_directory() . '/inc/widgets/class-wp-widget-recent-posts.php';
require get_template_directory() . '/inc/widgets/class-wp-widget-rss.php';
require get_template_directory() . '/inc/widgets.php';

/**
 * Block editor.
 */
require get_template_directory() . '/inc/block-editor.php';

MaterialDesign\Theme\Admin\setup();
MaterialDesign\Theme\Customizer\setup();
MaterialDesign\Theme\Customizer\Colors\setup();
MaterialDesign\Theme\Customizer\Header_Footer\setup();
MaterialDesign\Theme\Customizer\Layout\setup();
MaterialDesign\Theme\Customizer\Menu\setup();
MaterialDesign\Theme\Widgets\setup();
MaterialDesign\Theme\BlockEditor\setup();
