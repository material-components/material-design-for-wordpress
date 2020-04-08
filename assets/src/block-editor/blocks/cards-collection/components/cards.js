import Masonry from 'react-masonry-css';

/**
 * Cards component.
 *
 * @param {Object} props - Component props.
 * @param {string} props.style - Grid style.
 * @param {Object} props.gutter - Grid gutter.
 * @param {number} props.columns - Number of columns.
 * @param {Array} props.cards - Cards HTML markup.
 *
 * @return {Function} Function returning the HTML markup for the component.
 */
const Cards = ( { style, gutter, columns, cards } ) => {
	const desktopGutter = gutter.desktop || 24;

	const gridOuterStyle = {
		paddingLeft: `${ desktopGutter }px`,
		paddingRight: `${ desktopGutter }px`,
	};

	const gridInnerStyle = {
		gridGap: `${ desktopGutter }px`,
	};

	const columnAttrs = {
		style: {
			marginLeft: `${ desktopGutter }px`,
		},
	};

	return (
		<>
			{ ( style === 'grid' || style === 'list' ) && (
				<div
					className={ `mdc-layout-grid layout-${ style }` }
					style={ gridOuterStyle }
				>
					<div className="mdc-layout-grid__inner" style={ gridInnerStyle }>
						{ cards }
					</div>
				</div>
			) }

			{ style === 'masonry' && (
				<Masonry
					breakpointCols={ columns }
					className={ `masonry-grid layout-${ style }` }
					style={ gridOuterStyle }
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
