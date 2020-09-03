import { Fragment } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import Button from '../../../wizard/components/navigation/button';

export const Customize = props => {
	return (
		<Fragment>
			<h2 className="material-gsm__content-title mdc-typography--headline6">
				{ __( 'How to edit your Material Theme', 'material-theme-builder' ) }
			</h2>
			<p className="material-gsm__content-description">
				{ __(
					'See your global styles applied in real time by customizing your Material Theme Options directly from the Customize panel. The live preview allows you to see your changes applied directly to your site and our Material Library shows all available Material Blocks. Once you’re satisfied with your changes “Publish” the changes to update your site',
					'material-theme-builder'
				) }
			</p>
			{ /* Image Here */ }
			<p className="material-gsm__content-description">
				{ __(
					'If you want to override a specific component (like a button) that can be done from the block settings.',
					'material-theme-builder'
				) }
			</p>

			<h2 className="material-gsm__content-title mdc-typography--headline6">
				{ __( 'Starter Styles', 'material-theme-builder' ) }
			</h2>
			<p className="material-gsm__content-description">
				Start from our existing styles and take advantage of{ ' ' }
				<a
					href="https://material.io/design/material-theming/overview.html"
					target="_blank"
				>
					Material Theming
				</a>{ ' ' }
				by customizing your theme to truly make your site your own.
			</p>

			<h2 className="material-gsm__content-title mdc-typography--headline6">
				{ __( 'Color Palettes', 'material-theme-builder' ) }
			</h2>
			<p className="material-gsm__content-description">
				Change your primary and secondary colors and see your site come to life
				with Material Design’s color system. Need some help? Try Material’s
				<a
					href="https://material.io/design/color/the-color-system.html#tools-for-picking-colors"
					target="_blank"
				>
					{ ' ' }
					color palette generator
				</a>{ ' ' }
				to find complementary, analogous, and triadic tonal palettes.
			</p>

			<h2 className="material-gsm__content-title mdc-typography--headline6">
				{ __( 'Typography (Font Styles)', 'material-theme-builder' ) }
			</h2>
			<p className="material-gsm__content-description">
				Choose from the full set of{ ' ' }
				<a href="https://fonts.google.com/" target="_blank">
					Google Fonts
				</a>
				. Headlines are a great place to inject expression. To retain
				legibility, utilitarian fonts are better for smaller text sizes. Read
				Material’s{ ' ' }
				<a
					href="https://material.io/design/typography/the-type-system.html"
					target="_blank"
				>
					type system
				</a>{ ' ' }
				for more guidance.
			</p>

			<h2 className="material-gsm__content-title mdc-typography--headline6">
				{ __( 'Shape Size (Corner Styles)', 'material-theme-builder' ) }
			</h2>
			<p className="material-gsm__content-description">
				{ __(
					'The Material Shape System enables you to systematically apply shapes across a variety of components. Change the global corner radius for all blocks or individually for each Material block.',
					'material-theme-builder'
				) }
			</p>

			<h2 className="material-gsm__content-title mdc-typography--headline6">
				{ __( 'Icon Style', 'material-theme-builder' ) }
			</h2>
			<p className="material-gsm__content-description">
				All of the{ ' ' }
				<a href="http://material.io/icons" target="_blank">
					Material Icons
				</a>{ ' ' }
				and their variants are included with this plugin. Choose from Filled,
				Outlined, Rounded, Two-tone, or Sharp icons that best reflect your
				style.
			</p>

			<div className="material-gsm__content-actions">
				<Button
					style="mdc-button--raised"
					text={ __( 'Next', 'material-theme-builder' ) }
					trailingIcon="navigate_next"
					onClick={ props.handleClick }
				/>
			</div>

			<div style={ { height: '20px' } }></div>
		</Fragment>
	);
};
