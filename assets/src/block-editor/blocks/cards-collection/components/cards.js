import Masonry from 'react-masonry-css';

/**
 * Cards component.
 *
 * @param {Object} props - Component props.
 * @param {string} props.style - Grid style.
 * @param {Object} props.gutter - Grid gutter.
 * @param {number} props.columns - Number of columns.
 * @param {Array} props.cards - Cards HTML markup.
 * @param {Array} props.saveContext - Is the context `save` ?.
 *
 * @return {Function} Function returning the HTML markup for the component.
 */
const Cards = ( { style, gutter, columns, cards, saveContext = false } ) => {
	const desktopGutter = gutter.desktop || 24;

	const gridInnerStyle = saveContext
		? {}
		: {
				gridGap: `${ desktopGutter }px`,
		  };

	const columnAttrs = saveContext
		? {}
		: {
				style: {
					paddingLeft: `${ desktopGutter }px`,
				},
		  };

	return (
		<>
			{ ( style === 'grid' || style === 'list' ) && (
				<div className={ `mdc-layout-grid layout-${ style }` }>
					<div className="mdc-layout-grid__inner" style={ gridInnerStyle }>
						{ cards }
					</div>
				</div>
			) }

			{ style === 'masonry' && (
				<Masonry
					breakpointCols={ columns }
					className={ `masonry-grid layout-${ style }` }
					columnClassName="masonry-grid_column"
					columnAttrs={ columnAttrs }
				>
					{ cards }
				</Masonry>
			) }
		</>
	);
};

export default Cards;
