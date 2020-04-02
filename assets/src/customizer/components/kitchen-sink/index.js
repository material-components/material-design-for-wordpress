import { useEffect, useState } from 'react';
import { startCase } from 'lodash';

import { GlobalFonts, H1, H2 } from './styles';
import Cards from './sections/cards';
import Buttons from './sections/buttons';
import { inlineFontFamily, materialIconClass } from './utils';

/**
 * Adds link tag with appropriate google fonts to head.
 *
 * @param {string} headings Import headings font
 * @param {string} body Import body font
 * @param {string} iconCollection The icon collection type
 */
const googleFontsUrl = ( headings, body, iconCollection ) => {
	const join = str => str.replace( ' ', '+' );
	const link = document.createElement( 'link' );

	const mdiStyle =
		'Material+Icons' +
		( iconCollection === 'filled'
			? ''
			: '+' + startCase( iconCollection ).replace( ' ', '+' ) );

	link.rel = 'stylesheet';
	link.href = `https://fonts.googleapis.com/css?family=${ mdiStyle }|${ join(
		headings
	) }|${ join( body ) }`;

	return link;
};

const KitchenSink = ( {
	primaryColor,
	bodyFontFamily,
	headFontFamily,
	iconCollection,
	secondaryColor,
	primaryTextColor,
	secondaryTextColor,
	smallComponentRadius,
	largeComponentRadius,
	mediumComponentRadius,
} ) => {
	const [ link ] = useState(
		googleFontsUrl( headFontFamily, bodyFontFamily, iconCollection )
	);

	const iconStyle = materialIconClass( iconCollection );

	useEffect( () => {
		document.head.appendChild( link );
		return () => document.head.removeChild( link );
	}, [ link ] );

	return (
		<>
			<GlobalFonts headings={ headFontFamily } body={ bodyFontFamily } />

			<div
				id="kitchen-sink-preview"
				style={ { fontFamily: inlineFontFamily( bodyFontFamily ) } }
			>
				<H1>Kitchen Sink</H1>
				<section>
					<H2>Blocks</H2>
					<hr />
					<Buttons
						primaryColor={ primaryColor }
						secondaryColor={ secondaryColor }
						iconCollection={ iconStyle }
						primaryTextColor={ primaryTextColor }
						secondaryTextColor={ secondaryTextColor }
						smallComponentRadius={ smallComponentRadius }
						headFontFamily={ inlineFontFamily( headFontFamily ) }
					/>
					<hr />
					<Cards
						headFontFamily={ inlineFontFamily( headFontFamily ) }
						mediumComponentRadius={ mediumComponentRadius }
					/>
				</section>
			</div>
		</>
	);
};

export default KitchenSink;
