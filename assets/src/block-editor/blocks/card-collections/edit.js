/**
 * External dependencies
 */
import Masonry from 'react-masonry-css';

/**
 * WordPress dependencies
 */
import { useEffect, useRef } from '@wordpress/element';

/**
 * Internal dependencies
 */
import InspectorControls from './components/inspector-controls';
import './editor.css';
import { CARD_ATTRIBUTES_VALUE } from './constants';
import VerticalCardLayout from '../card/components/vertical-card-layout';
import HorizontalCardLayout from '../card/components/horizontal-card-layout';

/**
 * Card Collections Edit component.
 *
 * @param {Object} props - Component props.
 *
 * @return {Function} Function returning the HTML markup for the component.
 */
const Edit = props => {
	const { attributes, setAttributes, className } = props;
	const { style, columns } = attributes;

	let columnSpan = 12;

	if ( style === 'grid' ) {
		/*
		 * This works well for the design if we have a maximum of 4 columns. It would not work
		 * so well for 5 and 7 columns for example. Something to keep in mind if the max number of columns
		 * increase above 4.
		 */
		columnSpan = Math.floor( 12 / columns );
	}

	const { cardsProps, numberOfCards } = attributes;

	const items = [];

	const setter = ( attributeName, attributeValue, cardIndex ) => {
		const newCardsProps = [ ...cardsProps ];

		if (
			typeof newCardsProps[ cardIndex ] !== 'undefined' &&
			newCardsProps[ cardIndex ][ attributeName ] !== 'undefined'
		) {
			newCardsProps[ cardIndex ][ attributeName ] = attributeValue;
		}

		setAttributes( {
			cardsProps: newCardsProps,
		} );
	};

	for ( let cardIndex = 0; cardIndex < numberOfCards; cardIndex++ ) {
		let baseProps = CARD_ATTRIBUTES_VALUE;
		let cardsPropsHasIncreased = false;
		if ( numberOfCards <= cardsProps.length ) {
			baseProps = cardsProps[ cardIndex ];
		} else {
			cardsProps.push( CARD_ATTRIBUTES_VALUE );
			cardsPropsHasIncreased = true;
		}

		if ( cardsPropsHasIncreased ) {
			const newCardsProps = [ ...cardsProps ];

			setAttributes( {
				cardsProps: newCardsProps,
			} );
		}

		const cardProps = {
			cardIndex,
			setAttributes,
			setter,
			...baseProps,
		};

		if ( style === 'grid' || style === 'list' ) {
			items.push(
				<div
					key={ cardIndex }
					className={ `mdc-layout-grid__cell--span-${ columnSpan }` }
				>
					{ style === 'grid' && <VerticalCardLayout { ...cardProps } /> }
					{ style === 'list' && <HorizontalCardLayout { ...cardProps } /> }
				</div>
			);
		} else {
			items.push( <VerticalCardLayout key={ cardIndex } { ...cardProps } /> );
		}
	}

	const inspectorControlsProps = {
		...props,
	};

	const isInitialMount = useRef( true );

	useEffect( () => {
		if ( isInitialMount.current ) {
			isInitialMount.current = false;
		} else {
			const newCardsProps = [ ...cardsProps ];
			for ( let index = 0; index < newCardsProps.length; index++ ) {
				newCardsProps[ index ].contentLayout = attributes.contentLayout;
				newCardsProps[ index ].cornerRadius = attributes.cornerRadius;
				newCardsProps[ index ].outlined = attributes.outlined;
				newCardsProps[ index ].displayTitle = attributes.displayTitle;
				newCardsProps[ index ].displaySubTitle = attributes.displaySubTitle;
				newCardsProps[ index ].displayImage = attributes.displayImage;
				newCardsProps[ index ].displaySecondaryText =
					attributes.displaySecondaryText;
				newCardsProps[ index ].displayActions = attributes.displayActions;
			}
			setAttributes( {
				cardsProps: newCardsProps,
			} );
		}
	}, [
		attributes.contentLayout,
		attributes.cornerRadius,
		attributes.outlined,
		attributes.displayTitle,
		attributes.displaySubTitle,
		attributes.displayImage,
		attributes.displaySecondaryText,
		attributes.displayActions,
	] ); // eslint-disable-line

	inspectorControlsProps.attributes.setter =setter;

	return (
		<>
			<InspectorControls { ...inspectorControlsProps } />
			<div className={ className }>
				{ ( style === 'grid' || style === 'list' ) && (
					<div className={ `mdc-layout-grid layout-${ style }` }>
						<div className="mdc-layout-grid__inner">{ items }</div>
					</div>
				) }

				{ style === 'masonry' && (
					<Masonry
						breakpointCols={ columns }
						className={ `masonry-grid layout-${ style }` }
						columnClassName="masonry-grid_column"
					>
						{ items }
					</Masonry>
				) }
			</div>
		</>
	);
};

export default Edit;
