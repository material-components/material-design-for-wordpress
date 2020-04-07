import { startCase } from 'lodash';
import { useEffect, useState } from 'react';

import Lists from './sections/lists';
import Table from './sections/table';
import Cards from './sections/cards';
import Chips from './sections/chips';
import Radios from './sections/radios';
import TabBar from './sections/tab-bar';
import Buttons from './sections/buttons';
import Checkboxes from './sections/checkboxes';
import ImageLists from './sections/image-lists';
import { materialIconClass } from './utils';
import { Overrides, H1, H2 } from './styles';

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
			: '+' + join( startCase( iconCollection ) ) );

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
			<Overrides
				headings={ headFontFamily }
				body={ bodyFontFamily }
				primaryColor={ primaryColor }
				secondaryColor={ secondaryColor }
				primaryTextColor={ primaryTextColor }
				secondaryTextColor={ secondaryTextColor }
			/>

			<div id="kitchen-sink-preview">
				<H1>Kitchen Sink</H1>
				<section>
					<H2>Blocks</H2>
					<hr />
					<Buttons
						iconStyle={ iconStyle }
						primaryColor={ primaryColor }
						primaryTextColor={ primaryTextColor }
						radius={ smallComponentRadius }
					/>
					<hr />
					<Cards
						radius={ mediumComponentRadius }
						smallRadius={ smallComponentRadius }
					/>
					<hr />
					<Table radius={ largeComponentRadius } />
					<hr />
					<ImageLists radius={ mediumComponentRadius } />
					<hr />
					<Lists iconStyle={ iconStyle } />
					<hr />
					<TabBar iconStyle={ iconStyle } />
				</section>

				<hr />

				<section style={ { marginTop: '100px' } }>
					<H2>Components</H2>
					<hr />
					<Checkboxes />
					<hr />
					<Chips />
					<hr />
					<Radios />
					{ /* <hr /> */ }
					{ /* <Fields /> */ }
					{ /* <Switch /> */ }
				</section>
			</div>
		</>
	);
};

export default KitchenSink;
