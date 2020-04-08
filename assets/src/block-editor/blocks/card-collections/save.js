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
import getColumnSpan from './utils/get-column-span';

/**
 * Card Collections Save component.
 *
 * @param {Object} props - Component props.
 *
 * @return {Function} Function returning the HTML markup for the component.
 */
const Save = ( { attributes, className } ) => {
	const { style, columns, align, cardsProps, numberOfCards } = attributes;
	const columnSpan = getColumnSpan( style, columns );
	const items = [];

	for ( let cardIndex = 0; cardIndex < numberOfCards; cardIndex++ ) {
		const cardProps = {
			cardIndex,
			setAttributes: () => {},
			setter: () => {},
			isEditMode: false,
			...{ ...cardsProps[ cardIndex ] },
		};

		items.push(
			<div
				key={ cardIndex }
				className={ classnames( 'card-container', {
					[ `mdc-layout-grid__cell--span-${ columnSpan }` ]:
						style === 'grid' || style === 'list',
				} ) }
			>
				{ style === 'grid' && <VerticalCardLayout { ...cardProps } /> }
				{ style === 'list' && <HorizontalCardLayout { ...cardProps } /> }
				{ style === 'masonry' && <VerticalCardLayout { ...cardProps } /> }
			</div>
		);
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
