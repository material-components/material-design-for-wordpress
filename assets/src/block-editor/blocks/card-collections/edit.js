/**
 * External dependencies
 */
import Masonry from 'react-masonry-css';
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
import { useEffect, useRef, useState } from '@wordpress/element';

/**
 * Internal dependencies
 */
import CardsCollectionInspectorControls from './components/cards-collection-inspector-controls';
import './editor.css';
import { CARD_ATTRIBUTES_VALUE } from './constants';
import VerticalCardLayout from '../card/components/vertical-card-layout';
import HorizontalCardLayout from '../card/components/horizontal-card-layout';
import FocusedCardControls from './components/focused-card-controls';
import getColumnSpan from './utils/get-column-span';

/**
 * Card Collections Edit component.
 *
 * @param {Object} props - Component props.
 *
 * @return {Function} Function returning the HTML markup for the component.
 */
const Edit = props => {
	const { attributes, setAttributes, className } = props;
	const { style, columns, cardsProps, numberOfCards } = attributes;
	const items = [];
	const inspectorControlsProps = {
		...props,
	};
	const [ cardsFocus, setCardsFocus ] = useState( [] );
	const columnSpan = getColumnSpan( style, columns );

	/**
	 * @param {string} attributeName - Attribute name.
	 * @param {string} attributeValue - Attribute value.
	 * @param {number} cardIndex - Card index
	 */
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

	inspectorControlsProps.attributes.setter = setter;

	const isInitialMount = useRef( true );

	useEffect( () => {
		const editorWrapper = document.getElementsByClassName(
			'editor-styles-wrapper'
		);

		if ( editorWrapper.length === 1 ) {
			editorWrapper[ 0 ].addEventListener( 'click', onClickOutsideCard, true );
		}

		return () => {
			if ( editorWrapper.length === 1 ) {
				editorWrapper[ 0 ].removeEventListener(
					'click',
					onClickOutsideCard,
					true
				);
			}
		};
	} );

	useEffect(
		() => {
			if ( isInitialMount.current ) {
				isInitialMount.current = false;
			} else {
				const newCardsProps = [ ...cardsProps ];
				for ( let index = 0; index < newCardsProps.length; index++ ) {
					newCardsProps[ index ].contentLayout = attributes.contentLayout;
					newCardsProps[ index ].cornerRadius = attributes.cornerRadius;
					newCardsProps[ index ].outlined = attributes.outlined;
					newCardsProps[ index ].displayTitle = attributes.displayTitle;
					newCardsProps[ index ].displaySecondaryText =
						attributes.displaySecondaryText;
					newCardsProps[ index ].displayImage = attributes.displayImage;
					newCardsProps[ index ].displaySupportingText =
						attributes.displaySupportingText;
					newCardsProps[ index ].displayActions = attributes.displayActions;
					newCardsProps[ index ].displaySecondaryActionButton =
						attributes.displaySecondaryActionButton;
				}
				setAttributes( {
					cardsProps: newCardsProps,
				} );
			}
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[
			attributes.contentLayout,
			attributes.cornerRadius,
			attributes.outlined,
			attributes.displayTitle,
			attributes.displaySecondaryText,
			attributes.displayImage,
			attributes.displaySupportingText,
			attributes.displayActions,
			attributes.displaySecondaryActionButton,
		]
	);

	/**
	 * @param {number} cardIndex - Card index.
	 */
	const onCardFocus = cardIndex => {
		const newCardFocus = cardsFocus.map( () => {
			return false;
		} );
		newCardFocus[ cardIndex ] = true;
		setCardsFocus( newCardFocus );
	};

	/**
	 * @param {number} cardIndex - Card index.
	 */
	const onCardMoveLeft = cardIndex => {
		const newCardsProps = [ ...cardsProps ];
		if ( cardIndex > 0 ) {
			const card = newCardsProps[ cardIndex ];
			newCardsProps[ cardIndex ] = newCardsProps[ cardIndex - 1 ];
			newCardsProps[ cardIndex - 1 ] = card;
			setAttributes( {
				cardsProps: newCardsProps,
			} );
			setCardsFocus( [] );
		}
	};

	/**
	 * @param {number} cardIndex - Card index.
	 */
	const onCardMoveRight = cardIndex => {
		const newCardsProps = [ ...cardsProps ];
		if ( cardIndex < newCardsProps.length - 1 ) {
			const card = newCardsProps[ cardIndex ];
			newCardsProps[ cardIndex ] = newCardsProps[ cardIndex + 1 ];
			newCardsProps[ cardIndex + 1 ] = card;
			setAttributes( {
				cardsProps: newCardsProps,
			} );
			setCardsFocus( [] );
		}
	};

	/**
	 * @param {number} cardIndex - Card index.
	 */
	const onCardRemove = cardIndex => {
		const newCardsProps = [ ...cardsProps ];
		newCardsProps.splice( cardIndex, 1 );
		setAttributes( {
			cardsProps: newCardsProps,
			numberOfCards: numberOfCards - 1,
		} );
		setCardsFocus( [] );
	};

	/**
	 * Handle the click outside a card to remove the focus highlight on all cards.
	 *
	 * @param {Object} event - Click event.
	 */
	const onClickOutsideCard = event => {
		const cardContainer = event.target.closest( '.card-container' );
		if ( ! cardContainer ) {
			setCardsFocus( [] );
		}
	};

	for ( let cardIndex = 0; cardIndex < numberOfCards; cardIndex++ ) {
		let baseProps = { ...CARD_ATTRIBUTES_VALUE };
		let cardsPropsHasIncreased = false;
		if ( numberOfCards <= cardsProps.length ) {
			baseProps = { ...cardsProps[ cardIndex ] };
		} else {
			cardsProps.push( { ...CARD_ATTRIBUTES_VALUE } );
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
			isEditMode: true,
			...baseProps,
		};

		items.push(
			<div
				key={ cardIndex }
				data-card-index={ cardIndex }
				className={ classnames(
					'card-container',
					{
						'card-container-focused':
							cardsFocus[ cardIndex ] !== undefined
								? cardsFocus[ cardIndex ]
								: false,
					},
					{
						[ `mdc-layout-grid__cell--span-${ columnSpan }` ]:
							style === 'grid' || style === 'list',
					}
				) }
				onFocus={ () => onCardFocus( cardIndex ) }
			>
				{ style === 'grid' && <VerticalCardLayout { ...cardProps } /> }
				{ style === 'list' && <HorizontalCardLayout { ...cardProps } /> }
				{ style === 'masonry' && <VerticalCardLayout { ...cardProps } /> }
				{ cardsFocus[ cardIndex ] !== undefined && cardsFocus[ cardIndex ] && (
					<FocusedCardControls
						cardIndex={ cardIndex }
						numberOfCards={ numberOfCards }
						onMoveLeft={ () => onCardMoveLeft( cardIndex ) }
						onMoveRight={ () => onCardMoveRight( cardIndex ) }
						onRemove={ () => onCardRemove( cardIndex ) }
					/>
				) }
			</div>
		);
	}

	return (
		<>
			<CardsCollectionInspectorControls { ...inspectorControlsProps } />
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
