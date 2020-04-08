/**
 * Get column span for grid.
 *
 * @param {string} style - Grid style.
 * @param {number} columns - Number of columns.
 * @return {number} Column span.
 */
export default ( style, columns ) => {
	let columnSpan = 12;

	if ( style === 'grid' ) {
		/*
		 * This works well for the design if we have a maximum of 4 columns. It would not work
		 * so well for 5 and 7 columns for example. Something to keep in mind if the max number of columns
		 * increase above 4.
		 */
		columnSpan = Math.floor( 12 / columns );
	}

	return columnSpan;
};
