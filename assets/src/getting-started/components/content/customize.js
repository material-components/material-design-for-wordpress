import { Fragment } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import Button from '../../../wizard/components/navigation/button';

export const Customize = props => {
	return (
		<Fragment>
			<h2 className="material-gsm__content-title mdc-typography--headline6">
				{ __( 'How to edit your Material Theme', 'material-theme-builder' ) }
			</h2>
			<p>
				{ __(
					'See your global styles applied in real time by customizing your Material Theme Options directly from the Customize panel. The live preview allows you to see your changes applied directly to your site and our Material Library shows all available Material Blocks. Once you’re satisfied with your changes “Publish” the changes to update your site',
					'material-theme-builder'
				) }
			</p>
			{ /* Image Here */ }
			<p>
				{ __(
					'If you want to override a specific component (like a button) that can be done from the block settings.',
					'material-theme-builder'
				) }
			</p>

			<h2 className="material-gsm__content-title mdc-typography--headline6">
				{ __( 'Starter Styles', 'material-theme-builder' ) }
			</h2>
			<p>
				{ __(
					'Start from our existing styles and take advantage of ',
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
					' by customizing your theme to truly make your site your own.',
					'material-theme-builder'
				) }
			</p>

			<h2 className="material-gsm__content-title mdc-typography--headline6">
				{ __( 'Color Palettes', 'material-theme-builder' ) }
			</h2>
			<p>
				{ __(
					'Change your primary and secondary colors and see your site come to life with Material Design’s color system. Need some help? Try Material’s ',
					'material-theme-builder'
				) }
				<a
					href="https://material.io/design/color/the-color-system.html#tools-for-picking-colors"
					target="_blank"
					rel="noopener noreferrer"
				>
					{ __( 'color palette generator', 'material-theme-builder' ) }
				</a>
			</p>

			<h2 className="material-gsm__content-title mdc-typography--headline6">
				{ __( 'Typography (Font Styles)', 'material-theme-builder' ) }
			</h2>
			<p>
				{ __( 'Choose from the full set of ', 'material-theme-builder' ) }
				<a
					href="https://fonts.google.com/"
					target="_blank"
					rel="noopener noreferrer"
				>
					{ __( 'Google Fonts.', 'material-theme-builder' ) }
				</a>
				{ __(
					' Headlines are a great place to inject expression. To retain legibility, utilitarian fonts are better for smaller text sizes. Read Material’s ',
					'material-theme-builder'
				) }
				<a
					href="https://material.io/design/typography/the-type-system.html"
					target="_blank"
					rel="noopener noreferrer"
				>
					{ __( 'type system', 'material-theme-builder' ) }
				</a>
				{ __( '  for more guidance.', 'material-theme-builder' ) }
			</p>

			<h2 className="material-gsm__content-title mdc-typography--headline6">
				{ __( 'Shape Size (Corner Styles)', 'material-theme-builder' ) }
			</h2>
			<p>
				{ __(
					'The Material Shape System enables you to systematically apply shapes across a variety of components. Change the global corner radius for all blocks or individually for each Material block.',
					'material-theme-builder'
				) }
			</p>

			<h2 className="material-gsm__content-title mdc-typography--headline6">
				{ __( 'Icon Style', 'material-theme-builder' ) }
			</h2>
			<p>
				{ __( 'All of the ', 'material-theme-builder' ) }
				<a
					href="http://material.io/icons"
					target="_blank"
					rel="noopener noreferrer"
				>
					{ __( 'Material Icons', 'material-theme-builder' ) }
				</a>
				{ __(
					' and their variants are included with this plugin. Choose from Filled, Outlined, Rounded, Two-tone, or Sharp icons that best reflect your style.',
					'material-theme-builder'
				) }
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
