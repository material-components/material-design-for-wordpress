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

/**
 * WordPress dependencies
 */
import { Fragment } from '@wordpress/element';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import Button from '../../../wizard/components/navigation/button';
import getConfig from '../../get-config';

export const Customize = () => {
	return (
		<Fragment>
			<h2 className="material-gsm__content-title headline-medium">
				{ __( 'Customize your Theme', 'material-design' ) }
			</h2>
			<p className="body-large">
				{ __(
					'Set and preview your global theme styles using the Material Design options in the Customize panel. Choose colors, typography, shapes, and icons to express your unique style. Once you’re satisfied with your changes, hit “Publish” to update your site.',
					'material-design'
				) }
			</p>

			<img
				src={ `${ getConfig( 'assetsPath' ) }customize-your-theme.png` }
				alt=""
				style={ { maxWidth: '40%' } }
			/>

			<div style={ { height: '15px' } }></div>

			<div className="material-gsm__content-actions">
				<Button
					style="mdc-button--raised"
					text={ __( 'Customize', 'material-design' ) }
					trailingIcon="navigate_next"
					link={ getConfig( 'customize' ) }
				/>
			</div>

			<h2 className="material-gsm__content-title title-large">
				{ __( 'Starter Styles', 'material-design' ) }
			</h2>

			<p className={ 'body-large' }>
				{ __(
					'Start from our existing styles and use ',
					'material-design'
				) }
				<a
					href="https://material.io/design/material-theming/overview.html"
					target="_blank"
					rel="noopener noreferrer"
				>
					{ __( 'Material Theming', 'material-design' ) }
				</a>
				{ __(
					' to create a custom look and feel.',
					'material-design'
				) }
			</p>

			<h2 className="material-gsm__content-title title-large">
				{ __( 'Color Palettes', 'material-design' ) }
			</h2>
			<p className={ 'body-large' }>
				{ __(
					'Change your primary and secondary colors and see them applied throughout your site. Need help picking colors? Try Material’s ',
					'material-design'
				) }
				<a
					href="https://material.io/design/color/the-color-system.html#tools-for-picking-colors"
					target="_blank"
					rel="noopener noreferrer"
				>
					{ __( 'color palette generator', 'material-design' ) }
				</a>
				{ __(
					' to find complementary, analogous, and triadic tonal palettes.',
					'material-design'
				) }
			</p>

			<h2 className="material-gsm__content-title title-large">
				{ __( 'Typography', 'material-design' ) }
			</h2>

			<p className={ 'body-large' }>
				{ __(
					'Choose from more than 1,000 typefaces in ',
					'material-design'
				) }
				<a
					href="https://fonts.google.com/"
					target="_blank"
					rel="noopener noreferrer"
				>
					{ __( 'Google Fonts', 'material-design' ) }
				</a>
				{ __(
					' to set your headline and body styles. Want tips on balancing expression with legibility?. Read Material’s ',
					'material-design'
				) }
				<a
					href="https://material.io/design/typography/the-type-system.html"
					target="_blank"
					rel="noopener noreferrer"
				>
					{ __( 'typography guidelines', 'material-design' ) }
				</a>
				{ __(
					' for inspiration and best practices.',
					'material-design'
				) }
			</p>

			<h2 className="material-gsm__content-title title-large">
				{ __( 'Corner Styles', 'material-design' ) }
			</h2>
			<p className={ 'body-large' }>
				{ __(
					'Material Design systematically applies a shape scheme across components. Change the global corner radius for all blocks or individually for each Material block.',
					'material-design'
				) }
			</p>

			<h2 className="material-gsm__content-title title-large">
				{ __( 'Icon Style', 'material-design' ) }
			</h2>
			<p className="body-large">
				{ __( 'All ', 'material-design' ) }
				<a
					href="http://material.io/icons"
					target="_blank"
					rel="noopener noreferrer"
				>
					{ __( 'Material Icons', 'material-design' ) }
				</a>
				{ __(
					' are included with this plugin. Choose from Filled, Outlined, Rounded, Two-tone, or Sharp styles.',
					'material-design'
				) }
			</p>

			<h2 className="material-gsm__content-title headline-medium">
				{ __( 'Set Layout & Navigation', 'material-design' ) }
			</h2>
			<p className="body-large">
				{ __(
					'Select how posts display – as either cards or image lists, in a wide or normal width. Additional card display options include raised or outlined cards, and show or hide post comments, author, excerpt, and date. ',
					'material-design'
				) }
				{ __(
					'Choose how comment fields display within each post.',
					'material-design'
				) }
			</p>

			<h2 className="material-gsm__content-title title-large">
				{ __( 'Top app bar', 'material-design' ) }
			</h2>
			<p className="body-large">
				{ __(
					'Choose tabs, navigation drawer, or both for your site navigation. Give users the ability to search your site from within the top app bar. By default, the top app bar will hide when scrolling up, choose “Fixed” to keep the app bar visible at all times.',
					'material-design'
				) }
			</p>

			<h2 className="material-gsm__content-title title-large">
				{ __( 'Footer', 'material-design' ) }
			</h2>

			<p className="body-large">
				{ __(
					'Add footer text and give your users a quick way to jump back to the top of the page. Looking to add widgets at the bottom of your site? Use the ',
					'material-design'
				) }
				<a
					href="${ getConfig( 'customize' ) }?autofocus[panel]=widgets"
					target="_blank"
					rel="noopener noreferrer"
				>
					{ __( 'Widgets', 'material-design' ) }
				</a>
				{ __( ' settings.', 'material-design' ) }
			</p>

			<div style={ { height: '20px' } }></div>
		</Fragment>
	);
};
