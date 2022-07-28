/*
 *  Copyright 2022 Google LLC
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *        http://www.apache.org/licenses/LICENSE-2.0
 *
 *   Unless required by applicable law or agreed to in writing, software
 *   distributed under the License is distributed on an "AS IS" BASIS,
 *   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 *
 */

/**
 * External dependencies
 */
import { __, _n, sprintf } from '@wordpress/i18n';
import {
	Button,
	Spinner,
	TextControl,
	withSpokenMessages,
} from '@wordpress/components';
import { Fragment, useState, useEffect } from '@wordpress/element';
import { compose, withInstanceId } from '@wordpress/compose';
import { escapeRegExp, findIndex } from 'lodash';
import NoticeOutlineIcon from 'gridicons/dist/notice-outline';
import classnames from 'classnames';

/**
 * Internal dependencies
 */
import { buildTermsTree } from './hierarchy';
import SearchListItem from './item';
import Tag from '../tag';

import './style.css';

const defaultMessages = {
	clear: __( 'Clear all selected items', 'material-design' ),
	noItems: __( 'No items found.', 'material-design' ),
	/* translators: %s: search string */
	noResults: __( 'No results for %s', 'material-design' ),
	search: __( 'Search for items', 'material-design' ),
	selected: n =>
		sprintf(
			/* translators: Number of items selected from list. */
			_n( '%d item selected', '%d items selected', n, 'material-design' ),
			n
		),
	updated: __( 'Search results updated.', 'material-design' ),
};

/**
 * Component to display a searchable, selectable list of items.
 *
 * @param {Object} props
 */
export const SearchListControl = props => {
	const [ searchValue, setSearchValue ] = useState( props.search || '' );
	const {
		isSingle,
		isLoading,
		onChange,
		selected,
		instanceId,
		messages: propsMessages,
		isCompact,
		debouncedSpeak,
		onSearch,
		className = '',
	} = props;

	const messages = { ...defaultMessages, ...propsMessages };

	useEffect( () => {
		if ( typeof onSearch === 'function' ) {
			onSearch( searchValue );
		}
	}, [ searchValue ] ); // eslint-disable-line react-hooks/exhaustive-deps

	const onRemove = id => {
		return () => {
			if ( isSingle ) {
				onChange( [] );
			}
			const i = findIndex( selected, { id } );
			onChange( [
				...selected.slice( 0, i ),
				...selected.slice( i + 1 ),
			] );
		};
	};

	const onSelect = item => {
		return () => {
			if ( isSelected( item ) ) {
				onRemove( item.id )();
				return;
			}
			if ( isSingle ) {
				onChange( [ item ] );
			} else {
				onChange( [ ...selected, item ] );
			}
		};
	};

	const isSelected = item => findIndex( selected, { id: item.id } ) !== -1;

	const getFilteredList = ( list, search ) => {
		const { isHierarchical } = props;
		if ( ! search ) {
			return isHierarchical ? buildTermsTree( list ) : list;
		}
		const re = new RegExp( escapeRegExp( search ), 'i' );
		debouncedSpeak( messages.updated );
		const filteredList = list
			.map( item => ( re.test( item.name ) ? item : false ) )
			.filter( Boolean );
		return isHierarchical
			? buildTermsTree( filteredList, list )
			: filteredList;
	};

	const defaultRenderItem = args => {
		return <SearchListItem { ...args } />;
	};

	const renderList = ( list, depth = 0 ) => {
		const renderItem = props.renderItem || defaultRenderItem;
		if ( ! list ) {
			return null;
		}

		return list.map( item => (
			<Fragment key={ item.id }>
				<li>
					{ renderItem( {
						item,
						isSelected: isSelected( item ),
						onSelect,
						isSingle,
						search: searchValue,
						depth,
						controlId: instanceId,
					} ) }
				</li>
				{ renderList( item.children, depth + 1 ) }
			</Fragment>
		) );
	};

	const renderListSection = () => {
		if ( isLoading ) {
			return (
				<div className="material-design-search-list__list is-loading">
					<Spinner />
				</div>
			);
		}
		const list = getFilteredList( props.list, searchValue );

		if ( ! list.length ) {
			return (
				<div className="material-design-search-list__list is-not-found">
					<span className="material-design-search-list__not-found-icon">
						<NoticeOutlineIcon
							role="img"
							aria-hidden="true"
							focusable="false"
						/>
					</span>
					<span className="material-design-search-list__not-found-text">
						{ searchValue
							? // eslint-disable-next-line @wordpress/valid-sprintf
							  sprintf( messages.noResults, searchValue )
							: messages.noItems }
					</span>
				</div>
			);
		}

		return (
			<ul className="material-design-search-list__list">
				{ renderList( list ) }
			</ul>
		);
	};

	const renderSelectedSection = () => {
		if ( isLoading || isSingle || ! selected ) {
			return null;
		}

		const selectedCount = selected.length;
		return (
			<div className="material-design-search-list__selected">
				<div className="material-design-search-list__selected-header">
					<strong>{ messages.selected( selectedCount ) }</strong>
					{ selectedCount > 0 ? (
						<Button
							isLink
							isDestructive
							onClick={ () => onChange( [] ) }
							aria-label={ messages.clear }
						>
							{ __( 'Clear all', 'material-design' ) }
						</Button>
					) : null }
				</div>
				{ selectedCount > 0 ? (
					<ul>
						{ selected.map( ( item, i ) => (
							<li key={ i }>
								<Tag
									label={ item.name }
									id={ item.id }
									remove={ onRemove }
								/>
							</li>
						) ) }
					</ul>
				) : null }
			</div>
		);
	};

	return (
		<div
			className={ classnames( 'material-design-search-list', className, {
				'is-compact': isCompact,
			} ) }
		>
			{ renderSelectedSection() }

			<div className="material-design-search-list__search">
				<TextControl
					label={ messages.search }
					type="search"
					value={ searchValue }
					onChange={ value => setSearchValue( value ) }
				/>
			</div>

			{ renderListSection() }
		</div>
	);
};

export default compose( [ withSpokenMessages, withInstanceId ] )(
	SearchListControl
);
