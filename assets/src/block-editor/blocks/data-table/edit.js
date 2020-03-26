/**
 * External dependencies
 */
import classnames from 'classnames';
import { every, pick, mapValues } from 'lodash';

/**
 * WordPress dependencies
 */
import { RichText, createCustomColorsHOC } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';
import { useState } from '@wordpress/element';

/**
 * Internal dependencies
 */
import './styles.css';

const BACKGROUND_COLORS = [
	{
		color: '#f3f4f5',
		name: 'Subtle light gray',
		slug: 'subtle-light-gray',
	},
	{
		color: '#e9fbe5',
		name: 'Subtle pale green',
		slug: 'subtle-pale-green',
	},
	{
		color: '#e7f5fe',
		name: 'Subtle pale blue',
		slug: 'subtle-pale-blue',
	},
	{
		color: '#fcf0ef',
		name: 'Subtle pale pink',
		slug: 'subtle-pale-pink',
	},
];

const isEmptyTableSection = section => {
	return ! section || ! section.length || every( section, isEmptyRow );
};

const isEmptyRow = row => {
	return ! ( row.cells && row.cells.length );
};

const isCellSelected = ( cellLocation, selection ) => {
	if ( ! cellLocation || ! selection ) {
		return false;
	}

	switch ( selection.type ) {
		case 'column':
			return (
				selection.type === 'column' &&
				cellLocation.columnIndex === selection.columnIndex
			);
		case 'cell':
			return (
				selection.type === 'cell' &&
				cellLocation.sectionName === selection.sectionName &&
				cellLocation.columnIndex === selection.columnIndex &&
				cellLocation.rowIndex === selection.rowIndex
			);
	}
};

const updateSelectedCell = ( state, selection, updateCell ) => {
	if ( ! selection ) {
		return state;
	}

	const tableSections = pick( state, [ 'head', 'body', 'foot' ] );
	const {
		sectionName: selectionSectionName,
		rowIndex: selectionRowIndex,
	} = selection;

	return mapValues( tableSections, ( section, sectionName ) => {
		if ( selectionSectionName && selectionSectionName !== sectionName ) {
			return section;
		}

		return section.map( ( row, rowIndex ) => {
			if ( selectionRowIndex && selectionRowIndex !== rowIndex ) {
				return row;
			}

			return {
				cells: row.cells.map( ( cellAttributes, columnIndex ) => {
					const cellLocation = {
						sectionName,
						columnIndex,
						rowIndex,
					};

					if ( ! isCellSelected( cellLocation, selection ) ) {
						return cellAttributes;
					}

					return updateCell( cellAttributes );
				} ),
			};
		} );
	} );
};

const Section = ( { name, rows, onChange, createOnFocus } ) => {
	if ( isEmptyTableSection( rows ) ) {
		return null;
	}

	const Tag = `t${ name }`;
	const tagClass = 'body' === name ? 'mdc-data-table__content' : '';
	const trClass = classnames( {
		'mdc-data-table__header-row': 'head' === name,
		'mdc-data-table__row': 'head' !== name,
	} );

	return (
		<Tag className={ tagClass }>
			{ rows.map( ( { cells }, rowIndex ) => (
				<tr key={ rowIndex } className={ trClass }>
					{ cells.map(
						( { content, tag: CellTag, scope, align }, columnIndex ) => {
							const cellLocation = {
								sectionName: name,
								rowIndex,
								columnIndex,
							};

							const cellClasses = classnames(
								{
									[ `has-text-align-${ align }` ]: align,
								},
								'wp-block-table__cell-content'
							);

							const tdClasses = classnames( {
								'mdc-data-table__cell': 'head' !== name,
								'mdc-data-table__header-cell': 'head' === name,
							} );

							let placeholder = '';
							if ( name === 'head' ) {
								placeholder = __( 'Header label' );
							} else if ( name === 'foot' ) {
								placeholder = __( 'Footer label' );
							}

							return (
								<CellTag key={ columnIndex } className={ tdClasses }>
									<RichText
										className={ cellClasses }
										scope={ CellTag === 'th' ? scope : undefined }
										value={ content }
										onChange={ onChange }
										unstableOnFocus={ createOnFocus( cellLocation ) }
										placeholder={ placeholder }
									/>
								</CellTag>
							);
						}
					) }
				</tr>
			) ) }
		</Tag>
	);
};

const DataTableEdit = ( { attributes, backgroundColor, setAttributes } ) => {
	const { className, hasFixedLayout, caption, head, body, foot } = attributes;
	const [ selectedCell, setSelectedCell ] = useState( null );

	/**
	 * Changes the content of the currently selected cell.
	 *
	 * @param {Array} content A RichText content value.
	 */
	const onChange = content => {
		if ( ! selectedCell ) {
			return;
		}

		setAttributes(
			updateSelectedCell( attributes, selectedCell, cellAttributes => ( {
				...cellAttributes,
				content,
			} ) )
		);
	};

	const createOnFocus = cellLocation => {
		return () => {
			setSelectedCell( {
				...cellLocation,
				type: 'cell',
			} );
		};
	};

	const tableClasses = classnames( backgroundColor.class, {
		'has-fixed-layout': hasFixedLayout,
		'has-background': !! backgroundColor.color,
	} );

	return (
		<figure
			className={ classnames(
				'wp-block-table',
				className.replace( 'wp-block-table', '' )
			) }
		>
			<div className="mdc-data-table">
				<table className={ tableClasses }>
					<Section
						name="head"
						rows={ head }
						onChange={ onChange }
						createOnFocus={ createOnFocus }
					/>
					<Section
						name="body"
						rows={ body }
						onChange={ onChange }
						createOnFocus={ createOnFocus }
					/>
					<Section
						name="foot"
						rows={ foot }
						onChange={ onChange }
						createOnFocus={ createOnFocus }
					/>
				</table>
				<RichText
					tagName="figcaption"
					placeholder={ __( 'Write caption…' ) }
					value={ caption }
					onChange={ value => setAttributes( { caption: value } ) }
					// Deselect the selected table cell when the caption is focused.
					unstableOnFocus={ () => setSelectedCell( null ) }
				/>
			</div>
		</figure>
	);
};

const withCustomBackgroundColors = createCustomColorsHOC( BACKGROUND_COLORS );

export default withCustomBackgroundColors( 'backgroundColor' )( DataTableEdit );
