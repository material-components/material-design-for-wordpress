/**
 * External dependencies
 */
import { useEffect, useState } from 'react';
import chroma from 'chroma-js';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

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

/**
 * Adds link tag with appropriate google fonts to head.
 *
 * @param {string} headings Import headings font
 * @param {string} body Import body font
 */
const googleFontsUrl = ( headings, body ) => {
	const join = str => str.replace( ' ', '+' );
	const link = document.createElement( 'link' );

	link.rel = 'stylesheet';
	link.href = `https://fonts.googleapis.com/css?family=${ join(
		headings
	) }|${ join( body ) }`;

	return link;
};

const MaterialLibrary = ( {
	primaryColor,
	bodyFontFamily,
	headFontFamily,
	iconCollection,
	secondaryColor,
	primaryTextColor,
	secondaryTextColor,
	surfaceColor,
	surfaceTextColor,
	backgroundColor,
	backgroundTextColor,
	buttonRadius,
	cardRadius,
	chipRadius,
	dataTableRadius,
	imageListRadius,
	textFieldRadius,
	theme,
} ) => {
	const [ link ] = useState( googleFontsUrl( headFontFamily, bodyFontFamily ) );

	const iconStyle = materialIconClass( iconCollection );

	useEffect( () => {
		document.head.appendChild( link );
		return () => document.head.removeChild( link );
	}, [ link ] );

	return (
		<>
			<Overrides
				headings={ headFontFamily }
				body={ bodyFontFamily }
				primaryColor={ primaryColor }
				secondaryColor={ secondaryColor }
				primaryTextColor={ primaryTextColor }
				secondaryTextColor={ secondaryTextColor }
				surfaceColor={ surfaceColor }
				surfaceTextColor={ surfaceTextColor }
				surfaceColorMix4={ chroma.mix( surfaceColor, surfaceTextColor, 0.04 ) }
				surfaceColorMix12={ chroma.mix( surfaceColor, surfaceTextColor, 0.12 ) }
				backgroundColor={ backgroundColor }
				backgroundTextColor={ backgroundTextColor }
				iconCollection={ materialIconFontName( iconCollection ) }
			/>

			<div id="material-library-preview">
				<h2 className="mdc-typography--headline2">
					{ __( 'Material Components', 'material-theme-builder' ) }
				</h2>
				<section>
					<h3 className="mdc-typography--headline3">
						{ __( 'Blocks', 'material-theme-builder' ) }
					</h3>
					<hr />
					<Buttons
						iconStyle={ iconStyle }
						primaryColor={ primaryColor }
						primaryTextColor={ primaryTextColor }
						radius={ buttonRadius }
					/>
					<hr />
					<Cards radius={ cardRadius } buttonRadius={ buttonRadius } />
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
					<h3 className="mdc-typography--headline3">
						{ __( 'Components', 'material-theme-builder' ) }
					</h3>
					{ 'material-theme' !== theme && (
						<p>
							{ __(
								'Enable Material Theme for more components.',
								'material-theme-builder'
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
