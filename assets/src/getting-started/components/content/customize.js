import { Fragment } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import Button from '../../../wizard/components/navigation/button';

export const Customize = props => {
	return (
		<Fragment>
			<h2 className="material-gsm__content-title mdc-typography--headline6">
				{ __( 'Customize your theme', 'material-theme-builder' ) }
			</h2>
			<p>
				{ __(
					'Set and preview your global theme styles using Material Theme Options in the Customize panel [LINK]. Choose colors, typography, shapes, and icons to express your unique style. The Material Library shows all available Material Blocks. Once you’re satisfied with your changes, hit “Publish” to update your site.',
					'material-theme-builder'
				) }
			</p>
			<p>
				{ __(
					'Jump into the Block Editor for more options.',
					'material-theme-builder'
				) }
			</p>

			<h2 className="material-gsm__content-title mdc-typography--headline6">
				{ __( 'Starter Styles', 'material-theme-builder' ) }
			</h2>

			<p>
				{ __(
					'Start from our existing styles and use ',
					'material-theme-builder'
				) }
				<a
					href="https://material.io/design/material-theming/overview.html"
					target="_blank"
					rel="noopener noreferrer"
				>
					{ __( 'Material Theming', 'material-theme-builder' ) }
				</a>
				{ __(
					' to create a custom look and feel.',
					'material-theme-builder'
				) }
			</p>

			<h2 className="material-gsm__content-title mdc-typography--headline6">
				{ __( 'Color Palettes', 'material-theme-builder' ) }
			</h2>
			<p>
				{ __(
					'Change your primary and secondary colors and see them applied throughout your site. Need help picking colors? Try Material’s ',
					'material-theme-builder'
				) }
				<a
					href="https://material.io/design/color/the-color-system.html#tools-for-picking-colors"
					target="_blank"
					rel="noopener noreferrer"
				>
					{ __( 'color palette generator', 'material-theme-builder' ) }
				</a>
				{ __(
					' to find complementary, analogous, and triadic tonal palettes.',
					'material-theme-builder'
				) }
			</p>

			<h2 className="material-gsm__content-title mdc-typography--headline6">
				{ __( 'Typography', 'material-theme-builder' ) }
			</h2>

			<p>
				{ __( 'Choose from more than 1,000 typefaces in ', 'material-theme-builder' ) }
				<a
					href="https://fonts.google.com/"
					target="_blank"
					rel="noopener noreferrer"
				>
					{ __( 'Google Fonts', 'material-theme-builder' ) }
				</a>
				{ __(
					' to set your headline and body styles. Want tips on balancing expression with legibility?. Read Material’s ',
					'material-theme-builder'
				) }
				<a
					href="https://material.io/design/typography/the-type-system.html"
					target="_blank"
					rel="noopener noreferrer"
				>
					{ __( 'typography guidelines', 'material-theme-builder' ) }
				</a>
				{ __( ' for inspiration and best practices.', 'material-theme-builder' ) }
			</p>

			<h2 className="material-gsm__content-title mdc-typography--headline6">
				{ __( 'Corner Styles', 'material-theme-builder' ) }
			</h2>
			<p>
				{ __(
					'Material Design systematically applies a shape scheme across components. Change the global corner radius for all blocks or individually for each Material block.',
					'material-theme-builder'
				) }
			</p>

			<h2 className="material-gsm__content-title mdc-typography--headline6">
				{ __( 'Icon Style', 'material-theme-builder' ) }
			</h2>
			<p>
				{ __( 'All ', 'material-theme-builder' ) }
				<a
					href="http://material.io/icons"
					target="_blank"
					rel="noopener noreferrer"
				>
					{ __( 'Material Icons', 'material-theme-builder' ) }
				</a>
				{ __(
					' are included with this plugin. Choose from Filled, Outlined, Rounded, Two-tone, or Sharp styles.',
					'material-theme-builder'
				) }
			</p>

			<h2 className="material-gsm__content-title mdc-typography--headline6">
				{ __( 'Set Layout & Navigation', 'material-theme-builder' ) }
			</h2>
			<p>
				{ __(
					'Select how posts display – as either cards or image lists, in a wide or normal width. Additional card display options include raised or outlined cards, and show or hide post comments, author, excerpt, and date.',
					'material-theme-builder'
				) }
				{ __(
					'Choose how comment fields display within each post.',
					'material-theme-builder'
				) }
			</p>

			<h2 className="material-gsm__content-title mdc-typography--headline6">
				{ __( 'Top app bar', 'material-theme-builder' ) }
			</h2>
			<p>
				{ __(
					'Choose tabs, navigation drawer, or both for your site navigation. Give users the ability to search your site from within the top app bar. By default, the top app bar will hide when scrolling up, choose “Fixed” to keep the app bar visible at all times.',
					'material-theme-builder'
				) }
			</p>

			<h2 className="material-gsm__content-title mdc-typography--headline6">
				{ __( 'Footer', 'material-theme-builder' ) }
			</h2>
			<p>
				{ __(
					'Add footer text and give your users a quick way to jump back to the top of the page. Looking to add widgets at the bottom of your site? Use the Widgets[LINK] settings.',
					'material-theme-builder'
				) }
			</p>

			<div style={ { height: '20px' } }></div>
		</Fragment>
	);
};
