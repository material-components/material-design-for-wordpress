/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * External dependencies
 */
import Masonry from 'react-masonry-css';

/**
 * Internal dependencies
 */
import VerticalCardLayout from '../card/components/vertical-card-layout';
import HorizontalCardLayout from '../card/components/horizontal-card-layout';

/**
 * Card Collections Save component.
 *
 * @param {Object} props - Component props.
 *
 * @return {Function} Function returning the HTML markup for the component.
 */
const Save = ( { attributes, className } ) => {
	const { style, columns, align } = attributes;

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

	for ( let cardIndex = 0; cardIndex < numberOfCards; cardIndex++ ) {
		const baseProps = { ...cardsProps[ cardIndex ] };

		const cardProps = {
			cardIndex,
			setAttributes: () => {},
			setter: () => {},
			isEditMode: false,
			...baseProps,
		};

		if ( style === 'grid' || style === 'list' ) {
			items.push(
				<div
					key={ cardIndex }
					className={ classnames(
						'card-container',
						`mdc-layout-grid__cell--span-${ columnSpan }`
					) }
				>
					{ style === 'grid' && <VerticalCardLayout { ...cardProps } /> }
					{ style === 'list' && <HorizontalCardLayout { ...cardProps } /> }
				</div>
			);
		} else {
			items.push(
				<div key={ cardIndex } className="card-container">
					<VerticalCardLayout { ...cardProps } />
				</div>
			);
		}
	}

	return (
		<>
			<div
				className={ classnames( className, { [ `align${ align }` ]: align } ) }
			>
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

export default Save;
