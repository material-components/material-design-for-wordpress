import Masonry from 'react-masonry-css';

/**
 * @param {Object} props - Component props.
 * @param {string} props.style - Grid style.
 * @param {number} props.columns - Number of columns.
 * @param {Array} props.cards - Cards HTML markup.
 *
 * @return {Function} Function returning the HTML markup for the component.
 */
const Cards = ( { style, columns, cards } ) => (
	<>
		{ ( style === 'grid' || style === 'list' ) && (
			<div className={ `mdc-layout-grid layout-${ style }` }>
				<div className="mdc-layout-grid__inner">{ cards }</div>
			</div>
		) }

		{ style === 'masonry' && (
			<Masonry
				breakpointCols={ columns }
				className={ `masonry-grid layout-${ style }` }
				columnClassName="masonry-grid_column"
			>
				{ cards }
			</Masonry>
		) }
	</>
);

export default Cards;
