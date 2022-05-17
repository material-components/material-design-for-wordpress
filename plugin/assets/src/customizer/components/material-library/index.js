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
import { __ } from '@wordpress/i18n';
import { useEffect, useState } from '@wordpress/element';

/**
 * Internal dependencies
 */
import Lists from './sections/lists';
import Table from './sections/table';
import Cards from './sections/cards';
import Chips from './sections/chips';
import Switch from './sections/switch';
import Fields from './sections/fields';
import Radios from './sections/radios';
import TabBar from './sections/tab-bar';
import Buttons from './sections/buttons';
import Checkboxes from './sections/checkboxes';
import ImageLists from './sections/image-lists';
import { materialIconClass, materialIconFontName } from './utils';
import { Overrides } from './styles';
import '../../../../css/src/base/variables.css';
import '../../../../css/src/components/material.css';

import colorUtils from '../../../common/color-utils';

/**
 * Adds link tag with appropriate google fonts to head.
 *
 * @param {string} headings Import headings font
 * @param {string} headline Import headline font
 * @param {string} body     Import body font
 * @param {string} display  Import display font
 * @param {string} label    Import label font
 *
 * @return {HTMLLinkElement} Link to google fonts.
 */
const googleFontsUrl = ( headings, headline, body, display, label ) => {
	const join = str => str.replace( ' ', '+' );
	const link = document.createElement( 'link' );

	const fonts = [ headline, headings, body, display, label ];

	// Make fonts unique.
	const uniqueFonts = [ ...new Set( fonts ) ];

	// Clean up empty fonts.
	const cleanFonts = uniqueFonts.filter( font => font );

	// Join fonts into string as pipe.
	const fontString = join( cleanFonts.join( '|' ) );

	link.rel = 'stylesheet';
	link.href = `https://fonts.googleapis.com/css?family=${ fontString }`;

	return link;
};

const MaterialLibrary = ( {
	bodyFontFamily,
	labelFontFamily,
	headlineFontFamily,
	displayFontFamily,
	titleFontFamily,
	iconCollection,
	primaryColor,
	onPrimaryColor,
	secondaryColor,
	onSecondaryColor,
	surfaceColor,
	onSurfaceColor,
	backgroundColor,
	onBackgroundColor,
	buttonRadius,
	cardRadius,
	chipRadius,
	dataTableRadius,
	imageListRadius,
	textFieldRadius,
	theme,
} ) => {
	const [ link ] = useState(
		googleFontsUrl(
			titleFontFamily,
			headlineFontFamily,
			bodyFontFamily,
			displayFontFamily,
			labelFontFamily
		)
	);

	const iconStyle = materialIconClass( iconCollection );

	useEffect( () => {
		document.head.appendChild( link );
		return () => document.head.removeChild( link );
	}, [ link ] );

	return (
		<>
			<Overrides
				headline={ headlineFontFamily }
				body={ bodyFontFamily }
				title={ bodyFontFamily }
				display={ displayFontFamily }
				label={ labelFontFamily }
				primaryColor={ primaryColor }
				secondaryColor={ secondaryColor }
				onPrimaryColor={ onPrimaryColor }
				onSecondaryColor={ onSecondaryColor }
				surfaceColor={ surfaceColor }
				onSurfaceColor={ onSurfaceColor }
				surfaceColorMix4={ colorUtils.mix(
					surfaceColor,
					onSurfaceColor,
					0.04
				) }
				surfaceColorMix12={ colorUtils.mix(
					surfaceColor,
					onSurfaceColor,
					0.12
				) }
				backgroundColor={ backgroundColor }
				onBackgroundColor={ onBackgroundColor }
				iconCollection={ materialIconFontName( iconCollection ) }
			/>

			<div id="material-library-preview">
				<h2 className="headline-large">
					{ __( 'Material Components', 'material-design' ) }
				</h2>
				<section>
					<h3 className="headline-medium">
						{ __( 'Blocks', 'material-design' ) }
					</h3>
					<p>
						{ __(
							'Build your WordPress site using these Material Components blocks.',
							'material-design'
						) }
					</p>
					<hr />
					<Buttons
						iconStyle={ iconStyle }
						primaryColor={ primaryColor }
						onPrimaryColor={ onPrimaryColor }
						radius={ buttonRadius }
					/>
					<hr />
					<Cards
						radius={ cardRadius }
						buttonRadius={ buttonRadius }
					/>
					<hr />
					<Table radius={ dataTableRadius } />
					<hr />
					<ImageLists radius={ imageListRadius } />
					<hr />
					<Lists iconStyle={ iconStyle } />
					<hr />
					<TabBar iconStyle={ iconStyle } />
				</section>

				<hr />

				<section style={ { marginTop: '100px' } }>
					<h3 className="headline-medium">
						{ __( 'Components', 'material-design' ) }
					</h3>
					<p>
						{ __(
							'Styled components available when the Material Design theme is activated.',
							'material-design'
						) }
					</p>
					{ 'material-design' !== theme && (
						<p>
							{ __(
								'Enable Material Design theme for more components.',
								'material-design'
							) }
						</p>
					) }
					<hr />
					<Checkboxes />
					<hr />
					<Chips radius={ chipRadius } />
					<hr />
					<Radios />
					<hr />
					<Fields radius={ textFieldRadius } />
					<hr />
					<Switch />
				</section>
			</div>
		</>
	);
};

export default MaterialLibrary;
