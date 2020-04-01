/**
 * External dependencies
 */
import classnames from 'classnames';
import Masonry from "react-masonry-css";

/**
 * Internal dependencies
 */
import InspectorControls from './components/inspector-controls';
import './editor.css';
import Card from '../card/components/card';
import { CARD_ATTRIBUTES_VALUE } from './constants';
import SinglePost from "../common-posts-list/components/single-post";

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
					<Card { ...cardProps } />
				</div>
			);
		} else {
			items.push( <Card key={ cardIndex } { ...cardProps } /> );
		}
	}

	const inspectorControlsProps = {
		...props,
	};

	inspectorControlsProps.attributes.setter = setter;

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
