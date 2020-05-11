/**
 * External dependencies
 */
import { useEffect, useState } from 'react';

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
import { materialIconClass } from './utils';
import { Overrides, H1, H2 } from './styles';

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

const KitchenSink = ( {
	primaryColor,
	bodyFontFamily,
	headFontFamily,
	iconCollection,
	secondaryColor,
	primaryTextColor,
	secondaryTextColor,
	surfaceColor,
	onSurfaceColor,
	smallComponentRadius,
	largeComponentRadius,
	mediumComponentRadius,
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
				onSurfaceColor={ onSurfaceColor }
			/>

			<div id="kitchen-sink-preview">
				<H1>{ __( 'Material Components', 'material-theme-builder' ) }</H1>
				<section>
					<H2>{ __( 'Blocks', 'material-theme-builder' ) }</H2>
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
					<H2>{ __( 'Components', 'material-theme-builder' ) }</H2>
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
					<Chips />
					<hr />
					<Radios />
					<hr />
					<Fields radius={ smallComponentRadius } />
					<hr />
					<Switch />
				</section>
			</div>
		</>
	);
};

export default KitchenSink;
