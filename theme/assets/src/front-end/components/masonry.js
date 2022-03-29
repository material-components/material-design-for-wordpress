/**
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/* global materialDesignThemeFeVars */
let gridElement = null;
let rowHeight = 24;
let rowGap = 24;
export const masonryInit = () => {
	/** @type {{isFse:boolean}} */
	gridElement = materialDesignThemeFeVars?.isFse
		? document.querySelector( '.is-flex-container' )
		: document.querySelector( '.masonry-grid-theme' );

	if ( ! gridElement ) {
		return;
	}

	const mediaQuery = window.matchMedia( '(min-width: 840px)' );

	mediaQuery.addEventListener( 'change', handleResize );
	handleResize( mediaQuery );
};

const handleResize = mediaQuery => {
	if ( mediaQuery.matches ) {
		resizeAllGridItems();
	}
};

const resizeAllGridItems = () => {
	const cells = materialDesignThemeFeVars?.isFse
		? gridElement.querySelectorAll(
				'.is-style-material-masonry .wp-block-post'
		  )
		: gridElement.querySelectorAll( '.post-card__container' );

	if ( cells.length <= 0 ) {
		console.error( 'Masonry cell elements not found.' );
		return;
	}

	rowHeight = parseInt(
		window
			.getComputedStyle( gridElement )
			.getPropertyValue( 'grid-auto-rows' ),
		10
	);

	rowGap = parseInt(
		window
			.getComputedStyle( gridElement )
			.getPropertyValue( 'grid-row-gap' ),
		10
	);

	const hasPostCard = cells[ 0 ].querySelectorAll( '.post-card' ).length > 0;
	if ( ! hasPostCard ) {
		gridElement.style.gridAutoRows = 'minmax(min-content,max-content)';
	}

	cells.forEach( resizeGridItem );

	if ( ! hasPostCard ) {
		gridElement.style.removeProperty( 'grid-auto-rows' );
	}
};

const resizeGridItem = cell => {
	if ( ! cell ) {
		return;
	}

	let cellCard = cell.querySelector( '.post-card' );

	if ( ! cellCard ) {
		// If we have a cell without card wrapper inside let's use that, Used for default WP template.
		cellCard = cell;
	}

	const contentHeight = cellCard.getBoundingClientRect().height;

	const rowSpan = Math.ceil(
		( contentHeight + rowGap ) / ( rowHeight + rowGap )
	);

	cell.style.gridRowEnd = 'span ' + rowSpan;
};
