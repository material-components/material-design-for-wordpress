/**
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { Fragment } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import Button from '../../../wizard/components/navigation/button';
import getConfig from '../../get-config';

export const Customize = props => {
	return (
		<Fragment>
			<h2 className="material-gsm__content-title mdc-typography--headline6">
				{ __( 'Customize your theme', 'material-theme-builder' ) }
			</h2>
			<p>
				{ __(
					'Set and preview your global theme styles using Material Theme Options in the Customize panel. Choose colors, typography, shapes, and icons to express your unique style. Once you’re satisfied with your changes, hit “Publish” to update your site.',
					'material-theme-builder'
				) }
			</p>

			<img src={ `${ getConfig( 'assetsPath' ) }customize-your-theme.png` } alt="" style={ { maxWidth: '40%' } } />

			<div style={ { height: '15px' } }></div>

			<div className="material-gsm__content-actions">
				<Button
					style="mdc-button--raised"
					text={ __( 'Customize', 'material-theme-builder' ) }
					trailingIcon="navigate_next"
					link={ getConfig( 'customize' ) }
				/>
			</div>

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
				{ __( ' to create a custom look and feel.', 'material-theme-builder' ) }
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
				{ __(
					'Choose from more than 1,000 typefaces in ',
					'material-theme-builder'
				) }
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
				{ __(
					' for inspiration and best practices.',
					'material-theme-builder'
				) }
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
					'Select how posts display – as either cards or image lists, in a wide or normal width. Additional card display options include raised or outlined cards, and show or hide post comments, author, excerpt, and date. ',
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
					'Add footer text and give your users a quick way to jump back to the top of the page. Looking to add widgets at the bottom of your site? Use the ',
					'material-theme-builder'
				) }
				<a
					href="${ getConfig( 'customize' ) }?autofocus[panel]=widgets"
					target="_blank"
					rel="noopener noreferrer"
				>
					{ __( 'Widgets', 'material-theme-builder' ) }
				</a>
				{ __( ' settings.', 'material-theme-builder' ) }
			</p>

			<div style={ { height: '20px' } }></div>
		</Fragment>
	);
};
