/**
 * External dependencies
 */
import { Fragment } from '@wordpress/element';
import { escapeRegExp, first, last, isNil } from 'lodash';

function getHighlightedName( name, search ) {
	if ( ! search ) {
		return name;
	}
	const re = new RegExp( escapeRegExp( search ), 'ig' );
	const nameParts = name.split( re );
	return nameParts.map( ( part, i ) => {
		if ( i === 0 ) {
			return part;
		}
		return (
			<Fragment key={ i }>
				<strong>{ search }</strong>
				{ part }
			</Fragment>
		);
	} );
}

function getBreadcrumbsForDisplay( breadcrumbs ) {
	if ( breadcrumbs.length === 1 ) {
		return first( breadcrumbs );
	}
	if ( breadcrumbs.length === 2 ) {
		return first( breadcrumbs ) + ' › ' + last( breadcrumbs );
	}

	return first( breadcrumbs ) + ' … ' + last( breadcrumbs );
}

const SearchListItem = ( {
	countLabel,
	className,
	depth = 0,
	controlId = '',
	item,
	isSelected,
	isSingle,
	onSelect,
	search = '',
	...props
} ) => {
	const showCount = ! isNil( countLabel ) || ! isNil( item.count );
	const classes = [ className, 'material-design-search-list__item' ];
	classes.push( `depth-${ depth }` );
	if ( isSingle ) {
		classes.push( 'is-radio-button' );
	}
	if ( showCount ) {
		classes.push( 'has-count' );
	}
	const hasBreadcrumbs = item.breadcrumbs && item.breadcrumbs.length;
	const name = props.name || `search-list-item-${ controlId }`;
	const id = `${ name }-${ item.id }`;

	return (
		<label htmlFor={ id } className={ classes.join( ' ' ) }>
			{ isSingle ? (
				<input
					type="radio"
					id={ id }
					name={ name }
					value={ item.value }
					onChange={ onSelect( item ) }
					checked={ isSelected }
					className="material-design-search-list__item-input"
					{ ...props }
				></input>
			) : (
				<input
					type="checkbox"
					id={ id }
					name={ name }
					value={ item.value }
					onChange={ onSelect( item ) }
					checked={ isSelected }
					className="material-design-search-list__item-input"
					{ ...props }
				></input>
			) }

			<span className="material-design-search-list__item-label">
				{ hasBreadcrumbs ? (
					<span className="material-design-search-list__item-prefix">
						{ getBreadcrumbsForDisplay( item.breadcrumbs ) }
					</span>
				) : null }
				<span className="material-design-search-list__item-name">
					{ getHighlightedName( item.name, search ) }
				</span>
			</span>

			{ !! showCount && (
				<span className="material-design-search-list__item-count">
					{ countLabel || item.count }
				</span>
			) }
		</label>
	);
};

export default SearchListItem;
