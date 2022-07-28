/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { escapeRegExp, first, last, isNil } from 'lodash';

/**
 * Internal dependencies
 */
import './style.css';

function getHighlightedName( name, search ) {
	if ( ! search ) {
		return name;
	}
	const re = new RegExp( escapeRegExp( search ), 'ig' );
	return name.replace( re, '<strong>$&</strong>' );
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

	const inputProps = props;
	// React throws console error for controlId on <input>
	delete inputProps.controlId;

	return (
		<label htmlFor={ item.id } className={ classes.join( ' ' ) }>
			{ isSingle ? (
				<input
					type="radio"
					id={ item.id }
					name={ item.name }
					value={ item.value }
					onChange={ onSelect( item ) }
					checked={ isSelected }
					className="material-design-search-list__item-input"
					{ ...inputProps }
				/>
			) : (
				<input
					type="checkbox"
					id={ item.id }
					name={ item.name }
					value={ item.value }
					onChange={ onSelect( item ) }
					checked={ isSelected }
					className="material-design-search-list__item-input"
					{ ...inputProps }
				/>
			) }

			<span className="material-design-search-list__item-label">
				{ hasBreadcrumbs ? (
					<span className="material-design-search-list__item-prefix">
						{ getBreadcrumbsForDisplay( item.breadcrumbs ) }
					</span>
				) : null }
				<span
					className="material-design-search-list__item-name"
					dangerouslySetInnerHTML={ {
						__html: getHighlightedName(
							item.name || __( '(no title)', 'material-design' ),
							search
						),
					} }
				/>
				{ item.link ? (
					<a
						className="material-design-search-list__item-preview"
						href={ item.link }
						target="_blank"
						rel="noopener noreferrer"
					>
						{ __( 'Preview', 'material-design' ) }
					</a>
				) : null }
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
